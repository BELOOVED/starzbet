import { getNotNil, type TReducer } from "@sb/utils";
import { picksAreEqual } from "../../../Utils/PicksAreEqual";
import { generateHash } from "../../../Utils/GenerateHash";
import { betByIdSelector, editableBetSelector } from "../Selectors/MyBetsSelectors";
import { type IWithMyBetsState } from "../MyBetsState";
import { type completeAddingBetAction } from "../MyBetsActions";

const completeAddingBetReducer: TReducer<IWithMyBetsState, typeof completeAddingBetAction> = (state) => {
  const editableBet = getNotNil(editableBetSelector(state), ["completeAddingBetReducer"], "editableBetSelector");
  const picks = editableBet.picks.map((pick) => ({
    ...pick,
    applied: true,
    newPick: pick.newPick || !pick.applied,
  }));
  const bet = getNotNil(betByIdSelector(editableBet.id)(state), ["completeAddingBetReducer"], "betByIdSelector");

  return {
    ...state,
    myBets: {
      ...state.myBets,
      editableBet: {
        ...editableBet,
        adding: false,
        changed: !picksAreEqual(bet.picks, picks),
        picks,
        hash: generateHash(bet, picks),
      },
    },
  };
};

export { completeAddingBetReducer };
