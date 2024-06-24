import { type TReducer } from "@sb/utils";
import { type IWithMyBetsState } from "../MyBetsState";
import { type nextPageMyBetsAction } from "../MyBetsActions";

const nextPageMyBetsReducer: TReducer<IWithMyBetsState, typeof nextPageMyBetsAction> = (state) => ({
  ...state,
  myBets: {
    ...state.myBets,
    cursor: {
      ...state.myBets.cursor,
      first: state.myBets.cursor.first || state.myBets.cursor.last,
      after: state.myBets.pageInfo.endCursor,
      before: void 0,
      last: void 0,
    },
  },
});

export { nextPageMyBetsReducer };
