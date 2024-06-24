// @ts-nocheck
import { createSelector } from "reselect";
import { marketByIdSelector, outcomeByIdSelector } from "../../Feed/Selectors/FeedSelectors";
import { type TCoefficientContainer } from "../Model/ComputeTotalCoefficient";
import { betSlipPicksSelector } from "./BetSlipPicksSelectors";
import { betSlipPickByOutcomeIdSelector } from "./BetSlipSelectors";

const mapContainers = ({
  coefficient,
  eventId,
  outrightId,
  banker,
}) => ({
  coefficient,
  outrightId: outrightId || undefined,
  eventId: outrightId
    ? undefined
    : eventId,
  banker,
});

const coefficientContainersByPicksSelector = createSelector(
  betSlipPicksSelector,
  (picks) => picks.filter(({ disable }) => !disable).map(mapContainers),
);

const coefficientContainersSelector = (state, outcomeIdList): TCoefficientContainer[] => {
  const coefficientContainers = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const outcomeId of outcomeIdList) {
    const outcome = outcomeByIdSelector(state, outcomeId);

    if (!outcome) {
      return [];
    }

    const pick = betSlipPickByOutcomeIdSelector(state, outcomeId);

    const ids = {} as Record<string, string>;

    if (outcome.outrightId) {
      ids.outrightId = outcome.outrightId;
    } else {
      const { eventId } = marketByIdSelector(state, outcome.marketId);

      ids.eventId = eventId;
    }

    coefficientContainers.push({ ...ids, coefficient: outcome.coefficient, banker: pick?.banker });
  }

  return coefficientContainers;
};

export { coefficientContainersByPicksSelector, coefficientContainersSelector };
