import { type TReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type ticketNextPageAction } from "../TicketActions";

const ticketNextPageReducer: TReducer<TPlatformAppState, typeof ticketNextPageAction> = (
  state,
) => ({
  ...state,
  ticket: {
    ...state.ticket,
    variables: {
      ...state.ticket.variables,
      cursor: {
        ...state.ticket.variables.cursor,
        first: state.ticket.variables.cursor.first || state.ticket.variables.cursor.last,
        after: state.ticket.pageInfo?.endCursor || void 0,
        before: void 0,
        last: void 0,
      },
    },
  },
});

export { ticketNextPageReducer };
