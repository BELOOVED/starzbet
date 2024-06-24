import { type TReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type userMessageMoreMessagesReceivedAction } from "../UserMessageActions";
import { userMessageHydrateUserMessageVariables } from "./UserMessageHydrateUserMessageVariables";

const userMessageMoreMessagesReceivedReducer: TReducer<TPlatformAppState, typeof userMessageMoreMessagesReceivedAction> = (
  state,
  { payload },
) => {
  const { pageInfo: nextPageInfo, messages } = payload;

  userMessageHydrateUserMessageVariables(state, ...messages);

  const nextMessageIds = [...state.userMessage.messageIds];
  const nextMessages = { ...state.userMessage.messages };

  const nextState = {
    ...state,
    userMessage: {
      ...state.userMessage,
      messageIds: nextMessageIds,
      messages: nextMessages,
      pageInfo: nextPageInfo,
    },
  };

  messages.forEach((it) => {
    if (!nextMessageIds.includes(it.id)) {
      nextMessageIds.push(it.id);
    }

    nextMessages[it.id] = it;
  });

  return nextState;
};

export { userMessageMoreMessagesReceivedReducer };
