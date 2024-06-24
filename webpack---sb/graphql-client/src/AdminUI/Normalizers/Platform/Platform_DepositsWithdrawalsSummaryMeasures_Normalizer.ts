import { hasOwnProperty } from "@sb/utils";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { type TMoney_Fragment } from "../../../Core/Generated/Services/Common/Types/TMoney_Fragment";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import {
  type TPlatform_DepositsWithdrawalsSummaryMeasures_Fragment,
} from "../../Generated/Services/Platform/Types/TPlatform_DepositsWithdrawalsSummaryMeasures_Fragment";

type TPlatform_DepositsWithdrawalsSummaryMeasures_AdditionalData = { id: string; };

type TPlatform_DepositsWithdrawalsSummaryMeasures_Record = TRecord & Partial<{
  openDepositsCount: null | number;
  openDepositsSum: null | TMoney_Fragment;
  appliedDepositsCount: null | number;
  appliedDepositsSum: null | TMoney_Fragment;
  appliedDeposits24hSum: null | TMoney_Fragment;
  appliedDeposits24hCount: null | number;
  appliedDeposits7dSum: null | TMoney_Fragment;
  appliedDeposits7dCount: null | number;
  appliedDeposits30dSum: null | TMoney_Fragment;
  appliedDeposits30dCount: null | number;
  declinedDepositsCount: null | number;
  declinedDepositsSum: null | TMoney_Fragment;
  cancelledDepositsCount: null | number;
  cancelledDepositsSum: null | TMoney_Fragment;
  openWithdrawalsCount: null | number;
  openWithdrawalsSum: null | TMoney_Fragment;
  appliedWithdrawalsCount: null | number;
  appliedWithdrawalsSum: null | TMoney_Fragment;
  appliedWithdrawals24hSum: null | TMoney_Fragment;
  appliedWithdrawals24hCount: null | number;
  appliedWithdrawals7dSum: null | TMoney_Fragment;
  appliedWithdrawals7dCount: null | number;
  appliedWithdrawals30dSum: null | TMoney_Fragment;
  appliedWithdrawals30dCount: null | number;
  appliedDWDifferenceSum: null | TMoney_Fragment;
  declinedWithdrawalsCount: null | number;
  declinedWithdrawalsSum: null | TMoney_Fragment;
  cancelledWithdrawalsCount: null | number;
  cancelledWithdrawalsSum: null | TMoney_Fragment;
  notRolledBackDepositsCount: null | number;
  notRolledBackDepositsSum: null | TMoney_Fragment;
  notRolledBackWithdrawalsCount: null | number;
  notRolledBackWithdrawalsSum: null | TMoney_Fragment;
}>;

const Platform_DepositsWithdrawalsSummaryMeasures_Normalizer = normalizerCreator<
  TPlatform_DepositsWithdrawalsSummaryMeasures_Fragment,
  TPlatform_DepositsWithdrawalsSummaryMeasures_Record,
  TPlatform_DepositsWithdrawalsSummaryMeasures_AdditionalData>(
    EPlatform_Typename.platformDepositsWithdrawalsSummaryMeasures,
    ERecordName.platformDepositsWithdrawalsSummaryMeasures,
    (recordsManager, fragment, { id }) => {
      const paymentTransactionRequestStatusSummaryMeasures: TPlatform_DepositsWithdrawalsSummaryMeasures_Record = { id };

      if (hasOwnProperty(fragment, "openDepositsCount")) {
        paymentTransactionRequestStatusSummaryMeasures.openDepositsCount = fragment.openDepositsCount;
      }

      if (hasOwnProperty(fragment, "openDepositsSum")) {
        paymentTransactionRequestStatusSummaryMeasures.openDepositsSum = fragment.openDepositsSum;
      }

      if (hasOwnProperty(fragment, "appliedDepositsCount")) {
        paymentTransactionRequestStatusSummaryMeasures.appliedDepositsCount = fragment.appliedDepositsCount;
      }

      if (hasOwnProperty(fragment, "appliedDepositsSum")) {
        paymentTransactionRequestStatusSummaryMeasures.appliedDepositsSum = fragment.appliedDepositsSum;
      }

      if (hasOwnProperty(fragment, "appliedDeposits24hSum")) {
        paymentTransactionRequestStatusSummaryMeasures.appliedDeposits24hSum = fragment.appliedDeposits24hSum;
      }

      if (hasOwnProperty(fragment, "appliedDeposits24hCount")) {
        paymentTransactionRequestStatusSummaryMeasures.appliedDeposits24hCount = fragment.appliedDeposits24hCount;
      }

      if (hasOwnProperty(fragment, "appliedDeposits7dSum")) {
        paymentTransactionRequestStatusSummaryMeasures.appliedDeposits7dSum = fragment.appliedDeposits7dSum;
      }

      if (hasOwnProperty(fragment, "appliedDeposits7dCount")) {
        paymentTransactionRequestStatusSummaryMeasures.appliedDeposits7dCount = fragment.appliedDeposits7dCount;
      }

      if (hasOwnProperty(fragment, "appliedDeposits30dSum")) {
        paymentTransactionRequestStatusSummaryMeasures.appliedDeposits30dSum = fragment.appliedDeposits30dSum;
      }

      if (hasOwnProperty(fragment, "appliedDeposits30dCount")) {
        paymentTransactionRequestStatusSummaryMeasures.appliedDeposits30dCount = fragment.appliedDeposits30dCount;
      }

      if (hasOwnProperty(fragment, "declinedDepositsCount")) {
        paymentTransactionRequestStatusSummaryMeasures.declinedDepositsCount = fragment.declinedDepositsCount;
      }

      if (hasOwnProperty(fragment, "declinedDepositsSum")) {
        paymentTransactionRequestStatusSummaryMeasures.declinedDepositsSum = fragment.declinedDepositsSum;
      }

      if (hasOwnProperty(fragment, "cancelledDepositsCount")) {
        paymentTransactionRequestStatusSummaryMeasures.cancelledDepositsCount = fragment.cancelledDepositsCount;
      }

      if (hasOwnProperty(fragment, "cancelledDepositsSum")) {
        paymentTransactionRequestStatusSummaryMeasures.cancelledDepositsSum = fragment.cancelledDepositsSum;
      }

      if (hasOwnProperty(fragment, "openWithdrawalsCount")) {
        paymentTransactionRequestStatusSummaryMeasures.openWithdrawalsCount = fragment.openWithdrawalsCount;
      }

      if (hasOwnProperty(fragment, "openWithdrawalsSum")) {
        paymentTransactionRequestStatusSummaryMeasures.openWithdrawalsSum = fragment.openWithdrawalsSum;
      }

      if (hasOwnProperty(fragment, "appliedWithdrawalsCount")) {
        paymentTransactionRequestStatusSummaryMeasures.appliedWithdrawalsCount = fragment.appliedWithdrawalsCount;
      }

      if (hasOwnProperty(fragment, "appliedWithdrawalsSum")) {
        paymentTransactionRequestStatusSummaryMeasures.appliedWithdrawalsSum = fragment.appliedWithdrawalsSum;
      }

      if (hasOwnProperty(fragment, "appliedWithdrawals24hSum")) {
        paymentTransactionRequestStatusSummaryMeasures.appliedWithdrawals24hSum = fragment.appliedWithdrawals24hSum;
      }

      if (hasOwnProperty(fragment, "appliedWithdrawals24hCount")) {
        paymentTransactionRequestStatusSummaryMeasures.appliedWithdrawals24hCount = fragment.appliedWithdrawals24hCount;
      }

      if (hasOwnProperty(fragment, "appliedWithdrawals7dSum")) {
        paymentTransactionRequestStatusSummaryMeasures.appliedWithdrawals7dSum = fragment.appliedWithdrawals7dSum;
      }

      if (hasOwnProperty(fragment, "appliedWithdrawals7dCount")) {
        paymentTransactionRequestStatusSummaryMeasures.appliedWithdrawals7dCount= fragment.appliedWithdrawals7dCount;
      }

      if (hasOwnProperty(fragment, "appliedWithdrawals30dSum")) {
        paymentTransactionRequestStatusSummaryMeasures.appliedWithdrawals30dSum = fragment.appliedWithdrawals30dSum;
      }

      if (hasOwnProperty(fragment, "appliedWithdrawals30dCount")) {
        paymentTransactionRequestStatusSummaryMeasures.appliedWithdrawals30dCount = fragment.appliedWithdrawals30dCount;
      }

      if (hasOwnProperty(fragment, "declinedWithdrawalsCount")) {
        paymentTransactionRequestStatusSummaryMeasures.declinedWithdrawalsCount = fragment.declinedWithdrawalsCount;
      }

      if (hasOwnProperty(fragment, "declinedWithdrawalsSum")) {
        paymentTransactionRequestStatusSummaryMeasures.declinedWithdrawalsSum = fragment.declinedWithdrawalsSum;
      }

      if (hasOwnProperty(fragment, "cancelledWithdrawalsCount")) {
        paymentTransactionRequestStatusSummaryMeasures.cancelledWithdrawalsCount = fragment.cancelledWithdrawalsCount;
      }

      if (hasOwnProperty(fragment, "cancelledWithdrawalsSum")) {
        paymentTransactionRequestStatusSummaryMeasures.cancelledWithdrawalsSum = fragment.cancelledWithdrawalsSum;
      }

      if (hasOwnProperty(fragment, "notRolledBackDepositsCount")) {
        paymentTransactionRequestStatusSummaryMeasures.notRolledBackDepositsCount = fragment.notRolledBackDepositsCount;
      }

      if (hasOwnProperty(fragment, "notRolledBackDepositsSum")) {
        paymentTransactionRequestStatusSummaryMeasures.notRolledBackDepositsSum = fragment.notRolledBackDepositsSum;
      }

      if (hasOwnProperty(fragment, "notRolledBackWithdrawalsCount")) {
        paymentTransactionRequestStatusSummaryMeasures.notRolledBackWithdrawalsCount = fragment.notRolledBackWithdrawalsCount;
      }

      if (hasOwnProperty(fragment, "notRolledBackWithdrawalsSum")) {
        paymentTransactionRequestStatusSummaryMeasures.notRolledBackWithdrawalsSum = fragment.notRolledBackWithdrawalsSum;
      }

      if (hasOwnProperty(fragment, "appliedDWDifferenceSum")) {
        paymentTransactionRequestStatusSummaryMeasures.appliedDWDifferenceSum = fragment.appliedDWDifferenceSum;
      }

      return paymentTransactionRequestStatusSummaryMeasures;
    },
  );

export type { TPlatform_DepositsWithdrawalsSummaryMeasures_Record };
export { Platform_DepositsWithdrawalsSummaryMeasures_Normalizer };
