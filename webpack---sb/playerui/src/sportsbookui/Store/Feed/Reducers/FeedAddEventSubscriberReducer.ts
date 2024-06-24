// @ts-nocheck
import { addSubscriberHandler } from "./Handlers/AddSubscriberHandler";

const feedAddEventSubscriberReducer = (state, { payload: { subscriber, eventId } }) => (
  addSubscriberHandler(state, eventId, subscriber)
);

export { feedAddEventSubscriberReducer };
