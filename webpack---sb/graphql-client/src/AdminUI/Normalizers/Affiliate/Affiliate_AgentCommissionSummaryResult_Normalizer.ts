import { type TMoney_Fragment } from "../../../Core/Generated/Services/Common/Types/TMoney_Fragment";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { EAffiliate_Typename } from "../../../Core/Generated/Services/Affiliate/Models/EAffiliate_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TAffiliate_AgentCommissionSummaryResult_Fragment,
} from "../../Generated/Services/Affiliate/Types/TAffiliate_AgentCommissionSummaryResult_Fragment";
import {
  type TAffiliate_AgentCommissionSummary_QueryNormalizationData,
} from "../../Generated/Services/Affiliate/Types/TAffiliate_AgentCommissionSummary_QueryNormalizationData";

type TAffiliate_AgentCommissionSummaryResult_Record = TRecord & {
  totalSum: TMoney_Fragment;
};

const Affiliate_AgentCommissionSummaryResult_Normalizer = normalizerCreator<TAffiliate_AgentCommissionSummaryResult_Fragment,
  TAffiliate_AgentCommissionSummaryResult_Record,
  TAffiliate_AgentCommissionSummary_QueryNormalizationData>(
    EAffiliate_Typename.affiliateAgentCommissionSummaryResult,
    ERecordName.affiliateAgentCommissionSummaryResult,
    (recordsManager, fragment, additionalData) => ({
      id: additionalData.resultId,
      totalSum: fragment.totalSum,
    }),
  );

export type { TAffiliate_AgentCommissionSummaryResult_Record };
export { Affiliate_AgentCommissionSummaryResult_Normalizer };
