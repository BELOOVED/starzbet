import {
  type TAffiliate_CommissionPlan_FragmentOptionalFields,
} from "../../../Generated/Services/Affiliate/Types/TAffiliate_CommissionPlan_FragmentOptionalFields";
import {
  authOperatorTenantProfileFragmentOptionalFieldsNoRef,
} from "../../Auth/Fragments/Auth_OperatorTenantProfile_FragmentOptionalFields";

const baseAffiliateCommissionPlanFragmentOptionalFields: TAffiliate_CommissionPlan_FragmentOptionalFields = {
  metrics: false,
  operator: {
    avatar: true,
    tenantProfiles: authOperatorTenantProfileFragmentOptionalFieldsNoRef,
    hasActiveSession: false,
  },
  bonus: false,
  minWithdrawal: false,
  type: false,
  lifePeriod: false,
  switchTo: false,
  history: false,
};

export { baseAffiliateCommissionPlanFragmentOptionalFields };
