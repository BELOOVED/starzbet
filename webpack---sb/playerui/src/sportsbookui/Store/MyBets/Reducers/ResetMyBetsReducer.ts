import { type TReducer } from "@sb/utils";
import { type removedTokenAction } from "../../../../platformui/Store/Auth/AuthActions";
import { addingEditableBetSelector } from "../Selectors/MyBetsSelectors";
import { type IWithMyBetsState, myBetsState } from "../MyBetsState";
import { type resetMyBetsAction } from "../MyBetsActions";

type TResetMyBetsReducer = TReducer<IWithMyBetsState, typeof resetMyBetsAction | typeof removedTokenAction>

const resetMyBetsReducer: TResetMyBetsReducer = (state) => {
  if (addingEditableBetSelector(state)) {
    return state;
  }

  return {
    ...state,
    myBets: {
      ...myBetsState.myBets,
      openedBetsCount: state.myBets.openedBetsCount,
      outcomeHistory: {},
    },
  };
};

export { resetMyBetsReducer };
