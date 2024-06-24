import { createFormFieldPaths, field, type TFieldDefs, withValidation } from "@sb/form-new";
import { formRequiredValidation } from "../../../Form/Utils/FormValidations";
import { type TPayRetailersBank } from "../../Models/PayRetailersBankModel";
import { type TPayRetailersAccountType } from "../../Models/PayRetailersAccountTypeModel";

type TPayRetailersPixFormModel = {
  pix: string;
}

const PAY_RETAILERS_PIX_FORM_FIELDS: TFieldDefs<keyof TPayRetailersPixFormModel> = {
  pix: field({
    extensions: withValidation(formRequiredValidation()),
  }),
};

const PAY_RETAILERS_PIX_FORM_FIELD_PATHS = createFormFieldPaths(PAY_RETAILERS_PIX_FORM_FIELDS);

type TPayRetailersBankFormModel = {
  abaSwift: string;
  accountAgencyNumber: string;
  accountNumber: string;
  bankCode: TPayRetailersBank;
  payoutAccountTypeCode: TPayRetailersAccountType;
}

const PAY_RETAILERS_BANK_FORM_FIELDS: TFieldDefs<keyof TPayRetailersBankFormModel> = {
  abaSwift: field(),
  accountAgencyNumber: field({
    extensions: withValidation(formRequiredValidation()),
  }),
  accountNumber: field({
    extensions: withValidation(formRequiredValidation()),
  }),
  bankCode: field({
    extensions: withValidation(formRequiredValidation()),
  }),
  payoutAccountTypeCode: field({
    extensions: withValidation(formRequiredValidation()),
  }),
};

const PAY_RETAILERS_BANK_FORM_FIELD_PATHS = createFormFieldPaths(PAY_RETAILERS_BANK_FORM_FIELDS);

export type { TPayRetailersPixFormModel, TPayRetailersBankFormModel };
export {
  PAY_RETAILERS_PIX_FORM_FIELDS,
  PAY_RETAILERS_PIX_FORM_FIELD_PATHS,

  PAY_RETAILERS_BANK_FORM_FIELDS,
  PAY_RETAILERS_BANK_FORM_FIELD_PATHS,
};
