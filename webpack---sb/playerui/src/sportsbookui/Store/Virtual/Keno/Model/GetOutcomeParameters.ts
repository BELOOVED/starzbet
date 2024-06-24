// @ts-nocheck
import { EMarketType } from "@sb/betting-core/MarketType";
import { EOutcomeKind } from "@sb/betting-core/EOutcomeKind";

const getKenoOutcomeParameters = (marketType, outcome) => {
  if (marketType === EMarketType.score_keno_subset_in_set) {
    return {
      "@kind": EOutcomeKind.value_sequence,
      outcome: outcome[0],
    };
  }

  if (marketType === EMarketType.score_keno_heads_tails) {
    return {
      "@kind": EOutcomeKind.enum,
      outcome: outcome[0],
    };
  }

  return void 0;
};

export { getKenoOutcomeParameters };
