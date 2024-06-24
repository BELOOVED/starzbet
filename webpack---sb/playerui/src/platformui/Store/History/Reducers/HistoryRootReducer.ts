import { createRootReducer, type TReducer } from "@sb/utils";
import {
  historyChangeDurationAction,
  historyChangeIntervalAction,
  historyClearAction,
  historyNextPageAction,
  historyPrevPageAction,
  historyReceivedAction,
} from "../HistoryActions";
import { historyInitialState, type IWithHistoryState } from "../HistoryInitialState";
import { historyReceivedReducer } from "./HistoryReceivedReducer";
import { historyChangeDurationReducer } from "./HistoryChangeDurationReducer";
import { historyChangeIntervalReducer } from "./HistoryChangeIntervalReducer";
import { historyPrevPageReducer } from "./HistoryPrevPageReducer";
import { historyNextPageReducer } from "./HistoryNextPageReducer";

const historyClearReducer: TReducer<
  IWithHistoryState, typeof historyClearAction
> = (state) => ({
  ...state,
  history: {
    ...historyInitialState.history,
    filter: state.history.filter,
  },
});

const historyRootReducer = createRootReducer([
  [historyReceivedReducer, historyReceivedAction],
  [historyChangeDurationReducer, historyChangeDurationAction],
  [historyChangeIntervalReducer, historyChangeIntervalAction],
  [historyPrevPageReducer, historyPrevPageAction],
  [historyNextPageReducer, historyNextPageAction],
  [historyClearReducer, historyClearAction],
]);

export { historyRootReducer };
