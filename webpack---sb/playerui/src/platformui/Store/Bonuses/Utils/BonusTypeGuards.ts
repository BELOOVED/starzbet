import type {
  TPlatform_Bonus_Fragment,
  TPlatform_BonusCashbackSize_Fragment,
  TPlatform_BonusEligibilityCasinoCriteria_Fragment,
  TPlatform_BonusEligibilityCriteria_Fragment,
  TPlatform_BonusEligibilityDepositRule_Fragment,
  TPlatform_BonusEligibilityDepositRuleProgress_Fragment,
  TPlatform_BonusEligibilityLiveCasinoCriteria_Fragment,
  TPlatform_BonusEligibilityProductCriteriaRuleProgress_Fragment,
  TPlatform_BonusEligibilityProductsRule_Fragment,
  TPlatform_BonusEligibilityProductsRule_Template_Fragment,
  TPlatform_BonusEligibilityProductsRuleProgress_Fragment,
  TPlatform_BonusEligibilityRule_Fragment,
  TPlatform_BonusEligibilityRule_Template_Fragment,
  TPlatform_BonusEligibilityRuleProgress_Fragment,
  TPlatform_BonusEligibilitySportsbookCriteria_Fragment,
  TPlatform_BonusEligibilityTotalCountRuleCriteria_Fragment,
  TPlatform_BonusEligibilityTotalCountRuleProgress_Fragment,
  TPlatform_BonusEligibilityTotalTurnoverRuleCriteria_Fragment,
  TPlatform_BonusEligibilityTotalTurnoverRuleProgress_Fragment,
  TPlatform_BonusExternalFreeBetCasinoCriteria_Fragment,
  TPlatform_BonusExternalFreeBetCasinoFilterProgress_Fragment,
  TPlatform_BonusExternalFreeBetCriteriaFilterProgress_Fragment,
  TPlatform_BonusExternalFreeBetSportsbookCriteria_Fragment,
  TPlatform_BonusFixedFreeSpinsAmountStrategy_Fragment,
  TPlatform_BonusFreeBetSize_Fragment,
  TPlatform_BonusFreeSpinsAmountStrategy_Fragment,
  TPlatform_BonusInternalFreeBetCasinoCriteria_Fragment,
  TPlatform_BonusInternalFreeBetCriteriaFilterProgress_Fragment,
  TPlatform_BonusInternalFreeBetGamesCriteria_Fragment,
  TPlatform_BonusInternalFreeBetLiveCasinoCriteria_Fragment,
  TPlatform_BonusInternalFreeBetSportsbookCriteria_Fragment,
  TPlatform_BonusMonetarySize_Fragment,
  TPlatform_BonusPercentageSize_Fragment,
  TPlatform_BonusProductFreeBetProgress_Fragment,
  TPlatform_BonusProductWageringProgress_Fragment,
  TPlatform_BonusSize_Fragment,
  TPlatform_BonusSize_Template_Fragment,
  TPlatform_BonusWageringCasinoCriteria_Fragment,
  TPlatform_BonusWageringGamesCriteria_Fragment,
  TPlatform_BonusWageringLiveCasinoCriteria_Fragment,
  TPlatform_BonusWageringSportsbookCriteria_Fragment,
  TPlatform_PlayerBonus_Fragment,
} from "@sb/graphql-client/PlayerUI";
import {
  type TBonusCriteria,
  type TBonusTemplateCriteria,
  type TEligibilityAggregateCriteria,
  type TEligibilityAggregateRuleCriteriaProgress,
  type TEligibilityProductCriteria,
  type TSportsbookCriteria,
} from "../Model/Types/BonusTypeShortcuts";

const isBonus = (node: TPlatform_Bonus_Fragment | TPlatform_PlayerBonus_Fragment): node is TPlatform_Bonus_Fragment =>
  node.__typename === "Platform_Bonus";

const isWageringSportsbookCriteria = (node: TBonusCriteria): node is TPlatform_BonusWageringSportsbookCriteria_Fragment =>
  node.__typename === "Platform_BonusWageringSportsbookCriteria";

const isWageringSportsbookCriteriaTemplate = (node: TBonusTemplateCriteria): node is TPlatform_BonusWageringSportsbookCriteria_Fragment =>
  node.__typename === "Platform_BonusWageringSportsbookCriteria";

const isWageringCasinoCriteria = (node: TBonusCriteria): node is TPlatform_BonusWageringCasinoCriteria_Fragment =>
  node.__typename === "Platform_BonusWageringCasinoCriteria";

const isWageringCasinoCriteriaTemplate = (node: TBonusTemplateCriteria): node is TPlatform_BonusWageringCasinoCriteria_Fragment =>
  node.__typename === "Platform_BonusWageringCasinoCriteria";

const isWageringLiveCasinoCriteria = (node: TBonusCriteria): node is TPlatform_BonusWageringLiveCasinoCriteria_Fragment =>
  node.__typename === "Platform_BonusWageringLiveCasinoCriteria";

const isWageringLiveCasinoCriteriaTemplate = (node: TBonusTemplateCriteria): node is TPlatform_BonusWageringLiveCasinoCriteria_Fragment =>
  node.__typename === "Platform_BonusWageringLiveCasinoCriteria";

const isWageringGamesCriteria = (node: TBonusCriteria): node is TPlatform_BonusWageringGamesCriteria_Fragment =>
  node.__typename === "Platform_BonusWageringGamesCriteria";

const isWageringGamesCriteriaTemplate = (node: TBonusTemplateCriteria): node is TPlatform_BonusWageringGamesCriteria_Fragment =>
  node.__typename === "Platform_BonusWageringGamesCriteria";

const isExternalFreeBetSportsbookCriteria = (node: TBonusCriteria): node is TPlatform_BonusExternalFreeBetSportsbookCriteria_Fragment =>
  node.__typename === "Platform_BonusExternalFreeBetSportsbookCriteria";

const isExternalFreeBetCasinoCriteria = (node: TBonusCriteria): node is TPlatform_BonusExternalFreeBetCasinoCriteria_Fragment =>
  node.__typename === "Platform_BonusExternalFreeBetCasinoCriteria";

const isInternalFreeBetSportsbookCriteria = (node: TBonusCriteria): node is TPlatform_BonusInternalFreeBetSportsbookCriteria_Fragment =>
  node.__typename === "Platform_BonusInternalFreeBetSportsbookCriteria";

const isInternalFreeBetCasinoCriteria = (node: TBonusCriteria): node is TPlatform_BonusInternalFreeBetCasinoCriteria_Fragment =>
  node.__typename === "Platform_BonusInternalFreeBetCasinoCriteria";

const isInternalFreeBetLiveCasinoCriteria = (node: TBonusCriteria): node is TPlatform_BonusInternalFreeBetLiveCasinoCriteria_Fragment =>
  node.__typename === "Platform_BonusInternalFreeBetLiveCasinoCriteria";

const isInternalFreeBetGamesCriteria = (node: TBonusCriteria): node is TPlatform_BonusInternalFreeBetGamesCriteria_Fragment =>
  node.__typename === "Platform_BonusInternalFreeBetGamesCriteria";

const isSportsbookCriteria = (node: TBonusCriteria): node is TSportsbookCriteria =>
  isWageringSportsbookCriteria(node) || isExternalFreeBetSportsbookCriteria(node) || isInternalFreeBetSportsbookCriteria(node);

const isMonetaryBonusSize = (
  bonusSize: TPlatform_BonusSize_Fragment | TPlatform_BonusSize_Template_Fragment,
): bonusSize is TPlatform_BonusMonetarySize_Fragment =>
  bonusSize.__typename === "Platform_BonusMonetarySize";

const isPercentageBonusSize = (
  bonusSize: TPlatform_BonusSize_Fragment | TPlatform_BonusSize_Template_Fragment,
): bonusSize is TPlatform_BonusPercentageSize_Fragment =>
  bonusSize.__typename === "Platform_BonusPercentageSize";

const isFreeBetBonusSize = (bonusSize: TPlatform_BonusSize_Fragment): bonusSize is TPlatform_BonusFreeBetSize_Fragment =>
  bonusSize.__typename === "Platform_BonusFreeBetSize";

function assertFreeBetBonusSize(
  bonusSize: TPlatform_BonusSize_Fragment,
  context: string,
): asserts bonusSize is TPlatform_BonusFreeBetSize_Fragment {
  if (!isFreeBetBonusSize(bonusSize)) {
    throw new Error(`[${context}] bonusSize should be 'Platform_BonusFreeBetSize'`);
  }
}

const isFreeBetBonusSizeTemplate = (bonusSize: TPlatform_BonusSize_Template_Fragment): bonusSize is TPlatform_BonusFreeBetSize_Fragment =>
  bonusSize.__typename === "Platform_BonusFreeBetSize";

const isCashbackBonusSize = (bonusSize: TPlatform_BonusSize_Fragment): bonusSize is TPlatform_BonusCashbackSize_Fragment =>
  bonusSize.__typename === "Platform_BonusCashbackSize";

const isFixedFreeSpinsAmountStrategy = (
  freeSpinsAmountStrategy: TPlatform_BonusFreeSpinsAmountStrategy_Fragment,
): freeSpinsAmountStrategy is TPlatform_BonusFixedFreeSpinsAmountStrategy_Fragment =>
  freeSpinsAmountStrategy.__typename === "Platform_BonusFixedFreeSpinsAmountStrategy";

function assertCashbackBonusSize(
  bonusSize: TPlatform_BonusSize_Fragment,
  context: string,
): asserts bonusSize is TPlatform_BonusCashbackSize_Fragment {
  if (!isCashbackBonusSize(bonusSize)) {
    throw new Error(`[${context}] bonusSize should be 'Platform_BonusCashbackSize'`);
  }
}

const isEligibilityDepositRule = (
  node: TPlatform_BonusEligibilityRule_Fragment,
): node is TPlatform_BonusEligibilityDepositRule_Fragment => node.__typename === "Platform_BonusEligibilityDepositRule";

const isEligibilityDepositRuleTemplate = (
  node: TPlatform_BonusEligibilityRule_Template_Fragment,
): node is TPlatform_BonusEligibilityDepositRule_Fragment => node.__typename === "Platform_BonusEligibilityDepositRule";

const isEligibilityProductRule = (
  node: TPlatform_BonusEligibilityRule_Fragment,
): node is TPlatform_BonusEligibilityProductsRule_Fragment => node.__typename === "Platform_BonusEligibilityProductsRule";

const isEligibilityProductRuleTemplate = (
  node: TPlatform_BonusEligibilityRule_Template_Fragment,
): node is TPlatform_BonusEligibilityProductsRule_Template_Fragment => node.__typename === "Platform_BonusEligibilityProductsRule";

const isDepositRuleProgress = (
  node: TPlatform_BonusEligibilityRuleProgress_Fragment,
): node is TPlatform_BonusEligibilityDepositRuleProgress_Fragment =>
  node.__typename === "Platform_BonusEligibilityDepositRuleProgress";

const isProductsRuleProgress = (
  node: TPlatform_BonusEligibilityRuleProgress_Fragment,
): node is TPlatform_BonusEligibilityProductsRuleProgress_Fragment =>
  node.__typename === "Platform_BonusEligibilityProductsRuleProgress";

const isTotalCountRuleProgress = (
  node: TPlatform_BonusEligibilityProductCriteriaRuleProgress_Fragment,
): node is TPlatform_BonusEligibilityTotalCountRuleProgress_Fragment =>
  node.__typename === "Platform_BonusEligibilityTotalCountRuleProgress";

const isTotalTurnoverRuleProgress = (
  node: TPlatform_BonusEligibilityProductCriteriaRuleProgress_Fragment,
): node is TPlatform_BonusEligibilityTotalTurnoverRuleProgress_Fragment =>
  node.__typename === "Platform_BonusEligibilityTotalTurnoverRuleProgress";

const isEligibilitySportsbookCriteria = (
  node: TPlatform_BonusEligibilityCriteria_Fragment,
): node is TPlatform_BonusEligibilitySportsbookCriteria_Fragment =>
  node.__typename === "Platform_BonusEligibilitySportsbookCriteria";

const isEligibilityCasinoCriteria = (
  node: TPlatform_BonusEligibilityCriteria_Fragment,
): node is TPlatform_BonusEligibilityCasinoCriteria_Fragment =>
  node.__typename === "Platform_BonusEligibilityCasinoCriteria";

const isEligibilityLiveCasinoCriteria = (
  node: TPlatform_BonusEligibilityCriteria_Fragment,
): node is TPlatform_BonusEligibilityLiveCasinoCriteria_Fragment =>
  node.__typename === "Platform_BonusEligibilityLiveCasinoCriteria";

const isEligibilityProductCriteria = (
  node: TPlatform_BonusEligibilityCriteria_Fragment,
): node is TEligibilityProductCriteria =>
  isEligibilitySportsbookCriteria(node) || isEligibilityCasinoCriteria(node) || isEligibilityLiveCasinoCriteria(node);

const isEligibilityTotalCountCriteria = (
  node: TPlatform_BonusEligibilityCriteria_Fragment,
): node is TPlatform_BonusEligibilityTotalCountRuleCriteria_Fragment =>
  node.__typename === "Platform_BonusEligibilityTotalCountRuleCriteria";

const isEligibilityTotalTurnoverCriteria = (
  node: TPlatform_BonusEligibilityCriteria_Fragment,
): node is TPlatform_BonusEligibilityTotalTurnoverRuleCriteria_Fragment =>
  node.__typename === "Platform_BonusEligibilityTotalTurnoverRuleCriteria";

const isEligibilityAggregateCriteria = (
  node: TPlatform_BonusEligibilityCriteria_Fragment,
): node is TEligibilityAggregateCriteria =>
  isEligibilityTotalCountCriteria(node) || isEligibilityTotalTurnoverCriteria(node);

const isEligibilityAggregateRuleProgress = (
  criteriaProgress: TPlatform_BonusEligibilityProductCriteriaRuleProgress_Fragment,
): criteriaProgress is TEligibilityAggregateRuleCriteriaProgress =>
  isTotalCountRuleProgress(criteriaProgress) || isTotalTurnoverRuleProgress(criteriaProgress);

const isWageringProgressNode = (
  node: TPlatform_BonusProductWageringProgress_Fragment | TPlatform_BonusProductFreeBetProgress_Fragment,
): node is TPlatform_BonusProductWageringProgress_Fragment => node.__typename === "Platform_BonusProductWageringProgress";

function assertExternalFreeBetCasinoFilterProgress(
  node: TPlatform_BonusInternalFreeBetCriteriaFilterProgress_Fragment | TPlatform_BonusExternalFreeBetCriteriaFilterProgress_Fragment,
): asserts node is TPlatform_BonusExternalFreeBetCasinoFilterProgress_Fragment {
  if (node.__typename !== "Platform_BonusExternalFreeBetCasinoFilterProgress") {
    throw new Error("[progress node should be 'Platform_BonusExternalFreeBetCasinoFilterProgress'");
  }
}

export {
  isBonus,
  isWageringSportsbookCriteria,
  isWageringCasinoCriteria,
  isWageringLiveCasinoCriteria,
  isWageringGamesCriteria,
  isInternalFreeBetSportsbookCriteria,
  isInternalFreeBetCasinoCriteria,
  isInternalFreeBetLiveCasinoCriteria,
  isInternalFreeBetGamesCriteria,
  isFixedFreeSpinsAmountStrategy,
  isFreeBetBonusSize,
  assertFreeBetBonusSize,
  isPercentageBonusSize,
  isMonetaryBonusSize,
  isSportsbookCriteria,
  isExternalFreeBetCasinoCriteria,
  isExternalFreeBetSportsbookCriteria,
  assertCashbackBonusSize,
  isEligibilityAggregateCriteria,
  isEligibilityTotalTurnoverCriteria,
  isEligibilitySportsbookCriteria,
  isTotalTurnoverRuleProgress,
  isTotalCountRuleProgress,
  isProductsRuleProgress,
  isDepositRuleProgress,
  isEligibilityDepositRule,
  isEligibilityProductRule,
  isEligibilityCasinoCriteria,
  isEligibilityLiveCasinoCriteria,
  isEligibilityProductCriteria,
  isEligibilityAggregateRuleProgress,
  isWageringProgressNode,
  assertExternalFreeBetCasinoFilterProgress,

  //template
  isFreeBetBonusSizeTemplate,
  isEligibilityDepositRuleTemplate,
  isEligibilityProductRuleTemplate,
  isWageringSportsbookCriteriaTemplate,
  isWageringCasinoCriteriaTemplate,
  isWageringLiveCasinoCriteriaTemplate,
  isWageringGamesCriteriaTemplate,
};

