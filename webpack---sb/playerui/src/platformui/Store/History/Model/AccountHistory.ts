import { getNotNil, EMoneyFormat, type IMoney, Money } from "@sb/utils";
import { EPlatform_TransactionType, type TMoneyTransaction_Fragment } from "@sb/graphql-client";
import type { TPlatform_TransactionDetails_Fragment } from "@sb/graphql-client/PlayerUI";
import { isCorrection, isPayout, isRollback, transactionTypeTKeys } from "../../Transaction/Model/Transaction";
import { isTransactionRequestDetails } from "../../Transaction/Utils/IsTransactionRequestDetails";

const getTransactionTypeTKeyBySum = (type: EPlatform_TransactionType, sum?: TMoneyTransaction_Fragment | null) => {
  if (isCorrection(type)) {
    return Money.isPositive(
      getNotNil(
        sum,
        ["getTransactionTypeTKeyBySum", "sum"],
        `Unexpected transaction type: ${type} with null sum`,
      ).external,
    )
      ? transactionTypeTKeys[EPlatform_TransactionType.payin]
      : transactionTypeTKeys[EPlatform_TransactionType.payout];
  }

  return transactionTypeTKeys[type];
};

const toFormat = (money: IMoney, format: EMoneyFormat) => Money.toFormat(money, format, { sign: format !== EMoneyFormat.codeRight });

const isNegativeByType = (details: TPlatform_TransactionDetails_Fragment | null, type: EPlatform_TransactionType | null) => {
  if (!type) {
    return false;
  }

  if (isRollback(type) && isTransactionRequestDetails(details)) {
    return !isPayout(details.type);
  }

  return isPayout(type);
};

const formatTransactionSum = (
  details: TPlatform_TransactionDetails_Fragment | null,
  type: EPlatform_TransactionType | null,
  sum: TMoneyTransaction_Fragment,
  format: EMoneyFormat = EMoneyFormat.codeRight,
) => {
  const external = sum.external;

  if (isTransactionRequestDetails(details) && isNegativeByType(details, type)) {
    return toFormat({ ...external, amount: `-${external.amount}` }, format);
  }

  return toFormat(external, format);
};

export { getTransactionTypeTKeyBySum, formatTransactionSum, isNegativeByType };
