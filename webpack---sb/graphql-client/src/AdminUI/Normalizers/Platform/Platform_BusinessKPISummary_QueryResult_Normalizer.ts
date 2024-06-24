import type { TRecord } from "../../../Core/Generated/Helpers/Types";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { type TPlatform_BusinessKPISummary_QueryResult } from "../../Generated/Services/Platform/Types/TPlatform_BusinessKPISummary_QueryResult";
import {
  type TPlatform_BusinessKPISummary_QueryNormalizationData,
} from "../../Generated/Services/Platform/Types/TPlatform_BusinessKPISummary_QueryNormalizationData";
import { Platform_BusinessKPISummary_Normalizer } from "./Platform_BusinessKPISummary_Normalizer";

type TPlatform_BusinessKPISummary_QueryResult_Record = TRecord & {
  ids: string[];
}

const Platform_BusinessKPISummary_QueryResult_Normalizer = normalizerCreator<
  TPlatform_BusinessKPISummary_QueryResult,
  TPlatform_BusinessKPISummary_QueryResult_Record,
  TPlatform_BusinessKPISummary_QueryNormalizationData
>(
  "Platform_BusinessKPISummary_QueryResult",
  ERecordName.platformBusinessKPISummaryQueryResult,
  (recordsManager, result, additionalData) => {
    const ids = result
      .platform
      .BusinessKPISummary
      .map(
        (fragment, index) => Platform_BusinessKPISummary_Normalizer(
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

export type { TPlatform_BusinessKPISummary_QueryResult_Record };
export { Platform_BusinessKPISummary_QueryResult_Normalizer };
