import { createForm, form, submittingExtension, validationExtension } from "@sb/form-new";
import { fileExtensionFactory } from "@sb/file-service-extension";
import type { TPlatformAppState } from "../../../PlatformInitialState";
import { OPEN_TICKET_FORM_FIELDS, OPEN_TICKET_FORM_NAME } from "./Model";
import { openTicketSubmitEpic } from "./Epics/OpenTicketSubmitEpic";

const OPEN_TICKET_FORM_CONFIG = createForm<TPlatformAppState>({
  extensions: [validationExtension, submittingExtension, fileExtensionFactory(OPEN_TICKET_FORM_NAME)],
  form: form({
    fields: OPEN_TICKET_FORM_FIELDS,
  }),
  epics: [openTicketSubmitEpic],
});

export { OPEN_TICKET_FORM_CONFIG };
