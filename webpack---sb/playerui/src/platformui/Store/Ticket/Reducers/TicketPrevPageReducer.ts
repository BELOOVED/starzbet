import { type TReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type ticketPrevPageAction } from "../TicketActions";

const ticketPrevPageReducer: TReducer<TPlatformAppState, typeof ticketPrevPageAction> = (
  state,
) => ({
  ...state,
  ticket: {
    ...state.ticket,
    variables: {
      ...state.ticket.variables,
      cursor: {
        ...state.ticket.variables.cursor,
        before: state.ticket.pageInfo?.startCursor || void 0,
        last: state.ticket.variables.cursor.last || state.ticket.variables.cursor.first,
        after: void 0,
        first: void 0,
      },
    },
  },
});

export { ticketPrevPageReducer };
