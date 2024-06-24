import { getNotNil, type TReducer } from "@sb/utils";
import { cannotUpdateMyBetsSelector, countPerPageMyBetsSelector, cursorMyBetsSelector } from "../Selectors/MyBetsSelectors";
import { type IWithMyBetsState } from "../MyBetsState";
import { type loadMoreMyBetsAction } from "../MyBetsActions";

const loadMoreMyBetsReducer: TReducer<IWithMyBetsState, typeof loadMoreMyBetsAction> = (state) => {
  if (cannotUpdateMyBetsSelector(state)) {
    return state;
  }

  const cursor = cursorMyBetsSelector(state);
  const cursorFirst = getNotNil(cursor.first, ["loadMoreMyBetsReducer"], "cursor.first");
  const countPerPage = getNotNil(
    countPerPageMyBetsSelector(state),
    ["loadMoreMyBetsReducer"],
    "countPerPageMyBetsSelector",
  );

  return {
    ...state,
    myBets: {
      ...state.myBets,
      cursor: {
        first: cursorFirst + countPerPage,
      },
    },
  };
};

export { loadMoreMyBetsReducer };
