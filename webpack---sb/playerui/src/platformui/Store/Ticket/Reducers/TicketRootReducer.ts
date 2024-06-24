import { createRootReducer } from "@sb/utils";
import {
  storeNewTicketMessageAction,
  ticketDetailReceivedAction,
  ticketDetailResetAction,
  ticketDetailsWithNoMessagesAction,
  ticketNextPageAction,
  ticketPrevPageAction,
  ticketsReceivedAction,
  ticketsUnreadCounterReceivedAction,
} from "../TicketActions";
import { ticketsReceivedReducer } from "./TicketsReceivedReducer";
import { ticketNextPageReducer } from "./TicketNextPageReducer";
import { ticketPrevPageReducer } from "./TicketPrevPageReducer";
import { ticketDetailReceivedReducer } from "./TicketDetailReceivedReducer";
import { ticketDetailResetReducer } from "./TicketDetailResetReducer";
import { storeNewTicketMessageReducer } from "./TicketSocketReducer";
import { ticketDetailsWithNoMessagesReducer } from "./TicketDetailsWithNoMessagesReducer";
import { ticketUnreadCounterReceivedReducer } from "./TicketsUnreadCounterReducer";

const ticketRootReducer = createRootReducer([
  [ticketsReceivedReducer, ticketsReceivedAction],
  [ticketNextPageReducer, ticketNextPageAction],
  [ticketPrevPageReducer, ticketPrevPageAction],
  [ticketDetailReceivedReducer, ticketDetailReceivedAction],
  [ticketDetailResetReducer, ticketDetailResetAction],
  [ticketDetailsWithNoMessagesReducer, ticketDetailsWithNoMessagesAction],
  [storeNewTicketMessageReducer, storeNewTicketMessageAction],
  [ticketUnreadCounterReceivedReducer, ticketsUnreadCounterReceivedAction],
]);

export { ticketRootReducer };
