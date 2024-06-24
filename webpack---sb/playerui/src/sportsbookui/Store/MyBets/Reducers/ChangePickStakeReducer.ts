import { getNotNil, type TReducer } from "@sb/utils";
import { type changePickStakeAction } from "../MyBetsActions";
import { type IWithMyBetsState } from "../MyBetsState";
import { editableBetSelector } from "../Selectors/MyBetsSelectors";

const changePickStakeReducer: TReducer<IWithMyBetsState, typeof changePickStakeAction> = (
  state,
  { payload: { stake } },
) => {
  const editableBet = getNotNil(editableBetSelector(state), ["changePickStakeReducer"], "editableBetSelector");

  return ({
    ...state,
    myBets: {
      ...state.myBets,
      editableBet: {
        ...editableBet,
        additionalStakeAmount: stake,
      },
    },
  });
};

export { changePickStakeReducer };
