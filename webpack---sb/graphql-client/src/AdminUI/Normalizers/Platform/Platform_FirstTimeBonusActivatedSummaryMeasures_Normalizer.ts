import { hasOwnProperty } from "@sb/utils";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { type TMoney_Fragment } from "../../../Core/Generated/Services/Common/Types/TMoney_Fragment";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TPlatform_FirstTimeBonusActivatedSummaryMeasures_Fragment,
} from "../../Generated/Services/Platform/Types/TPlatform_FirstTimeBonusActivatedSummaryMeasures_Fragment";

type TPlatform_FirstTimeBonusActivatedSummaryMeasures_Record = TRecord & Partial<{
  ftBonusActivated: null | TMoney_Fragment;
  ftBonusActivatedCount: null | number;
}>

type TPlatform_FirstTimeBonusActivatedSummaryMeasures_AdditionalData = { id: string; }

const Platform_FirstTimeBonusActivatedSummaryMeasures_Normalizer = normalizerCreator<
  TPlatform_FirstTimeBonusActivatedSummaryMeasures_Fragment,
  TPlatform_FirstTimeBonusActivatedSummaryMeasures_Record,
  TPlatform_FirstTimeBonusActivatedSummaryMeasures_AdditionalData
>(
  EPlatform_Typename.platformFirstTimeBonusActivatedSummaryMeasures,
  ERecordName.platformFirstTimeBonusActivatedSummaryMeasures,
  (recordsManager, fragment, additionalData) => {
    const id = additionalData.id;
    const firstTimeBonusActivatedSummaryMeasures: TPlatform_FirstTimeBonusActivatedSummaryMeasures_Record = { id };

    if(hasOwnProperty(fragment, "ftBonusActivated")) {
      firstTimeBonusActivatedSummaryMeasures.ftBonusActivated = fragment.ftBonusActivated;
    }

    if(hasOwnProperty(fragment, "ftBonusActivatedCount")) {
      firstTimeBonusActivatedSummaryMeasures.ftBonusActivatedCount = fragment.ftBonusActivatedCount;
    }

    return firstTimeBonusActivatedSummaryMeasures;
  },
);

export type { TPlatform_FirstTimeBonusActivatedSummaryMeasures_Record };
export { Platform_FirstTimeBonusActivatedSummaryMeasures_Normalizer };
