import { getNotNil, type TReducer } from "@sb/utils";
import { type IWithMyBetsState } from "../MyBetsState";
import { editableBetSelector } from "../Selectors/MyBetsSelectors";
import { type startSaveMyBetsAction } from "../MyBetsActions";

const startSaveEditingMyBetsReducer: TReducer<IWithMyBetsState, typeof startSaveMyBetsAction> = (state) => {
  const editableBet = getNotNil(editableBetSelector(state), ["startSaveEditingMyBetsReducer"], "editableBetSelector");

  return ({
    ...state,
    myBets: {
      ...state.myBets,
      editableBet: {
        ...editableBet,
        saving: true,
      },
    },
  });
};

export { startSaveEditingMyBetsReducer };
