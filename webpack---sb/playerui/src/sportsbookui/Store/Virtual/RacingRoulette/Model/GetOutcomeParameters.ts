// @ts-nocheck
import { EMarketType } from "@sb/betting-core/MarketType";
import { EOutcomeKind } from "@sb/betting-core/EOutcomeKind";

const getRacingRouletteOutcomeParameters = (marketType, outcome) => {
  if (marketType === EMarketType.place_number_racing_roulette_first) {
    return {
      "@kind": EOutcomeKind.id_sequence,
      outcome: outcome[0],
    };
  }

  if (marketType === EMarketType.place_number_racing_roulette_first_second) {
    return {
      "@kind": EOutcomeKind.id_sequence,
      first: outcome[0],
      second: outcome[1],
    };
  }

  if (marketType === EMarketType.place_number_racing_roulette_first_second_third) {
    return {
      "@kind": EOutcomeKind.id_sequence,
      first: outcome[0],
      second: outcome[1],
      third: outcome[2],
    };
  }

  if (
    marketType === EMarketType.place_number_racing_roulette_two_from_three ||
    marketType === EMarketType.place_number_racing_roulette_in_first_three
  ) {
    return {
      "@kind": EOutcomeKind.id_sequence,
      outcome: outcome[0],
    };
  }

  return void 0;
};

export { getRacingRouletteOutcomeParameters };
