// @ts-nocheck
import { EMarketType } from "@sb/betting-core/MarketType";
import { EOutcomeKind } from "@sb/betting-core/EOutcomeKind";

const getSpinAndWinOutcomeParameters = (marketType, outcome) => {
  if (
    marketType === EMarketType.score_roulette_odd_even ||
    marketType === EMarketType.score_roulette_red_black
  ) {
    return {
      "@kind": EOutcomeKind.enum,
      outcome: outcome[0],
    };
  }

  if (marketType === EMarketType.score_roulette_numbers) {
    return {
      "@kind": EOutcomeKind.value_sequence,
      outcome: outcome[0],
    };
  }

  return void 0;
};

export { getSpinAndWinOutcomeParameters };
