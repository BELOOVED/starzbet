import { type TReducer } from "@sb/utils";
import { type IWithMyBetsState } from "../../MyBetsState";
import { type startCommittingPicksAction } from "../../MyBetsActions";
import { editableBetNotAppliedPicksSelector } from "../../Selectors/MyBetsSelectors";

const startCommittingPicksReducer: TReducer<IWithMyBetsState, typeof startCommittingPicksAction> = (state) => {
  const editableBet = state.myBets.editableBet;
  if (!editableBet) {
    return state;
  }

  const notAppliedPicks = editableBetNotAppliedPicksSelector(state);

  return {
    ...state,
    myBets: {
      ...state.myBets,
      editableBet: {
        ...editableBet,
        committedPicks: notAppliedPicks,
        committing: true,
        changedSinceLastCommit: false,
      },
    },
  };
};

export { startCommittingPicksReducer };
