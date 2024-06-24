// @ts-nocheck
import { removeSubscriberHandler } from "./Handlers/RemoveSubscriberHandler";

const feedRemoveEventSubscriberReducer = (state, { payload: { subscriber, eventId } }) => (
  removeSubscriberHandler(state, eventId, subscriber)
);

export { feedRemoveEventSubscriberReducer };
