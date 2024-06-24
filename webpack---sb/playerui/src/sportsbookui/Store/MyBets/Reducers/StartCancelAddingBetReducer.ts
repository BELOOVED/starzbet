import { getNotNil, type TReducer } from "@sb/utils";
import { generateHash } from "../../../Utils/GenerateHash";
import { selectMyBetById } from "../Model/Bet";
import { type IWithMyBetsState } from "../MyBetsState";
import { editableBetSelector } from "../Selectors/MyBetsSelectors";
import { type cancelAddingBetAction } from "../MyBetsActions";

const startCancelAddingBetReducer: TReducer<IWithMyBetsState, typeof cancelAddingBetAction> = (state) => {
  const editableBet = getNotNil(editableBetSelector(state), ["startCancelAddingBetReducer"], "editableBetSelector");

  const picks = editableBet.picks.filter(({ applied }) => applied);

  const bet = getNotNil(selectMyBetById(state, editableBet.id), ["startCancelAddingBetReducer"], "selectMyBetById");

  return {
    ...state,
    myBets: {
      ...state.myBets,
      editableBet: {
        ...editableBet,
        adding: false,
        picks,
        hash: generateHash(bet, picks),
      },
    },
  };
};

export { startCancelAddingBetReducer };
