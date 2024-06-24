import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TPlatform_FinishedPlayerBonusesSummary_QueryResult,
} from "../../Generated/Services/Platform/Types/TPlatform_FinishedPlayerBonusesSummary_QueryResult";
import {
  type TPlatform_FinishedPlayerBonusesSummary_QueryNormalizationData,
} from "../../Generated/Services/Platform/Types/TPlatform_FinishedPlayerBonusesSummary_QueryNormalizationData";
import { Platform_FinishedPlayerBonusesSummary_Normalizer } from "./Platform_FinishedPlayerBonusesSummary_Normalizer";

type TPlatform_FinishedPlayerBonusesSummary_QueryResult_Record = TRecord & {
    finishedPlayerBonusesSummaryId: string;
}

const Platform_FinishedPlayerBonusesSummary_QueryResult_Normalizer = normalizerCreator<
    TPlatform_FinishedPlayerBonusesSummary_QueryResult,
    TPlatform_FinishedPlayerBonusesSummary_QueryResult_Record,
    TPlatform_FinishedPlayerBonusesSummary_QueryNormalizationData
>(
  "Platform_FinishedPlayerBonusesSummary_QueryResult",
  ERecordName.platformFinishedPlayerBonusesSummaryQueryResult,
  (recordsManager, result, additionalData) => ({
    id: additionalData.resultId,
    finishedPlayerBonusesSummaryId: Platform_FinishedPlayerBonusesSummary_Normalizer(
      recordsManager,
      result.platform.FinishedPlayerBonusesSummary,
      { key: additionalData.resultId },
    ).id,
  }),
);

export type { TPlatform_FinishedPlayerBonusesSummary_QueryResult_Record };
export { Platform_FinishedPlayerBonusesSummary_QueryResult_Normalizer };
