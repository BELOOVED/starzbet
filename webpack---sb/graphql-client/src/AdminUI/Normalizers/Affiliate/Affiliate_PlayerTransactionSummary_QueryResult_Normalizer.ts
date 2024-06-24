import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { type TAffiliate_PlayerTransactionsSummary_QueryResult } from "../../Generated/Services/Affiliate/Types/TAffiliate_PlayerTransactionsSummary_QueryResult";
import { type TAffiliate_PlayerTransactionsSummary_QueryNormalizationData } from "../../Generated/Services/Affiliate/Types/TAffiliate_PlayerTransactionsSummary_QueryNormalizationData";
import { Affiliate_PlayerTransactionSummaryResult_Normalizer } from "./Affiliate_PlayerTransactionSummaryResult_Normalizer";

type TAffiliate_PlayerTransactionSummary_QueryResult_Record = TRecord & {
  summaryId: string;
};

const Affiliate_PlayerTransactionSummary_QueryResult_Normalizer = normalizerCreator<
  TAffiliate_PlayerTransactionsSummary_QueryResult,
  TAffiliate_PlayerTransactionSummary_QueryResult_Record,
  TAffiliate_PlayerTransactionsSummary_QueryNormalizationData
>(
  "Affiliate_PlayerTransactionsSummary_QueryResult",
  ERecordName.affiliatePlayerTransactionSummaryQueryResult,
  (recordsManager, result, additionalData) => ({
    id: additionalData.resultId,
    summaryId: Affiliate_PlayerTransactionSummaryResult_Normalizer(
      recordsManager,
      result.affiliate.PlayerTransactionsSummary,
      {
        key: additionalData.resultId,
      },
    ).id,
  }),
);

export type { TAffiliate_PlayerTransactionSummary_QueryResult_Record };
export { Affiliate_PlayerTransactionSummary_QueryResult_Normalizer };
