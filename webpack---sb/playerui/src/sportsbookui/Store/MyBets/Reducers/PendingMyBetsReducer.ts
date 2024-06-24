import { type TReducer } from "@sb/utils";
import { type pendingMyBetsAction } from "../MyBetsActions";
import { type IWithMyBetsState } from "../MyBetsState";

const pendingMyBetsReducer: TReducer<IWithMyBetsState, typeof pendingMyBetsAction> = (
  state,
  { payload: { pending } },
) => ({
  ...state,
  myBets: {
    ...state.myBets,
    pending,
  },
});

export { pendingMyBetsReducer };
