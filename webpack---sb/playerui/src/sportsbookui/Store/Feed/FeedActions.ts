// @ts-nocheck
import { type EPostfix } from "@sb/sdk";

const feedFetchedAction = (data, retriedNumber: number, postfix: EPostfix) => ({
  type: "@FEED/FETCHED",
  payload: {
    data,
    retriedNumber,
    postfix,
  },
});

const feedResetLineReadyAction = (postfix: EPostfix) => ({
  type: "@FEED/RESET_LINE_READY",
  payload: {
    postfix,
  },
});

const feedUpdatedAction = (data) => ({
  type: "@FEED/CHANGED",
  payload: {
    data,
  },
});

const feedEventFetchedAction = (data, eventId: string) => ({
  type: "@FEED/EVENT_FETCHED",
  payload: { data, eventId },
});

const feedAddEventSubscriberAction = (subscriber, eventId: string) => ({
  type: "@FEED/ADD_EVENT_SUBSCRIBER",
  payload: {
    subscriber,
    eventId,
  },
});

const feedRemoveEventSubscriberAction = (subscriber, eventId: string) => ({
  type: "@FEED/REMOVE_EVENT_SUBSCRIBER",
  payload: {
    subscriber,
    eventId,
  },
});

export {
  feedFetchedAction,
  feedUpdatedAction,
  feedEventFetchedAction,
  feedAddEventSubscriberAction,
  feedRemoveEventSubscriberAction,
  feedResetLineReadyAction,
};
