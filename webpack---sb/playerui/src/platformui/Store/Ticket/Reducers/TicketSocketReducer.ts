import { type TReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type storeNewTicketMessageAction } from "../TicketActions";
import { detailTypeGuard } from "../TicketInitialState";

const storeNewTicketMessageReducer: TReducer<TPlatformAppState, typeof storeNewTicketMessageAction> = (
  state,
  { payload: { message } },
) => {
  if (!detailTypeGuard(state.ticket.detail)) {
    throw Error("detail is empty");
  }

  return ({
    ...state,
    ticket: {
      ...state.ticket,
      detail: {
        ...state.ticket.detail,
        messages: [
          ...state.ticket.detail.messages,
          message,
        ],
      },
    },
  });
};

export { storeNewTicketMessageReducer };
