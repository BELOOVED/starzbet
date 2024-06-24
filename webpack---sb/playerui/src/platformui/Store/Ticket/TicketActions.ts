import type { TPlatform_Ticket_Fragment, TPlatform_TicketMessage_Fragment } from "@sb/graphql-client/PlayerUI";
import { type TPageInfo_Fragment } from "@sb/graphql-client";

const ticketsReceivedAction = (nodes: TPlatform_Ticket_Fragment[], pageInfo: TPageInfo_Fragment) => ({
  type: "@TICKET/RECEIVED",
  payload: { nodes, pageInfo },
});

const ticketsUnreadCounterReceivedAction = (unreadCounter: number) => ({
  type: "@TICKET/RECEIVED_UNREAD_COUNT_TICKETS",
  payload: { unreadCounter },
});

const ticketNextPageAction = () => ({
  type: "@TICKET/NEXT_PAGE",
});

const ticketPrevPageAction = () => ({
  type: "@TICKET/PREV_PAGE",
});

const ticketDetailReceivedAction = (detail: TPlatform_Ticket_Fragment) => ({
  type: "@TICKET/DETAIL_RECEIVED",
  payload: { detail },
});

const ticketDetailsWithNoMessagesAction = (detail: TPlatform_Ticket_Fragment) => ({
  type: "@TICKET/DETAIL_WITH_NO_MESSAGES",
  payload: { detail },
});

const ticketDetailResetAction = () => ({
  type: "@TICKET/DETAIL_RESET",
});

const ticketNewMessageReceivedAction = (payload: { messages: string[]; }) => ({
  type: "@TICKET/NEW_MESSAGE_RECEIVED",
  payload: payload,
});

const ticketStatusChangedAction = () => ({
  type: "@TICKET/STATUS_CHANGED",
});

const storeNewTicketMessageAction = (message: TPlatform_TicketMessage_Fragment) => ({
  type: "@TICKET/STORE_NEW_MESSAGE",
  payload: { message },
});

export {
  ticketsReceivedAction,
  ticketNextPageAction,
  ticketPrevPageAction,
  ticketDetailReceivedAction,
  ticketDetailResetAction,
  ticketNewMessageReceivedAction,
  ticketStatusChangedAction,
  storeNewTicketMessageAction,
  ticketDetailsWithNoMessagesAction,
  ticketsUnreadCounterReceivedAction,
};
