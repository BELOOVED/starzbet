import { type TReducer } from "@sb/utils";
import { type IWithMyBetsState } from "../MyBetsState";
import { type receiveBetStatesAction } from "../MyBetsActions";

const receiveBetStatesReducer: TReducer<IWithMyBetsState, typeof receiveBetStatesAction> = (
  state,
  { payload: { betId, history } },
) => ({
  ...state,
  myBets: {
    ...state.myBets,
    betHistory: {
      ...state.myBets.betHistory,
      [betId]: history,
    },
  },
});

export { receiveBetStatesReducer };
