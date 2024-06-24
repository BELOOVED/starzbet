// @ts-nocheck
import { updateFlat } from "@sb/betting-core/Feed/UpdateFlat/UpdateFlat";
import { betSlipUpdatePickHandler } from "../../../BetSlip/Reducers/Handlers/BetSlipUpdatePickHandler";
import { eventSubSubscriptionsSelector } from "../../Selectors/FeedSelectors";

const feedUpdatedHandler = (state, payload) => {
  const { sports } = payload;

  const nextState = {
    ...state,
    feed: {
      ...state.feed,
      mainLine:
        Object.keys(sports).length === 0
          ? state.feed.mainLine
          : updateFlat(state.feed.mainLine, payload, eventSubSubscriptionsSelector(state)),
    },
  };

  return betSlipUpdatePickHandler(state, nextState);
};

export { feedUpdatedHandler };
