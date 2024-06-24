import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import {
  type TPlatform_SystemFinancialsSummary_QueryResult,
} from "../../Generated/Services/Platform/Types/TPlatform_SystemFinancialsSummary_QueryResult";
import {
  type TPlatform_SystemFinancialsSummary_QueryNormalizationData,
} from "../../Generated/Services/Platform/Types/TPlatform_SystemFinancialsSummary_QueryNormalizationData";
import { Platform_SystemFinancialsSummary_Normalizer } from "./Platform_SystemFinancialsSummary_Normalizer";

type TPlatform_SystemFinancialsSummary_QueryResult_Record = TRecord & {
  ids: string[];
}

const Platform_SystemFinancialsSummary_QueryResult_Normalizer = normalizerCreator<TPlatform_SystemFinancialsSummary_QueryResult,
  TPlatform_SystemFinancialsSummary_QueryResult_Record,
  TPlatform_SystemFinancialsSummary_QueryNormalizationData>(
    "Platform_SystemFinancialsSummary_QueryResult",
    ERecordName.platformSystemFinancialsSummaryQueryResult,
    (recordsManager, result, additionalData) => {
      const ids = result
        .platform
        .SystemFinancialsSummary
        .reduce<string[]>(
          (acc, fragment, index) => [
            ...acc,
            Platform_SystemFinancialsSummary_Normalizer(
              recordsManager,
              fragment,
              { key: `${additionalData.resultId}_${index}` },
            ).id,
          ],
          [],
        );

      return {
        id: additionalData.resultId,
        ids,
      };
    },
  );

export type { TPlatform_SystemFinancialsSummary_QueryResult_Record };
export { Platform_SystemFinancialsSummary_QueryResult_Normalizer };
