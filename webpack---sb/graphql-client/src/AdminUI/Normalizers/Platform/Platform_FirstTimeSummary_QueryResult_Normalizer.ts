import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TPlatform_FirstTimeSummary_QueryResult,
} from "../../Generated/Services/Platform/Types/TPlatform_FirstTimeSummary_QueryResult";
import {
  type TPlatform_FirstTimeSummary_QueryNormalizationData,
} from "../../Generated/Services/Platform/Types/TPlatform_FirstTimeSummary_QueryNormalizationData";
import { Platform_FirstTimeSummary_Normalizer } from "./Platform_FirstTimeSummary_Normalizer";

type TPlatform_FirstTimeSummary_QueryResult_Record = TRecord & {
  ids: string[];
}

const Platform_FirstTimeSummary_QueryResult_Normalizer = normalizerCreator<
  TPlatform_FirstTimeSummary_QueryResult,
  TPlatform_FirstTimeSummary_QueryResult_Record,
  TPlatform_FirstTimeSummary_QueryNormalizationData
>(
  "Platform_FirstTimeSummary_QueryResult",
  ERecordName.platformFirstTimeSummaryQueryResult,
  (recordsManager, result, additionalData) => {
    const ids = result
      .platform
      .FirstTimeSummary
      .map(
        (fragment, index) => Platform_FirstTimeSummary_Normalizer(
          recordsManager,
          fragment,
          { key: `${additionalData.resultId}_${index}` },
        ).id,
      );

    return {
      id: additionalData.resultId,
      ids,
    };
  },
);

export type { TPlatform_FirstTimeSummary_QueryResult_Record };
export { Platform_FirstTimeSummary_QueryResult_Normalizer };
