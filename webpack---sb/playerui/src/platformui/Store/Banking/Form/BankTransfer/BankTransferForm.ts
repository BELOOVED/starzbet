import { createFormFieldPaths, field, type TFieldDefs, withValidation } from "@sb/form-new";
import { formRequiredValidation } from "../../../Form/Utils/FormValidations";
import { type TBankTransferFormModel } from "./BankTransferFormModel";

const BANK_TRANSFER_FORM_FIELDS: TFieldDefs<keyof TBankTransferFormModel> = {
  firstName: field({ extensions: withValidation(formRequiredValidation()) }),
  lastName: field({ extensions: withValidation(formRequiredValidation()) }),
  identityNumber: field({ extensions: withValidation(formRequiredValidation()) }),
  referenceId: field(),
  playerNote: field(),
};

const BANK_TRANSFER_FORM_FIELD_PATHS = createFormFieldPaths(BANK_TRANSFER_FORM_FIELDS);

export { BANK_TRANSFER_FORM_FIELDS, BANK_TRANSFER_FORM_FIELD_PATHS };
