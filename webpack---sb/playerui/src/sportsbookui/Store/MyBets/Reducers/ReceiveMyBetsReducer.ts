import { type TReducer } from "@sb/utils";
import { type receiveMyBetsAction } from "../MyBetsActions";
import { type IWithMyBetsState } from "../MyBetsState";

const receiveMyBetsReducer: TReducer<IWithMyBetsState, typeof receiveMyBetsAction> = (
  state,
  {
    payload: {
      where,
      filter,
      bets,
      pageInfo,
    },
  },
) => ({
  ...state,
  myBets: {
    ...state.myBets,
    where,
    filter,
    bets,
    pageInfo,
  },
});

export { receiveMyBetsReducer };
