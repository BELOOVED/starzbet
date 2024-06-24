import { createFormFieldPaths, field, type TFieldDefs, withValidation } from "@sb/form-new";
import { formRequiredValidation } from "../../Form/Utils/FormValidations";

type TWithPaymentAccountNameFormModel = {
  paymentAccountName: string;
}

const PAYMENT_ACCOUNT_NAME_FORM_FIELDS: TFieldDefs<keyof TWithPaymentAccountNameFormModel> = {
  paymentAccountName: field(),
};

const PAYMENT_ACCOUNT_NAME_FORM_FIELD_PATHS = createFormFieldPaths(PAYMENT_ACCOUNT_NAME_FORM_FIELDS);

type TWithPaymentAccountKindFormModel<V = string> = {
  accountKind: V;
}

const PAYMENT_ACCOUNT_KIND_FORM_FIELDS: TFieldDefs<keyof TWithPaymentAccountKindFormModel> = {
  accountKind: field({ extensions: withValidation(formRequiredValidation()) }),
};

const PAYMENT_ACCOUNT_KIND_FORM_FIELD_PATHS = createFormFieldPaths(PAYMENT_ACCOUNT_KIND_FORM_FIELDS);

export type { TWithPaymentAccountNameFormModel, TWithPaymentAccountKindFormModel };
export {
  PAYMENT_ACCOUNT_NAME_FORM_FIELDS,
  PAYMENT_ACCOUNT_NAME_FORM_FIELD_PATHS,

  PAYMENT_ACCOUNT_KIND_FORM_FIELDS,
  PAYMENT_ACCOUNT_KIND_FORM_FIELD_PATHS,
};
