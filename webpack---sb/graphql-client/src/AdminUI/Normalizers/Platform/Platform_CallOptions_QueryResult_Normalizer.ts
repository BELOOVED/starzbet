import type { TRecord } from "../../../Core/Generated/Helpers/Types";
import { recordNormalizer } from "../../../Core/Helpers/QueryNormalizer";
import type {
  TPlatform_CallOptions_QueryNormalizationData,
} from "../../Generated/Services/Platform/Types/TPlatform_CallOptions_QueryNormalizationData";
import type { TPlatform_CallOptions_QueryResult } from "../../Generated/Services/Platform/Types/TPlatform_CallOptions_QueryResult";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";

type TPlatform_CallOptions_QueryResult_Record = TRecord & {
  ids: string[];
}

const Platform_CallOptions_QueryResult_Normalizer = normalizerCreator<TPlatform_CallOptions_QueryResult,
  TPlatform_CallOptions_QueryResult_Record,
  TPlatform_CallOptions_QueryNormalizationData>(
    "Platform_CallOptions_QueryResult",
    ERecordName.platformCallOptionsQueryResult,
    (recordsManager, fragment, additionalData) => {
      fragment.platform.CallOptions.sort(
        (a, b) => {
          if (a.position < b.position) {
            return -1;
          }

          if (a.position > b.position) {
            return 1;
          }

          return 0;
        },
      );

      return {
        id: additionalData.resultId,
        ids: fragment.platform.CallOptions.map((callOption) => recordNormalizer(recordsManager, callOption, null).id),
      };
    },
  );

export type { TPlatform_CallOptions_QueryResult_Record };
export { Platform_CallOptions_QueryResult_Normalizer };
