import { type TReducer } from "@sb/utils";
import type { TPlatform_UserMessage_Fragment } from "@sb/graphql-client/PlayerUI";
import { getLocalStorage } from "../../../../common/Store/LocalStorage/localStorageKeys";
import { platformLocalStorageKeys } from "../../../../common/Store/LocalStorage/PlatformLocalStorageKeys";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type userMessageInitialMessagesReceivedAction } from "../UserMessageActions";
import { userMessageHydrateUserMessageVariables } from "./UserMessageHydrateUserMessageVariables";

const userMessageInitialMessagesReceivedReducer: TReducer<TPlatformAppState, typeof userMessageInitialMessagesReceivedAction> = (
  state,
  { payload },
) => {
  const { pageInfo: nextPageInfo, messages } = payload;

  userMessageHydrateUserMessageVariables(state, ...messages);

  const nextMessageIds: string[] = [];
  const nextMessages: Record<string, TPlatform_UserMessage_Fragment> = {};

  const nextState: TPlatformAppState = {
    ...state,
    userMessage: {
      ...state.userMessage,
      messageIds: nextMessageIds,
      messages: nextMessages,
      pageInfo: nextPageInfo,
    },
  };

  messages.forEach((it) => {
    nextMessageIds.push(it.id);
    nextMessages[it.id] = it;
  });

  const lastMessage = messages[0];

  if (lastMessage && !lastMessage.seenAt) {
    const lastClosedId = getLocalStorage<string>(platformLocalStorageKeys.lastClosedUserMessageId);

    if (lastClosedId !== lastMessage.id) {
      nextState.userMessage.unseenId = lastMessage.id;
    }
  }

  return nextState;
};

export { userMessageInitialMessagesReceivedReducer };
