import { mountUnmountFormEpicFactory } from "@sb/form-new";
import { OPEN_TICKET_FORM_NAME } from "../Model";
import { OPEN_TICKET_FORM_CONFIG } from "../OpenTicketFormConfig";

const openTicketFormEpic = mountUnmountFormEpicFactory(
  () => true,
  OPEN_TICKET_FORM_NAME,
  OPEN_TICKET_FORM_CONFIG,
);

export { openTicketFormEpic };
