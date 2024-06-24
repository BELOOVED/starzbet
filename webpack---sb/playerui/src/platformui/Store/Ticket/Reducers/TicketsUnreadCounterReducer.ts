import { type TReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type ticketsUnreadCounterReceivedAction } from "../TicketActions";

const ticketUnreadCounterReceivedReducer: TReducer<TPlatformAppState, typeof ticketsUnreadCounterReceivedAction> = (
  state,
  { payload: { unreadCounter } },
) => ({
  ...state,
  ticket: { ...state.ticket, unreadCounter },
});

export {
  ticketUnreadCounterReceivedReducer,
};
