import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { type TMoney_Fragment } from "../../../Core/Generated/Services/Common/Types/TMoney_Fragment";
import { EAffiliate_Typename } from "../../../Core/Generated/Services/Affiliate/Models/EAffiliate_Typename";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TAffiliate_PlayerTransactionSummaryResult_Fragment,
} from "../../Generated/Services/Affiliate/Types/TAffiliate_PlayerTransactionSummaryResult_Fragment";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import {
  type TAffiliate_FakePlayerTransactionSummaryResult_Fragment,
} from "../../Generated/Services/Affiliate/Types/TAffiliate_FakePlayerTransactionSummaryResult_Fragment";

type TAffiliate_PlayerTransactionSummaryResult_Record = TRecord & {
  betsCount: number;
  betsSum: TMoney_Fragment;
  ggr: TMoney_Fragment;
  ngr: TMoney_Fragment;
  depositsCount: number;
  depositsSum: TMoney_Fragment;
  depositsWithdrawalsDifferenceSum: TMoney_Fragment;
  withdrawalsCount: number;
  withdrawalsSum: TMoney_Fragment;
  winsCount: number;
  winsSum: TMoney_Fragment;
  fakeMetrics: TAffiliate_FakePlayerTransactionSummaryResult_Fragment;
};

type TAffiliate_PlayerTransactionSummaryResult_AdditionalData = {
  key: string;
};

const Affiliate_PlayerTransactionSummaryResult_Normalizer = normalizerCreator<
  TAffiliate_PlayerTransactionSummaryResult_Fragment,
  TAffiliate_PlayerTransactionSummaryResult_Record,
  TAffiliate_PlayerTransactionSummaryResult_AdditionalData
>(
  EAffiliate_Typename.affiliatePlayerTransactionSummaryResult,
  ERecordName.affiliatePlayerTransactionSummaryResult,
  (recordsManager, data, additionalData) => ({
    id: `${additionalData.key}_Affiliate_PlayerTransactionSummaryResult`,
    betsCount: data.betsCount,
    betsSum: data.betsSum,
    ggr: data.ggr,
    ngr: data.ngr,
    depositsCount: data.depositsCount,
    depositsSum: data.depositsSum,
    depositsWithdrawalsDifferenceSum: data.depositsWithdrawalsDifferenceSum,
    withdrawalsSum: data.withdrawalsSum,
    withdrawalsCount: data.withdrawalsCount,
    winsCount: data.winsCount,
    winsSum: data.winsSum,
    fakeMetrics: data.fakeMetrics,
  }),
);

export { Affiliate_PlayerTransactionSummaryResult_Normalizer };
export type { TAffiliate_PlayerTransactionSummaryResult_Record };
