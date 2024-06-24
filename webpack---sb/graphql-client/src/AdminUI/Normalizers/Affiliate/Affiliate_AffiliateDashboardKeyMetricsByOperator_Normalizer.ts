import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { EAffiliate_Typename } from "../../../Core/Generated/Services/Affiliate/Models/EAffiliate_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TAffiliate_AffiliateDashboardKeyMetricsByOperator_Fragment,
} from "../../Generated/Services/Affiliate/Types/TAffiliate_AffiliateDashboardKeyMetricsByOperator_Fragment";
import {
  type TAffiliate_AffiliateDashboardKeyMetricsByOperator_QueryNormalizationData,
} from "../../Generated/Services/Affiliate/Types/TAffiliate_AffiliateDashboardKeyMetricsByOperator_QueryNormalizationData";
import {
  type TAffiliate_AffiliateDashboardMetrics_Fragment,
} from "../../Generated/Services/Affiliate/Types/TAffiliate_AffiliateDashboardMetrics_Fragment";
import {
  type TAffiliate_AffiliateDashboardFakeMetrics_Fragment,
} from "../../Generated/Services/Affiliate/Types/TAffiliate_AffiliateDashboardFakeMetrics_Fragment";

type TAffiliate_AffiliateDashboardKeyMetricsByOperator_Record = TRecord & {
  metrics: TAffiliate_AffiliateDashboardMetrics_Fragment;
  fakeMetrics: TAffiliate_AffiliateDashboardFakeMetrics_Fragment;
};

const Affiliate_AffiliateDashboardKeyMetricsByOperator_Normalizer = normalizerCreator<
  TAffiliate_AffiliateDashboardKeyMetricsByOperator_Fragment,
  TAffiliate_AffiliateDashboardKeyMetricsByOperator_Record,
    TAffiliate_AffiliateDashboardKeyMetricsByOperator_QueryNormalizationData>(
      EAffiliate_Typename.affiliateAffiliateDashboardKeyMetricsByOperator,
      ERecordName.affiliateAffiliateDashboardKeyMetricsByOperator,
      (recordsManager, fragment, additionalData) => ({
        id: additionalData.resultId,
        metrics: fragment.metrics,
        fakeMetrics: fragment.fakeMetrics,
      }),
    );

export type { TAffiliate_AffiliateDashboardKeyMetricsByOperator_Record };
export { Affiliate_AffiliateDashboardKeyMetricsByOperator_Normalizer };
