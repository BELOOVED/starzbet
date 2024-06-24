import { recordNormalizer } from "../../../Core/Helpers/QueryNormalizer";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { type ETrafficSourceEnum } from "../../../Core/Generated/Services/Common/Models/ETrafficSourceEnum";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import {
  type TPlatform_FirstTimeSummaryGroupingSet_Fragment,
} from "../../Generated/Services/Platform/Types/TPlatform_FirstTimeSummaryGroupingSet_Fragment";

type TPlatform_FirstTimeSummaryGroupingSet_AdditionalData = { id: string; }

type TPlatform_FirstTimeSummaryGroupingSet_Record = TRecord & {
  trafficSource: ETrafficSourceEnum | null;
  playerAffiliateId: string | null;
  periodStart: string | null;
  periodEnd: string | null;
}

const Platform_FirstTimeSummaryGroupingSet_Normalizer = normalizerCreator<
  TPlatform_FirstTimeSummaryGroupingSet_Fragment,
  TPlatform_FirstTimeSummaryGroupingSet_Record,
  TPlatform_FirstTimeSummaryGroupingSet_AdditionalData
>(
  EPlatform_Typename.platformFirstTimeSummaryGroupingSet,
  ERecordName.platformFirstTimeSummaryGroupingSet,
  (recordsManager, fragment, additionalData) => {
    if (fragment.affiliate) {
      recordNormalizer(recordsManager, fragment.affiliate, null);
    }

    return {
      id: additionalData.id,
      playerAffiliateId: fragment.playerAffiliateId ?? null,
      trafficSource: fragment.trafficSource ?? null,
      periodStart: fragment.periodStart ?? null,
      periodEnd: fragment.periodEnd ?? null,
    };
  },
);

export type { TPlatform_FirstTimeSummaryGroupingSet_Record };
export { Platform_FirstTimeSummaryGroupingSet_Normalizer };
