import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TPlatform_FinancialsSummary_QueryNormalizationData,
} from "../../Generated/Services/Platform/Types/TPlatform_FinancialsSummary_QueryNormalizationData";
import { type TPlatform_FinancialsSummary_QueryResult } from "../../Generated/Services/Platform/Types/TPlatform_FinancialsSummary_QueryResult";
import { Platform_FinancialsSummary_Normalizer } from "./Platform_FinancialsSummary_Normalizer";

type TPlatform_FinancialsSummary_QueryResult_Record = TRecord & {
  ids: string[];
}
const Platform_FinancialsSummary_QueryResult_Normalizer = normalizerCreator<
  TPlatform_FinancialsSummary_QueryResult,
  TPlatform_FinancialsSummary_QueryResult_Record,
  TPlatform_FinancialsSummary_QueryNormalizationData
>(
  "Platform_FinancialsSummary_QueryResult",
  ERecordName.platformFinancialsSummaryQueryResult,
  (recordsManager, result, additionalData) => {
    const ids = result
      .platform
      .FinancialsSummary
      .map(
        (fragment, index) => Platform_FinancialsSummary_Normalizer(
          recordsManager,
          fragment,
          { id: `${additionalData.resultId}_${index}` },
        ).id,
      );

    return {
      id: additionalData.resultId,
      ids,
    };
  },
);

export type { TPlatform_FinancialsSummary_QueryResult_Record };
export { Platform_FinancialsSummary_QueryResult_Normalizer };
