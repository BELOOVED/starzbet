import { createForm, form, submittingExtension, validationExtension } from "@sb/form-new";
import { fileExtensionFactory } from "@sb/file-service-extension";
import type { TPlatformAppState } from "../../../PlatformInitialState";
import { TICKET_SEND_FORM_FIELDS, TICKET_SEND_FORM_NAME } from "./Model";
import { ticketSendSubmitEpic } from "./Epics/TicketSendSubmitEpic";

const TICKET_SEND_FORM_CONFIG = createForm<TPlatformAppState>({
  extensions: [validationExtension, submittingExtension, fileExtensionFactory(TICKET_SEND_FORM_NAME)],
  form: form({
    fields: TICKET_SEND_FORM_FIELDS,
  }),
  epics: [ticketSendSubmitEpic],
});

export { TICKET_SEND_FORM_CONFIG };
