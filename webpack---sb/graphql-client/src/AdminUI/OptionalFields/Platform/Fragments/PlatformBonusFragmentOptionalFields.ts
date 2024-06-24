import {
  type TPlatform_Bonus_FragmentOptionalFields,
} from "../../../Generated/Services/Platform/Types/TPlatform_Bonus_FragmentOptionalFields";
import {
  type TPlatform_BonusEligibilityRule_FragmentOptionalFields,
} from "../../../Generated/Services/Platform/Types/TPlatform_BonusEligibilityRule_FragmentOptionalFields";
import {
  type TPlatform_BonusSize_FragmentOptionalFields,
} from "../../../Generated/Services/Platform/Types/TPlatform_BonusSize_FragmentOptionalFields";
import {
  type TPlatform_BonusWagering_FragmentOptionalFields,
} from "../../../Generated/Services/Platform/Types/TPlatform_BonusWagering_FragmentOptionalFields";
import {
  type TPlatform_BonusInternalFreeBetCasinoFilter_FragmentOptionalFields,
} from "../../../Generated/Services/Platform/Types/TPlatform_BonusInternalFreeBetCasinoFilter_FragmentOptionalFields";
import {
  affiliateAffiliateFragmentOptionalFieldsNoRef,
} from "../../Affiliate/Fragments/AffiliateAffiliateFragmentOptionalFields";
import {
  authOperatorFragmentOptionalFieldsWithAvatarWithProfiles,
} from "../../Auth/Fragments/AuthOperatorFragmentOptionalFields";
import {
  providerManagerProviderFragmentOptionalFieldsNoRef,
} from "../../ProviderManager/Fragments/ProviderManagerProviderFragmentOptionalFields";
import { platformGameFragmentOptionalFieldsNoRef } from "./PlatformGameFragmentOptionalFields";
import { platformPaymentMethodFragmentOptionalFieldsNoRef } from "./PlatformPaymentMethodFragmentOptionalFields";
import { platformBonusRuleFragmentOptionalFieldsNoRef } from "./PlatformBonusRuleFragmentOptionalFields";

const sportFilterNoRef = {
  sport: false,
  category: false,
  tournament: false,
  event: false,
} as const;

const casinoFilterWithGamesAndProviders: TPlatform_BonusInternalFreeBetCasinoFilter_FragmentOptionalFields = {
  gameTags: { tagGroup: false },
  games: platformGameFragmentOptionalFieldsNoRef,
  provider: providerManagerProviderFragmentOptionalFieldsNoRef,
} as const;

const casinoFilterNoRef = {
  gameTags: false,
  games: false,
  provider: false,
} as const;

const bonusSizeWithGamesAndProviders = {
  platformBonusFreeBetSize: {
    rule: {
      productRules: {
        criteria: {
          platformBonusExternalFreeBetSportsbookCriteria: {
            filters: sportFilterNoRef,
          },
          platformBonusInternalFreeBetSportsbookCriteria: {
            filters: sportFilterNoRef,
          },
          platformBonusInternalFreeBetCasinoCriteria: {
            filters: casinoFilterWithGamesAndProviders,
          },
          platformBonusInternalFreeBetLiveCasinoCriteria: {
            filters: casinoFilterWithGamesAndProviders,
          },
          platformBonusInternalFreeBetGamesCriteria: {
            filters: casinoFilterWithGamesAndProviders,
          },
          platformBonusExternalFreeBetCasinoCriteria: {
            externalFilters: casinoFilterWithGamesAndProviders,
          },
        },
      },
    },
  },
} satisfies TPlatform_BonusSize_FragmentOptionalFields;

const bonusSizeNoRef = {
  platformBonusFreeBetSize: {
    rule: {
      productRules: {
        criteria: {
          platformBonusExternalFreeBetSportsbookCriteria: {
            filters: sportFilterNoRef,
          },
          platformBonusInternalFreeBetSportsbookCriteria: {
            filters: sportFilterNoRef,
          },
          platformBonusInternalFreeBetCasinoCriteria: {
            filters: casinoFilterNoRef,
          },
          platformBonusInternalFreeBetLiveCasinoCriteria: {
            filters: casinoFilterNoRef,
          },
          platformBonusInternalFreeBetGamesCriteria: {
            filters: casinoFilterNoRef,
          },
          platformBonusExternalFreeBetCasinoCriteria: {
            externalFilters: casinoFilterNoRef,
          },
        },
      },
    },
  },
} satisfies TPlatform_BonusSize_FragmentOptionalFields;

const eligibilityRuleForDetails = {
  platformBonusEligibilityDepositRule: {
    criteria: {
      paymentMethods: platformPaymentMethodFragmentOptionalFieldsNoRef,
    },
  },
  platformBonusEligibilityProductsRule: {
    flatRules: {
      rules: {
        value: {
          platformBonusEligibilitySportsbookCriteria: {
            sportsbookFilter: sportFilterNoRef,
          },
          platformBonusEligibilityLiveCasinoCriteria: {
            liveCasinoFilter: casinoFilterWithGamesAndProviders,
          },
          platformBonusEligibilityCasinoCriteria: {
            casinoFilter: casinoFilterWithGamesAndProviders,
          },
        },
      },
    },
  },
} satisfies TPlatform_BonusEligibilityRule_FragmentOptionalFields;

const eligibilityRuleNoRef = {
  platformBonusEligibilityDepositRule: {
    criteria: {
      paymentMethods: false,
    },
  },
  platformBonusEligibilityProductsRule: {
    flatRules: {
      rules: {
        value: {
          platformBonusEligibilitySportsbookCriteria: {
            sportsbookFilter: sportFilterNoRef,
          },
          platformBonusEligibilityLiveCasinoCriteria: {
            liveCasinoFilter: casinoFilterNoRef,
          },
          platformBonusEligibilityCasinoCriteria: {
            casinoFilter: casinoFilterNoRef,
          },
        },
      },
    },
  },
} satisfies TPlatform_BonusEligibilityRule_FragmentOptionalFields;

const wageringWithGamesAndProviders = {
  productRules: {
    criteria: {
      platformBonusWageringSportsbookCriteria: {
        sportsbookFilters: sportFilterNoRef,
      },
      platformBonusWageringCasinoCriteria: {
        casinoFilters: casinoFilterWithGamesAndProviders,
        casinoExcludeFilters: casinoFilterWithGamesAndProviders,
      },
      platformBonusWageringLiveCasinoCriteria: {
        liveCasinoFilters: casinoFilterWithGamesAndProviders,
        liveCasinoExcludeFilters: casinoFilterWithGamesAndProviders,
      },
      platformBonusWageringGamesCriteria: {
        gamesFilters: casinoFilterWithGamesAndProviders,
        gamesExcludeFilters: casinoFilterWithGamesAndProviders,
      },
    },
  },
} satisfies TPlatform_BonusWagering_FragmentOptionalFields;

const platformBonusFragmentOptionalFieldsNoRef = {
  bonusTags: false,
  bonusSize: bonusSizeNoRef,
  eligibility: false,
  wagering: false,
  operator: false,
  descriptionFiles: false,
  reportsInfo: false,
  reportsWithdrawalsAfterBonusInfo: false,
  bonusShareLimits: false,
  bonusRules: false,
} satisfies TPlatform_Bonus_FragmentOptionalFields;

const platformBonusFragmentOptionalFieldsForDetails = {
  bonusSize: bonusSizeWithGamesAndProviders,
  eligibility: {
    activateRules: eligibilityRuleForDetails,
    claimRules: eligibilityRuleForDetails,
    applyForRequirements: {
      platformBonusPlayerGroupCriteria: { playerGroups: { playersCount: false } },
      platformBonusAffiliateCriteria: { affiliates: affiliateAffiliateFragmentOptionalFieldsNoRef },
    },
    previousBonusRequirements: { previousBonus: platformBonusFragmentOptionalFieldsNoRef },
  },
  wagering: wageringWithGamesAndProviders,
  bonusTags: { tagGroup: false },
  descriptionFiles: true,
  operator: false,
  reportsInfo: false,
  reportsWithdrawalsAfterBonusInfo: false,
  bonusShareLimits: true,
  bonusRules: platformBonusRuleFragmentOptionalFieldsNoRef,
} satisfies TPlatform_Bonus_FragmentOptionalFields;

const platformBonusFragmentOptionalFieldsForTable = {
  bonusSize: bonusSizeNoRef,
  eligibility: {
    activateRules: eligibilityRuleNoRef,
    claimRules: eligibilityRuleNoRef,
    applyForRequirements: {
      platformBonusPlayerGroupCriteria: { playerGroups: { playersCount: false } },
      platformBonusAffiliateCriteria: { affiliates: affiliateAffiliateFragmentOptionalFieldsNoRef },
    },
    previousBonusRequirements: { previousBonus: platformBonusFragmentOptionalFieldsNoRef },
  },
  wagering: {
    productRules: {
      criteria: {
        platformBonusWageringSportsbookCriteria: {
          sportsbookFilters: sportFilterNoRef,
        },
        platformBonusWageringCasinoCriteria: {
          casinoFilters: casinoFilterNoRef,
          casinoExcludeFilters: casinoFilterNoRef,
        },
        platformBonusWageringLiveCasinoCriteria: {
          liveCasinoFilters: casinoFilterNoRef,
          liveCasinoExcludeFilters: casinoFilterNoRef,
        },
        platformBonusWageringGamesCriteria: {
          gamesFilters: casinoFilterNoRef,
          gamesExcludeFilters: casinoFilterNoRef,
        },
      },
    },
  },
  operator: authOperatorFragmentOptionalFieldsWithAvatarWithProfiles,
  bonusTags: { tagGroup: false },
  descriptionFiles: true,
  reportsInfo: false,
  reportsWithdrawalsAfterBonusInfo: false,
  bonusShareLimits: false,
  bonusRules: platformBonusRuleFragmentOptionalFieldsNoRef,
} satisfies TPlatform_Bonus_FragmentOptionalFields;

// just minimal eligibility
const platformBonusFragmentOptionalFieldsForClaimSelect = {
  ...platformBonusFragmentOptionalFieldsNoRef,
  eligibility: {
    activateRules: eligibilityRuleNoRef,
    claimRules: eligibilityRuleNoRef,
    applyForRequirements: {
      platformBonusPlayerGroupCriteria: { playerGroups: false },
      platformBonusAffiliateCriteria: { affiliates: false },
    },
    previousBonusRequirements: { previousBonus: false },
  },
} satisfies TPlatform_Bonus_FragmentOptionalFields;

export {
  platformBonusFragmentOptionalFieldsForDetails,
  platformBonusFragmentOptionalFieldsForTable,
  platformBonusFragmentOptionalFieldsNoRef,
  platformBonusFragmentOptionalFieldsForClaimSelect,
};
