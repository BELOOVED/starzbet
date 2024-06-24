// @ts-nocheck
import { eventSubSubscribersSelector } from "../../Selectors/FeedSelectors";

const maybeAdd = (list, item) => (list.includes(item)
  ? list
  : [...list, item]);

const addSubscriberHandler = (state, eventId, subscriber) => {
  const curSubscribers = eventSubSubscribersSelector(state);

  const subscribers = curSubscribers.hasOwnProperty(eventId)
    ? {
      ...curSubscribers,
      [eventId]: maybeAdd(curSubscribers[eventId], subscriber),
    }
    : {
      ...curSubscribers,
      [eventId]: [subscriber],
    };

  return ({
    ...state,
    feed: {
      ...state.feed,
      eventSub: {
        ...state.feed.eventSub,
        subscribers,
        subscriptions: {
          ...state.feed.eventSub.subscriptions,
          [eventId]: true,
        },
      },
    },
  });
};

export { addSubscriberHandler };
