import { EMoneyFormat, isArray, isEmpty, Money, omit, Time } from "@sb/utils";
import {
  platformui_deposit_error_currency_not_same,
  platformui_deposit_error_currency_not_supported,
  platformui_deposit_error_invalid_deposit_amount,
  platformui_deposit_error_player_is_not_session_owner,
  platformui_deposit_error_transaction_request_is_already_linked,
  platformui_deposit_error_validation_error_block_validation_error,
  platformui_deposit_error_validation_error_DAILY_AMOUNT_PER_PLAYER,
  platformui_deposit_error_validation_error_DAILY_COUNT_PER_PLAYER,
  platformui_deposit_error_validation_error_declinedByProvider,
  platformui_deposit_error_validation_error_MAX_AMOUNT_AT_ONCE,
  platformui_deposit_error_validation_error_max_deposit_validation_error,
  platformui_deposit_error_validation_error_MIN_AMOUNT_AT_ONCE,
  platformui_deposit_error_validation_error_min_deposit_validation_error,
  platformui_deposit_error_validation_error_MONTHLY_AMOUNT_PER_PLAYER,
  platformui_deposit_error_validation_error_MONTHLY_COUNT_PER_PLAYER,
  platformui_deposit_error_validation_error_muchBetter_declined,
  platformui_deposit_error_validation_error_PENDING_COUNT_PER_PLAYER,
  platformui_deposit_error_validation_error_selfProtection,
  platformui_deposit_error_validation_error_TOTAL_AMOUNT_PER_PLAYER,
  platformui_deposit_error_validation_error_TOTAL_COUNT_PER_PLAYER,
  platformui_payment_error_error_customer_field_required,
  platformui_payment_error_error_is_not_pix_key_owner,
  platformui_payment_error_validation_error_declined,
  platformui_payment_error_validation_error_not_enough_money,
  platformui_withdraw_error_fw_limit_exceeded,
  platformui_withdraw_error_maximum_withdrawal_exceeded,
  platformui_withdraw_error_origin_deposit_for_fw_not_found,
  platformui_withdraw_error_validation_error_block_validation_error,
  platformui_withdraw_error_validation_error_DAILY_AMOUNT_PER_PLAYER,
  platformui_withdraw_error_validation_error_DAILY_COUNT_PER_PLAYER,
  platformui_withdraw_error_validation_error_declinedByProvider,
  platformui_withdraw_error_validation_error_forbiddenDuringActiveBonus,
  platformui_withdraw_error_validation_error_MAX_AMOUNT_AT_ONCE,
  platformui_withdraw_error_validation_error_MIN_AMOUNT_AT_ONCE,
  platformui_withdraw_error_validation_error_MONTHLY_AMOUNT_PER_PLAYER,
  platformui_withdraw_error_validation_error_MONTHLY_COUNT_PER_PLAYER,
  platformui_withdraw_error_validation_error_PENDING_COUNT_PER_PLAYER,
  platformui_withdraw_error_validation_error_TIME_INTERVAL_AFTER_DEPOSIT,
  platformui_withdraw_error_validation_error_TIME_INTERVAL_AFTER_WITHDRAWAL,
  platformui_withdraw_error_validation_error_TOTAL_AMOUNT_PER_PLAYER,
  platformui_withdraw_error_validation_error_TOTAL_COUNT_PER_PLAYER,
  type TCommonTKeys,
} from "@sb/translates/platformui/CommonTKeys";
import { path, type TPath } from "@sb/utils/Path";
import { EPlatform_PaymentLimitType, EPlatform_SelfProtectionBagType } from "@sb/graphql-client";
import { type IOptions } from "@sb/translator";
import { type IError } from "@sb/network-bus/Model";
import { EFormTypes } from "../../Form/Model/EFormTypes";
import { DEPOSIT_FORM, WITHDRAW_FORM } from "./Variables";
import {
  asserPaymentLimitErrorContextValue,
  asserPaymentLimitTimeLimitError,
  assertPaymentLimit,
  isPaymentFormType,
  isPaymentMoneyLimit,
  isPaymentTimeIntervalLimit,
  type TPaymentFormType,
} from "./PaymentFormLimitTypeGuards";

const PAYMENT_ERROR_CODES_MAP = {
  payment_management__payment_limit_validation_validation_error: "payment_management__payment_limit_validation.validation_error",
  payment_management__payment_limit_origin_deposit_for_fw_not_found: "payment_management__payment_limit.origin_deposit_for_fw_not_found",
  payment_management__payment_limit_fw_limit_exceeded: "payment_management__payment_limit.fw_limit_exceeded",
  payment_management__withdrawal_exception_withdrawal_is_forbidden_during_active_bonus: "payment_management__withdrawal_exception.withdrawal_is_forbidden_during_active_bonus",
  kolay_pay_currency_not_supported: "kolay_pay.currency_not_supported",
  kolay_pay_player_is_not_session_owner: "kolay_pay.player_is_not_session_owner",
  kolay_pay_invalid_deposit_amount: "kolay_pay.invalid_deposit_amount",
  kolay_pay_transaction_request_is_already_linked: "kolay_pay.transaction_request_is_already_linked",
  bank_transfer_currency_not_same: "bank_transfer.currency_not_same",
  bank_transfer_maximum_withdrawal_exceeded: "bank_transfer.maximum_withdrawal_exceeded",
  bank_transfer_max_deposit: "bank_transfer.max_deposit_validation_error",
  bank_transfer_min_deposit: "bank_transfer.min_deposit_validation_error",
  block_validation_error: "block.validation_error",
  payment_declined: "payment.declined",
  wallet_not_enough_money: "wallet.not_enough_money",
  selfprotection_exception: "selfprotection.exception",

  fixfin_deposit_declined: "fixfin.deposit_declined",
  fixfin_withdrawal_declined: "fixfin.withdrawal_declined",

  muchbetter_deposit_failed_on_much_better_side: "muchbetter.deposit_failed_on_much_better_side",
  an_space_pay_provider_error: "an_space_pay.provider_error",

  kolay_pay_approve_deposit_request_failed: "kolay_pay.approve_deposit_request_failed",

  pay_retailers_unexpected_provider_error: "pay_retailers.unexpected_provider_error",
  pay_retailers_provider_error: "pay_retailers.provider_error",
  pay_retailers_authorization_error: "pay_retailers.authorization_error",
  pay_retailers_create_transaction_error: "pay_retailers.create_transaction_error",

  pay_retailers_customer_creation_error: "pay_retailers.customer_creation_error",
  vpag_customer_creation_error: "vpag.customer_creation_error",
  an_space_pay_customer_creation_error: "an_space_pay.customer_creation_error",
  an_space_pay_authentication_error: "an_space_pay.authentication_error",
  an_space_pay_unexpected_provider_error: "an_space_pay.unexpected_provider_error",
  an_space_pay_is_not_pix_key_owner: "an_space_pay.is_not_pix_key_owner",

  fix_fin_vevo_parazula_custom_error: "fix_fin_vevo_parazula_custom_error",
};

const BANKING_ERROR_CODES_ARR = Object.values(PAYMENT_ERROR_CODES_MAP);

const paymentLimitTranslateMap: Record<TPaymentFormType, Partial<Record<EPlatform_PaymentLimitType, TCommonTKeys>>> = {
  [DEPOSIT_FORM]: {
    [EPlatform_PaymentLimitType.minAmountAtOnce]: platformui_deposit_error_validation_error_MIN_AMOUNT_AT_ONCE,
    [EPlatform_PaymentLimitType.maxAmountAtOnce]: platformui_deposit_error_validation_error_MAX_AMOUNT_AT_ONCE,
    [EPlatform_PaymentLimitType.dailyAmountPerPlayer]: platformui_deposit_error_validation_error_DAILY_AMOUNT_PER_PLAYER,
    [EPlatform_PaymentLimitType.monthlyAmountPerPlayer]: platformui_deposit_error_validation_error_MONTHLY_AMOUNT_PER_PLAYER,
    [EPlatform_PaymentLimitType.totalAmountPerPlayer]: platformui_deposit_error_validation_error_TOTAL_AMOUNT_PER_PLAYER,
    [EPlatform_PaymentLimitType.dailyCountPerPlayer]: platformui_deposit_error_validation_error_DAILY_COUNT_PER_PLAYER,
    [EPlatform_PaymentLimitType.monthlyCountPerPlayer]: platformui_deposit_error_validation_error_MONTHLY_COUNT_PER_PLAYER,
    [EPlatform_PaymentLimitType.totalCountPerPlayer]: platformui_deposit_error_validation_error_TOTAL_COUNT_PER_PLAYER,
    [EPlatform_PaymentLimitType.pendingCountPerPlayer]: platformui_deposit_error_validation_error_PENDING_COUNT_PER_PLAYER,
  },
  [WITHDRAW_FORM]: {
    [EPlatform_PaymentLimitType.minAmountAtOnce]: platformui_withdraw_error_validation_error_MIN_AMOUNT_AT_ONCE,
    [EPlatform_PaymentLimitType.maxAmountAtOnce]: platformui_withdraw_error_validation_error_MAX_AMOUNT_AT_ONCE,
    [EPlatform_PaymentLimitType.dailyAmountPerPlayer]: platformui_withdraw_error_validation_error_DAILY_AMOUNT_PER_PLAYER,
    [EPlatform_PaymentLimitType.monthlyAmountPerPlayer]: platformui_withdraw_error_validation_error_MONTHLY_AMOUNT_PER_PLAYER,
    [EPlatform_PaymentLimitType.totalAmountPerPlayer]: platformui_withdraw_error_validation_error_TOTAL_AMOUNT_PER_PLAYER,
    [EPlatform_PaymentLimitType.dailyCountPerPlayer]: platformui_withdraw_error_validation_error_DAILY_COUNT_PER_PLAYER,
    [EPlatform_PaymentLimitType.monthlyCountPerPlayer]: platformui_withdraw_error_validation_error_MONTHLY_COUNT_PER_PLAYER,
    [EPlatform_PaymentLimitType.totalCountPerPlayer]: platformui_withdraw_error_validation_error_TOTAL_COUNT_PER_PLAYER,
    [EPlatform_PaymentLimitType.pendingCountPerPlayer]: platformui_withdraw_error_validation_error_PENDING_COUNT_PER_PLAYER,
    [EPlatform_PaymentLimitType.timeIntervalAfterDeposit]: platformui_withdraw_error_validation_error_TIME_INTERVAL_AFTER_DEPOSIT,
    [EPlatform_PaymentLimitType.timeIntervalAfterWithdrawal]: platformui_withdraw_error_validation_error_TIME_INTERVAL_AFTER_WITHDRAWAL,
  },
};

const commonTranslateMap = {
  [PAYMENT_ERROR_CODES_MAP.kolay_pay_currency_not_supported]: platformui_deposit_error_currency_not_supported,
  [PAYMENT_ERROR_CODES_MAP.kolay_pay_player_is_not_session_owner]: platformui_deposit_error_player_is_not_session_owner,
  [PAYMENT_ERROR_CODES_MAP.kolay_pay_invalid_deposit_amount]: platformui_deposit_error_invalid_deposit_amount,
  [PAYMENT_ERROR_CODES_MAP.kolay_pay_transaction_request_is_already_linked]: platformui_deposit_error_transaction_request_is_already_linked,
  [PAYMENT_ERROR_CODES_MAP.bank_transfer_currency_not_same]: platformui_deposit_error_currency_not_same,
  [PAYMENT_ERROR_CODES_MAP.bank_transfer_maximum_withdrawal_exceeded]: platformui_withdraw_error_maximum_withdrawal_exceeded,
  [PAYMENT_ERROR_CODES_MAP.payment_declined]: platformui_payment_error_validation_error_declined,
  [PAYMENT_ERROR_CODES_MAP.payment_management__payment_limit_origin_deposit_for_fw_not_found]:
  platformui_withdraw_error_origin_deposit_for_fw_not_found,
  [PAYMENT_ERROR_CODES_MAP.fixfin_deposit_declined]: platformui_deposit_error_validation_error_declinedByProvider,
  [PAYMENT_ERROR_CODES_MAP.kolay_pay_approve_deposit_request_failed]: platformui_deposit_error_validation_error_declinedByProvider,
  [PAYMENT_ERROR_CODES_MAP.fixfin_withdrawal_declined]: platformui_withdraw_error_validation_error_declinedByProvider,
  [PAYMENT_ERROR_CODES_MAP.muchbetter_deposit_failed_on_much_better_side]: platformui_deposit_error_validation_error_muchBetter_declined,
  [PAYMENT_ERROR_CODES_MAP.wallet_not_enough_money]: platformui_payment_error_validation_error_not_enough_money,
  [PAYMENT_ERROR_CODES_MAP.pay_retailers_unexpected_provider_error]: platformui_deposit_error_validation_error_declinedByProvider,
  [PAYMENT_ERROR_CODES_MAP.pay_retailers_provider_error]: platformui_deposit_error_validation_error_declinedByProvider,
  [PAYMENT_ERROR_CODES_MAP.pay_retailers_authorization_error]: platformui_deposit_error_validation_error_declinedByProvider,
  [PAYMENT_ERROR_CODES_MAP.pay_retailers_create_transaction_error]: platformui_deposit_error_validation_error_declinedByProvider,
  [PAYMENT_ERROR_CODES_MAP.an_space_pay_provider_error]: platformui_deposit_error_validation_error_declinedByProvider,
  [PAYMENT_ERROR_CODES_MAP.an_space_pay_authentication_error]: platformui_deposit_error_validation_error_declinedByProvider,
  [PAYMENT_ERROR_CODES_MAP.an_space_pay_unexpected_provider_error]: platformui_deposit_error_validation_error_declinedByProvider,
  [PAYMENT_ERROR_CODES_MAP.an_space_pay_is_not_pix_key_owner]: platformui_payment_error_error_is_not_pix_key_owner,
};

const customerFieldRequiredErrors = [
  PAYMENT_ERROR_CODES_MAP.vpag_customer_creation_error,
  PAYMENT_ERROR_CODES_MAP.pay_retailers_customer_creation_error,
  PAYMENT_ERROR_CODES_MAP.an_space_pay_customer_creation_error,
];

type TBankingFormError = {
  error: string;
  option?: IOptions;
}

const getMoneyError = (error: IError, pathToMoneyValue: TPath, tKey: TCommonTKeys) => {
  const value = path(pathToMoneyValue, error);

  if (Money.isMoney(value)) {
    return {
      error: tKey,
      option: { value: Money.toFormat(value, EMoneyFormat.symbolRight) },
    };
  }

  return {
    error: "Unexpected error",
  };
};

const getDurationFromSeconds = (seconds: number) => {
  const duration = Time.intervalToDuration(0, seconds * 1000);
  const durationWithoutSeconds = omit(["seconds"], duration);

  /**
   * 1h 30m 20s -> 1h 30m
   * 10s -> 10s
   */
  const durationRounded = isEmpty(durationWithoutSeconds)
    ? duration
    : durationWithoutSeconds;

  return Time.formatDuration(durationRounded);
};

const bankingExtractFormError = (formType: string) => {
  if (!isPaymentFormType(formType)) {
    throw new Error(`[bankingExtractFormError]: Unexpected form type ${formType}`);
  }

  return (error: IError): TBankingFormError => {
    if (error.code === PAYMENT_ERROR_CODES_MAP.payment_management__payment_limit_validation_validation_error) {
      asserPaymentLimitErrorContextValue(error, "limit");

      const errorLimit = error.context.limit;

      assertPaymentLimit(errorLimit);

      const tKey = paymentLimitTranslateMap[formType][errorLimit];

      if (tKey) {
        asserPaymentLimitErrorContextValue(error, "rule");
        const errorRule = error.context.rule;

        if (isPaymentMoneyLimit(errorLimit)) {
          return getMoneyError(
            error,
            ["context", "rule", "money"],
            tKey,
          );
        }

        if (isPaymentTimeIntervalLimit(errorLimit)) {
          asserPaymentLimitTimeLimitError(error);

          return {
            error: tKey,
            option: { value: getDurationFromSeconds(error.context.rule.time) },
          };
        }
        const value = path(["count"], errorRule);

        return {
          error: tKey,
          option: { value: value },
        };
      }
    }

    if (error.code === PAYMENT_ERROR_CODES_MAP.payment_management__withdrawal_exception_withdrawal_is_forbidden_during_active_bonus) {
      asserPaymentLimitErrorContextValue(error, "activatedPlayerBonusNames");

      const activatedPlayerBonusNames = error.context.activatedPlayerBonusNames;

      if (isArray(activatedPlayerBonusNames)) {
        return {
          error: platformui_withdraw_error_validation_error_forbiddenDuringActiveBonus,
          option: {
            value: activatedPlayerBonusNames.join(", "),
          },
        };
      }
    }

    if (error.code === PAYMENT_ERROR_CODES_MAP.bank_transfer_max_deposit) {
      return getMoneyError(
        error,
        ["context", "maxDeposit"],
        platformui_deposit_error_validation_error_max_deposit_validation_error,
      );
    }

    if (error.code === PAYMENT_ERROR_CODES_MAP.bank_transfer_min_deposit) {
      return getMoneyError(
        error,
        ["context", "minDeposit"],
        platformui_deposit_error_validation_error_min_deposit_validation_error,
      );
    }

    if (error.code === PAYMENT_ERROR_CODES_MAP.payment_management__payment_limit_fw_limit_exceeded) {
      return getMoneyError(
        error,
        ["context", "availableWithdrawalAmount"],
        platformui_withdraw_error_fw_limit_exceeded,
      );
    }

    if (error.code === PAYMENT_ERROR_CODES_MAP.selfprotection_exception) {
      const bagType = path(["context", "bagType"], error);

      if (bagType === EPlatform_SelfProtectionBagType.maxDepositBag) {
        return getMoneyError(
          error,
          ["context", "value"],
          platformui_deposit_error_validation_error_selfProtection,
        );
      }
    }

    if (error.code === PAYMENT_ERROR_CODES_MAP.block_validation_error) {
      return formType === EFormTypes.depositForm
        ? { error: platformui_deposit_error_validation_error_block_validation_error }
        : { error: platformui_withdraw_error_validation_error_block_validation_error };
    }

    if (customerFieldRequiredErrors.some((it) => it === error.code)) {
      asserPaymentLimitErrorContextValue(error, "fieldName");

      return {
        error: platformui_payment_error_error_customer_field_required,
        option: {
          value: error.context.fieldName,
        },
      };
    }

    if (error.code === PAYMENT_ERROR_CODES_MAP.fix_fin_vevo_parazula_custom_error) {
      return {
        error: error.message,
      };
    }

    return {
      error: commonTranslateMap[error.code] || "Unexpected error",
    };
  };
};

const bankingFormErrorFunction = (formName: string, error: IError) =>
  bankingExtractFormError(formName)(error);

export {
  bankingExtractFormError,
  bankingFormErrorFunction,
  BANKING_ERROR_CODES_ARR,
  PAYMENT_ERROR_CODES_MAP,
  type TBankingFormError,
};
