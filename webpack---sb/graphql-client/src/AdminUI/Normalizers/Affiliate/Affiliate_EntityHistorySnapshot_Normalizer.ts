import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { dataNormalizer, recordNormalizer } from "../../../Core/Helpers/QueryNormalizer";
import { EAffiliate_Typename } from "../../../Core/Generated/Services/Affiliate/Models/EAffiliate_Typename";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import {
  type TAffiliate_EntityHistorySnapshot_Fragment,
} from "../../Generated/Services/Affiliate/Types/TAffiliate_EntityHistorySnapshot_Fragment";
import { Affiliate_CommissionPlanHistorySnapshot_Normalizer } from "./Affiliate_CommissionPlanHistorySnapshot_Normalizer";

type TAffiliate_EntityHistorySnapshot_Record = TRecord & {
  createdAt: string;
  entityId: string;
  operatorId: null | string;
  snapshotId: string;
};

const Affiliate_EntityHistorySnapshot_Normalizer = normalizerCreator<TAffiliate_EntityHistorySnapshot_Fragment,
  TAffiliate_EntityHistorySnapshot_Record>(
    EAffiliate_Typename.affiliateEntityHistorySnapshot,
    ERecordName.affiliateEntityHistorySnapshot,
    (recordsManager, fragment) => {
      if (fragment.operator) {
        recordNormalizer(recordsManager, fragment.operator, null);
      }

      if (fragment.snapshot) {
        switch (fragment.snapshot.__typename) {
          case "Affiliate_CommissionPlanHistorySnapshot":
            Affiliate_CommissionPlanHistorySnapshot_Normalizer(recordsManager, fragment.snapshot, { id: fragment.id });
            break;

          default:
            dataNormalizer(recordsManager, fragment.snapshot);
        }
      }

      return {
        id: fragment.id,
        entityId: fragment.entityId,
        createdAt: fragment.createdAt,
        operatorId: fragment.operatorId,
        snapshotId: fragment.id,
      };
    },
  );

export type { TAffiliate_EntityHistorySnapshot_Record };
export { Affiliate_EntityHistorySnapshot_Normalizer };
