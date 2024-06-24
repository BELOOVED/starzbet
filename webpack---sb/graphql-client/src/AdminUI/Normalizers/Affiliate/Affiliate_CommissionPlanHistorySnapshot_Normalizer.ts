import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { type EAffiliate_CommissionPlanStatus } from "../../../Core/Generated/Services/Affiliate/Models/EAffiliate_CommissionPlanStatus";
import { type TMoneyBag_Fragment } from "../../../Core/Generated/Services/Common/Types/TMoneyBag_Fragment";
import { EAffiliate_Typename } from "../../../Core/Generated/Services/Affiliate/Models/EAffiliate_Typename";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import {
  type TAffiliate_CommissionPlanHistorySnapshot_Fragment,
} from "../../Generated/Services/Affiliate/Types/TAffiliate_CommissionPlanHistorySnapshot_Fragment";
import {
  type TAffiliate_CommissionPlanType_Fragment,
} from "../../Generated/Services/Affiliate/Types/TAffiliate_CommissionPlanType_Fragment";
import {
  type TAffiliate_CommissionPlanLifePeriod_Fragment,
} from "../../Generated/Services/Affiliate/Types/TAffiliate_CommissionPlanLifePeriod_Fragment";
import {
  type TAffiliate_CommissionPlanBonus_Fragment,
} from "../../Generated/Services/Affiliate/Types/TAffiliate_CommissionPlanBonus_Fragment";
import {
  Affiliate_CommissionPlanHistorySnapshot_To_Affiliate_SwitchCommissionPlanSnapshot_Normalizer,
} from "./Affiliate_CommissionPlanHistorySnapshot_To_Affiliate_SwitchCommissionPlanSnapshot_Normalizer";

type TAffiliate_CommissionPlanHistorySnapshot_AdditionalData = { id: string; };

type TAffiliate_CommissionPlanHistorySnapshot_Record = TRecord & {
  name: string;
  basePlan: boolean;
  updatedAt: string;
  negativeCarryOver: boolean;
  minWithdrawal: TMoneyBag_Fragment;
  type: TAffiliate_CommissionPlanType_Fragment;
  status: EAffiliate_CommissionPlanStatus;
  lifePeriod: TAffiliate_CommissionPlanLifePeriod_Fragment | null;
  bonus: TAffiliate_CommissionPlanBonus_Fragment | null;
  switchToId: string | null;
};

const Affiliate_CommissionPlanHistorySnapshot_Normalizer = normalizerCreator<TAffiliate_CommissionPlanHistorySnapshot_Fragment,
  TAffiliate_CommissionPlanHistorySnapshot_Record,
  TAffiliate_CommissionPlanHistorySnapshot_AdditionalData>(
    EAffiliate_Typename.affiliateCommissionPlanHistorySnapshot,
    ERecordName.affiliateCommissionPlanHistorySnapshot,
    (recordsManager, fragment, additionalData) => {
      const record: TAffiliate_CommissionPlanHistorySnapshot_Record = {
        id: additionalData.id,
        name: fragment.name,
        basePlan: fragment.basePlan,
        updatedAt: fragment.updatedAt,
        negativeCarryOver: fragment.negativeCarryOver,
        minWithdrawal: fragment.minWithdrawal,
        type: fragment.type,
        status: fragment.status,
        lifePeriod: fragment.lifePeriod,
        bonus: fragment.bonus,
        switchToId: null,
      };

      if (fragment.switchTo) {
        record.switchToId =
          Affiliate_CommissionPlanHistorySnapshot_To_Affiliate_SwitchCommissionPlanSnapshot_Normalizer(
            recordsManager,
            fragment,
            additionalData,
          ).id;
      }

      return record;
    },
  );

export type { TAffiliate_CommissionPlanHistorySnapshot_Record };
export { Affiliate_CommissionPlanHistorySnapshot_Normalizer };
