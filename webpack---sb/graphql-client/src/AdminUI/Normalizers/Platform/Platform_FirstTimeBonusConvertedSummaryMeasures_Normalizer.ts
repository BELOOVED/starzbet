import { hasOwnProperty } from "@sb/utils";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { type TMoney_Fragment } from "../../../Core/Generated/Services/Common/Types/TMoney_Fragment";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TPlatform_FirstTimeBonusConvertedSummaryMeasures_Fragment,
} from "../../Generated/Services/Platform/Types/TPlatform_FirstTimeBonusConvertedSummaryMeasures_Fragment";

type TPlatform_FirstTimeBonusConvertedSummaryMeasures_Record = TRecord & Partial<{
  ftBonusConverted: null | TMoney_Fragment;
  ftBonusConvertedCount: null | number;
}>

type TPlatform_FirstTimeBonusConvertedSummaryMeasures_AdditionalData = { id: string; }

const Platform_FirstTimeBonusConvertedSummaryMeasures_Normalizer = normalizerCreator<
  TPlatform_FirstTimeBonusConvertedSummaryMeasures_Fragment,
  TPlatform_FirstTimeBonusConvertedSummaryMeasures_Record,
  TPlatform_FirstTimeBonusConvertedSummaryMeasures_AdditionalData
>(
  EPlatform_Typename.platformFirstTimeBonusConvertedSummaryMeasures,
  ERecordName.platformFirstTimeBonusConvertedSummaryMeasures,
  (recordsManager, fragment, additionalData) => {
    const id = additionalData.id;
    const firstTimeBonusConvertedSummaryMeasures: TPlatform_FirstTimeBonusConvertedSummaryMeasures_Record = { id };

    if(hasOwnProperty(fragment, "ftBonusConverted")) {
      firstTimeBonusConvertedSummaryMeasures.ftBonusConverted = fragment.ftBonusConverted;
    }

    if(hasOwnProperty(fragment, "ftBonusConvertedCount")) {
      firstTimeBonusConvertedSummaryMeasures.ftBonusConvertedCount = fragment.ftBonusConvertedCount;
    }

    return firstTimeBonusConvertedSummaryMeasures;
  },
);

export type { TPlatform_FirstTimeBonusConvertedSummaryMeasures_Record };
export { Platform_FirstTimeBonusConvertedSummaryMeasures_Normalizer };
