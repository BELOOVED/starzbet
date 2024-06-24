import { type IMoney } from "@sb/utils";
import { createFormFieldPaths, field, objectField, type TFieldDefs, type TSyncValidator, withValidation } from "@sb/form-new";
import {
  platformui_depositValidate_error_maxAmount,
  platformui_depositValidate_error_minAmount,
} from "@sb/translates/platformui/CommonTKeys";
import {
  FORM_MONEY_VALIDATION_IN_RANGE,
  formEmailValidation,
  formRequiredValidation,
  notZeroMoneyValidator,
} from "../../Form/Utils/FormValidations";
import { type TPlatformAppState } from "../../PlatformInitialState";
import {
  paymentMethodMaxPaymentAmountSelector,
  paymentMethodMinPaymentAmountSelector,
  platformBankingDepositPaymentMethodNonNullableSelector,
} from "../Selectors/PlatformBankingSelectors";

type TWithAmountFormModel = {
  amount: IMoney;
}

type TWithPlayerPaymentAccountFormModel = {
  playerPaymentAccountId: string;
}

const PLAYER_PAYMENT_ACCOUNT_FORM_FIELDS: TFieldDefs<keyof TWithPlayerPaymentAccountFormModel> = {
  playerPaymentAccountId: field({
    extensions: withValidation(formRequiredValidation()),
  }),
};

const PLAYER_PAYMENT_ACCOUNT_FORM_FIELD_PATHS = createFormFieldPaths(PLAYER_PAYMENT_ACCOUNT_FORM_FIELDS);

type TWithPlayerNoteFormModel = {
  playerNote?: string;
}

const PLAYER_NOTE_FORM_FIELDS: TFieldDefs<keyof TWithPlayerNoteFormModel> = {
  playerNote: field(),
};

const PLAYER_NOTE_FORM_FIELD_PATHS = createFormFieldPaths(PLAYER_NOTE_FORM_FIELDS);

type TWithEmailFormModel = {
  email: string;
}

const EMAIL_FORM_FIELDS: TFieldDefs<keyof TWithEmailFormModel> = {
  email: field({
    extensions: withValidation(formRequiredValidation(), formEmailValidation()),
  }),
};
const EMAIL_FORM_FIELD_PATHS = createFormFieldPaths(EMAIL_FORM_FIELDS);

type TWithDepositPromotionBonusFormModel = {
  depositPromotionBonusId?: string;
}

/** Deposit form **/

const moneyRangeValidator: TSyncValidator<IMoney, TPlatformAppState> = (value, _, __, state) => {
  const paymentMethod = platformBankingDepositPaymentMethodNonNullableSelector(state);

  const min = paymentMethodMinPaymentAmountSelector(state, paymentMethod);
  const max = paymentMethodMaxPaymentAmountSelector(state, paymentMethod);

  return FORM_MONEY_VALIDATION_IN_RANGE(
    min,
    max,
    (value) => ({ tKey: platformui_depositValidate_error_minAmount, options: { value } }),
    (value) => ({ tKey: platformui_depositValidate_error_maxAmount, options: { value } }),
    value,
  );
};

type TDepositBaseFormModel = TWithDepositPromotionBonusFormModel & TWithAmountFormModel

const DEPOSIT_BASE_FIELDS: TFieldDefs<keyof TDepositBaseFormModel> = {
  amount: objectField({
    extensions: withValidation(
      formRequiredValidation(),
      notZeroMoneyValidator,
      moneyRangeValidator,
    ),
  }),
  depositPromotionBonusId: field(),
};

const DEPOSIT_BASE_FIELD_PATHS = createFormFieldPaths(DEPOSIT_BASE_FIELDS);

export type {
  TWithAmountFormModel,

  TWithPlayerPaymentAccountFormModel,
  TWithPlayerNoteFormModel,

  TWithEmailFormModel,

  TDepositBaseFormModel,
};
export {
  PLAYER_PAYMENT_ACCOUNT_FORM_FIELDS,
  PLAYER_PAYMENT_ACCOUNT_FORM_FIELD_PATHS,

  PLAYER_NOTE_FORM_FIELDS,
  PLAYER_NOTE_FORM_FIELD_PATHS,

  EMAIL_FORM_FIELD_PATHS,
  EMAIL_FORM_FIELDS,

  DEPOSIT_BASE_FIELDS,
  DEPOSIT_BASE_FIELD_PATHS,
};
