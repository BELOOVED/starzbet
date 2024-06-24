import { fileField, filesUploadingSucceededValidator, type TFileFieldValue } from "@sb/file-service-extension";
import { createFormFieldPaths, field, type TFieldDefs, withValidation } from "@sb/form-new";
import { formRequiredValidation } from "../../../Form/Utils/FormValidations";

type TTicketSendForm = {
  text: string;
  attachedFiles?: Partial<TFileFieldValue>;
  parentMessage?: string | null;
}

const TICKET_SEND_FORM_FIELDS: TFieldDefs<keyof TTicketSendForm> = {
  text: field({
    extensions: withValidation(formRequiredValidation()),
  }),
  attachedFiles: fileField(
    {
      extensions: withValidation(filesUploadingSucceededValidator()),
    },
  ),
  parentMessage: field(),
};

const TICKET_SEND_FORM_PATH = createFormFieldPaths(TICKET_SEND_FORM_FIELDS);

const TICKET_SEND_FORM_NAME = "ticketSend";

export { TICKET_SEND_FORM_PATH, TICKET_SEND_FORM_FIELDS, TICKET_SEND_FORM_NAME };
export type { TTicketSendForm };
