import { type TReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type userMessageMessageReceivedAction } from "../UserMessageActions";
import { userMessageFindMessageByIdSelector } from "../UserMessageSelectors";
import { userMessageHydrateUserMessageVariables } from "./UserMessageHydrateUserMessageVariables";

const userMessageMessageReceivedReducer: TReducer<TPlatformAppState, typeof userMessageMessageReceivedAction> = (
  state,
  { payload },
) => {
  const { message: nextMessage, created } = payload;

  userMessageHydrateUserMessageVariables(state, nextMessage);

  const message = userMessageFindMessageByIdSelector(state, nextMessage.id);

  const nextState: TPlatformAppState = {
    ...state,
    userMessage: {
      ...state.userMessage,
      messages: {
        ...state.userMessage.messages,
        [nextMessage.id]: nextMessage,
      },
    },
  };

  if (!message) {
    nextState.userMessage.messageIds = [nextMessage.id, ...nextState.userMessage.messageIds];
  }

  if (created) {
    nextState.userMessage.unseenId = nextMessage.id;
  }

  return nextState;
};

export { userMessageMessageReceivedReducer };
