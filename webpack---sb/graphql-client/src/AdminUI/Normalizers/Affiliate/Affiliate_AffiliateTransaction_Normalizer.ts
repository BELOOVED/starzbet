import { isNotNil } from "@sb/utils";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { recordNormalizer } from "../../../Core/Helpers/QueryNormalizer";
import { type TMoney_Fragment } from "../../../Core/Generated/Services/Common/Types/TMoney_Fragment";
import { type EAffiliate_TransactionType } from "../../../Core/Generated/Services/Affiliate/Models/EAffiliate_TransactionType";
import { EAffiliate_Typename } from "../../../Core/Generated/Services/Affiliate/Models/EAffiliate_Typename";
import {
  type TAffiliate_AffiliateTransaction_Fragment,
} from "../../Generated/Services/Affiliate/Types/TAffiliate_AffiliateTransaction_Fragment";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import {
  type TAffiliate_AffiliateTransactions_QueryNormalizationData,
} from "../../Generated/Services/Affiliate/Types/TAffiliate_AffiliateTransactions_QueryNormalizationData";

type TAffiliate_AffiliateTransaction_Record = TRecord & {
  id: string;
  actionNoteId: string | null;
  type: EAffiliate_TransactionType;
  createdAt: string;
  amount: TMoney_Fragment;
  balanceAfter: TMoney_Fragment;
  balanceBefore: TMoney_Fragment;
};

const Affiliate_AffiliateTransaction_Normalizer = normalizerCreator<
  TAffiliate_AffiliateTransaction_Fragment,
  TAffiliate_AffiliateTransaction_Record,
  TAffiliate_AffiliateTransactions_QueryNormalizationData
>(
  EAffiliate_Typename.affiliateAffiliateTransaction,
  ERecordName.affiliateAffiliateTransaction,
  (recordsManager, fragment) => {
    if (isNotNil(fragment.actionNote)) {
      recordNormalizer(recordsManager, fragment.actionNote, null);
    }

    return {
      id: fragment.id,
      actionNoteId: fragment.actionNote?.id ?? null,
      type: fragment.type,
      createdAt: fragment.createdAt,
      amount: fragment.amount,
      balanceAfter: fragment.balanceAfter,
      balanceBefore: fragment.balanceBefore,
    };
  },
);

export type { TAffiliate_AffiliateTransaction_Record };
export { Affiliate_AffiliateTransaction_Normalizer };
