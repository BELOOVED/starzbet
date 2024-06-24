import { hasOwnProperty, type IMoney } from "@sb/utils";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import {
  type TPlatform_SystemFinancialsSummaryMeasures_Fragment,
} from "../../Generated/Services/Platform/Types/TPlatform_SystemFinancialsSummaryMeasures_Fragment";

type TPlatform_SystemFinancialsSummaryMeasures_AdditionalData = { id: string; };

type TPlatform_SystemFinancialsSummaryMeasures_Record = TRecord & Partial<{
  depositsCount: null | number;
  depositsSum: null | IMoney;
  withdrawalsCount: null | number;
  withdrawalsSum: null | IMoney;
  depositsWithdrawalsDifferenceSum: null | IMoney;
  sentCount: null | number;
  sentSum: null | IMoney;
  receiveCount: null | number;
  receiveSum: null | IMoney;
}>;

const Platform_SystemFinancialsSummaryMeasures_Normalizer = normalizerCreator<TPlatform_SystemFinancialsSummaryMeasures_Fragment,
  TPlatform_SystemFinancialsSummaryMeasures_Record,
  TPlatform_SystemFinancialsSummaryMeasures_AdditionalData>(
    EPlatform_Typename.platformSystemFinancialsSummaryMeasures,
    ERecordName.platformSystemFinancialsSummaryMeasures,
    (recordsManager, fragment, { id }) => {
      const systemFinancialsSummaryMeasures: TPlatform_SystemFinancialsSummaryMeasures_Record = { id };

      if(hasOwnProperty(fragment, "depositsCount")) {
        systemFinancialsSummaryMeasures.depositsCount = fragment.depositsCount;
      }

      if(hasOwnProperty(fragment, "depositsSum")) {
        systemFinancialsSummaryMeasures.depositsSum = fragment.depositsSum;
      }

      if(hasOwnProperty(fragment, "withdrawalsCount")) {
        systemFinancialsSummaryMeasures.withdrawalsCount = fragment.withdrawalsCount;
      }

      if(hasOwnProperty(fragment, "withdrawalsSum")) {
        systemFinancialsSummaryMeasures.withdrawalsSum = fragment.withdrawalsSum;
      }

      if(hasOwnProperty(fragment, "depositsWithdrawalsDifferenceSum")) {
        systemFinancialsSummaryMeasures.depositsWithdrawalsDifferenceSum = fragment.depositsWithdrawalsDifferenceSum;
      }

      if(hasOwnProperty(fragment, "sentCount")) {
        systemFinancialsSummaryMeasures.sentCount = fragment.sentCount;
      }

      if(hasOwnProperty(fragment, "sentSum")) {
        systemFinancialsSummaryMeasures.sentSum = fragment.sentSum;
      }

      if(hasOwnProperty(fragment, "receiveCount")) {
        systemFinancialsSummaryMeasures.receiveCount = fragment.receiveCount;
      }

      if(hasOwnProperty(fragment, "receiveSum")) {
        systemFinancialsSummaryMeasures.receiveSum = fragment.receiveSum;
      }

      return systemFinancialsSummaryMeasures;
    },
  );

export type { TPlatform_SystemFinancialsSummaryMeasures_Record };
export { Platform_SystemFinancialsSummaryMeasures_Normalizer };
