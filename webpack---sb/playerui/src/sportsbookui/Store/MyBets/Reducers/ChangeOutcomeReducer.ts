import { getNotNil, isNil, type TReducer } from "@sb/utils";
import { picksAreEqual } from "../../../Utils/PicksAreEqual";
import { betByIdSelector, editableBetSelector, outcomeBetOrCurrentByIdSelector } from "../Selectors/MyBetsSelectors";
import { type changeOutcomeAction } from "../MyBetsActions";
import { type IWithMyBetsState } from "../MyBetsState";
import { type TBetPickEntry } from "../Model/TBet";

const changeOutcomeReducer: TReducer<IWithMyBetsState, typeof changeOutcomeAction> = (
  state,
  { payload: { oldOutcomeId, newOutcomeId } },
) => {
  const newOutcome = outcomeBetOrCurrentByIdSelector(state, newOutcomeId);
  const editableBet = editableBetSelector(state);
  if (isNil(newOutcome) || isNil(editableBet)) {
    return state;
  }

  const picks: TBetPickEntry[] = editableBet.picks.map((pick) => (pick.outcomeId === oldOutcomeId
    ? {
      ...pick,
      outcomeId: newOutcomeId,
      changedOutcome: true,
      coefficient: newOutcome.coefficient,
      updatedAt: newOutcome.updatedAt,
    }
    : pick));

  const bet = getNotNil(betByIdSelector(editableBet.id)(state), ["changeOutcomeReducer"], "betByIdSelector");

  return {
    ...state,
    myBets: {
      ...state.myBets,
      editableBet: {
        ...editableBet,
        changed: !picksAreEqual(bet.picks, picks),
        picks,
      },
    },
  };
};

export { changeOutcomeReducer };
