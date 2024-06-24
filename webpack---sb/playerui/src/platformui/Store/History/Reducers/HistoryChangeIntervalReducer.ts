import { type TReducer } from "@sb/utils";
import { type IWithHistoryState } from "../HistoryInitialState";
import { type historyChangeIntervalAction } from "../HistoryActions";

const historyChangeIntervalReducer: TReducer<IWithHistoryState, typeof historyChangeIntervalAction> = (
  state,
  {
    payload: {
      from,
      to,
    },
  },
) => ({
  ...state,
  history: {
    ...state.history,
    filter: {
      ...state.history.filter,
      duration: null,
      from,
      to,
    },
  },
});

export { historyChangeIntervalReducer };
