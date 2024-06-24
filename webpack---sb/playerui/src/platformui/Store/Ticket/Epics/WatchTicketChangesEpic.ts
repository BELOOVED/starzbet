import { switchMap } from "rxjs";
import { combineEpics } from "redux-observable";
import { createCallManagerSymbol } from "@sb/call-manager";
import { isCreator } from "@sb/utils";
import {
  platformTicketMessageQueryOptionalFields,
  platformTicketQueryOptionalFields,
  query_Platform_Ticket,
  query_Platform_TicketMessage,
} from "@sb/graphql-client/PlayerUI";
import { gqlLoadingFactory } from "../../../../common/Utils/EpicUtils/GqlLoadingFactory";
import { graphQlDataSelector } from "../../Root/Selectors/GraphQlSelectors";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import {
  storeNewTicketMessageAction,
  ticketDetailsWithNoMessagesAction,
  ticketNewMessageReceivedAction,
  ticketStatusChangedAction,
} from "../TicketActions";
import { ticketNewMessageIdSelector } from "../Selectors/TicketSelectors";

const TICKET_LOAD_MESSAGE_SYMBOL = createCallManagerSymbol("TICKET_LOAD_MESSAGE_SYMBOL");
const loadNewTicketMessagesEpic: TPlatformEpic = (action$, state$, deps) => action$.pipe(
  isCreator(ticketNewMessageReceivedAction),
  switchMap(({ payload }) => {
    const newTicketMessageId = ticketNewMessageIdSelector(state$.value, payload.messages);

    return gqlLoadingFactory(
      TICKET_LOAD_MESSAGE_SYMBOL,
      query_Platform_TicketMessage,
      {
        optionalFields: platformTicketMessageQueryOptionalFields,
        variables: { ticketMessageId: newTicketMessageId },
      },
      storeNewTicketMessageAction,
      (response) => [graphQlDataSelector(response).TicketMessage],
      undefined,
      undefined,
      true,
    )(action$, state$, deps);
  }),
);
const requestTicketWithoutMessagesEpic = (ticketId: string): TPlatformEpic => (
  action$,
  state$,
  deps,
) => action$.pipe(
  isCreator(ticketStatusChangedAction),
  switchMap(() => gqlLoadingFactory(
    TICKET_LOAD_MESSAGE_SYMBOL,
    query_Platform_Ticket,
    {
      optionalFields: platformTicketQueryOptionalFields,
      variables: {
        ticketId,
      },
    },
    ticketDetailsWithNoMessagesAction,
    (response) => [graphQlDataSelector(response).Ticket],
    undefined,
    undefined,
    true,
  )(action$, state$, deps)),
);
const watchTicketChangesEpic = (ticketId: string) => combineEpics(
  requestTicketWithoutMessagesEpic(ticketId),
  loadNewTicketMessagesEpic,
);

export {
  watchTicketChangesEpic,
};
