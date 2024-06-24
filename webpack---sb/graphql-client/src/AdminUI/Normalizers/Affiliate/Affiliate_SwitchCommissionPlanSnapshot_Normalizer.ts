import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { EAffiliate_Typename } from "../../../Core/Generated/Services/Affiliate/Models/EAffiliate_Typename";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import {
  type TAffiliate_SwitchCommissionPlanSnapshot_Fragment,
} from "../../Generated/Services/Affiliate/Types/TAffiliate_SwitchCommissionPlanSnapshot_Fragment";

type TAffiliate_SwitchCommissionPlanSnapshot_Record = TRecord & {
  name: string;
  basePlan: boolean;
};

const Affiliate_SwitchCommissionPlanSnapshot_Normalizer = normalizerCreator<TAffiliate_SwitchCommissionPlanSnapshot_Fragment,
  TAffiliate_SwitchCommissionPlanSnapshot_Record>(
    EAffiliate_Typename.affiliateSwitchCommissionPlanSnapshot,
    ERecordName.affiliateSwitchCommissionPlanSnapshot,
    (recordsManager, fragment) => ({
      id: fragment.id,
      name: fragment.name,
      basePlan: fragment.basePlan,
    }),
  );

export type { TAffiliate_SwitchCommissionPlanSnapshot_Record };
export { Affiliate_SwitchCommissionPlanSnapshot_Normalizer };
