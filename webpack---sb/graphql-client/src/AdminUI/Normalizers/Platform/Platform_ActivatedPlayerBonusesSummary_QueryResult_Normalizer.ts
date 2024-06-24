import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TPlatform_ActivatedPlayerBonusesSummary_QueryResult,
} from "../../Generated/Services/Platform/Types/TPlatform_ActivatedPlayerBonusesSummary_QueryResult";
import {
  type TPlatform_ActivatedPlayerBonusesSummary_QueryNormalizationData,
} from "../../Generated/Services/Platform/Types/TPlatform_ActivatedPlayerBonusesSummary_QueryNormalizationData";
import { Platform_ActivatedPlayerBonusesSummary_Normalizer } from "./Platform_ActivatedPlayerBonusesSummary_Normalizer";

type TPlatform_ActivatedPlayerBonusesSummary_QueryResult_Record = TRecord & {
    activatedPlayerBonusesSummaryId: string;
}

const Platform_ActivatedPlayerBonusesSummary_QueryResult_Normalizer = normalizerCreator<
    TPlatform_ActivatedPlayerBonusesSummary_QueryResult,
    TPlatform_ActivatedPlayerBonusesSummary_QueryResult_Record,
    TPlatform_ActivatedPlayerBonusesSummary_QueryNormalizationData
>(
  "Platform_ActivatedPlayerBonusesSummary_QueryResult",
  ERecordName.platformActivatedPlayerBonusesSummaryQueryResult,
  (recordsManager, result, additionalData) => ({
    id: additionalData.resultId,
    activatedPlayerBonusesSummaryId: Platform_ActivatedPlayerBonusesSummary_Normalizer(
      recordsManager,
      result.platform.ActivatedPlayerBonusesSummary,
      { key: additionalData.resultId },
    ).id,
  }),
);

export type { TPlatform_ActivatedPlayerBonusesSummary_QueryResult_Record };
export { Platform_ActivatedPlayerBonusesSummary_QueryResult_Normalizer };
