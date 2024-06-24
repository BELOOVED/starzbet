import { type TReducer } from "@sb/utils";
import { type IWithMyBetsState } from "../MyBetsState";
import { type changeCountPerPageMyBetsAction } from "../MyBetsActions";

const changeCountPerPageReducer: TReducer<IWithMyBetsState, typeof changeCountPerPageMyBetsAction> = (
  state,
  { payload: { countPerPage } },
) => (
  {
    ...state,
    myBets: {
      ...state.myBets,
      countPerPage,
      cursor: {
        ...state.myBets.cursor,
        first: state.myBets.cursor.first ? countPerPage : void 0,
        last: state.myBets.cursor.last ? countPerPage : void 0,
      },
    },
  });

export { changeCountPerPageReducer };
