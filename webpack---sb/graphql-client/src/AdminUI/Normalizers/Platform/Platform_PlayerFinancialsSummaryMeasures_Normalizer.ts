import { hasOwnProperty } from "@sb/utils";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { type TMoney_Fragment } from "../../../Core/Generated/Services/Common/Types/TMoney_Fragment";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import {
  type TPlatform_PlayerFinancialsSummaryMeasures_Fragment,
} from "../../Generated/Services/Platform/Types/TPlatform_PlayerFinancialsSummaryMeasures_Fragment";

type TPlatform_PlayerFinancialsSummaryMeasures_AdditionalData = { parentId: string; };

type TPlatform_PlayerFinancialsSummaryMeasures_Record = TRecord & Partial<{
  depositsSum: TMoney_Fragment | null;
  withdrawalsSum: TMoney_Fragment | null;
  lastDepositAt: string | null;
  depositsCount: number | null;
  depositsSum24h: TMoney_Fragment | null;
  depositsSum7d: TMoney_Fragment | null;
  depositsSum30d: TMoney_Fragment | null;
  withdrawalsCount: number | null;
  withdrawalsSum7d: TMoney_Fragment | null;
  withdrawalsSum24h: TMoney_Fragment | null;
  withdrawalsSum30d: TMoney_Fragment | null;
  depositsWithdrawalsDifferenceSum: TMoney_Fragment | null;
  balanceAdjustmentsSum: TMoney_Fragment | null;
}>

const Platform_PlayerFinancialsSummaryMeasures_Normalizer = normalizerCreator<
  TPlatform_PlayerFinancialsSummaryMeasures_Fragment,
  TPlatform_PlayerFinancialsSummaryMeasures_Record,
  TPlatform_PlayerFinancialsSummaryMeasures_AdditionalData
>(
  EPlatform_Typename.platformPlayerFinancialsSummaryMeasures,
  ERecordName.platformPlayerFinancialsSummaryMeasures,
  (recordsManager, fragment, additionalData) => {
    const playerFinancialsSummaryMeasures: TPlatform_PlayerFinancialsSummaryMeasures_Record = {
      id: additionalData.parentId,
    };

    if(hasOwnProperty(fragment, "depositsSum")) {
      playerFinancialsSummaryMeasures.depositsSum = fragment.depositsSum;
    }

    if(hasOwnProperty(fragment, "withdrawalsSum")) {
      playerFinancialsSummaryMeasures.withdrawalsSum = fragment.withdrawalsSum;
    }

    if(hasOwnProperty(fragment, "lastDepositAt")) {
      playerFinancialsSummaryMeasures.lastDepositAt = fragment.lastDepositAt;
    }

    if(hasOwnProperty(fragment, "depositsCount")) {
      playerFinancialsSummaryMeasures.depositsCount = fragment.depositsCount;
    }

    if(hasOwnProperty(fragment, "depositsSum24h")) {
      playerFinancialsSummaryMeasures.depositsSum24h = fragment.depositsSum24h;
    }

    if(hasOwnProperty(fragment, "depositsSum7d")) {
      playerFinancialsSummaryMeasures.depositsSum7d = fragment.depositsSum7d;
    }

    if(hasOwnProperty(fragment, "depositsSum30d")) {
      playerFinancialsSummaryMeasures.depositsSum30d = fragment.depositsSum30d;
    }

    if(hasOwnProperty(fragment, "withdrawalsCount")) {
      playerFinancialsSummaryMeasures.withdrawalsCount = fragment.withdrawalsCount;
    }

    if(hasOwnProperty(fragment, "withdrawalsSum7d")) {
      playerFinancialsSummaryMeasures.withdrawalsSum7d = fragment.withdrawalsSum7d;
    }

    if(hasOwnProperty(fragment, "withdrawalsSum24h")) {
      playerFinancialsSummaryMeasures.withdrawalsSum24h = fragment.withdrawalsSum24h;
    }

    if(hasOwnProperty(fragment, "withdrawalsSum30d")) {
      playerFinancialsSummaryMeasures.withdrawalsSum30d = fragment.withdrawalsSum30d;
    }

    if(hasOwnProperty(fragment, "depositsWithdrawalsDifferenceSum")) {
      playerFinancialsSummaryMeasures.depositsWithdrawalsDifferenceSum = fragment.depositsWithdrawalsDifferenceSum;
    }

    if(hasOwnProperty(fragment, "balanceAdjustmentsSum")) {
      playerFinancialsSummaryMeasures.balanceAdjustmentsSum = fragment.balanceAdjustmentsSum;
    }

    return playerFinancialsSummaryMeasures;
  },
);

export type { TPlatform_PlayerFinancialsSummaryMeasures_Record };
export { Platform_PlayerFinancialsSummaryMeasures_Normalizer };
