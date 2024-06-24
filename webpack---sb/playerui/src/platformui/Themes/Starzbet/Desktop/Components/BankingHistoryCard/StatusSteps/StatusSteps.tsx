import clsx from "clsx";
import { type ComponentType, createElement, memo } from "react";
import { useTranslation } from "@sb/translator";
import { type EPlatform_TransactionRequestViewStatus, EPlatform_TransactionType } from "@sb/graphql-client";
import { withProps } from "@sb/utils";
import classes from "../BankingHistoryCard.module.css";
import {
  ETransactionRequestDisplayedStatusState,
  getTransactionRequestStepsByStatus,
  type TTransactionRequestStepModel,
} from "../../../../../../Store/TransactionRequests/Utils/GetTransactionRequestStepsByStatus";
import {
  ETransactionRequestDisplayedStatusStep,
  TRANSACTION_REQUEST_STEP_TRANSLATE_MAP,
} from "../../../../../../Store/TransactionRequests/Model/TransactionRequestStepMap";
import { RequestSuccessIcon } from "../../Icons/RequestSuccessIcon";
import { EmptyCircleIcon } from "../../Icons/EmptyCircleIcon";
import { DeclineIcon } from "../../Icons/DeclineIcon/DeclineIcon";

const SuccessIcon = withProps(RequestSuccessIcon)({ className: classes.successIcon });
const EmptyIcon = withProps(EmptyCircleIcon)({ width: 32, height: 32, className: classes.empty });

const stepStateToClassMap: Record<ETransactionRequestDisplayedStatusState, string | undefined> = {
  [ETransactionRequestDisplayedStatusState.success]: classes.success,
  [ETransactionRequestDisplayedStatusState.failed]: classes.failed,
  [ETransactionRequestDisplayedStatusState.default]: classes.default,
};

const stepToClassMap: Record<ETransactionRequestDisplayedStatusStep, string | undefined> = {
  [ETransactionRequestDisplayedStatusStep.received]: classes.received,
  [ETransactionRequestDisplayedStatusStep.approved]: classes.approved,
  [ETransactionRequestDisplayedStatusStep.paid]: classes.paid,
};

const stepStateToIconMap: Record<ETransactionRequestDisplayedStatusState, ComponentType> = {
  [ETransactionRequestDisplayedStatusState.success]: SuccessIcon,
  [ETransactionRequestDisplayedStatusState.failed]: DeclineIcon,
  [ETransactionRequestDisplayedStatusState.default]: EmptyIcon,
};

const Step = memo<TTransactionRequestStepModel>(({ step, state }) => {
  const [t] = useTranslation();

  const className = clsx(
    classes.step,
    stepStateToClassMap[state],
    stepToClassMap[step],
  );

  return (
    <div className={className}>
      <div className={classes.stepDot}>
        {createElement(stepStateToIconMap[state])}
      </div>

      <div className={classes.title}>
        {t(TRANSACTION_REQUEST_STEP_TRANSLATE_MAP[step])}
      </div>
    </div>
  );
});
Step.displayName = "Step";

interface IStatusStepsProps {
  transactionType: EPlatform_TransactionType;
  viewStatus: EPlatform_TransactionRequestViewStatus;
}

const StatusSteps = memo<IStatusStepsProps>(({
  transactionType,
  viewStatus,
}) => (
  <div className={clsx(classes.statusSteps, transactionType === EPlatform_TransactionType.payin && classes.payin)}>
    {
      getTransactionRequestStepsByStatus(transactionType, viewStatus).map(({ step, state }) => (
        <Step key={step} step={step} state={state} />
      ))
    }
  </div>
));
StatusSteps.displayName = "StatusSteps";

export { StatusSteps };
