import {
  platformui_ticket_department_account,
  platformui_ticket_department_bingo,
  platformui_ticket_department_casino,
  platformui_ticket_department_liveCasino,
  platformui_ticket_department_other,
  platformui_ticket_department_poker,
  platformui_ticket_department_sportBetting,
  platformui_ticket_status_closed,
  platformui_ticket_status_opened,
} from "@sb/translates/platformui/CommonTKeys";
import { EPlatform_TicketDepartment, EPlatform_TicketStatus } from "@sb/graphql-client";
import { createCallManagerSymbol } from "@sb/call-manager";
import { keys } from "@sb/utils/Keys";
import { type TPlayerDepartment } from "../TicketInitialState";

const ticketDepartmentTKeys: Record<TPlayerDepartment, string> = {
  [EPlatform_TicketDepartment.account]: platformui_ticket_department_account,
  [EPlatform_TicketDepartment.sportBetting]: platformui_ticket_department_sportBetting,
  [EPlatform_TicketDepartment.casino]: platformui_ticket_department_casino,
  [EPlatform_TicketDepartment.liveCasino]: platformui_ticket_department_liveCasino,
  [EPlatform_TicketDepartment.bingo]: platformui_ticket_department_bingo,
  [EPlatform_TicketDepartment.poker]: platformui_ticket_department_poker,
  [EPlatform_TicketDepartment.other]: platformui_ticket_department_other,
};

const ticketStatusTKeys = {
  [EPlatform_TicketStatus.opened]: platformui_ticket_status_opened,
  [EPlatform_TicketStatus.closed]: platformui_ticket_status_closed,
};

const TICKETS_OPEN_TICKET_SYMBOL = createCallManagerSymbol("TICKETS_OPEN_TICKET_SYMBOL");

const TICKETS_DEPARTMENT_LIST = keys(ticketDepartmentTKeys).map((value) => ({ value }));

export {
  ticketDepartmentTKeys,
  ticketStatusTKeys,
  TICKETS_OPEN_TICKET_SYMBOL,
  TICKETS_DEPARTMENT_LIST,
};
