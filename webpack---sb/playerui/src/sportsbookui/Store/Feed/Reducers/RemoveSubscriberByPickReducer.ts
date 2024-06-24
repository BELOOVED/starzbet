// @ts-nocheck
import { removeSubscriberByPickHandler } from "./Handlers/RemoveSubscriberByPickHandler";

const removeSubscriberByPickReducer = (state, { payload: { id } }) => (
  removeSubscriberByPickHandler(state, id)
);

export { removeSubscriberByPickReducer };
