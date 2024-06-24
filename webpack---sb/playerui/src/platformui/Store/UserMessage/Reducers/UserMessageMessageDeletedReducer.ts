import { type TReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type userMessageMessageDeletedAction } from "../UserMessageActions";
import { userMessageFindMessageByIdSelector } from "../UserMessageSelectors";

const userMessageMessageDeletedReducer: TReducer<TPlatformAppState, typeof userMessageMessageDeletedAction> = (
  state,
  { payload },
) => {
  const { messageId } = payload;

  const nextState: TPlatformAppState = {
    ...state,
    userMessage: {
      ...state.userMessage,
      messageIds: state.userMessage.messageIds.filter((it) => it !== messageId),
      messages: { ...state.userMessage.messages },
    },
  };

  if (nextState.userMessage.unseenId === messageId) {
    nextState.userMessage.unseenId = null;
  }

  /**
   * If deleted message exists in state, and it was not seen
   * we must decrement unseen count
   */
  const message = userMessageFindMessageByIdSelector(state, messageId);

  if (message && !message.seenAt) {
    nextState.userMessage.unseenCount -= 1;
  }

  delete nextState.userMessage.messages[messageId];

  return nextState;
};

export { userMessageMessageDeletedReducer };
