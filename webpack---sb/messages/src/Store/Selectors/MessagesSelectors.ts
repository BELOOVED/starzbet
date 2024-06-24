import { getNotNil, type TExplicitAny } from "@sb/utils";
import { type IWithMessagesState } from "../../Types/IWithMessagesState";
import { type TMessagePosition } from "../../Types/TMessagePosition";

const messagesListSelector = <C extends Record<string, TExplicitAny>>(state: IWithMessagesState<C>) =>
  state.messages.list
;

const messageByIdSelector = <C extends Record<string, TExplicitAny>>(id: string) =>
  (state: IWithMessagesState<C>) => {
    const messagesList = messagesListSelector(state);

    const message = messagesList.find((message) => message.id === id);

    return getNotNil(
      message,
      ["messageByIdSelector"],
      "message",
    );
  };

/**
 * @internal
 */
const messagesIdsByPositionSelector = (position: TMessagePosition) => (state: IWithMessagesState) => {
  const messagesList = messagesListSelector(state);

  return messagesList.filter((message) => message.position === position).map((message) => message.id);
};

/**
 * @internal
 */
const currentMessagesPositionsSelector = (state: IWithMessagesState) => {
  const messagesList = messagesListSelector(state);

  return [...new Set(messagesList.map((message) => message.position))];
};

export { messagesIdsByPositionSelector, currentMessagesPositionsSelector, messageByIdSelector };
