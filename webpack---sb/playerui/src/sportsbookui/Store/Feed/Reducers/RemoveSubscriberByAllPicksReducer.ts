// @ts-nocheck
import { eventSubscriberEnum } from "../Model/EventSubscriberEnum";
import { filterSubscribersHandler } from "./Handlers/FilterSubscribersHandler";

const removeSubscriberByAllPicksReducer = (state, { payload }) => {
  if (payload?.keep) {
    return state;
  }

  return ({
    ...state,
    feed: {
      ...state.feed,
      eventSub: {
        ...state.feed.eventSub,
        subscribers: filterSubscribersHandler(state.feed.eventSub.subscribers, eventSubscriberEnum.betSlip),
      },
    },
  });
};

export { removeSubscriberByAllPicksReducer };
