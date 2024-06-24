import { hasOwnProperty } from "@sb/utils";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { type TMoney_Fragment } from "../../../Core/Generated/Services/Common/Types/TMoney_Fragment";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TPlatform_FirstTimeFreeBetConvertedSummaryMeasures_Fragment,
} from "../../Generated/Services/Platform/Types/TPlatform_FirstTimeFreeBetConvertedSummaryMeasures_Fragment";

type TPlatform_FirstTimeFreeBetConvertedSummaryMeasures_Record = TRecord & Partial<{
  ftFreeBetConverted: null | TMoney_Fragment;
  ftFreeBetConvertedCount: null | number;
}>

type TPlatform_FirstTimeFreeBetConvertedSummaryMeasures_AdditionalData = { id: string; }

const Platform_FirstTimeFreeBetConvertedSummaryMeasures_Normalizer = normalizerCreator<
  TPlatform_FirstTimeFreeBetConvertedSummaryMeasures_Fragment,
  TPlatform_FirstTimeFreeBetConvertedSummaryMeasures_Record,
  TPlatform_FirstTimeFreeBetConvertedSummaryMeasures_AdditionalData
>(
  EPlatform_Typename.platformFirstTimeFreeBetConvertedSummaryMeasures,
  ERecordName.platformFirstTimeFreeBetConvertedSummaryMeasures,
  (recordsManager, fragment, additionalData) => {
    const id = additionalData.id;
    const firstTimeFreeBetConvertedSummaryMeasures: TPlatform_FirstTimeFreeBetConvertedSummaryMeasures_Record = { id };

    if(hasOwnProperty(fragment, "ftFreeBetConverted")) {
      firstTimeFreeBetConvertedSummaryMeasures.ftFreeBetConverted = fragment.ftFreeBetConverted;
    }

    if(hasOwnProperty(fragment, "ftFreeBetConvertedCount")) {
      firstTimeFreeBetConvertedSummaryMeasures.ftFreeBetConvertedCount = fragment.ftFreeBetConvertedCount;
    }

    return firstTimeFreeBetConvertedSummaryMeasures;
  },
);

export type { TPlatform_FirstTimeFreeBetConvertedSummaryMeasures_Record };
export { Platform_FirstTimeFreeBetConvertedSummaryMeasures_Normalizer };
