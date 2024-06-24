import { type feedEventFetchedAction } from "../FeedActions";
import { type IWithFeed } from "../FeedState";
import { feedEventFetchedHandler } from "./Handlers/FeedEventFetchedHandler";

const feedEventFetchedReducer = (state: IWithFeed, { payload: { data, eventId } }: ReturnType<typeof feedEventFetchedAction>) => {
  let nextState = {
    ...state,
    feed: {
      ...state.feed,
      eventSub: {
        ...state.feed.eventSub,
        fetched: {
          ...state.feed.eventSub.fetched,
          [eventId]: true,
        },
      },
    },
  };

  if(Array.isArray(data)){
    data.forEach((updates) => {
      nextState = feedEventFetchedHandler(nextState, updates);
    });

    return nextState;
  }

  return feedEventFetchedHandler(nextState, data);
};

export { feedEventFetchedReducer };
