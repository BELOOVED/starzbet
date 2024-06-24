import { type TReducer } from "@sb/utils";
import { type IWithMyBetsState } from "../MyBetsState";
import { type prevPageMyBetsAction } from "../MyBetsActions";

const prevPageMyBetsReducer: TReducer<IWithMyBetsState, typeof prevPageMyBetsAction> = (state) => ({
  ...state,
  myBets: {
    ...state.myBets,
    cursor: {
      ...state.myBets.cursor,
      before: state.myBets.pageInfo.startCursor,
      last: state.myBets.cursor.last || state.myBets.cursor.first,
      after: void 0,
      first: void 0,
    },
  },
});

export { prevPageMyBetsReducer };
