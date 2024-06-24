import { JSONParse } from "@sb/utils";
import type { EAffiliateAcl } from "@sb/sdk/Acl/AffiliateACL";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TAffiliate_AffiliateAclTree_QueryResult,
} from "../../Generated/Services/Affiliate/Types/TAffiliate_AffiliateAclTree_QueryResult";
import {
  type TAffiliate_AffiliateAclTree_QueryNormalizationData,
} from "../../Generated/Services/Affiliate/Types/TAffiliate_AffiliateAclTree_QueryNormalizationData";

type TAffiliate_Acl_TreeNode = {
  kind: "AclTree";
  name: string;
  nodes: TAffiliate_Acl_Node[];
};

type TAffiliate_Acl_LeafNode = {
  kind: "AclLeaf";
  name: string;
  identifier: EAffiliateAcl;
};

type TAffiliate_Acl_Node = TAffiliate_Acl_TreeNode | TAffiliate_Acl_LeafNode;

type TAffiliate_AffiliateAclTree_QueryResult_Record = TRecord & {
  nodes: TAffiliate_Acl_Node[];
};

const Affiliate_AffiliateAclTree_QueryResult_Normalizer = normalizerCreator<
  TAffiliate_AffiliateAclTree_QueryResult,
  TAffiliate_AffiliateAclTree_QueryResult_Record,
  TAffiliate_AffiliateAclTree_QueryNormalizationData
>(
  "Affiliate_AffiliateAclTree_QueryResult",
  ERecordName.affiliateAffiliateAclTreeQueryResult,
  (recordsManager, result, additionalData) => ({
    id: additionalData.resultId,
    nodes: JSONParse<TAffiliate_Acl_Node[]>(result.affiliate.AffiliateAclTree),
  }),
);

export type { TAffiliate_AffiliateAclTree_QueryResult_Record };
export { Affiliate_AffiliateAclTree_QueryResult_Normalizer };
