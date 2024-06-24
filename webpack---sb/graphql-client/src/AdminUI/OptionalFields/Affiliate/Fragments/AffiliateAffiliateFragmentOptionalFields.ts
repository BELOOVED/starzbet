import {
  type TAffiliate_Affiliate_FragmentOptionalFields,
} from "../../../Generated/Services/Affiliate/Types/TAffiliate_Affiliate_FragmentOptionalFields";
import {
  baseAffiliateCommissionPlanFragmentOptionalFields,
} from "../../Affiliate/Fragments/BaseAffiliateCommissionPlanFragmentOptionalFields";

const affiliateAffiliateFragmentOptionalFieldsNoRef: TAffiliate_Affiliate_FragmentOptionalFields = {
  linkedPlayer: false,
  group: false,
  commissionPlan: false,
  wallet: false,
  profile: false,
  metrics: false,
  ban: false,
  headAffiliate: false,
  affiliatesReferralCode: false,
  customersReferralCode: false,
  fakeMetrics: false,
};

// todo do not use OF fragments extended them (as is OR extend noRef)
const affiliateAffiliateFragmentOptionalFields: TAffiliate_Affiliate_FragmentOptionalFields = {
  ...affiliateAffiliateFragmentOptionalFieldsNoRef,
  group: {
    metrics: false,
  },
  headAffiliate: {
    ...affiliateAffiliateFragmentOptionalFieldsNoRef,
    group: {
      metrics: false,
    },
    commissionPlan: {
      ...baseAffiliateCommissionPlanFragmentOptionalFields,
      bonus: true,
      minWithdrawal: true,
      type: true,
      lifePeriod: true,
      switchTo: true,
    },
    metrics: true,
  },
  affiliatesReferralCode: true,
  customersReferralCode: true,
};

export {
  affiliateAffiliateFragmentOptionalFieldsNoRef,
  affiliateAffiliateFragmentOptionalFields,
};
