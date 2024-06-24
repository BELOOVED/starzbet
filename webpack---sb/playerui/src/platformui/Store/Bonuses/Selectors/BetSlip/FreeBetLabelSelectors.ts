import { EBonusProductEnum, ESportsbook_BetTypeEnum } from "@sb/graphql-client";
import {
  createMemoSelector,
  createSimpleSelector,
  getNotNil,
  type IMoney,
  isNil,
  isNotNil,
  withParams,
} from "@sb/utils";
import type {
  TPlatform_Bonus_Fragment,
  TPlatform_BonusEligibilityProductCriteriaRule_Fragment,
  TPlatform_BonusEligibilityRuleProgress_Fragment,
  TPlatform_BonusEligibilitySportsbookCriteria_Fragment,
  TPlatform_PlayerBonus_Fragment,
} from "@sb/graphql-client/PlayerUI";
import { always } from "@sb/utils/Always";
import { type TMixAppState } from "../../../../../sportsbookui/Store/CreateMixInitialState";
import {
  notOutrightOutcomeSelector,
  pickByOutcomeIdSelector,
  sportIdByOutcomeIdSelector,
} from "../../../../../sportsbookui/Store/Feed/Selectors/FeedSelectors";
import { isVirtual } from "../../../../../sportsbookui/Store/Feed/Model/Sport";
import {
  singleStakeByIdSelectorFactory,
} from "../../../../../sportsbookui/Store/BetSlip/Hooks/UseSingleStakeByIdSelector";
import { EBetGroup } from "../../../../../sportsbookui/Store/BetSlip/Model/BetGroup";
import {
  betSlipIsFreeBetParlayCheckedSelector,
  betSlipIsUseBonusBalanceCheckedSelector,
  betSlipIsUseFreeBetCheckedSelector,
  betSlipPromotionBonusIdSelector,
  betSlipUseBonusBalanceForParlayCheckedSelector,
  hasVirtualGamePickSelector,
  moneyBetByGroupSelector,
} from "../../../../../sportsbookui/Store/BetSlip/Selectors/BetSlipSelectors";
import {
  validPicksViewSelector,
} from "../../../../../sportsbookui/Store/BetSlip/Selectors/ViewSelectors/ValidPicksViewSelector";
import {
  totalCoefficientForMultiViewSelector,
} from "../../../../../sportsbookui/Store/BetSlip/Selectors/ViewSelectors/TotalCoefficientViewSelectors";
import { profileSelectors } from "../../../../../common/Store/Player/Selectors/ProfileSelectors";
import { getDateByTimeZone } from "../../../../../common/Utils/GetDateByTimeZone";
import { extractId } from "../../../../../common/Utils/IDUtils";
import {
  eligibilityMatchRuleForParlayForAtLeastOne,
  eligibilityMatchRulesForParlayForEvery,
  eligibilityMatchRulesForSingle,
  isAccumulatorAtLeastOddMatch,
  isAccumulatorMaxNumberOfSelectionsMatch,
  isAccumulatorMinNumberOfSelectionsMatch,
  isAccumulatorMinOddsPerSelectionMatch,
  isAccumulatorTotalOddsMatch,
  type TPickByOutcome,
} from "../../Utils/BonusMatchers";
import { matchBonusDailyLimitations } from "../../Utils/MatchBonusDailyLimitations";
import { BET_SLIP_PROMOTION_BONUS_TAG_ID } from "../../Model/BonusTags";
import {
  isEligibilityAggregateCriteria,
  isEligibilityProductRule,
  isEligibilitySportsbookCriteria,
  isProductsRuleProgress,
} from "../../Utils/BonusTypeGuards";
import { platformBonusesSelectors } from "../BonusesSelectors";

const getRuleIdsThatDependsOnSport = (
  rules: TPlatform_BonusEligibilityProductCriteriaRule_Fragment[],
) => rules.filter(({ value }) => {
  if (!value) { // branch
    return false;
  }

  if (isEligibilitySportsbookCriteria(value)) {
    return true; // sportsbookCriteria itself
  }

  if (isEligibilityAggregateCriteria(value)) { // totalCount || totalTurnover
    return value.rules.some((ruleId) => { // criteria.rules has sportsbookCriteria rule id
      const rule = rules.find((it) => it.ruleId === ruleId);

      if (!rule?.value || isEligibilityAggregateCriteria(rule.value)) {
        throw new Error("[getRuleIdsThatDependsOnSport] every EligibilityAggregateCriteria.rules rule should exist and can't includes another EligibilityAggregateCriteria rule");
      }

      return isEligibilitySportsbookCriteria(rule.value);
    });
  }

  return false;
}).map(({ ruleId }) => ruleId);

const filterCompleted = (
  completionInfo: TPlatform_BonusEligibilityRuleProgress_Fragment[],
  rules: TPlatform_BonusEligibilityProductCriteriaRule_Fragment[],
) => {
  const productCompletionInfo = completionInfo.find(isProductsRuleProgress);

  if (!productCompletionInfo) {
    return false;
  }

  if (!isProductsRuleProgress(productCompletionInfo) || !productCompletionInfo.productRulesProgress) {
    throw new Error("[FreeBetLabelSelectors.ts, filterCompleted] productCompletionInfo.productRulesProgress should exist");
  }

  const ruleIdsThatDependsOnSport = getRuleIdsThatDependsOnSport(rules);

  return productCompletionInfo.productRulesProgress
    .filter(({ ruleId, isSatisfiedByPlayer }) => ruleIdsThatDependsOnSport.includes(ruleId) && !isSatisfiedByPlayer)
    .length > 0;
};

// now we do not receive eligibilityClaimRulesCompletionInfo for sb routes
const availableFilterCompleted = ({ eligibility, eligibilityClaimRulesCompletionInfo }: TPlatform_Bonus_Fragment) => {
  const productRule = getNotNil(eligibility.claimRules.find(isEligibilityProductRule), ["availableFilterCompleted"], "productRule");

  return isNotNil(eligibilityClaimRulesCompletionInfo)
    ? filterCompleted(eligibilityClaimRulesCompletionInfo, productRule.flatRules.rules)
    : true;
};

const claimedFilterCompleted = ({
  eligibilityActivateRules,
  eligibilityActivationRulesCompletionInfo,
}: TPlatform_PlayerBonus_Fragment) => {
  const productRule = eligibilityActivateRules.find(isEligibilityProductRule);
  const rules = getNotNil(productRule, ["claimedFilterCompleted"], "productRule").flatRules.rules;

  return filterCompleted(eligibilityActivationRulesCompletionInfo, rules);
};

const availableBonusesWithSportInClaimSelector = createMemoSelector(
  [platformBonusesSelectors.availableBonuses],
  (bonuses) => bonuses.filter(
    (bonus) => bonus.eligibility.claimRules.some((rule) => {
      if (!isEligibilityProductRule(rule)) {
        return false;
      }

      return (rule.products || []).includes(EBonusProductEnum.sports);
    }),
  ),
);

const availableBonusesWithSportCriteriaSelector = createMemoSelector(
  (state: TMixAppState, shouldFilterCompleted: boolean, hours: number, minutes: number) => {
    const availableBonuses = availableBonusesWithSportInClaimSelector(state);

    return availableBonuses
      .filter(shouldFilterCompleted ? availableFilterCompleted : always(true))
      .filter((bonus) => {
        const { claimRuleTimePeriodRange } = getNotNil(bonus.eligibility.claimRules.find(isEligibilityProductRule), ["availableBonusesWithSportCriteriaSelector"], "productRule");

        if (isNil(claimRuleTimePeriodRange.dailyLimitations)) {
          return true;
        }

        return matchBonusDailyLimitations(claimRuleTimePeriodRange.dailyLimitations, hours, minutes);
      })
      .map((bonus) => {
        // guaranteed in 'availableBonusesByClaimRuleProductSelector'
        const productRule = getNotNil(bonus.eligibility.claimRules.find(isEligibilityProductRule), ["availableBonusesWithSportCriteriaSelector"], "productRule");

        const criteria = productRule.flatRules.rules
          .map(({ value }) => value)
          .filter(isNotNil)
          .filter(isEligibilitySportsbookCriteria);

        return ({
          id: bonus.id,
          name: bonus.name,
          bonusTagIds: bonus.bonusTagIds,
          criteria,
        });
      });
  },
  { resultEqual: "deepEqual" },
);
availableBonusesWithSportCriteriaSelector.displayName = "availableBonusesWithSportCriteriaSelector";

const getPlayerBonusesByActivateRuleProduct = (
  bonuses: TPlatform_PlayerBonus_Fragment[],
  product: EBonusProductEnum,
) => bonuses.filter(
  (bonus) => bonus.eligibilityActivateRules.some((rule) => {
    if (!isEligibilityProductRule(rule)) {
      return false;
    }

    return (rule.products || []).includes(product);
  }),
);

const playerBonusesByActivateRuleProductSelector = createMemoSelector(
  [platformBonusesSelectors.playerBonuses, <S>(_: S, product: EBonusProductEnum) => product],
  getPlayerBonusesByActivateRuleProduct,
);

const notActivePlayerBonusesWithSportCriteriaSelector = createMemoSelector(
  [
    withParams(playerBonusesByActivateRuleProductSelector, EBonusProductEnum.sports),
  ],
  (playerBonuses) => playerBonuses
    .filter(claimedFilterCompleted)
    .map(({ id, bonusName, eligibilityActivateRules }) => {
      // guaranteed in 'notActivePlayerBonusesByActivateRuleProductSelector'
      const productRule = getNotNil(eligibilityActivateRules.find(isEligibilityProductRule), ["notActivePlayerBonusesWithSportCriteriaSelector"], "productRule");

      const criteria = productRule.flatRules.rules
        .map(({ value }) => value)
        .filter(isNotNil)
        .filter(isEligibilitySportsbookCriteria);

      return ({ id, name: bonusName, criteria });
    }),
);

const checkCriterionForSingleFactory =
  (pick: TPickByOutcome, stake: IMoney) =>
    (criterion: TPlatform_BonusEligibilitySportsbookCriteria_Fragment) =>
      eligibilityMatchRulesForSingle.every((rule) => rule(criterion, pick, stake));

const either = (condition1: boolean, condition2: boolean) => condition1 || condition2;

const isNotPrimaryBalanceUsedByOutcomeIdSelector = createSimpleSelector(
  [
    betSlipIsUseFreeBetCheckedSelector,
    betSlipIsUseBonusBalanceCheckedSelector,
  ],
  either,
);

const isNotPrimaryBalanceUsedForParlaySelector = createSimpleSelector(
  [
    betSlipIsFreeBetParlayCheckedSelector,
    betSlipUseBonusBalanceForParlayCheckedSelector,
  ],
  either,
);

const emptyMatches = {
  availableMatch: [],
  claimedMatch: [],
};

const commonSatisfiedForSingleSelector = (state: TMixAppState, outcomeId: string) => {
  const isNotPrimaryBalanceUsed = isNotPrimaryBalanceUsedByOutcomeIdSelector(state, outcomeId);

  if (isNotPrimaryBalanceUsed) {
    return false;
  }

  const outrightOutcome = !notOutrightOutcomeSelector(state, outcomeId);

  if (outrightOutcome) {
    return false;
  }

  const sportId = sportIdByOutcomeIdSelector(state, outcomeId);

  if (isVirtual(sportId)) {
    return false;
  }

  return true;
};

// single
const bonusesWithSatisfiedConditionsForSingleSelector = (
  state: TMixAppState,
  outcomeId: string,
  hours: number,
  minutes: number,
) => {
  const commonSatisfied = commonSatisfiedForSingleSelector(state, outcomeId);

  if (!commonSatisfied) {
    return emptyMatches;
  }

  const singleStake = singleStakeByIdSelectorFactory(state, outcomeId);
  const pick = pickByOutcomeIdSelector(state, outcomeId, ESportsbook_BetTypeEnum.single);

  const checkCriterionForSingle = checkCriterionForSingleFactory(pick, singleStake.money);

  const availableBonusesWithSportCriteria = availableBonusesWithSportCriteriaSelector(state, true, hours, minutes);

  const availableMatch = availableBonusesWithSportCriteria
    .filter(({ criteria }) => criteria.some(checkCriterionForSingle))
    .map(({ id, name }) => ({ id, name }));

  const playerBonusesWithSportCriteria = notActivePlayerBonusesWithSportCriteriaSelector(state);

  const claimedMatch = playerBonusesWithSportCriteria
    .filter(({ criteria }) => criteria.some(checkCriterionForSingle))
    .map(({ id, name }) => ({ id, name }));

  return { availableMatch, claimedMatch };
};

const checkCriteriaForParlayFactory = (state: TMixAppState) => {
  const picks = validPicksViewSelector(state) as { coefficient: number; outcomeId: string; }[];

  const extendedPicks = picks.map(({ outcomeId }) => pickByOutcomeIdSelector(state, outcomeId, ESportsbook_BetTypeEnum.parlay));
  const parlayStake = moneyBetByGroupSelector(EBetGroup.multi)(state);
  const coefficients = picks.map(({ coefficient }) => coefficient);
  const totalCoefficient = totalCoefficientForMultiViewSelector(state) ?? 0;

  return (criteria: TPlatform_BonusEligibilitySportsbookCriteria_Fragment) => {
    const isEveryPickMatch = extendedPicks.every(
      (pick) => eligibilityMatchRulesForParlayForEvery.every((rule) => rule(criteria, pick, parlayStake)),
    );

    if (!isEveryPickMatch) {
      return false;
    }

    const isSomePickMatch = extendedPicks.some(
      (pick) => eligibilityMatchRuleForParlayForAtLeastOne(criteria, pick, parlayStake),
    );

    if (!isSomePickMatch) {
      return false;
    }

    const accumulatorMinNumberOfSelectionsMatch = isAccumulatorMinNumberOfSelectionsMatch(criteria.filter, coefficients.length);

    if (!accumulatorMinNumberOfSelectionsMatch) {
      return false;
    }

    const accumulatorMaxNumberOfSelectionsMatch = isAccumulatorMaxNumberOfSelectionsMatch(criteria.filter, coefficients.length);

    if (!accumulatorMaxNumberOfSelectionsMatch) {
      return false;
    }

    const accumulatorMinOddsPerSelectionMatch = isAccumulatorMinOddsPerSelectionMatch(criteria.filter, coefficients);

    if (!accumulatorMinOddsPerSelectionMatch) {
      return false;
    }

    const accumulatorAtLeastOddMatch = isAccumulatorAtLeastOddMatch(criteria.filter, coefficients);

    if (!accumulatorAtLeastOddMatch) {
      return false;
    }

    const accumulatorTotalOddsMatch = isAccumulatorTotalOddsMatch(criteria.filter, totalCoefficient);

    // noinspection RedundantIfStatementJS
    if (!accumulatorTotalOddsMatch) {
      return false;
    }

    return true;
  };
};

const commonSatisfiedForParlaySelector = (state: TMixAppState) => {
  const isNotPrimaryBalanceUsedForParlay = isNotPrimaryBalanceUsedForParlaySelector(state);

  if (isNotPrimaryBalanceUsedForParlay) {
    return false;
  }

  const hasVirtualGamePick = hasVirtualGamePickSelector(state);

  if (hasVirtualGamePick) {
    return false;
  }

  const picks = validPicksViewSelector(state) as { coefficient: number; outcomeId: string; }[];

  const hasOutrightOutcome = picks.reduce(
    (acc, { outcomeId }) => {
      const notOutrightOutcome = notOutrightOutcomeSelector(state, outcomeId);

      return acc || !notOutrightOutcome;
    },
    false,
  );

  if (hasOutrightOutcome) {
    return false;
  }

  return true;
};

// parlay betTypeEnums.parlay
const bonusesWithSatisfiedConditionsForParlaySelector = (state: TMixAppState, hours: number, minutes: number) => {
  const commonSatisfied = commonSatisfiedForParlaySelector(state);

  if (!commonSatisfied) {
    return emptyMatches;
  }

  const betSlipPromotionBonusId = betSlipPromotionBonusIdSelector(state);

  if (isNotNil(betSlipPromotionBonusId)) {
    return emptyMatches;
  }

  const checkCriteriaForParlay = checkCriteriaForParlayFactory(state);

  const availableBonusesWithSportCriteria = availableBonusesWithSportCriteriaSelector(state, true, hours, minutes);

  const availableMatch = availableBonusesWithSportCriteria
    .filter(({ criteria }) => criteria.some(checkCriteriaForParlay))
    .filter(({ bonusTagIds }) => !bonusTagIds.includes(BET_SLIP_PROMOTION_BONUS_TAG_ID))
    .map(({ id, name }) => ({ id, name }));

  const playerBonusesWithSportCriteria = notActivePlayerBonusesWithSportCriteriaSelector(state);

  const claimedMatch = playerBonusesWithSportCriteria
    .filter(({ criteria }) => criteria.some(checkCriteriaForParlay))
    .map(({ id, name }) => ({ id, name }));

  return { availableMatch, claimedMatch };
};

const isAvailablePromotionBonusMatchedSelector = (state: TMixAppState, bonusId: string, hours: number, minutes: number) => {
  const commonSatisfiedForParlay = commonSatisfiedForParlaySelector(state);

  if (!commonSatisfiedForParlay) {
    return false;
  }

  const checkCriteriaForParlay = checkCriteriaForParlayFactory(state);

  const availableBonusesWithSportCriteria = availableBonusesWithSportCriteriaSelector(state, false, hours, minutes);

  const betSlipPromotionMatch = availableBonusesWithSportCriteria
    .filter(({ bonusTagIds }) => bonusTagIds.includes(BET_SLIP_PROMOTION_BONUS_TAG_ID))
    .filter(({ criteria }) => criteria.some(checkCriteriaForParlay))
    .map(extractId);

  return betSlipPromotionMatch.includes(bonusId);
};

const isAvailablePromotionBonusMatchedStaticSelector = (state: TMixAppState, bonusId: string) => {
  const timeZone = profileSelectors.timeZone(state);

  const now = getDateByTimeZone(timeZone);

  return isAvailablePromotionBonusMatchedSelector(state, bonusId, now.getHours(), now.getMinutes());
};

export {
  isNotPrimaryBalanceUsedForParlaySelector,
  bonusesWithSatisfiedConditionsForSingleSelector,
  bonusesWithSatisfiedConditionsForParlaySelector,
  isAvailablePromotionBonusMatchedSelector,
  isAvailablePromotionBonusMatchedStaticSelector,
};
