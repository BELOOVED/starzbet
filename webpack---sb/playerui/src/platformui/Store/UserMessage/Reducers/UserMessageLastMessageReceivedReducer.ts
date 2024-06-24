import { type TReducer } from "@sb/utils";
import { getLocalStorage } from "../../../../common/Store/LocalStorage/localStorageKeys";
import { platformLocalStorageKeys } from "../../../../common/Store/LocalStorage/PlatformLocalStorageKeys";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type userMessageLastMessageReceivedAction } from "../UserMessageActions";
import { userMessageHydrateUserMessageVariables } from "./UserMessageHydrateUserMessageVariables";

const userMessageLastMessageReceivedReducer: TReducer<TPlatformAppState, typeof userMessageLastMessageReceivedAction> = (
  state,
  { payload },
) => {
  const { message } = payload;

  if (message) {
    userMessageHydrateUserMessageVariables(state, message);
  }

  /**
   * If last message not seen and modal of it was not closed
   * we must show modal
   */
  if (!message || message.seenAt) {
    return state;
  }

  const lastClosedId = getLocalStorage<string>(platformLocalStorageKeys.lastClosedUserMessageId);

  if (lastClosedId === message.id) {
    return state;
  }

  return {
    ...state,
    userMessage: {
      ...state.userMessage,
      unseenId: message.id,
      messageIds: [message.id, ...state.userMessage.messageIds],
      messages: {
        ...state.userMessage.messages,
        [message.id]: message,
      },
    },
  };
};

export { userMessageLastMessageReceivedReducer };
