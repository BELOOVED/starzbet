import { createFormFieldPaths, field, type TFieldDefs, withValidation } from "@sb/form-new";
import { formRequiredValidation } from "../../../Form/Utils/FormValidations";
import { type TEWalletFormModel } from "./EWalletFormModel";

const E_WALLET_FORM_FIELDS: TFieldDefs<keyof TEWalletFormModel> = {
  accountNumber: field({ extensions: withValidation(formRequiredValidation()) }),
};

const E_WALLET_FORM_FIELD_PATHS = createFormFieldPaths(E_WALLET_FORM_FIELDS);

export {
  E_WALLET_FORM_FIELDS,
  E_WALLET_FORM_FIELD_PATHS,
};
