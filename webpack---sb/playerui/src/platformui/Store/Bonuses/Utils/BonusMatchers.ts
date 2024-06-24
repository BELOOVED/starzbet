import { getNotNil, type IMoney, isNil, isVoid, Money } from "@sb/utils";
import { EBonusProductEnum, ESportsbook_BetTypeEnum } from "@sb/graphql-client";
import {
  type TPlatform_BonusEligibilitySportsbookCriteria_Fragment,
  type TPlatform_BonusEligibilitySportsbookFilter_Fragment,
  type TPlatform_PlayerBonus_Fragment,
} from "@sb/graphql-client/PlayerUI";
import { type EMarketType } from "@sb/betting-core/MarketType";
import { findSameMoneyInBag } from "../../../../common/Utils/FindSameMoneyInBag";
import { type TSportsbookCriteria } from "../Model/Types/BonusTypeShortcuts";
import { isFreeBetBonusSize, isSportsbookCriteria } from "./BonusTypeGuards";

type TWagerSportFilter = TSportsbookCriteria["filters"][number];

type TSportFilter = TPlatform_BonusEligibilitySportsbookFilter_Fragment | TWagerSportFilter;

type TPickByOutcome = {
  coefficient: number;
  betType: ESportsbook_BetTypeEnum;
  sportId: string;
  categoryId: string;
  tournamentId: string;
  eventId: string;
  marketType: EMarketType;
  live: boolean;
};

type TEligibilityCriteriaMatch = (
  criteria: TPlatform_BonusEligibilitySportsbookCriteria_Fragment,
  pick: TPickByOutcome,
  stake: IMoney,
) => boolean;

type TFilterMatch = (
  filter: TSportFilter,
  pick: TPickByOutcome,
) => boolean;

type TWageringCriteriaMatch = (
  criteria: TSportsbookCriteria,
  pick: TPickByOutcome,
) => boolean;

type TWageringBonusMatch = (
  bonus: TPlatform_PlayerBonus_Fragment,
  pick: TPickByOutcome,
) => boolean;

const eligibilityMinStake: TEligibilityCriteriaMatch = (criteria, _, stake) => {
  if (criteria.minStakePerBet === null) {
    return true;
  }

  const value = findSameMoneyInBag(stake, criteria.minStakePerBet);

  if (!value) {
    return false; // error condition
  }

  return !Money.greaterThan(value, stake);
};

const pickEqualSport: TFilterMatch = (filter, pick) => {
  if (filter.sport === null) {
    return true;
  }

  return pick.sportId === filter.sport.id;
};

const pickEqualCategory: TFilterMatch = (filter, pick) => {
  if (filter.category === null) {
    return true;
  }

  return pick.categoryId === filter.category.id;
};

const pickEqualTournament: TFilterMatch = (filter, pick) => {
  if (filter.tournament === null) {
    return true;
  }

  return pick.tournamentId === filter.tournament.id;
};

const pickEqualEvent: TFilterMatch = (filter, pick) => {
  if (filter.event === null) {
    return true;
  }

  return pick.eventId === filter.event.id;
};

const pickEqualMarket: TFilterMatch = (filter, pick) => {
  if (isVoid(filter.markets)) {
    return true;
  }

  return filter.markets.includes(pick.marketType);
};

const equalBetType = (filter: TSportFilter, pick: { betType: ESportsbook_BetTypeEnum; }) => {
  const { betTypes } = filter.betRule;

  if (isVoid(betTypes)) {
    return true;
  }

  return betTypes.includes(pick.betType);
};

const pickEqualLive: TFilterMatch = (filter, pick) => {
  const { live } = filter.betRule;

  if (live === null) {
    return true;
  }

  return pick.live === live;
};

// single
const isSingleMinOddMatch: TFilterMatch = (filter, pick) => {
  const { singleMinOdd, betTypes } = filter.betRule;

  if (isVoid(betTypes)) {
    return true;
  }

  if (!betTypes.includes(ESportsbook_BetTypeEnum.single)) {
    return false;
  }

  if (isNil(singleMinOdd)) { // required
    throw new Error("[isSingleMinOddMatch] if betRule.betTypes includes 'single' - singleMinOdd should exist");
  }

  return pick.coefficient >= singleMinOdd;
};

// parlay
const isAccumulatorAtLeastOddMatch = (filter: TSportFilter, coefficients: number[]) => {
  const { accumulatorAtLeastOdd, betTypes } = filter.betRule;

  if (isVoid(betTypes)) {
    return true;
  }

  if (!betTypes.includes(ESportsbook_BetTypeEnum.parlay)) {
    return false;
  }

  if (isNil(accumulatorAtLeastOdd)) { // required
    throw new Error("[isAccumulatorAtLeastOddMatch] accumulatorAtLeastOdd should exist if betType.parlay is exist");
  }

  return coefficients.some((coefficient) => coefficient >= accumulatorAtLeastOdd);
};

const isAccumulatorTotalOddsMatch = (filter: TSportFilter, totalCoefficient: number | undefined) => {
  if (isNil(totalCoefficient)) {
    return false;
  }

  const { accumulatorTotalOdds, betTypes } = filter.betRule;

  if (isVoid(betTypes)) {
    return true;
  }

  if (!betTypes.includes(ESportsbook_BetTypeEnum.parlay)) {
    return false;
  }

  if (isNil(accumulatorTotalOdds)) { // required
    throw new Error("[isAccumulatorTotalOddsMatch] accumulatorTotalOdds should exist if betType.parlay is exist");
  }

  return totalCoefficient >= accumulatorTotalOdds;
};

const isAccumulatorMinNumberOfSelectionsMatch = (filter: TSportFilter, selectionsCount: number) => {
  const { accumulatorMinNumberOfSelections, betTypes } = filter.betRule;

  if (isVoid(betTypes)) {
    return true;
  }

  if (!betTypes.includes(ESportsbook_BetTypeEnum.parlay)) {
    return false;
  }

  if (isNil(accumulatorMinNumberOfSelections)) {
    return true; // optional
  }

  return selectionsCount >= accumulatorMinNumberOfSelections;
};

const isAccumulatorMaxNumberOfSelectionsMatch = (filter: TSportFilter, selectionsCount: number) => {
  const { accumulatorMaxNumberOfSelections, betTypes } = filter.betRule;

  if (isVoid(betTypes)) {
    return true;
  }

  if (!betTypes.includes(ESportsbook_BetTypeEnum.parlay)) {
    return false;
  }

  if (isNil(accumulatorMaxNumberOfSelections)) {
    return true; // optional
  }

  return selectionsCount <= accumulatorMaxNumberOfSelections;
};

const isAccumulatorMinOddsPerSelectionMatch = (filter: TSportFilter, coefficients: number[]) => {
  const { accumulatorMinOddPerSelection, betTypes } = filter.betRule;

  if (isVoid(betTypes)) {
    return true;
  }

  if (!betTypes.includes(ESportsbook_BetTypeEnum.parlay)) {
    return false;
  }

  if (isNil(accumulatorMinOddPerSelection)) {
    return true; // optional
  }

  return !coefficients.some((it) => it < accumulatorMinOddPerSelection);
};

// product rules
const freeBetProductRules = (rule: TWageringCriteriaMatch): TWageringBonusMatch => (bonus, pick) => {
  const bonusSize = bonus.bonusBonusSize;

  if (!isFreeBetBonusSize(bonusSize)) {
    throw new Error("[freeBetProductRules] bonusSize should be freebet type");
  }

  return bonusSize.rule.productRules
    .filter(({ product }) => product === EBonusProductEnum.sports)
    .every(({ criteria }) => {
      if (!isSportsbookCriteria(criteria)) {
        throw new Error("[freeBetProductRules] criteria should be for sportsbook product");
      }

      return rule(criteria, pick);
    });
};

const customBonusProductRules = (rule: TWageringCriteriaMatch): TWageringBonusMatch => (bonus, pick) => (
  getNotNil(bonus.bonusWagering, ["customBonusProductRules"], "bonusWagering").productRules
    .filter(({ product }) => product === EBonusProductEnum.sports)
    .every(({ criteria }) => {
      if (!isSportsbookCriteria(criteria)) {
        throw new Error("[customBonusProductRules] criteria should be for sportsbook product");
      }

      return rule(criteria, pick);
    })
);

const eligibilitySportsbookRules = (rules: TFilterMatch[]): TEligibilityCriteriaMatch =>
  (criteria, pick) => rules.every((rule) => rule(criteria.filter, pick));

const sportsbookFilters = (rules: TFilterMatch[]): TWageringCriteriaMatch =>
  (criteria, pick) => criteria.filters.some(
    (filter: TSportFilter) => rules.every((rule) => rule(filter, pick)),
  );

const filterRulesForSingle: TFilterMatch[] = [
  pickEqualSport,
  pickEqualCategory,
  pickEqualTournament,
  pickEqualEvent,
  pickEqualMarket,
  equalBetType,
  pickEqualLive,
  isSingleMinOddMatch,
];

const filterRulesForParlayForEvery: TFilterMatch[] = [
  equalBetType,
  pickEqualLive,
];

const filterRulesForParlayForAtLeastOne: TFilterMatch[] = [
  pickEqualSport,
  pickEqualCategory,
  pickEqualTournament,
  pickEqualEvent,
  pickEqualMarket,
];

const eligibilityMatchRulesForSingle = [
  eligibilityMinStake,
  eligibilitySportsbookRules(filterRulesForSingle),
];

const eligibilityMatchRulesForParlayForEvery = [
  eligibilityMinStake,
  eligibilitySportsbookRules(filterRulesForParlayForEvery),
];

const eligibilityMatchRuleForParlayForAtLeastOne = eligibilitySportsbookRules(filterRulesForParlayForAtLeastOne);

// common for freeBet & wager sport criteria
const sportCriteriaMatchRuleForParlayForAtLeastOne = sportsbookFilters(filterRulesForParlayForAtLeastOne);

// wager
const wagerMatchRuleForSingle = customBonusProductRules(sportsbookFilters(filterRulesForSingle));

const wagerMatchRuleForParlayForEvery = customBonusProductRules(sportsbookFilters(filterRulesForParlayForEvery));

// freeBet
const freeBetPickRuleForSingle = freeBetProductRules(sportsbookFilters(filterRulesForSingle));

const freeBetPickRuleForParlayForEvery = freeBetProductRules(sportsbookFilters(filterRulesForParlayForEvery));

export type {
  TPickByOutcome,
  TWagerSportFilter,
  TSportFilter,
};

export {
  equalBetType,
  isAccumulatorAtLeastOddMatch,
  isAccumulatorTotalOddsMatch,
  isAccumulatorMinNumberOfSelectionsMatch,
  isAccumulatorMaxNumberOfSelectionsMatch,
  isAccumulatorMinOddsPerSelectionMatch,
  eligibilityMatchRulesForSingle,
  eligibilityMatchRulesForParlayForEvery,
  eligibilityMatchRuleForParlayForAtLeastOne,
  sportCriteriaMatchRuleForParlayForAtLeastOne,
  wagerMatchRuleForSingle,
  wagerMatchRuleForParlayForEvery,
  freeBetPickRuleForSingle,
  freeBetPickRuleForParlayForEvery,
};
