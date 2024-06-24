import { type TTFuncParameters } from "@sb/translator";
import { ESportsbook_BetTypeEnum } from "@sb/graphql-client";
import {
  sportsbookui_betSlip_error_atLeastOneBetShouldHaveAHigherOdds,
  sportsbookui_betSlip_error_maxNumberOfSelections,
  sportsbookui_betSlip_error_minNumberOfSelections,
  sportsbookui_betSlip_error_minOddPerSelection,
  sportsbookui_betSlip_error_overallOddsShouldBeGreater,
} from "@sb/translates/sportsbookui/CommonTKeys";
import { isNotEmpty } from "@sb/utils";
import { type TMixAppState } from "../../../../../sportsbookui/Store/CreateMixInitialState";
import {
  validPicksViewSelector,
} from "../../../../../sportsbookui/Store/BetSlip/Selectors/ViewSelectors/ValidPicksViewSelector";
import { pickByOutcomeIdSelector } from "../../../../../sportsbookui/Store/Feed/Selectors/FeedSelectors";
import {
  totalCoefficientForMultiViewSelector,
} from "../../../../../sportsbookui/Store/BetSlip/Selectors/ViewSelectors/TotalCoefficientViewSelectors";
import {
  equalBetType,
  isAccumulatorAtLeastOddMatch,
  isAccumulatorMaxNumberOfSelectionsMatch,
  isAccumulatorMinNumberOfSelectionsMatch,
  isAccumulatorMinOddsPerSelectionMatch,
  isAccumulatorTotalOddsMatch,
  sportCriteriaMatchRuleForParlayForAtLeastOne,
  type TSportFilter,
  type TWagerSportFilter,
} from "../../Utils/BonusMatchers";
import { type TSportsbookCriteria } from "../../Model/Types/BonusTypeShortcuts";

const totalParlayFilterError = (
  filter: TSportFilter,
  coefficients: number[],
  totalCoefficient: number | undefined,
  baseError: TTFuncParameters,
): TTFuncParameters | undefined => {
  const isBetTypeMatch = equalBetType(filter, { betType: ESportsbook_BetTypeEnum.parlay });

  if (!isBetTypeMatch) {
    return baseError;
  }

  const accumulatorAtLeastOddMatch = isAccumulatorAtLeastOddMatch(filter, coefficients);

  if (!accumulatorAtLeastOddMatch) {
    return [sportsbookui_betSlip_error_atLeastOneBetShouldHaveAHigherOdds, { count: filter.betRule.accumulatorAtLeastOdd }];
  }

  const isTotalOddsMatch = isAccumulatorTotalOddsMatch(filter, totalCoefficient);

  if (!isTotalOddsMatch) {
    return [sportsbookui_betSlip_error_overallOddsShouldBeGreater, { count: filter.betRule.accumulatorTotalOdds }];
  }

  const isMinNumberOfSelectionsMatch = isAccumulatorMinNumberOfSelectionsMatch(filter, coefficients.length);

  if (!isMinNumberOfSelectionsMatch) {
    return [sportsbookui_betSlip_error_minNumberOfSelections, { count: filter.betRule.accumulatorMinNumberOfSelections }];
  }

  const isMaxNumberOfSelectionsMatch = isAccumulatorMaxNumberOfSelectionsMatch(filter, coefficients.length);

  if (!isMaxNumberOfSelectionsMatch) {
    return [sportsbookui_betSlip_error_maxNumberOfSelections, { count: filter.betRule.accumulatorMaxNumberOfSelections }];
  }

  const isMinOddsPerSelectionMatch = isAccumulatorMinOddsPerSelectionMatch(filter, coefficients);

  if (!isMinOddsPerSelectionMatch) {
    return [sportsbookui_betSlip_error_minOddPerSelection, { count: filter.betRule.accumulatorMinOddPerSelection }];
  }

  return void 0;
};

/**
 * for bonus and freeBet
 * match 'accumulator rules' and 'rules for at least one pick' (sport + category + tournament + event + market)
 */
const betSlipTotalParlayErrorSelector = (
  state: TMixAppState,
  sportCriteria: TSportsbookCriteria,
  baseError: TTFuncParameters,
): TTFuncParameters | undefined => {
  const picks = validPicksViewSelector(state) as { coefficient: number; outcomeId: string; }[];
  const extendedPicks = picks.map(({ outcomeId }) => pickByOutcomeIdSelector(state, outcomeId, ESportsbook_BetTypeEnum.parlay));

  const forAtLeastOneMatch = extendedPicks.some(
    (pick) => sportCriteriaMatchRuleForParlayForAtLeastOne(sportCriteria, pick),
  );

  if (!forAtLeastOneMatch) {
    return baseError;
  }

  const coefficients: number[] = picks.map(({ coefficient }) => coefficient);
  const totalCoefficient = totalCoefficientForMultiViewSelector(state);
  const filters: TWagerSportFilter[] = sportCriteria.filters;

  if (isNotEmpty(filters) && filters.length === 1) {
    return totalParlayFilterError(filters[0], coefficients, totalCoefficient, baseError);
  }

  const isAnyFilterMatch = filters.some(
    (filter) => !totalParlayFilterError(filter, coefficients, totalCoefficient, baseError),
  );

  if (!isAnyFilterMatch) {
    return baseError;
  }

  return void 0;
};

export { betSlipTotalParlayErrorSelector };
