import { type IWithId, type TExplicitAny } from "@sb/utils";
import { type TMessageConfig, type TStateMessage } from "../../Types/TMessage";

/**
 * Don't use this action directly.
 * Create presets based on this function with only `message` parameter and use it.
 */
const createMessageAction = <C extends Record<string, TExplicitAny>>(payload: TMessageConfig<C>) =>
  ({ type: "@@MESSAGES__CREATE", payload });

const deleteMessageAction = (payload: IWithId) =>
  ({ type: "@@MESSAGES__DELETE", payload });

const deleteAllMessagesAction = () => ({ type: "@@MESSAGES__DELETE_ALL" });

/**
 * @internal
 */
const setMessageFallbackPositionAction = (payload: Pick<TStateMessage, "position">) =>
  ({ type: "@@MESSAGES__SET_FALLBACK_POSITION", payload });

export {
  createMessageAction,
  deleteMessageAction,
  deleteAllMessagesAction,
  setMessageFallbackPositionAction,
};
