// @ts-nocheck
import { outcomeByIdSelector } from "../../Feed/Selectors/FeedSelectors";
import { lockedOutcomeSelector } from "../../Feed/Selectors/LockedOutcomeSelector";
import { EBetStrategy } from "../../BetStrategy/Model/EBetStrategy";
import { betSlipInvalidSelectionSelector } from "../Selectors/BetSlipInvalidSelectionSelector";
import { type TWithBetSlip } from "../Selectors/BetSlipPicksSelectors";
import { betSlipRemovePickHandler } from "./Handlers/BetSlipRemovePickHandler";

const shouldRemove = (state: TWithBetSlip) => {
  const removeDisable = betSlipInvalidSelectionSelector(state);

  return ({ outcomeId, disable }) => (removeDisable && disable) || lockedOutcomeSelector(state, outcomeId);
};

const betSlipAcceptChangesReducer = (state: TWithBetSlip) => state.betSlip.picks
  .filter(shouldRemove(state))
  .map(({ outcomeId }) => outcomeId)
  .reduce(
    betSlipRemovePickHandler,
    {
      ...state,
      betSlip: {
        ...state.betSlip,
        error: null,
        picks: state.betSlip.picks.map((pick) => {
          const outcome = outcomeByIdSelector(state, pick.outcomeId);
          if (!outcome) {
            return pick;
          }

          return pick.update(outcome.coefficient, outcome.updatedAt, EBetStrategy.any);
        }),
      },
    },
  );

export { betSlipAcceptChangesReducer };
