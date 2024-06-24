import { useSelector } from "react-redux";
import { type TExplicitAny } from "@sb/utils";
import { type TMessageType } from "../Types/TMessageType";
import { messageByIdSelector } from "../Store/Selectors/MessagesSelectors";
import { type TStateMessage } from "../Types/TMessage";

/**
 * Cast to TStateMessage<T> used for explicit narrow TMessageType to <T>.
 * In packages, message types can be used partially.
 *
 * @param messageId
 */
const useMessageById = <C extends Record<string, TExplicitAny>, T extends TMessageType = TMessageType>(
  messageId: string,
): TStateMessage<T, C> => useSelector(messageByIdSelector(messageId)) as TStateMessage<T, C>;

export { useMessageById };
