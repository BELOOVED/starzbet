import clsx from "clsx";
import { memo } from "react";
import { type EPlatform_TransactionRequestViewStatus, EPlatform_TransactionType } from "@sb/graphql-client";
import { EMoneyFormat, type IMoney, Money, type TVoidFn } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import type { TPlatform_Decline_Fragment } from "@sb/graphql-client/PlayerUI";
import classes from "../BankingHistoryCard.module.css";
import { BaseModalCreator } from "../../../../../../../common/Components/BaseModalCreator/BaseModalCreator";
import { isPayout } from "../../../../../../Store/Transaction/Model/Transaction";
import {
  ETransactionRequestDisplayedStatusState,
  getTransactionRequestStatus,
  type TTransactionRequestStatus,
} from "../../../../../../Store/TransactionRequests/Utils/GetTransactionRequestStepsByStatus";
import { TRANSACTION_REQUEST_STEP_TRANSLATE_MAP } from "../../../../../../Store/TransactionRequests/Model/TransactionRequestStepMap";
import { UnionIcon } from "../../../../Components/Icons/UnionIcon/UnionIcon";
import {
  DeclinedReasonModal,
  type IDeclineReasonModalProps,
} from "../../../../Components/BankingHistory/DeclinedReasonModal/DeclinedReasonModal";
import { NewTabIcon } from "../../../../Components/Icons/NewTabIcon/NewTabIcon";

const statusToClass: Record<TTransactionRequestStatus, string | undefined> = {
  [ETransactionRequestDisplayedStatusState.success]: classes.green,
  [ETransactionRequestDisplayedStatusState.failed]: classes.red,
};

const getModal = (decline: TPlatform_Decline_Fragment) => (hideModal: TVoidFn) =>
  <DeclinedReasonModal decline={decline} hideModal={hideModal} />;

const DeclineReasonWithModal = memo<IDeclineReasonModalProps>(({ decline }) => (
  <BaseModalCreator modal={getModal(decline)}>
    {(toggleModal) => <NewTabIcon onClick={toggleModal} />}
  </BaseModalCreator>
));
DeclineReasonWithModal.displayName = "DeclineReasonWithModal";

interface IStatusItemProps {
  transactionType: EPlatform_TransactionType;
  sum: IMoney;
  viewStatus: EPlatform_TransactionRequestViewStatus;
  decline: TPlatform_Decline_Fragment | null;
}

const StatusItem = memo<IStatusItemProps>(({
  sum,
  transactionType,
  viewStatus,
  decline,
}) => {
  const [t] = useTranslation();
  const payout = isPayout(transactionType);
  const status = getTransactionRequestStatus(transactionType, viewStatus);

  return (
    <div className={classes.statusItem}>
      <div>
        <div className={classes.status}>
          {transactionType === EPlatform_TransactionType.payout && decline?.notes ? <DeclineReasonWithModal decline={decline} /> : null}

          <div className={clsx(classes.textSmall, statusToClass[status.state])}>
            {t(TRANSACTION_REQUEST_STEP_TRANSLATE_MAP[status.step])}
          </div>
        </div>

        <div className={clsx(classes.normalWeight, payout ? classes.negative : classes.positive)}>
          {payout ? "- " : "+ "}

          {Money.toFormat(sum, EMoneyFormat.symbolLeft)}
        </div>
      </div>

      <UnionIcon color={"darkText"} />
    </div>
  );
});
StatusItem.displayName = "StatusItem";

export { StatusItem };
