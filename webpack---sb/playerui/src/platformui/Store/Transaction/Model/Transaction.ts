import {
  platformui_transactionType_deposit,
  platformui_transactionType_rollback,
  platformui_transactionType_withdraw,
  type TCommonTKeys,
} from "@sb/translates/platformui/CommonTKeys";
import { EPlatform_TransactionType } from "@sb/graphql-client";

const transactionTypeTKeys: Record<Exclude<EPlatform_TransactionType, EPlatform_TransactionType.correction>, TCommonTKeys> = {
  [EPlatform_TransactionType.payin]: platformui_transactionType_deposit,
  [EPlatform_TransactionType.payout]: platformui_transactionType_withdraw,
  [EPlatform_TransactionType.rollback]: platformui_transactionType_rollback,
};

const isCorrection = (
  type: EPlatform_TransactionType,
): type is EPlatform_TransactionType.correction => type === EPlatform_TransactionType.correction;

const isPayout = (type: EPlatform_TransactionType): type is EPlatform_TransactionType.payout => type === EPlatform_TransactionType.payout;

const isRollback = (type: EPlatform_TransactionType) => type === EPlatform_TransactionType.rollback;

export {
  transactionTypeTKeys,
  isCorrection,
  isPayout,
  isRollback,
};
