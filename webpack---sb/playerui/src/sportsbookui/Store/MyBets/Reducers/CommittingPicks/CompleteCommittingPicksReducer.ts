import { type TReducer } from "@sb/utils";
import { type IWithMyBetsState } from "../../MyBetsState";
import { type completeCommittingPicksAction } from "../../MyBetsActions";

const completeCommittingPicksReducer: TReducer<IWithMyBetsState, typeof completeCommittingPicksAction> = (state) => {
  const editableBet = state.myBets.editableBet;
  if (!editableBet) {
    return state;
  }

  return {
    ...state,
    myBets: {
      ...state.myBets,
      editableBet: {
        ...editableBet,
        committing: false,
        committedPicks: [],
        changedSinceLastCommit: false,
      },
    },
  };
};

export { completeCommittingPicksReducer };
