import { type TReducer } from "@sb/utils";
import { Logger } from "../../../../common/Utils/Logger";
import { hasEditableBet } from "../Selectors/MyBetsSelectors";
import { type IWithMyBetsState } from "../MyBetsState";
import { type cancelEditBetAction, type saveEditingBetDoneAction } from "../MyBetsActions";

type TCancelEditBetReducer = TReducer<IWithMyBetsState, typeof cancelEditBetAction | typeof saveEditingBetDoneAction>

const cancelEditBetReducer: TCancelEditBetReducer = (state) => {
  if (!hasEditableBet(state)) {
    Logger.warn.reducer("[MyBet]", "Start edit bet failed, already have editable bet.");

    return state;
  }

  return {
    ...state,
    myBets: {
      ...state.myBets,
      editableBet: undefined,
      outcomeHistory: {},
    },
  };
};

export { cancelEditBetReducer };
