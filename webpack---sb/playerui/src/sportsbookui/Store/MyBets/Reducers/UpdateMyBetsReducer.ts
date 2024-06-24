import { type TReducer } from "@sb/utils";
import { type IWithMyBetsState } from "../MyBetsState";
import { type updateMyBetsAction } from "../MyBetsActions";

const updateMyBetsReducer: TReducer<IWithMyBetsState, typeof updateMyBetsAction> = (
  state,
  { payload: { bets, pageInfo } },
) => ({
  ...state,
  myBets: {
    ...state.myBets,
    bets,
    pageInfo,
  },
});

export { updateMyBetsReducer };
