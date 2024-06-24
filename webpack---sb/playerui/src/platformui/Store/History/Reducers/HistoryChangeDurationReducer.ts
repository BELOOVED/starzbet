import { type TReducer } from "@sb/utils";
import { type IWithHistoryState } from "../HistoryInitialState";
import { type historyChangeDurationAction } from "../HistoryActions";

const historyChangeDurationReducer: TReducer<
  IWithHistoryState, typeof historyChangeDurationAction
> = (state, { payload: { duration } }) => ({
  ...state,
  history: {
    ...state.history,
    filter: {
      ...state.history.filter,
      duration,
    },
  },
});

export { historyChangeDurationReducer };
