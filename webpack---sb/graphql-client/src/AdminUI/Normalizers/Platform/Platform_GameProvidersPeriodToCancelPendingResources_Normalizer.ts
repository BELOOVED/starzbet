import { type EProviderCode } from "@sb/betting-core/EProviderCode";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TPlatform_GameProvidersPeriodToCancelPendingResources_QueryResult,
} from "../../Generated/Services/Platform/Types/TPlatform_GameProvidersPeriodToCancelPendingResources_QueryResult";
import {
  type TPlatform_GameProvidersPeriodToCancelPendingResources_QueryNormalizationData,
} from "../../Generated/Services/Platform/Types/TPlatform_GameProvidersPeriodToCancelPendingResources_QueryNormalizationData";

type TPlatform_GameProvidersPeriodToCancelPendingResources = {
  period: number;
  provider: EProviderCode;
}

type TPlatform_GameProvidersPeriodToCancelPendingResources_Record = TRecord & {
  providerPeriods: TPlatform_GameProvidersPeriodToCancelPendingResources[];
};

const Platform_GameProvidersPeriodToCancelPendingResources_Normalizer =
  normalizerCreator<TPlatform_GameProvidersPeriodToCancelPendingResources_QueryResult,
    TPlatform_GameProvidersPeriodToCancelPendingResources_Record,
    TPlatform_GameProvidersPeriodToCancelPendingResources_QueryNormalizationData>(
      "Platform_GameProvidersPeriodToCancelPendingResources_QueryResult",
      ERecordName.platformGameProvidersPeriodToCancelPendingResources,
      (recordsManager, result, additionalData) => ({
        id: additionalData.resultId,
        providerPeriods: result.platform.GameProvidersPeriodToCancelPendingResources,
      }),
    );

export type { TPlatform_GameProvidersPeriodToCancelPendingResources_Record };
export { Platform_GameProvidersPeriodToCancelPendingResources_Normalizer };
