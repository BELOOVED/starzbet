import { createSimpleSelector } from "@sb/utils";
import { betSlipPicksSelector } from "./BetSlipPicksSelectors";

const placedPickCoefficientByIdSelector = createSimpleSelector(
  [
    betSlipPicksSelector,
    (_, outcomeId) => outcomeId,
  ],
  (picks, id) => picks.find(({ outcomeId }) => outcomeId === id).currentCoefficient,
);

export { placedPickCoefficientByIdSelector };
