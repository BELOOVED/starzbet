import { type TReducer } from "@sb/utils";
import { callManagerRemoveSymbols } from "@sb/call-manager";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type userMessageRestAction } from "../UserMessageActions";
import { userMessageInitialState } from "../UserMessageInitialState";
import {
  USER_MESSAGE_LAST_MESSAGE_LOADING_SYMBOL,
  USER_MESSAGE_MESSAGE_LOADING_SYMBOL,
  USER_MESSAGE_INITIAL_MESSAGES_LOADING_SYMBOL,
  USER_MESSAGE_MORE_MESSAGES_LOADING_SYMBOL,
  USER_MESSAGE_UNSEEN_COUNT_LOADING_SYMBOL,
} from "../UserMessageVariables";

const userMessageResetReducer: TReducer<TPlatformAppState, typeof userMessageRestAction> = (
  state,
) => {
  const nextState: TPlatformAppState = {
    ...state,
    userMessage: {
      ...userMessageInitialState.userMessage,
      unseenCount: state.userMessage.unseenCount,
      detailedId: state.userMessage.detailedId,
    },
  };

  return callManagerRemoveSymbols(
    nextState,
    [
      USER_MESSAGE_UNSEEN_COUNT_LOADING_SYMBOL,
      USER_MESSAGE_LAST_MESSAGE_LOADING_SYMBOL,
      USER_MESSAGE_INITIAL_MESSAGES_LOADING_SYMBOL,
      USER_MESSAGE_MORE_MESSAGES_LOADING_SYMBOL,
      USER_MESSAGE_MESSAGE_LOADING_SYMBOL,
    ],
  );
};

export { userMessageResetReducer };
