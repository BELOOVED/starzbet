import { type TExplicitAny, uuid4 } from "@sb/utils";
import { type IMessagesState } from "../../Types/IMessagesState";
import { type TMessageConfig } from "../../Types/TMessage";

const messageCreation = <C extends Record<string, TExplicitAny>>(
  state: IMessagesState,
  config: TMessageConfig<C>,
): IMessagesState => {
  /**
   * Message creation don't require `position` property.
   * By default, will be used fallback position, passed in `MessagesProvider` component.
   */
  const position = config.position ?? state.fallbackPosition;

  return {
    ...state,
    list: [
      ...state.list,
      {
        ...config,
        id: uuid4(),
        position,
      },
    ],
  };
};

const messageDeletion = (
  state: IMessagesState,
  id: string,
): IMessagesState => ({
  ...state,
  list: state.list.filter((message) => message.id !== id),
});

const allMessagesDeletion = (
  state: IMessagesState,
): IMessagesState => ({
  ...state,
  list: [],
});

export { messageCreation, messageDeletion, allMessagesDeletion };
