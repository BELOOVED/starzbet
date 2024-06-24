import { type TReducer } from "@sb/utils";
import { type receiveCountPlayerBetsAction } from "../MyBetsActions";
import { type IWithMyBetsState } from "../MyBetsState";

const receiveCountPlayerBetsReducer: TReducer<IWithMyBetsState, typeof receiveCountPlayerBetsAction> = (
  state,
  {
    payload: {
      totalBetsCount,
      openedBetsCount,
    },
  },
) => ({
  ...state,
  myBets: {
    ...state.myBets,
    openedBetsCount,
    totalBetsCount,
  },
});

export { receiveCountPlayerBetsReducer };
