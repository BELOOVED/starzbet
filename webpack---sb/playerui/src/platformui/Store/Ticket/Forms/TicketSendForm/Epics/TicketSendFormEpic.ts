import { mountUnmountFormEpicFactory } from "@sb/form-new";
import { TICKET_SEND_FORM_NAME } from "../Model";
import { TICKET_SEND_FORM_CONFIG } from "../TicketSendFormConfig";

const ticketSendFormEpic = mountUnmountFormEpicFactory(
  () => true,
  TICKET_SEND_FORM_NAME,
  TICKET_SEND_FORM_CONFIG,
  {
    attachedFiles: {
      files: [],
    },
  },
);

export { ticketSendFormEpic };
