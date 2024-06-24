import type { TPlatform_Reader_Fragment, TPlatform_Ticket_Fragment, TPlatform_TicketMessage_Fragment } from "@sb/graphql-client/PlayerUI";
import {
  type EPlatform_TicketDepartment,
  type EPlatform_TicketStatus,
  EPlatform_Typename,
  type TPageInfo_Fragment,
} from "@sb/graphql-client";
import { type IWithCursor } from "../Paginator/IWithCursor";

type TPlayerDepartment = Exclude<EPlatform_TicketDepartment, EPlatform_TicketDepartment.affiliate>;

type TPlayerTicket = {
  department: TPlayerDepartment;
  id: string;
  messages: TPlatform_TicketMessage_Fragment[];
  openedAt: number;
  status: EPlatform_TicketStatus;
  subject: string;
  readers: TPlatform_Reader_Fragment[];
}

interface ITicketState {
  nodes: TPlayerTicket[];
  pageInfo: TPageInfo_Fragment | undefined;
  variables: IWithCursor;
  detail: TPlatform_Ticket_Fragment | Record<string, never>;
  unreadCounter: number;
}

const detailTypeGuard = (detail: TPlatform_Ticket_Fragment | Record<string, never>): detail is TPlatform_Ticket_Fragment => {
  const typename: TPlatform_Ticket_Fragment["__typename"] = EPlatform_Typename.platformTicket;

  return detail.__typename === typename;
};

interface IWithTicketState {
  ticket: ITicketState;
}

const ticketInitialState: IWithTicketState = {
  ticket: {
    unreadCounter: 0,
    nodes: [],
    pageInfo: undefined,
    variables: {
      cursor: { first: 20 },
    },
    detail: {},
  },
};

export {
  ticketInitialState,
  detailTypeGuard,
  type IWithTicketState,
  type ITicketState,
  type TPlayerTicket,
  type TPlayerDepartment,
};
