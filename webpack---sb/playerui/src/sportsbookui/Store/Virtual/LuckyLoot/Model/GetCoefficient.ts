// @ts-nocheck
import { EMarketType } from "@sb/betting-core/MarketType";
import { EMarketParameter } from "@sb/betting-core/EMarketParameter";
import { getLuckyLootComboCoefficient, luckyLootColorCountKeys, luckyLootSubsetInSetOutcomes } from "./LuckyLoot";

const getLuckyLootCoefficient = (marketType, outcome, parameters) => {
  if (
    marketType === EMarketType.score_lucky_loot_sum_odd_even ||
    marketType === EMarketType.score_lucky_loot_sum_high_low
  ) {
    return 1.9;
  }

  if (marketType === EMarketType.score_lucky_loot_first_color) {
    return 3.6;
  }

  if (marketType === EMarketType.score_lucky_loot_colors_count) {
    return luckyLootColorCountKeys.find((it) => it.key === +outcome[0]).coefficient;
  }

  if (marketType === EMarketType.score_lucky_loot_subset_in_set_strict) {
    return luckyLootSubsetInSetOutcomes.find((it) => it.outcome === +parameters[EMarketParameter.number]).coefficient;
  }

  if (marketType === EMarketType.score_lucky_loot_first_balls) {
    return getLuckyLootComboCoefficient(outcome[0].split(",").length) * 2;
  }

  return void 0;
};

export { getLuckyLootCoefficient };
