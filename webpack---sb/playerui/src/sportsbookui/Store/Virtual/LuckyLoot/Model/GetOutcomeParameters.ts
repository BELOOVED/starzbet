// @ts-nocheck
import { EMarketType } from "@sb/betting-core/MarketType";
import { EOutcomeKind } from "@sb/betting-core/EOutcomeKind";
import { EOutcomePredicate } from "@sb/betting-core/EOutcomePredicate";

const getLuckyLootOutcomeParameters = (marketType, outcome) => {
  if (
    marketType === EMarketType.score_lucky_loot_first_color ||
    marketType === EMarketType.score_lucky_loot_sum_odd_even ||
    marketType === EMarketType.score_lucky_loot_sum_high_low
  ) {
    return {
      "@kind": EOutcomeKind.enum,
      outcome: outcome[0],
    };
  }

  if (marketType === EMarketType.score_lucky_loot_colors_count) {
    return {
      "@kind": EOutcomeKind.value,
      predicate: outcome[0] === "0" ? EOutcomePredicate.eq : EOutcomePredicate.gte,
      outcome: outcome[0],
    };
  }

  if (marketType === EMarketType.score_lucky_loot_first_balls) {
    return {
      "@kind": EOutcomeKind.value_sequence,
      outcome: outcome[0],
    };
  }

  if (marketType === EMarketType.score_lucky_loot_subset_in_set_strict) {
    return {
      "@kind": EOutcomeKind.value_sequence,
      outcome: outcome[0],
    };
  }

  return void 0;
};

export { getLuckyLootOutcomeParameters };
