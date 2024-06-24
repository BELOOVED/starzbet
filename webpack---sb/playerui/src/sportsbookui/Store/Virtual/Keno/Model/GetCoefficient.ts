// @ts-nocheck
import { EMarketType } from "@sb/betting-core/MarketType";
import { EOutcomeEnumValue } from "@sb/betting-core/EOutcomeEnumValue";
import { getKenoOddsByKeysLength } from "./Keno";

const getKenoCoefficient = (marketType, outcome) => {
  if (marketType === EMarketType.score_keno_subset_in_set) {
    const oddsList = outcome[0].split(",");
    const odds = getKenoOddsByKeysLength(oddsList.length);

    return odds[odds.length - 1].coefficient;
  }

  if (marketType === EMarketType.score_keno_heads_tails) {
    return outcome[0] === EOutcomeEnumValue.evens ? 4 : 2;
  }

  return void 0;
};

export { getKenoCoefficient };
