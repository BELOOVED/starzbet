import type {
  TPlatform_BonusEligibilityCriteria_Fragment,
  TPlatform_BonusEligibilityProductCriteriaRule_Fragment,
  TPlatform_BonusEligibilityProductCriteriaRuleProgress_Fragment,
  TPlatform_BonusEligibilityRule_Fragment,
  TPlatform_BonusEligibilityRuleProgress_Fragment,
  TPlatform_PlayerBonus_Fragment,
} from "@sb/graphql-client/PlayerUI";
import { getNotNil, isArray, isNotNil, sort } from "@sb/utils";
import { EPlatform_PlayerBonusStatusEnum } from "@sb/graphql-client";
import { isGameProvider, type TGameProviderEnum } from "../../../../common/Store/Provider/ProviderModel";
import { EBonusHelperButton } from "../Model/Enums/EBonusHelperButton";
import {
  assertExternalFreeBetCasinoFilterProgress,
  isDepositRuleProgress,
  isEligibilityAggregateCriteria,
  isEligibilityCasinoCriteria,
  isEligibilityLiveCasinoCriteria,
  isEligibilityProductCriteria,
  isEligibilityProductRule,
  isEligibilitySportsbookCriteria,
  isExternalFreeBetCasinoCriteria,
  isFreeBetBonusSize,
  isProductsRuleProgress,
} from "./BonusTypeGuards";
import { isMixedBonusType, isNotFreeBetBonusType, isPlayerBonusOnWageringStage } from "./CommonBonusUtils";
import { getIsBranchCompleted, getNode } from "./BonusEligibilityUtils";

const BONUS_HELPER_BUTTON_PRIORITY_MAP: Record<EBonusHelperButton, number> = {
  [EBonusHelperButton.casinoFreeSpins]: 1,
  [EBonusHelperButton.deposit]: 2,
  [EBonusHelperButton.betting]: 3,
  [EBonusHelperButton.liveBetting]: 4,
  [EBonusHelperButton.casinoProvider]: 5,
  [EBonusHelperButton.liveCasinoProvider]: 6,
  [EBonusHelperButton.gamesProvider]: 7,
  [EBonusHelperButton.casino]: 8,
  [EBonusHelperButton.liveCasino]: 9,
  [EBonusHelperButton.games]: 10,
};

type THelperButtonFor = EBonusHelperButton |
  [EBonusHelperButton.casinoProvider, TGameProviderEnum] |
  [EBonusHelperButton.liveCasinoProvider, TGameProviderEnum] |
  [EBonusHelperButton.gamesProvider, TGameProviderEnum] |
  null;

const getEligibilityProductHelperButtonFor = (
  criteria: TPlatform_BonusEligibilityCriteria_Fragment,
): THelperButtonFor => {
  if (isEligibilitySportsbookCriteria(criteria)) {
    if (criteria.filter.betRule.live === true) {
      return EBonusHelperButton.liveBetting;
    } else {
      return EBonusHelperButton.betting;
    }
  }

  if (isEligibilityCasinoCriteria(criteria)) {
    const providerCode = criteria.casinoFilter.providerCode;

    if (providerCode && isGameProvider(providerCode)) {
      return [EBonusHelperButton.casinoProvider, providerCode];
    }

    return EBonusHelperButton.casino;
  }

  if (isEligibilityLiveCasinoCriteria(criteria)) {
    const providerCode = criteria.liveCasinoFilter.providerCode;

    if (providerCode && isGameProvider(providerCode)) {
      return [EBonusHelperButton.liveCasinoProvider, providerCode];
    }

    return EBonusHelperButton.liveCasino;
  }

  return null;
};

const getEligibilityHelperButtonFor = (
  rules: TPlatform_BonusEligibilityProductCriteriaRule_Fragment[],
  productsRuleProgress: TPlatform_BonusEligibilityProductCriteriaRuleProgress_Fragment[] | null,
  rootNodeId: string,
): THelperButtonFor => {
  if (!productsRuleProgress) {
    return null;
  }

  // todo get not first notSatisfied rule, but first after tree walk with getIsBranchCompleted
  const firstNotSatisfiedId = productsRuleProgress.find(({ isSatisfiedByPlayer }) => !isSatisfiedByPlayer)?.ruleId;

  if (!firstNotSatisfiedId) {
    return null;
  }

  const rootNode = getNode(rules, rootNodeId);

  const isRootRuleSatisfied = getIsBranchCompleted(rules, productsRuleProgress, rootNodeId, rootNode.eligibilityProductPredicate);

  if (isRootRuleSatisfied) {
    return null;
  }

  const firstNotSatisfiedRule = getNotNil(rules.find((it) => it.ruleId === firstNotSatisfiedId), ["getEligibilityHelperButtonFor"], "firstNotSatisfiedRule");

  if (!firstNotSatisfiedRule.value) {
    return null;
  }

  if (isEligibilityProductCriteria(firstNotSatisfiedRule.value)) {
    return getEligibilityProductHelperButtonFor(firstNotSatisfiedRule.value);
  }

  if (isEligibilityAggregateCriteria(firstNotSatisfiedRule.value)) {
    const notSatisfiedDependRule = firstNotSatisfiedRule.value.rules.reduce<THelperButtonFor>(
      (acc, it) => {
        const progressNode = getNotNil(productsRuleProgress.find(({ ruleId }) => ruleId === it), ["getEligibilityHelperButtonFor"], "progressNode");
        const isCurrentRuleSatisfied = progressNode.isSatisfiedByPlayer;

        if (isCurrentRuleSatisfied) {
          return acc;
        }

        const dependValue = getNotNil(getNode(rules, it).value, ["getEligibilityHelperButtonFor"], "dependValue");

        const candidate = getEligibilityProductHelperButtonFor(dependValue);

        if (isNotNil(acc) && candidate) {
          const current = isArray(acc) ? acc[0] : acc;
          const candidateFor = isArray(candidate) ? candidate[0] : candidate;

          return candidate && BONUS_HELPER_BUTTON_PRIORITY_MAP[current] < BONUS_HELPER_BUTTON_PRIORITY_MAP[candidateFor] ? acc : candidate;
        }

        return candidate;
      },
      null,
    );

    // if all rules satisfied -> to satisfies aggregate rule possible to continue make any of them
    if (notSatisfiedDependRule) {
      return notSatisfiedDependRule;
    }

    const firstNotSatisfiedRuleId = getNotNil(firstNotSatisfiedRule.value.rules[0], ["getEligibilityHelperButtonFor"], "firstNotSatisfiedRuleId");

    const firstNotSatisfiedRuleValue = getNotNil(getNode(rules, firstNotSatisfiedRuleId).value, ["getEligibilityHelperButtonFor"], "firstNotSatisfiedRuleValue");

    return getEligibilityProductHelperButtonFor(firstNotSatisfiedRuleValue);
  }

  return null;
};

const getEligibilityHelperButtonReducer = (rules: TPlatform_BonusEligibilityRule_Fragment[]) =>
  (acc: THelperButtonFor, it: TPlatform_BonusEligibilityRuleProgress_Fragment) => {
    if (isNotNil(acc)) {
      return acc;
    }

    if (isDepositRuleProgress(it) && it.isSatisfiedByPlayer) {
      return null;
    }

    if (isDepositRuleProgress(it) && !it.isSatisfiedByPlayer) {
      return EBonusHelperButton.deposit;
    }

    if (isProductsRuleProgress(it)) {
      const productRule = getNotNil(rules.find(isEligibilityProductRule), ["getEligibilityHelperButtonReducer"], "productRule");
      const rootIndex = getNotNil(productRule.flatRules.indexes.find(({ parentId }) => parentId === null), ["getEligibilityHelperButtonReducer"], "rootIndex");
      const rootNodeId = rootIndex.selfId;

      return getEligibilityHelperButtonFor(productRule.flatRules.rules, it.productRulesProgress, rootNodeId);
    }

    throw new Error(`incorrect typename ${it.__typename}`);
  };

const helperButtonPrioritySorter = (p1: THelperButtonFor, p2: THelperButtonFor) => {
  const p1n = isArray(p1) ? p1[0] : p1;
  const p2n = isArray(p2) ? p2[0] : p2;

  if (!p1n || !p2n) {
    return 0;
  }

  return BONUS_HELPER_BUTTON_PRIORITY_MAP[p1n] - BONUS_HELPER_BUTTON_PRIORITY_MAP[p2n];
};

const getHelperButtonForWagering = (bonus: TPlatform_PlayerBonus_Fragment): THelperButtonFor => {
  const wageringProductRules = bonus.bonusWagering?.productRules ?? [];

  const notCompletedWageringRules = bonus
    .wageringProductsProgress.filter((it) => it.requiredCount && it.requiredCount > it.currentCount)
    .map((progressNode) => {
      const rule = wageringProductRules.find(({ product }) => progressNode.product === product);

      return getNotNil(rule, ["getHelperButtonForWagering"], "rule");
    });

  const rulesToNormalize = notCompletedWageringRules.length ? notCompletedWageringRules : wageringProductRules;

  const buttonsList = rulesToNormalize.map<THelperButtonFor>(({ criteria }) => {
    switch (criteria.__typename) {
      case "Platform_BonusWageringSportsbookCriteria": {
        const someFilterHaveLive = criteria.filters.some((filter) => filter.betRule.live);

        return someFilterHaveLive
          ? EBonusHelperButton.liveBetting
          : EBonusHelperButton.betting;
      }
      case "Platform_BonusWageringCasinoCriteria": {
        const providerCode = criteria.filters.find((filter) => filter.providerCode)?.providerCode;

        return providerCode && isGameProvider(providerCode)
          ? [EBonusHelperButton.casinoProvider, providerCode]
          : EBonusHelperButton.casino;
      }
      case "Platform_BonusWageringLiveCasinoCriteria": {
        const providerCode = criteria.filters.find((filter) => filter.providerCode)?.providerCode;

        return providerCode && isGameProvider(providerCode)
          ? [EBonusHelperButton.liveCasinoProvider, providerCode]
          : EBonusHelperButton.liveCasino;
      }
      case "Platform_BonusWageringGamesCriteria": {
        const providerCode = criteria.filters.find((filter) => filter.providerCode)?.providerCode;

        return providerCode && isGameProvider(providerCode)
          ? [EBonusHelperButton.gamesProvider, providerCode]
          : EBonusHelperButton.games;
      }
      default: {
        throw new Error(`[getHelperButtonFor, buttonForList] unknown criteria: ${JSON.stringify(criteria)}`);
      }
    }
  });

  return sort(helperButtonPrioritySorter, buttonsList)[0] ?? null;
};

const getHelperButtonForFreeBet = (
  bonus: TPlatform_PlayerBonus_Fragment,
  isFreeSpinsLabelEnabledForCasino: boolean,
): THelperButtonFor => {
  const bonusSize = bonus.bonusBonusSize;
  const allFreeBetProducts = isFreeBetBonusSize(bonusSize) ? bonusSize.rule.productRules : [];
  // 'externalFreeBetCasinoCriteria' always have fixed freeSpins count
  // and if it is not completed, it will be listed in 'notCompletedFreeBetRules'.
  const internalFreeBetProducts = allFreeBetProducts.filter((it) => !isExternalFreeBetCasinoCriteria(it.criteria));

  const notCompletedFreeBetRules = bonus
    .freeBetProductsProgress.filter((it) => it.maxCount && it.maxCount > it.currentCount)
    .map((progressNode) => {
      const rule = allFreeBetProducts.find(({ product }) => progressNode.product === product);

      return getNotNil(rule, ["getHelperButtonForFreeBet"], "rule");
    });

  const rulesToNormalize = notCompletedFreeBetRules.length ? notCompletedFreeBetRules : internalFreeBetProducts;

  const buttonsList = rulesToNormalize.map<THelperButtonFor>(({ criteria }) => {
    switch (criteria.__typename) {
      case "Platform_BonusInternalFreeBetSportsbookCriteria":
      case "Platform_BonusExternalFreeBetSportsbookCriteria": {
        const someFilterHaveLive = criteria.filters.some((filter) => filter.betRule.live);

        return someFilterHaveLive
          ? EBonusHelperButton.liveBetting
          : EBonusHelperButton.betting;
      }
      case "Platform_BonusInternalFreeBetCasinoCriteria": {
        const providerCode = criteria.filters.find((filter) => filter.providerCode)?.providerCode;

        return providerCode && isGameProvider(providerCode)
          ? [EBonusHelperButton.casinoProvider, providerCode]
          : EBonusHelperButton.casino;
      }
      case "Platform_BonusInternalFreeBetLiveCasinoCriteria": {
        const providerCode = criteria.filters.find((filter) => filter.providerCode)?.providerCode;

        return providerCode && isGameProvider(providerCode)
          ? [EBonusHelperButton.liveCasinoProvider, providerCode]
          : EBonusHelperButton.liveCasino;
      }
      case "Platform_BonusInternalFreeBetGamesCriteria": {
        const providerCode = criteria.filters.find((filter) => filter.providerCode)?.providerCode;

        return providerCode && isGameProvider(providerCode)
          ? [EBonusHelperButton.gamesProvider, providerCode]
          : EBonusHelperButton.games;
      }
      case "Platform_BonusExternalFreeBetCasinoCriteria": {
        if (isFreeSpinsLabelEnabledForCasino) {
          return EBonusHelperButton.casinoFreeSpins;
        }
        const progressNode = getNotNil(
          bonus.freeBetProductsProgress.find((it) => it.__typename === "Platform_BonusProductExternalFreeBetProgress"),
          ["getHelperButtonForFreeBet"],
          "progressNode",
        );

        const asserted = progressNode.filtersProgresses.map((it) => {
          assertExternalFreeBetCasinoFilterProgress(it);

          return it;
        });

        const exactlyNotCompleted = asserted.find((it) => {
          const { currentCount, externalFilter: { freeSpinsAmountStrategy } } = it;

          switch (freeSpinsAmountStrategy.__typename) {
            case "Platform_BonusFixedFreeSpinsAmountStrategy": {
              const isBonusBuy = freeSpinsAmountStrategy.amount === -1;

              if (isBonusBuy) {
                return currentCount > 0;
              }

              return currentCount < freeSpinsAmountStrategy.amount;
            }
            case "Platform_BonusWithWeightFreeSpinsAmountStrategy": {
              const minAmount = freeSpinsAmountStrategy.minAmount;

              return currentCount < minAmount;
            }
            default: {
              throw new Error(`[getHelperButtonForFreeBet unknown freeSpinsAmountStrategy: ${JSON.stringify(freeSpinsAmountStrategy)}`);
            }
          }
        })?.externalFilter.providerCode;

        return exactlyNotCompleted && isGameProvider(exactlyNotCompleted)
          ? [EBonusHelperButton.casinoProvider, exactlyNotCompleted]
          : EBonusHelperButton.casino;
      }
      default: {
        throw new Error(`[getHelperButtonFor, buttonForList] unknown criteria: ${JSON.stringify(criteria)}`);
      }
    }
  });

  return sort(helperButtonPrioritySorter, buttonsList)[0] ?? null;
};

const getHelperButtonFor = (
  bonus: TPlatform_PlayerBonus_Fragment,
  isFreeSpinsLabelEnabledForCasino: boolean,
): THelperButtonFor => {
  if (bonus.status === EPlatform_PlayerBonusStatusEnum.claimed) {
    if (bonus.eligibilityActivateRules.length === 0) {
      return null;
    }

    return bonus.eligibilityActivationRulesCompletionInfo.reduce(getEligibilityHelperButtonReducer(bonus.eligibilityActivateRules), null);
  } else {
    const isOnWageringStage = isPlayerBonusOnWageringStage(bonus);

    const shouldUseWageringProducts = isNotFreeBetBonusType(bonus.bonusType) ||
      (isMixedBonusType(bonus.bonusType) && isOnWageringStage);

    if (shouldUseWageringProducts) {
      return getHelperButtonForWagering(bonus);
    }

    return getHelperButtonForFreeBet(bonus, isFreeSpinsLabelEnabledForCasino);
  }
};

export {
  type THelperButtonFor,
  getEligibilityHelperButtonReducer,
  getHelperButtonFor,
};
