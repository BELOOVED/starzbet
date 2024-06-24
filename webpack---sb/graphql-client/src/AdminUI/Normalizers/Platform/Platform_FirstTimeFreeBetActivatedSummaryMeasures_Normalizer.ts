import { hasOwnProperty } from "@sb/utils";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { type TMoney_Fragment } from "../../../Core/Generated/Services/Common/Types/TMoney_Fragment";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TPlatform_FirstTimeFreeBetActivatedSummaryMeasures_Fragment,
} from "../../Generated/Services/Platform/Types/TPlatform_FirstTimeFreeBetActivatedSummaryMeasures_Fragment";

type TPlatform_FirstTimeFreeBetActivatedSummaryMeasures_Record = TRecord & Partial<{
  ftFreeBetActivated: null | TMoney_Fragment;
  ftFreeBetActivatedCount: null | number;
}>

type TPlatform_FirstTimeFreeBetActivatedSummaryMeasures_AdditionalData = { id: string; }

const Platform_FirstTimeFreeBetActivatedSummaryMeasures_Normalizer = normalizerCreator<
  TPlatform_FirstTimeFreeBetActivatedSummaryMeasures_Fragment,
  TPlatform_FirstTimeFreeBetActivatedSummaryMeasures_Record,
  TPlatform_FirstTimeFreeBetActivatedSummaryMeasures_AdditionalData
>(
  EPlatform_Typename.platformFirstTimeFreeBetActivatedSummaryMeasures,
  ERecordName.platformFirstTimeFreeBetActivatedSummaryMeasures,
  (recordsManager, fragment, additionalData) => {
    const id = additionalData.id;
    const firstTimeFreeBetActivatedSummaryMeasures: TPlatform_FirstTimeFreeBetActivatedSummaryMeasures_Record = { id };

    if(hasOwnProperty(fragment, "ftFreeBetActivated")) {
      firstTimeFreeBetActivatedSummaryMeasures.ftFreeBetActivated = fragment.ftFreeBetActivated;
    }

    if(hasOwnProperty(fragment, "ftFreeBetActivatedCount")) {
      firstTimeFreeBetActivatedSummaryMeasures.ftFreeBetActivatedCount = fragment.ftFreeBetActivatedCount;
    }

    return firstTimeFreeBetActivatedSummaryMeasures;
  },
);

export type { TPlatform_FirstTimeFreeBetActivatedSummaryMeasures_Record };
export { Platform_FirstTimeFreeBetActivatedSummaryMeasures_Normalizer };
