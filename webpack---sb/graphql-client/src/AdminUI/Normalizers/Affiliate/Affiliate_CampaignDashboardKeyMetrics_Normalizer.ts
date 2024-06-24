import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { EAffiliate_Typename } from "../../../Core/Generated/Services/Affiliate/Models/EAffiliate_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TAffiliate_CampaignDashboardKeyMetricsResult_Fragment,
} from "../../Generated/Services/Affiliate/Types/TAffiliate_CampaignDashboardKeyMetricsResult_Fragment";
import {
  type TAffiliate_CampaignDashboardKeyMetrics_QueryNormalizationData,
} from "../../Generated/Services/Affiliate/Types/TAffiliate_CampaignDashboardKeyMetrics_QueryNormalizationData";

type TAffiliate_CampaignDashboardKeyMetrics_Record = TRecord & {
  activeCampaigns: number;
  expiringToday: number;
  totalAssets: number;
};

const Affiliate_CampaignDashboardKeyMetrics_Normalizer = normalizerCreator<TAffiliate_CampaignDashboardKeyMetricsResult_Fragment,
  TAffiliate_CampaignDashboardKeyMetrics_Record,
  TAffiliate_CampaignDashboardKeyMetrics_QueryNormalizationData>(
    EAffiliate_Typename.affiliateCampaignDashboardKeyMetrics,
    ERecordName.affiliateCampaignDashboardKeyMetrics,
    (recordsManager, fragment, additionalData) => ({
      id: additionalData.resultId,
      activeCampaigns: fragment.activeCampaigns,
      expiringToday: fragment.expiringToday,
      totalAssets: fragment.totalAssets,
    }),
  );

export type { TAffiliate_CampaignDashboardKeyMetrics_Record };
export { Affiliate_CampaignDashboardKeyMetrics_Normalizer };
