import { type TReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type userMessageMessageSeenAction } from "../UserMessageActions";
import { userMessageMessageSelector } from "../UserMessageSelectors";

const userMessageMessageSeenReducer: TReducer<TPlatformAppState, typeof userMessageMessageSeenAction> = (
  state,
  { payload },
) => {
  const { messageId } = payload;

  const message = userMessageMessageSelector(state, messageId);

  return {
    ...state,
    userMessage: {
      ...state.userMessage,
      messages: {
        ...state.userMessage.messages,
        [messageId]: {
          ...message,
          /**
           * Actual seen date with high chance will be different when message
           * will be fetched but date now is enough before fetch
           */
          seenAt: Date.now().toString(),
        },
      },
      unseenCount: state.userMessage.unseenCount - 1,
    },
  };
};

export { userMessageMessageSeenReducer };
