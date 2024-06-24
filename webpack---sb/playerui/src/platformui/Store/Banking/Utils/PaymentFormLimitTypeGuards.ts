import { EPlatform_PaymentLimitType } from "@sb/graphql-client";
import { isNumber, isString, isUnknownObject, path, type TUnknownObject } from "@sb/utils";
import type { IError } from "@sb/network-bus/Model";
import { DEPOSIT_FORM, WITHDRAW_FORM } from "./Variables";

class UnexpectedError extends Error {
  constructor(candidate: IError, context: string) {
    super(`[${context}]: Unexpected error: ${JSON.stringify(candidate)}`);
    this.name = "Call Error";
  }
}

function assertsErrorWithContext(candidate: IError): asserts candidate is IError<TUnknownObject> {
  if (!isUnknownObject(candidate.context)) {
    throw new UnexpectedError(candidate, "assertsErrorWithContext");
  }
}

function asserPaymentLimitErrorContextValue<K extends string>(
  candidate: IError,
  key: K,
): asserts candidate is IError<Record<K, unknown>> {
  assertsErrorWithContext(candidate);

  if (!(key in candidate.context)) {
    throw new UnexpectedError(candidate, `assertPaymentLimitError => ${key}`);
  }
}

/**
 * Payment Limit
 */
const PAYMENT_LIMIT_LIST = Object.values(EPlatform_PaymentLimitType);

const isPaymentLimit = (candidate: unknown): candidate is EPlatform_PaymentLimitType =>
  isString(candidate) &&
  PAYMENT_LIMIT_LIST.some((it) => it === candidate);

function assertPaymentLimit(candidate: unknown): asserts candidate is EPlatform_PaymentLimitType {
  if (!isPaymentLimit(candidate)) {
    throw new Error(`[assertPaymentLimit]: Unexpected limit type: ${JSON.stringify(candidate)}`);
  }
}

const PAYMENT_MONEY_LIMIT_LIST = [
  EPlatform_PaymentLimitType.minAmountAtOnce,
  EPlatform_PaymentLimitType.maxAmountAtOnce,
  EPlatform_PaymentLimitType.dailyAmountPerPlayer,
  EPlatform_PaymentLimitType.monthlyAmountPerPlayer,
  EPlatform_PaymentLimitType.totalAmountPerPlayer,
];

const isPaymentMoneyLimit = (candidate: unknown): candidate is (typeof PAYMENT_MONEY_LIMIT_LIST[number]) =>
  isPaymentLimit(candidate) &&
  PAYMENT_MONEY_LIMIT_LIST.some((it) => it === candidate);

const PAYMENT_TIME_INTERVAL_LIMIT_LIST = [
  EPlatform_PaymentLimitType.timeIntervalAfterDeposit,
  EPlatform_PaymentLimitType.timeIntervalAfterWithdrawal,
];

const isPaymentTimeIntervalLimit = (candidate: unknown): candidate is (typeof PAYMENT_TIME_INTERVAL_LIMIT_LIST[number]) =>
  isPaymentLimit(candidate) &&
  PAYMENT_TIME_INTERVAL_LIMIT_LIST.some((it) => it === candidate);

function asserPaymentLimitTimeLimitError(candidate: IError): asserts candidate is IError<{ rule: { time: number; }; }> {
  const value = path(["context", "rule", "time"], candidate);

  if (!isNumber(value)) {
    throw new UnexpectedError(candidate, "asserPaymentLimitTimeLimitError");
  }
}

type TPaymentFormType = typeof DEPOSIT_FORM | typeof WITHDRAW_FORM

const isPaymentFormType = (formType: string): formType is TPaymentFormType => [DEPOSIT_FORM, WITHDRAW_FORM].includes(formType);

export type { TPaymentFormType };
export {
  asserPaymentLimitErrorContextValue,
  assertPaymentLimit,

  isPaymentMoneyLimit,

  isPaymentTimeIntervalLimit,
  asserPaymentLimitTimeLimitError,
  isPaymentFormType,
};
