import { type TReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type ticketDetailResetAction } from "../TicketActions";

const ticketDetailResetReducer: TReducer<TPlatformAppState, typeof ticketDetailResetAction> = (
  state,
) => ({
  ...state,
  ticket: { ...state.ticket, detail: {} },
});

export { ticketDetailResetReducer };
