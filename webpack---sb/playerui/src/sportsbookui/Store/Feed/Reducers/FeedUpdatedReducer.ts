// @ts-nocheck
import { feedUpdatedHandler } from "./Handlers/FeedUpdatedHandler";

const feedUpdatedReducer = (state, { payload: { data } }) => {
  if(Array.isArray(data)){
    let nextState = { ...state };

    data.forEach((updates) => {
      nextState = feedUpdatedHandler(nextState, updates);
    });

    return nextState;
  }

  return feedUpdatedHandler(state, data);
};

export { feedUpdatedReducer };
