import { getNotNil, type TReducer } from "@sb/utils";
import { type saveEditingBetErrorAction } from "../MyBetsActions";
import { type IWithMyBetsState } from "../MyBetsState";
import { editableBetSelector } from "../Selectors/MyBetsSelectors";

const saveErrorReducer: TReducer<IWithMyBetsState, typeof saveEditingBetErrorAction> = (
  state,
  { payload: { error } },
) => {
  const editableBet = getNotNil(editableBetSelector(state), ["saveErrorReducer"], "editableBetSelector");

  return (
    {
      ...state,
      myBets: {
        ...state.myBets,
        editableBet: {
          ...editableBet,
          lastSaveError: error,
          saving: false,
        },
      },
    }
  );
};

export { saveErrorReducer };
