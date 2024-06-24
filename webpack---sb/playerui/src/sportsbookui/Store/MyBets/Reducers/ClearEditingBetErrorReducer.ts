import { getNotNil, type TReducer } from "@sb/utils";
import { type clearEditingBetErrorAction } from "../MyBetsActions";
import { type IWithMyBetsState } from "../MyBetsState";
import { editableBetSelector } from "../Selectors/MyBetsSelectors";

const clearEditingBetErrorReducer: TReducer<IWithMyBetsState, typeof clearEditingBetErrorAction> = (state) => {
  const editableBet = getNotNil(editableBetSelector(state), ["clearEditingBetErrorReducer"], "editableBetSelector");

  return (
    {
      ...state,
      myBets: {
        ...state.myBets,
        editableBet: {
          ...editableBet,
          lastSaveError: undefined,
          saving: false,
        },
      },
    }
  );
};

export { clearEditingBetErrorReducer };
