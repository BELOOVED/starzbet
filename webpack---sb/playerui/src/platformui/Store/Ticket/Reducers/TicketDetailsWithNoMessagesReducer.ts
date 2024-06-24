import omit from "lodash/fp/omit";
import { isNotNil, type TReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type ticketDetailsWithNoMessagesAction } from "../TicketActions";

const ticketDetailsWithNoMessagesReducer: TReducer<TPlatformAppState, typeof ticketDetailsWithNoMessagesAction> = (
  state,
  { payload: { detail } },
) => {
  const newTicketDetail = omit(["messages"], detail);

  return ({
    ...state,
    ticket: {
      ...state.ticket,
      detail: {
        ...state.ticket.detail,
        messages: isNotNil(state.ticket.detail.messages) ? state.ticket.detail.messages : [],
        ...newTicketDetail,
      },
    },
  });
};

export { ticketDetailsWithNoMessagesReducer };
