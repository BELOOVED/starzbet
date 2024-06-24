import { createFormFieldPaths, field, type TFieldDefs } from "@sb/form-new";
import { call_PaycentMakeFiatDepositCommand } from "@sb/sdk/SDKClient/paymentintegration";
import { getDepositFormConfig } from "../DepositFormConfig";
import { depositFormStoreLink } from "../DepositFormStoreLink";
import { type TPaycentFormModel } from "./PaycentFormModel";
import { depositPaycentCallPayloadSelector } from "./PaycentFormSelectors";

const PAYCENT_FORM_FIELDS: TFieldDefs<keyof TPaycentFormModel> = {
  bic: field(),
};

const PAYCENT_FORM_FIELD_PATHS = createFormFieldPaths(PAYCENT_FORM_FIELDS);

const PAYCENT_FORM_CONFIG = getDepositFormConfig({
  fields: PAYCENT_FORM_FIELDS,

  callPair: [call_PaycentMakeFiatDepositCommand, depositPaycentCallPayloadSelector],

  onSuccess: depositFormStoreLink,
});

export {
  PAYCENT_FORM_FIELD_PATHS,

  PAYCENT_FORM_CONFIG,
};
