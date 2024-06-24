import type { TReducer } from "@sb/utils";
import { EPlatform_TicketDepartment } from "@sb/graphql-client";
import type { TPlatform_Ticket_Fragment } from "@sb/graphql-client/PlayerUI";
import type { TPlatformAppState } from "../../PlatformInitialState";
import { type ticketsReceivedAction } from "../TicketActions";
import type { TPlayerDepartment } from "../TicketInitialState";

const playerDepartments = Object.values(EPlatform_TicketDepartment);

const isPlayerTicket = (candidate: string): candidate is TPlayerDepartment => {
  if (candidate === EPlatform_TicketDepartment.affiliate) {
    return false;
  }

  return playerDepartments.some((it) => it === candidate);
};

const normalizeTicketNode = (nodes: TPlatform_Ticket_Fragment[]) => nodes.map(({
  id,
  openedAt,
  messages,
  subject,
  status,
  department,
  readers,
}) => {
  if (!isPlayerTicket(department)) {
    throw Error("Mismatch of player departments");
  }

  return ({
    id,
    openedAt,
    messages,
    subject,
    status,
    department,
    readers,
  });
});

const ticketsReceivedReducer: TReducer<TPlatformAppState, typeof ticketsReceivedAction> = (
  state,
  { payload: { nodes, pageInfo } },
) => ({
  ...state,
  ticket: {
    ...state.ticket,
    nodes: normalizeTicketNode(nodes),
    pageInfo,
  },
});

export { ticketsReceivedReducer };
