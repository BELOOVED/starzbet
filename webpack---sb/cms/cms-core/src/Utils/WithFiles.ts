import { filesUploadingSucceededValidator, withFiles } from "@sb/file-service-extension";
import { withValidation } from "@sb/form-new";
import { requiredValidator } from "../CMSValidations";

const fileExtensions = (required: boolean) => required
  ? { ...withValidation(requiredValidator(), filesUploadingSucceededValidator()), ...withFiles() }
  : { ...withValidation(filesUploadingSucceededValidator()), ...withFiles() };

export { fileExtensions };
