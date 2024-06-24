import { platformTicketsQueryOptionalFields, query_Platform_Tickets } from "@sb/graphql-client/PlayerUI";
import { createCallManagerSymbol } from "@sb/call-manager";
import { EPlatform_TicketWhereFieldPaths, EWhere_Predicate } from "@sb/graphql-client";
import { extractNodesFromEdges } from "@sb/utils";
import { playerDetailsSelectors } from "../../../../common/Store/Player/Selectors/PlayerSelectors";
import { gqlLoadingFactory } from "../../../../common/Utils/EpicUtils/GqlLoadingFactory";
import type { TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { ticketSelectors } from "../Selectors/TicketSelectors";
import { ticketsReceivedAction } from "../TicketActions";

const TICKETS_LOADING_SYMBOL = createCallManagerSymbol("TICKETS_LOADING_SYMBOL");

const requestTicketsEpic: TPlatformEpic = (action$, state$, deps) => {
  const playerId = playerDetailsSelectors.id(state$.value);
  const variables = ticketSelectors.variables(state$.value);

  return gqlLoadingFactory(
    TICKETS_LOADING_SYMBOL,
    query_Platform_Tickets,
    {
      optionalFields: platformTicketsQueryOptionalFields,
      variables: {
        ...variables,
        where: {
          fieldPath: EPlatform_TicketWhereFieldPaths.ticketRelationId,
          predicate: EWhere_Predicate.eq,
          value: playerId,
        },
      },
    },
    ticketsReceivedAction,
    ({ platform: { Tickets } }) => [extractNodesFromEdges(Tickets), Tickets.pageInfo],
    undefined,
    undefined,
    true,
  )(action$, state$, deps);
};

export { requestTicketsEpic };

