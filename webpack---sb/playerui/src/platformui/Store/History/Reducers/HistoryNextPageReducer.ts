import { type IWithHistoryState } from "../HistoryInitialState";

const historyNextPageReducer = (state: IWithHistoryState) => ({
  ...state,
  history: {
    ...state.history,
    variables: {
      ...state.history.variables,
      cursor: {
        ...state.history.variables.cursor,
        first: state.history.variables.cursor.first || state.history.variables.cursor.last,
        after: state.history.pageInfo.endCursor,
        before: void 0,
        last: void 0,
      },
    },
  },
});

export { historyNextPageReducer };
