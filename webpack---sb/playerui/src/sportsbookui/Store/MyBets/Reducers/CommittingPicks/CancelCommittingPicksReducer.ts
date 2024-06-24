import { type TReducer } from "@sb/utils";
import { type IWithMyBetsState } from "../../MyBetsState";
import { type cancelCommittingPicksAction } from "../../MyBetsActions";
import { editableBetAppliedPicksSelector } from "../../Selectors/MyBetsSelectors";

const cancelCommittingPicksReducer: TReducer<IWithMyBetsState, typeof cancelCommittingPicksAction> = (state) => {
  const editableBet = state.myBets.editableBet;
  if (!editableBet) {
    return state;
  }

  const appliedPicks = editableBetAppliedPicksSelector(state);

  return {
    ...state,
    myBets: {
      ...state.myBets,
      editableBet: {
        ...editableBet,
        picks: [...appliedPicks, ...editableBet.committedPicks],
        committing: false,
        committedPicks: [],
        changedSinceLastCommit: false,
      },
    },
  };
};

export { cancelCommittingPicksReducer };
