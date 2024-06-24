// @ts-nocheck
import { createSimpleSelector, useParamSelector } from "@sb/utils";
import { marketTypeByIdSelector } from "../../../Feed/Selectors/FeedSelectors";
import { getRacingRouletteCoefficient } from "../Model/GetCoefficient";

const racingRouletteCoefficientSelector = createSimpleSelector(
  [
    marketTypeByIdSelector,
    (_, __, outcome) => outcome,
  ],
  (marketType, outcome) => getRacingRouletteCoefficient(marketType, outcome),
);

const useRacingRouletteCoefficientSelector = (marketId, outcome) => useParamSelector(
  racingRouletteCoefficientSelector,
  [marketId, outcome],
);

export { useRacingRouletteCoefficientSelector };
