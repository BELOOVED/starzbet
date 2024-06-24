import { type TReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type ticketDetailReceivedAction } from "../TicketActions";

const ticketDetailReceivedReducer: TReducer<TPlatformAppState, typeof ticketDetailReceivedAction> = (
  state,
  { payload: { detail } },
) => ({
  ...state,
  ticket: {
    ...state.ticket,
    detail,
  },
});

export { ticketDetailReceivedReducer };
