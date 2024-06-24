import { combineEpics } from "redux-observable";
import { of } from "rxjs";
import { routerEpic } from "@sb/router";
import type { TMatch } from "@sb/react-router-compat";
import { callManagerRemoveSymbolAction, createCallManagerSymbol } from "@sb/call-manager";
import { platformTicketQueryOptionalFields, query_Platform_Ticket } from "@sb/graphql-client/PlayerUI";
import { getMatch } from "../../../../common/Utils/RouterUtils/GetMatch";
import { whenLoggedAndWsAuthenticatedEpic } from "../../../../common/Store/WsAuth/WsAuthEpic";
import { whenPlayerIdExist } from "../../../../common/Store/Player/Epics/WhenPlayerIdExist";
import type { TMixAppEpic, TMixConnectedAppEpic } from "../../../../common/Store/Root/Epics/TMixAppEpic";
import { resyncResourceFactory } from "../../../../common/Utils/EpicUtils/ResyncResourceFactory";
import { playerIdNotNilSelector } from "../../../../common/Store/Player/Selectors/PlayerSelectors";
import { createConnectedEpic } from "../../../../common/Utils/EpicUtils/CreateConnectedByRouteEpic";
import { createSubscribe } from "../../../../common/Utils/EpicUtils/CreateSubscribe";
import { gqlLoadingFactory } from "../../../../common/Utils/EpicUtils/GqlLoadingFactory";
import { ticketDetailsMatchOptions } from "../../PlatformMatchOptions";
import type { TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { graphQlDataSelector } from "../../Root/Selectors/GraphQlSelectors";
import {
  ticketDetailReceivedAction,
  ticketNewMessageReceivedAction,
  ticketStatusChangedAction,
} from "../TicketActions";
import { ticketSendFormEpic } from "../Forms/TicketSendForm/Epics/TicketSendFormEpic";
import { watchTicketChangesEpic } from "./WatchTicketChangesEpic";
import { onLoadTicketEpic } from "./OnLoadTicketEpic";

interface IWithTicketId {
  id: string;
}

interface ITicketMessages {
  messages: string[];
}

const TICKET_LOADING_SYMBOL = createCallManagerSymbol("TICKET_LOADING_SYMBOL");

const loadTicketByIdEpic = (ticketId: string): TPlatformEpic => gqlLoadingFactory(
  TICKET_LOADING_SYMBOL,
  query_Platform_Ticket,
  {
    optionalFields: platformTicketQueryOptionalFields,
    variables: { ticketId },
  },
  ticketDetailReceivedAction,
  (response) => [graphQlDataSelector(response).Ticket],
  undefined,
  undefined,
  true,
);

const updateTicketStatus = () => () => of(ticketStatusChangedAction());

const ticketResyncEpic = (ticketId: string): TMixConnectedAppEpic => (action$, state$, dependencies) => {
  const playerId = playerIdNotNilSelector(state$.value);

  return resyncResourceFactory({
    loadEpic: loadTicketByIdEpic(ticketId),
    loadSymbol: TICKET_LOADING_SYMBOL,
    subscriptions: [
      {
        uri: `sumstats.platform.ticket.event.added_ticket_message.${playerId}.${ticketId}`,
        auth: true,
        onUpdate: (payload: ITicketMessages) => () => of(ticketNewMessageReceivedAction(payload)),
      },
    ],
  })(action$, state$, dependencies);
};

const watchTicketStatusChangedEpic = (ticketId: string): TMixConnectedAppEpic => (action$, state$, dependencies) => {
  const playerId = playerIdNotNilSelector(state$.value);

  return whenLoggedAndWsAuthenticatedEpic(
    createConnectedEpic(
      combineEpics(
        createSubscribe(
          `sumstats.platform.ticket.event.closed_ticket.${playerId}.${ticketId}`,
          updateTicketStatus,
          "[watchTicketStatusChanged]: closed_ticket",
        ),

        createSubscribe(
          `sumstats.platform.ticket.event.re_opened_ticket.${playerId}.${ticketId}`,
          updateTicketStatus,
          "[watchTicketStatusChanged]: re_opened_ticket",
        ),
      ),
    ),
  )(action$, state$, dependencies);
};

const getEpicsOnTicketRoute = (ticketId: string): TMixAppEpic => whenPlayerIdExist(
  combineEpics(
    ticketResyncEpic(ticketId),
    watchTicketChangesEpic(ticketId),
    watchTicketStatusChangedEpic(ticketId),
    onLoadTicketEpic,
  ),
);

const syncTicketEpic: TMixAppEpic = routerEpic({
  name: "syncTicket",
  match: getMatch<IWithTicketId>(ticketDetailsMatchOptions),
  onStart: ({ params: { id } }: TMatch<IWithTicketId>) => combineEpics(getEpicsOnTicketRoute(id), ticketSendFormEpic),
  onStop: () => () => of(callManagerRemoveSymbolAction(TICKET_LOADING_SYMBOL)),
});

export { syncTicketEpic };
