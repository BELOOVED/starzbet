import { EPlatform_TransactionRequestViewStatus, EPlatform_TransactionType } from "@sb/graphql-client";
import { getNotNil, isNil } from "@sb/utils";
import { isPayout } from "../../Transaction/Model/Transaction";
import { ETransactionRequestDisplayedStatusStep } from "../Model/TransactionRequestStepMap";

enum ETransactionRequestDisplayedStatusState {
  success = "success",
  failed = "failed",
  default = "default"
}

const TRANSACTION_REQUEST_PAIN_STEPS = [
  ETransactionRequestDisplayedStatusStep.received,
  ETransactionRequestDisplayedStatusStep.paid,
];

const TRANSACTION_REQUEST_PAYOUT_STEPS = [
  ETransactionRequestDisplayedStatusStep.received,
  ETransactionRequestDisplayedStatusStep.approved,
  ETransactionRequestDisplayedStatusStep.paid,
];

type TStepState = boolean | null;

const TRANSACTION_REQUEST_STATUS_MAP: Partial<Record<
  EPlatform_TransactionType,
  Partial<Record<EPlatform_TransactionRequestViewStatus, TStepState[]>>
>> = {
  [EPlatform_TransactionType.payin]: {
    [EPlatform_TransactionRequestViewStatus.pending]: [true, null],
    [EPlatform_TransactionRequestViewStatus.declinedByOperator]: [true, false],
    [EPlatform_TransactionRequestViewStatus.declinedBySystem]: [true, false],
    [EPlatform_TransactionRequestViewStatus.declinedByProvider]: [true, false],
    [EPlatform_TransactionRequestViewStatus.paid]: [true, true],
    // todo for old transaction requests (remove after migration on BE)
    [EPlatform_TransactionRequestViewStatus.fullApplied]: [true, true],
    [EPlatform_TransactionRequestViewStatus.canceledByPlayer]: [true, false],
  },
  [EPlatform_TransactionType.payout]: {
    [EPlatform_TransactionRequestViewStatus.pending]: [true, null, null],
    [EPlatform_TransactionRequestViewStatus.canceledByPlayer]: [true, false, null],
    [EPlatform_TransactionRequestViewStatus.declinedByOperator]: [true, false, null],
    [EPlatform_TransactionRequestViewStatus.declinedByProvider]: [true, true, false],
    [EPlatform_TransactionRequestViewStatus.declinedBySystem]: [true, true, false],
    [EPlatform_TransactionRequestViewStatus.approved]: [true, true, null],
    [EPlatform_TransactionRequestViewStatus.fullApplied]: [true, true, null],
    [EPlatform_TransactionRequestViewStatus.partialApplied]: [true, true, null],
    [EPlatform_TransactionRequestViewStatus.paid]: [true, true, true],
  },
};

const getStateByStep = (state: TStepState): ETransactionRequestDisplayedStatusState => {
  if (isNil(state)) {
    return ETransactionRequestDisplayedStatusState.default;
  }

  return state
    ? ETransactionRequestDisplayedStatusState.success
    : ETransactionRequestDisplayedStatusState.failed;
};

type TTransactionRequestStepModel = {
  step: ETransactionRequestDisplayedStatusStep;
  state: ETransactionRequestDisplayedStatusState;
}

const getStepModel = (
  steps: ETransactionRequestDisplayedStatusStep[],
  transactionType: EPlatform_TransactionType,
  viewStatus: EPlatform_TransactionRequestViewStatus,
) => steps.map((step, idx) => {
  const stateValue = getNotNil(
    getNotNil(
      TRANSACTION_REQUEST_STATUS_MAP[transactionType],
      ["getTransactionRequestStepsByStatus", "getStepModel"],
      "TRANSACTION_REQUEST_STATUS_MAP[transactionType]",
    )[viewStatus],
    ["getTransactionRequestStepsByStatus", "getStepModel"],
    "TRANSACTION_REQUEST_STATUS_MAP[transactionType][viewStatus]",
  )[idx];

  if (stateValue === undefined) {
    throw new Error("Unexpected nil value getTransactionRequestStepsByStatus:PAYOUT_STATE[viewStatus][idx]");
  }

  return {
    step,
    state: getStateByStep(stateValue),
  };
});

const getTransactionRequestStepsByStatus = (
  transactionType: EPlatform_TransactionType,
  viewStatus: EPlatform_TransactionRequestViewStatus,
) => getStepModel(
  isPayout(transactionType)
    ? TRANSACTION_REQUEST_PAYOUT_STEPS
    : TRANSACTION_REQUEST_PAIN_STEPS,
  transactionType,
  viewStatus,
);

type TStep = {
  step: ETransactionRequestDisplayedStatusStep;
  state: ETransactionRequestDisplayedStatusState;
}

const isNotEmptyStep = (step: TStep): step is TStatus =>
  step.state !== ETransactionRequestDisplayedStatusState.default;

type TTransactionRequestStatus = ETransactionRequestDisplayedStatusState.success | ETransactionRequestDisplayedStatusState.failed

type TStatus = {
  step: ETransactionRequestDisplayedStatusStep;
  state: TTransactionRequestStatus;
}

const getTransactionRequestStatus = (
  transactionType: EPlatform_TransactionType,
  viewStatus: EPlatform_TransactionRequestViewStatus,
): TStatus => {
  const steps = getTransactionRequestStepsByStatus(transactionType, viewStatus);

  const lastStatus = steps
    .reduceRight((prevValue, currentValue) => {
      if (!isNotEmptyStep(currentValue) || isNotEmptyStep(prevValue)) {
        return prevValue;
      }

      return currentValue;
    });

  if (!isNotEmptyStep(lastStatus)) {
    throw new Error("[getTransactionRequestStatus => lastStatus]: Unexpected empty status");
  }

  return lastStatus;
};

export type { TTransactionRequestStepModel, TTransactionRequestStatus };
export {
  ETransactionRequestDisplayedStatusState,
  getTransactionRequestStepsByStatus,
  getTransactionRequestStatus,
};
