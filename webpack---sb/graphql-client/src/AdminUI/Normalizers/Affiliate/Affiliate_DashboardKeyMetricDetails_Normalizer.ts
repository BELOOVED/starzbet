import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { EAffiliate_Typename } from "../../../Core/Generated/Services/Affiliate/Models/EAffiliate_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TAffiliate_DashboardKeyMetricDetailsResult_Fragment,
} from "../../Generated/Services/Affiliate/Types/TAffiliate_DashboardKeyMetricDetailsResult_Fragment";
import {
  type TAffiliate_DashboardKeyMetricDetails_QueryNormalizationData,
} from "../../Generated/Services/Affiliate/Types/TAffiliate_DashboardKeyMetricDetails_QueryNormalizationData";
import {
  type TAffiliate_DashboardOverviewMetrics_Fragment,
} from "../../Generated/Services/Affiliate/Types/TAffiliate_DashboardOverviewMetrics_Fragment";
import {
  type TAffiliate_DashboardFakeOverviewMetrics_Fragment,
} from "../../Generated/Services/Affiliate/Types/TAffiliate_DashboardFakeOverviewMetrics_Fragment";

type TAffiliate_DashboardKeyMetricDetails_Record = TRecord & {
  metrics: TAffiliate_DashboardOverviewMetrics_Fragment;
  fakeMetrics: TAffiliate_DashboardFakeOverviewMetrics_Fragment;
};

const Affiliate_DashboardKeyMetricDetails_Normalizer = normalizerCreator<TAffiliate_DashboardKeyMetricDetailsResult_Fragment,
  TAffiliate_DashboardKeyMetricDetails_Record,
    TAffiliate_DashboardKeyMetricDetails_QueryNormalizationData>(
      EAffiliate_Typename.affiliateDashboardKeyMetricDetails,
      ERecordName.affiliateDashboardKeyMetricDetails,
      (recordsManager, fragment, additionalData) => ({
        id: additionalData.resultId,
        metrics: fragment.metrics,
        fakeMetrics: fragment.fakeMetrics,
      }),
    );

export type { TAffiliate_DashboardKeyMetricDetails_Record };
export { Affiliate_DashboardKeyMetricDetails_Normalizer };
