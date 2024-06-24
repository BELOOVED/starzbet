import { hasOwnProperty } from "@sb/utils";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import {
  type TPlatform_FirstTimeSummaryMeasures_Fragment,
} from "../../Generated/Services/Platform/Types/TPlatform_FirstTimeSummaryMeasures_Fragment";
import { Platform_PlayersSummaryMeasures_Normalizer } from "./Platform_PlayersSummaryMeasures_Normalizer";
import { Platform_FirstTimeWithdrawalsSummaryMeasures_Normalizer } from "./Platform_FirstTimeWithdrawalsSummaryMeasures_Normalizer";
import { Platform_FirstTimeDepositsSummaryMeasures_Normalizer } from "./Platform_FirstTimeDepositsSummaryMeasures_Normalizer";
import { Platform_FirstTimeBonusActivatedSummaryMeasures_Normalizer } from "./Platform_FirstTimeBonusActivatedSummaryMeasures_Normalizer";
import { Platform_FirstTimeBonusCostSummaryMeasures_Normalizer } from "./Platform_FirstTimeBonusCostSummaryMeasures_Normalizer";
import { Platform_FirstTimeBonusConvertedSummaryMeasures_Normalizer } from "./Platform_FirstTimeBonusConvertedSummaryMeasures_Normalizer";
import { Platform_FirstTimeFreeBetCostSummaryMeasures_Normalizer } from "./Platform_FirstTimeFreeBetCostSummaryMeasures_Normalizer";
import {
  Platform_FirstTimeFreeBetConvertedSummaryMeasures_Normalizer,
} from "./Platform_FirstTimeFreeBetConvertedSummaryMeasures_Normalizer";
import {
  Platform_FirstTimeFreeBetActivatedSummaryMeasures_Normalizer,
} from "./Platform_FirstTimeFreeBetActivatedSummaryMeasures_Normalizer";

type TPlatform_FirstTimeSummaryMeasures_AdditionalData = { key: string; }

type TPlatform_FirstTimeSummaryMeasures_Record = TRecord & Partial<{
  playersSummaryId: string | null;
  ftDepositsSummaryId: string | null;
  ftWithdrawalsSummaryId: string | null;
  ftBonusCostSummaryId: string | null;
  ftBonusActivatedSummaryId: string | null;
  ftBonusConvertedSummaryId: string | null;
  ftFreeBetCostSummaryId: string | null;
  ftFreeBetActivatedSummaryId: string | null;
  ftFreeBetConvertedSummaryId: string | null;
}>

const Platform_FirstTimeSummaryMeasures_Normalizer = normalizerCreator<
  TPlatform_FirstTimeSummaryMeasures_Fragment,
  TPlatform_FirstTimeSummaryMeasures_Record,
  TPlatform_FirstTimeSummaryMeasures_AdditionalData
>(
  EPlatform_Typename.platformFirstTimeSummaryMeasures,
  ERecordName.platformFirstTimeSummaryMeasures,
  (recordsManager, fragment, additionalData) => {
    const id = additionalData.key;
    const firstTimeSummaryMeasures: TPlatform_FirstTimeSummaryMeasures_Record = { id };

    if(hasOwnProperty(fragment, "playersSummary")) {
      firstTimeSummaryMeasures.playersSummaryId = fragment.playersSummary
        ? Platform_PlayersSummaryMeasures_Normalizer(recordsManager, fragment.playersSummary, { id }).id
        : null;
    }

    if(hasOwnProperty(fragment, "ftDepositsSummary")) {
      firstTimeSummaryMeasures.ftDepositsSummaryId = fragment.ftDepositsSummary
        ? Platform_FirstTimeDepositsSummaryMeasures_Normalizer(recordsManager, fragment.ftDepositsSummary, { id }).id
        : null;
    }

    if(hasOwnProperty(fragment, "ftWithdrawalsSummary")) {
      firstTimeSummaryMeasures.ftWithdrawalsSummaryId = fragment.ftWithdrawalsSummary
        ? Platform_FirstTimeWithdrawalsSummaryMeasures_Normalizer(recordsManager, fragment.ftWithdrawalsSummary, { id }).id
        : null;
    }

    if(hasOwnProperty(fragment, "ftBonusCostSummary")) {
      firstTimeSummaryMeasures.ftBonusCostSummaryId = fragment.ftBonusCostSummary
        ? Platform_FirstTimeBonusCostSummaryMeasures_Normalizer(recordsManager, fragment.ftBonusCostSummary, { id }).id
        : null;
    }

    if(hasOwnProperty(fragment, "ftBonusActivatedSummary")) {
      firstTimeSummaryMeasures.ftBonusActivatedSummaryId = fragment.ftBonusActivatedSummary
        ? Platform_FirstTimeBonusActivatedSummaryMeasures_Normalizer(recordsManager, fragment.ftBonusActivatedSummary, { id }).id
        : null;
    }

    if(hasOwnProperty(fragment, "ftBonusConvertedSummary")) {
      firstTimeSummaryMeasures.ftBonusConvertedSummaryId = fragment.ftBonusConvertedSummary
        ? Platform_FirstTimeBonusConvertedSummaryMeasures_Normalizer(recordsManager, fragment.ftBonusConvertedSummary, { id }).id
        : null;
    }

    if(hasOwnProperty(fragment, "ftFreeBetCostSummary")) {
      firstTimeSummaryMeasures.ftFreeBetCostSummaryId = fragment.ftFreeBetCostSummary
        ? Platform_FirstTimeFreeBetCostSummaryMeasures_Normalizer(recordsManager, fragment.ftFreeBetCostSummary, { id }).id
        : null;
    }

    if(hasOwnProperty(fragment, "ftFreeBetActivatedSummary")) {
      firstTimeSummaryMeasures.ftFreeBetActivatedSummaryId = fragment.ftFreeBetActivatedSummary
        ? Platform_FirstTimeFreeBetActivatedSummaryMeasures_Normalizer(recordsManager, fragment.ftFreeBetActivatedSummary, { id }).id
        : null;
    }

    if(hasOwnProperty(fragment, "ftFreeBetConvertedSummary")) {
      firstTimeSummaryMeasures.ftFreeBetConvertedSummaryId = fragment.ftFreeBetConvertedSummary
        ? Platform_FirstTimeFreeBetConvertedSummaryMeasures_Normalizer(recordsManager, fragment.ftFreeBetConvertedSummary, { id }).id
        : null;
    }

    return firstTimeSummaryMeasures;
  },
);

export type { TPlatform_FirstTimeSummaryMeasures_Record };
export { Platform_FirstTimeSummaryMeasures_Normalizer };
