// @ts-nocheck
import { EMarketType } from "@sb/betting-core/MarketType";
import { ERacingRouletteTypeFieldEnum, racingRouletteCoefficientMapByMarketAndKey } from "./RacingRoulettte";

const getRacingRouletteCoefficient = (marketType, outcome) => {
  const length = outcome[0].split(",").length;

  if (
    marketType === EMarketType.place_number_racing_roulette_first ||
    marketType === EMarketType.place_number_racing_roulette_first_second ||
    marketType === EMarketType.place_number_racing_roulette_first_second_third
  ) {
    if (length === 4) {
      return racingRouletteCoefficientMapByMarketAndKey[marketType][ERacingRouletteTypeFieldEnum.rows];
    }

    if (length === 3) {
      return racingRouletteCoefficientMapByMarketAndKey[marketType][ERacingRouletteTypeFieldEnum.columns];
    }

    if (length === 6) {
      return racingRouletteCoefficientMapByMarketAndKey[marketType].default;
    }

    return (marketType === EMarketType.place_number_racing_roulette_first && 12) || 100;
  }

  if (marketType === EMarketType.place_number_racing_roulette_in_first_three) {
    return racingRouletteCoefficientMapByMarketAndKey[marketType][ERacingRouletteTypeFieldEnum.numbers][length - 1];
  }

  if (marketType === EMarketType.place_number_racing_roulette_two_from_three) {
    return 1000;
  }

  return void 0;
};

export { getRacingRouletteCoefficient };
