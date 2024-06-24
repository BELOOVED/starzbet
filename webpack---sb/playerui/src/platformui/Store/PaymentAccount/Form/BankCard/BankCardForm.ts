import { createFormFieldPaths, field, type TFieldDefs, withValidation } from "@sb/form-new";
import { formRequiredValidation } from "../../../Form/Utils/FormValidations";
import { type TBankCardFormModel } from "./BankCardFormModel";

const BANK_CARD_FORM_FIELDS: TFieldDefs<keyof TBankCardFormModel> = {
  cardHolderName: field({ extensions: withValidation(formRequiredValidation()) }),
  cardNumber: field({ extensions: withValidation(formRequiredValidation()) }),
  expiryDate: field({ extensions: withValidation(formRequiredValidation()) }),
  addressLine1: field({ extensions: withValidation(formRequiredValidation()) }),
  addressLine2: field({ extensions: withValidation(formRequiredValidation()) }),
  city: field({ extensions: withValidation(formRequiredValidation()) }),
  countryId: field({ extensions: withValidation(formRequiredValidation()) }),
  postcode: field({ extensions: withValidation(formRequiredValidation()) }),
  region: field(),
};

const BANK_CARD_FORM_FIELD_PATH = createFormFieldPaths(BANK_CARD_FORM_FIELDS);

export {
  BANK_CARD_FORM_FIELDS,
  BANK_CARD_FORM_FIELD_PATH,
};
