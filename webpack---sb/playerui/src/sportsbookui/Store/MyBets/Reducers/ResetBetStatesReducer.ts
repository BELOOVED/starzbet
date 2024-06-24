import { type TReducer } from "@sb/utils";
import { type IWithMyBetsState } from "../MyBetsState";
import { type resetBetStatesAction } from "../MyBetsActions";

const resetBetStatesReducer: TReducer<IWithMyBetsState, typeof resetBetStatesAction> = (state) => ({
  ...state,
  myBets: {
    ...state.myBets,
    betHistory: {},
    outcomeHistory: {},
  },
});

export { resetBetStatesReducer };
