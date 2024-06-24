import {
  platformui_withdraw_swift_tabMethod_baseForm,
  platformui_withdraw_swift_tabMethod_paymentAccount,
  type TCommonTKeys,
} from "@sb/translates/platformui/CommonTKeys";
import { createFormFieldPaths, field, form, oneOf, selectFieldValue, type TFieldDefs, type TResolver, withValidation } from "@sb/form-new";
import { formRequiredValidation } from "../../../Form/Utils/FormValidations";

/**
 * One IO SEPA
 */
type TOneSEPAFormModel = {
  name: string;
}

const ONE_SEPA_FORM_FIELDS: TFieldDefs<keyof TOneSEPAFormModel> = {
  name: field({
    extensions: withValidation(formRequiredValidation()),
  }),
};

const ONE_SEPA_FORM_FIELD_PATHS = createFormFieldPaths(ONE_SEPA_FORM_FIELDS);

/**
 * One IO SWIFT
 */
enum EOneSWIFTFormType {
  paymentAccount = "paymentAccount",
  base = "base",
}

const ONE_SWIFT_FORM_TYPE_TABS = Object.values(EOneSWIFTFormType);

const ONE_SWIFT_TAB_TRANSLATE_MAP: Record<EOneSWIFTFormType, TCommonTKeys> = {
  [EOneSWIFTFormType.paymentAccount]: platformui_withdraw_swift_tabMethod_paymentAccount,
  [EOneSWIFTFormType.base]: platformui_withdraw_swift_tabMethod_baseForm,
};

const isOneSWIFTPaymentAccountForm = (formType: EOneSWIFTFormType | undefined) =>
  formType === EOneSWIFTFormType.paymentAccount;

type TOneSWIFTPaymentAccountFormModel = {
  formType: EOneSWIFTFormType.paymentAccount;
  details: {
    playerPaymentAccountId: string;
    name: string;
  };
}

type TOneSWIFTBaseFormModel = {
  formType: EOneSWIFTFormType.base;
  details: {
    accountNumber: string;
    bic: string;
    name: string;
  };
}

type TOneSWIFTFormModel = (TOneSWIFTPaymentAccountFormModel | TOneSWIFTBaseFormModel);

const resolver: TResolver = (_, __, formName, state) =>
  selectFieldValue<EOneSWIFTFormType>(state, formName, ONE_SWIFT_FORM_FIELD_PATHS.formType);

const ONE_SWIFT_FORM_FIELDS: TFieldDefs<
  keyof TOneSWIFTFormModel
> = {
  formType: field(),

  details: oneOf({
    fields: {
      [EOneSWIFTFormType.paymentAccount]: form({
        fields: {
          // PaymentAccount form
          playerPaymentAccountId: field({
            extensions: withValidation(formRequiredValidation()),
          }),

          name: field({
            extensions: withValidation(formRequiredValidation()),
          }),
        },
      }),
      [EOneSWIFTFormType.base]: form({
        fields: {
          // Base form
          accountNumber: field({
            extensions: withValidation(formRequiredValidation()),
          }),
          bic: field({
            extensions: withValidation(formRequiredValidation()),
          }),

          name: field({
            extensions: withValidation(formRequiredValidation()),
          }),
        },
      }),
    },
    resolver: resolver,
  }),
};

const ONE_SWIFT_FORM_FIELD_PATHS = createFormFieldPaths(ONE_SWIFT_FORM_FIELDS);

const ONE_SWIFT_FORM_ACCOUNT_NUMBER_FIELD_PATH = ONE_SWIFT_FORM_FIELD_PATHS.details.concat(["accountNumber"]);
const ONE_SWIFT_FORM_BIC_FIELD_PATH = ONE_SWIFT_FORM_FIELD_PATHS.details.concat(["bic"]);
const ONE_SWIFT_FORM_NAME_FIELD_PATH = ONE_SWIFT_FORM_FIELD_PATHS.details.concat(["name"]);

export type {
  TOneSEPAFormModel,
  TOneSWIFTFormModel,
};
export {
  EOneSWIFTFormType,
  ONE_SWIFT_FORM_TYPE_TABS,
  ONE_SWIFT_TAB_TRANSLATE_MAP,
  isOneSWIFTPaymentAccountForm,

  ONE_SEPA_FORM_FIELDS,
  ONE_SEPA_FORM_FIELD_PATHS,

  ONE_SWIFT_FORM_FIELDS,
  ONE_SWIFT_FORM_FIELD_PATHS,
  ONE_SWIFT_FORM_ACCOUNT_NUMBER_FIELD_PATH,
  ONE_SWIFT_FORM_BIC_FIELD_PATH,
  ONE_SWIFT_FORM_NAME_FIELD_PATH,
};
