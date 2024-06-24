// @ts-nocheck
import { updateFlat } from "@sb/betting-core/Feed/UpdateFlat/UpdateFlat";
import { betSlipUpdatePickHandler } from "../../../BetSlip/Reducers/Handlers/BetSlipUpdatePickHandler";

const feedEventFetchedHandler = (state, payload) => {
  const nextState = {
    ...state,
    feed: {
      ...state.feed,
      mainLine: updateFlat(state.feed.mainLine, payload),
    },
  };

  return betSlipUpdatePickHandler(state, nextState);
};

export { feedEventFetchedHandler };
