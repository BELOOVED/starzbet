import { type TReducer } from "@sb/utils";
import { type requestMyBetsAction } from "../MyBetsActions";
import { type IWithMyBetsState } from "../MyBetsState";

const requestMyBetsReducer: TReducer<IWithMyBetsState, typeof requestMyBetsAction> = (
  state,
  { payload: { countPerPage } },
) => ({
  ...state,
  myBets: {
    ...state.myBets,
    countPerPage,
    cursor: {
      first: countPerPage,
    },
    pending: true,
  },
});

export { requestMyBetsReducer };
