import { createCallManagerSymbol } from "@sb/call-manager";
import {
  platformUnreadTicketCounterQueryOptionalFields,
  query_Platform_UnreadTicketCounter,
} from "@sb/graphql-client/PlayerUI";
import { gqlLoadingFactory } from "../../../../common/Utils/EpicUtils/GqlLoadingFactory";
import type { TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { ticketsUnreadCounterReceivedAction } from "../TicketActions";

const TICKETS_UNREAD_COUNT_LOADING_SYMBOL = createCallManagerSymbol("TICKETS_UNREAD_COUNT_LOADING_SYMBOL");

const requestUnreadTicketsCountEpic: TPlatformEpic = (action$, state$, deps) => gqlLoadingFactory(
  TICKETS_UNREAD_COUNT_LOADING_SYMBOL,
  query_Platform_UnreadTicketCounter,
  {
    optionalFields: platformUnreadTicketCounterQueryOptionalFields,
    variables: {},
  },
  ticketsUnreadCounterReceivedAction,
  ({ platform: { UnreadTicketCounter } }) => [UnreadTicketCounter],
  undefined,
  undefined,
  true,
)(action$, state$, deps);

export {
  requestUnreadTicketsCountEpic,
};
