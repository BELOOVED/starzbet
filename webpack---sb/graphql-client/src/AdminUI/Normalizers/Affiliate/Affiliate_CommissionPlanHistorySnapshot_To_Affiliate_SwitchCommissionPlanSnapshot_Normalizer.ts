import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { EAffiliate_Typename } from "../../../Core/Generated/Services/Affiliate/Models/EAffiliate_Typename";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import {
  type TAffiliate_CommissionPlanHistorySnapshot_Fragment,
} from "../../Generated/Services/Affiliate/Types/TAffiliate_CommissionPlanHistorySnapshot_Fragment";
import { Affiliate_SwitchCommissionPlanSnapshot_Normalizer } from "./Affiliate_SwitchCommissionPlanSnapshot_Normalizer";

type TAffiliate_CommissionPlanHistorySnapshot_To_Affiliate_SwitchCommissionPlanSnapshot_Record = TRecord & {
  ids: string[];
};

type TAffiliate_CommissionPlanHistorySnapshot_To_Affiliate_SwitchCommissionPlanSnapshot_AdditionalData = { id: string; };

const Affiliate_CommissionPlanHistorySnapshot_To_Affiliate_SwitchCommissionPlanSnapshot_Normalizer =
  normalizerCreator<TAffiliate_CommissionPlanHistorySnapshot_Fragment,
    TAffiliate_CommissionPlanHistorySnapshot_To_Affiliate_SwitchCommissionPlanSnapshot_Record,
    TAffiliate_CommissionPlanHistorySnapshot_To_Affiliate_SwitchCommissionPlanSnapshot_AdditionalData>(
      EAffiliate_Typename.affiliateCommissionPlanHistorySnapshot,
      ERecordName.affiliateCommissionPlanHistorySnapshotToAffiliateSwitchCommissionPlanSnapshot,
      (recordsManager, fragment, additionalData) => ({
        id: additionalData.id,
        ids: fragment.switchTo.map((commissionPlan) => {
          Affiliate_SwitchCommissionPlanSnapshot_Normalizer(recordsManager, commissionPlan, null);

          return commissionPlan.id;
        }),
      }),
    );

export type { TAffiliate_CommissionPlanHistorySnapshot_To_Affiliate_SwitchCommissionPlanSnapshot_Record };
export { Affiliate_CommissionPlanHistorySnapshot_To_Affiliate_SwitchCommissionPlanSnapshot_Normalizer };
