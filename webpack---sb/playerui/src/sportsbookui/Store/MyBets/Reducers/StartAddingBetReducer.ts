import { getNotNil, type TReducer } from "@sb/utils";
import { type IWithMyBetsState } from "../MyBetsState";
import { editableBetSelector } from "../Selectors/MyBetsSelectors";
import { type startAddingBetAction } from "../MyBetsActions";

const startAddingBetReducer: TReducer<IWithMyBetsState, typeof startAddingBetAction> = (state) => {
  const editableBet = getNotNil(editableBetSelector(state), ["startAddingBetReducer"], "editableBetSelector");

  return ({
    ...state,
    myBets: {
      ...state.myBets,
      editableBet: { ...editableBet, adding: true },
    },
  });
};

export { startAddingBetReducer };
