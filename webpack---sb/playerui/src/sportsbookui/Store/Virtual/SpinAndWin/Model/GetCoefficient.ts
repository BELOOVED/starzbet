// @ts-nocheck
import { EMarketType } from "@sb/betting-core/MarketType";
import { spinAndWinCoefficientMapByNumberLength } from "./SpinAndWin";

const getSpinAndWinCoefficient = (marketType, outcome) => {
  if (marketType === EMarketType.score_roulette_numbers) {
    return spinAndWinCoefficientMapByNumberLength[outcome[0].split(",").length];
  }

  if (
    marketType === EMarketType.score_roulette_odd_even ||
    marketType === EMarketType.score_roulette_red_black
  ) {
    return 2;
  }

  return void 0;
};

export { getSpinAndWinCoefficient };
