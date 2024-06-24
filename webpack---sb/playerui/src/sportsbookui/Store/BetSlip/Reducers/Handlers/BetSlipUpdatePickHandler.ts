// @ts-nocheck
import { outcomeByIdSelector } from "../../../Feed/Selectors/FeedSelectors";
import { betStrategySelector } from "../../../BetStrategy/Selectors/BetStrategySelectors";
import { betSlipRemovePickHandler } from "./BetSlipRemovePickHandler";

const betSlipUpdatePickHandler = (prevState, nextState) => {
  const removed = [];
  const strategy = betStrategySelector(prevState);

  nextState.betSlip.picks.forEach(({ outcomeId }) => {
    const nextOutcome = outcomeByIdSelector(nextState, outcomeId);
    const prevOutcome = outcomeByIdSelector(prevState, outcomeId);

    if (!prevOutcome) {
      return;
    }

    if (!nextOutcome) {
      removed.push(outcomeId);
    }
  });

  const updatedState = removed.reduce(betSlipRemovePickHandler, nextState);

  const picks = updatedState.betSlip.picks.map((pick) => {
    const outcome = outcomeByIdSelector(nextState, pick.outcomeId);
    if (!outcome) {
      return pick;
    }

    return pick.update(outcome.coefficient, outcome.updatedAt, strategy);
  });

  return {
    ...updatedState,
    betSlip: {
      ...updatedState.betSlip,
      picks,
    },
  };
};

export { betSlipUpdatePickHandler };
