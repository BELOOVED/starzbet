import { type TReducer } from "@sb/utils";
import { type IWithHistoryState } from "../HistoryInitialState";
import { type historyReceivedAction } from "../HistoryActions";

const historyReceivedReducer: TReducer<IWithHistoryState, typeof historyReceivedAction> = (
  state,
  {
    payload: {
      nodes,
      pageInfo,
      product,
    },
  },
) => ({
  ...state,
  history: {
    ...state.history,
    nodes,
    pageInfo,
    product,
  },
});

export { historyReceivedReducer };
