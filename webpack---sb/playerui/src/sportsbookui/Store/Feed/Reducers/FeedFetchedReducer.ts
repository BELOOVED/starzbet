// @ts-nocheck
import { treeToFlat } from "@sb/betting-core/Feed/TreeToFlat";
import { updateFlat } from "@sb/betting-core/Feed/UpdateFlat/UpdateFlat";
import { betSlipUpdatePickHandler } from "../../BetSlip/Reducers/Handlers/BetSlipUpdatePickHandler";

const feedFetchedReducer = (state, { payload: { data, retriedNumber, postfix } }) => {
  const nextState = {
    ...state,
    feed: {
      ...state.feed,
      mainLine: retriedNumber === state.feed.retriedNumber //avoid double treeToFlat
        ? updateFlat(state.feed.mainLine, data)
        : treeToFlat(data),
      retriedNumber,
      lineReady: {
        ...state.feed.lineReady,
        [postfix]: true,
      },
    },
  };

  return betSlipUpdatePickHandler(state, nextState);
};

export { feedFetchedReducer };
