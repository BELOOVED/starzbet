import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { type TPlatform_FirstTimeSummary_Fragment } from "../../Generated/Services/Platform/Types/TPlatform_FirstTimeSummary_Fragment";
import { Platform_FirstTimeSummaryMeasures_Normalizer } from "./Platform_FirstTimeSummaryMeasures_Normalizer";
import { Platform_FirstTimeSummaryGroupingSet_Normalizer } from "./Platform_FirstTimeSummaryGroupingSet_Normalizer";

type TPlatform_FirstTimeSummary_Record = TRecord & {
  dataId: string;
  groupId: string;
}

type TPlatform_FirstTimeSummary_AdditionalData = { key: string; }

const Platform_FirstTimeSummary_Normalizer = normalizerCreator<
  TPlatform_FirstTimeSummary_Fragment,
  TPlatform_FirstTimeSummary_Record,
  TPlatform_FirstTimeSummary_AdditionalData
>(
  EPlatform_Typename.platformFirstTimeSummary,
  ERecordName.platformFirstTimeSummary,
  (recordsManager, fragment, additionalData) => {
    const id = additionalData.key;

    if (fragment.group) {
      Platform_FirstTimeSummaryGroupingSet_Normalizer(recordsManager, fragment.group, { id });
    }

    Platform_FirstTimeSummaryMeasures_Normalizer(recordsManager, fragment.data, { key: id });

    return {
      id,
      dataId: id,
      groupId: id,
    };
  },
);

export type { TPlatform_FirstTimeSummary_Record };
export { Platform_FirstTimeSummary_Normalizer };
