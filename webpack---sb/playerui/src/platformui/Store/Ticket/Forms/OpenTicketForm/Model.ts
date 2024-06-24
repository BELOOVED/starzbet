import { createFormFieldPaths, field, type TFieldDefs, withValidation } from "@sb/form-new";
import { fileField, filesUploadingSucceededValidator, type TFileFieldValue } from "@sb/file-service-extension";
import { type TTicketDepartment } from "@sb/sdk/platform/ticket/core/model/TicketDepartment";
import { formMaxWidthValidation, formRequiredValidation } from "../../../Form/Utils/FormValidations";

type TOpenTicketForm = {
  subject: string;
  department: TTicketDepartment;
  text: string;
  attachedFiles?: Partial<TFileFieldValue>;
}

const OPEN_TICKET_FORM_FIELDS: TFieldDefs<keyof TOpenTicketForm> = {
  subject: field({
    extensions: withValidation(
      formRequiredValidation(),
      formMaxWidthValidation(undefined, 100),
    ),
  }),
  department: field({
    extensions: withValidation(formRequiredValidation()),
  }),
  text: field({
    extensions: withValidation(formRequiredValidation()),
  }),
  attachedFiles: fileField(
    {
      extensions: withValidation(filesUploadingSucceededValidator()),
    },
  ),
};

const OPEN_TICKET_FORM_PATH = createFormFieldPaths(OPEN_TICKET_FORM_FIELDS);

const OPEN_TICKET_FORM_NAME = "openTicket";

const TICKET_FILE_MAX_SIZE = 10485760;

export {
  OPEN_TICKET_FORM_PATH,
  OPEN_TICKET_FORM_FIELDS,
  OPEN_TICKET_FORM_NAME,
  TICKET_FILE_MAX_SIZE,
};
export type { TOpenTicketForm };
