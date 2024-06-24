import { type IWithHistoryState } from "../HistoryInitialState";

const historyPrevPageReducer = (state: IWithHistoryState) => ({
  ...state,
  history: {
    ...state.history,
    variables: {
      ...state.history.variables,
      cursor: {
        ...state.history.variables.cursor,
        before: state.history.pageInfo.startCursor,
        last: state.history.variables.cursor.last || state.history.variables.cursor.first,
        after: void 0,
        first: void 0,
      },
    },
  },
});

export { historyPrevPageReducer };
