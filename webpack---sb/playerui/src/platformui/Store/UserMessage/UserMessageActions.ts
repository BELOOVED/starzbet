import type { TPageInfo_Fragment } from "@sb/graphql-client";
import type { TPlatform_UserMessage_Fragment } from "@sb/graphql-client/PlayerUI";

const userMessageRestAction = () => ({
  type: "@USER_MESSAGE/RESET",
});

const userMessageUnseenCountReceivedAction = (unseenCount: number) => ({
  type: "@USER_MESSAGE/UNSEEN_COUNT_RECEIVED",
  payload: { unseenCount },
});

const userMessageLastMessageReceivedAction = (message: null | TPlatform_UserMessage_Fragment) => ({
  type: "@USER_MESSAGE/LAST_MESSAGE_RECEIVED",
  payload: { message },
});

const userMessageStartLoadingInitialMessagesAction = () => ({
  type: "@USER_MESSAGE/START_LOADING_INITIAL_MESSAGES",
});

const userMessageInitialMessagesReceivedAction = (messages: TPlatform_UserMessage_Fragment[], pageInfo: TPageInfo_Fragment) => ({
  type: "@USER_MESSAGE/INITIAL_MESSAGES_RECEIVED",
  payload: { messages, pageInfo },
});

const userMessageLoadMoreMessagesAction = () => ({
  type: "@USER_MESSAGE/LOAD_MORE_MESSAGES",
});

const userMessageMoreMessagesReceivedAction = (messages: TPlatform_UserMessage_Fragment[], pageInfo: TPageInfo_Fragment) => ({
  type: "@USER_MESSAGE/MORE_MESSAGES_RECEIVED",
  payload: { messages, pageInfo },
});

const userMessageStartLoadingMessageDetailsAction = (id: string) => ({
  type: "@USER_MESSAGE/START_LOADING_MESSAGE",
  payload: { id },
});

const userMessageMessageReceivedAction = (message: TPlatform_UserMessage_Fragment, created: boolean) => ({
  type: "@USER_MESSAGE/MESSAGE_RECEIVED",
  payload: { message, created },
});

const userMessageMessageSeenAction = (messageId: string) => ({
  type: "@USER_MESSAGE/MESSAGE_SEEN",
  payload: { messageId },
});

const userMessageMessageCreatedAction = () => ({
  type: "@USER_MESSAGE/MESSAGE_CREATED",
});

const userMessageMessageDeletedAction = (messageId: string) => ({
  type: "@USER_MESSAGE/MESSAGE_DELETED",
  payload: { messageId },
});

const userMessageDropUnseenMessageIdAction = () => ({
  type: "@USER_MESSAGE/DROP_UNSEEN_MESSAGE_ID",
});

export {
  userMessageRestAction,
  userMessageLoadMoreMessagesAction,
  userMessageUnseenCountReceivedAction,
  userMessageLastMessageReceivedAction,
  userMessageInitialMessagesReceivedAction,
  userMessageMoreMessagesReceivedAction,
  userMessageMessageReceivedAction,
  userMessageMessageSeenAction,
  userMessageMessageCreatedAction,
  userMessageMessageDeletedAction,
  userMessageDropUnseenMessageIdAction,
  userMessageStartLoadingInitialMessagesAction,
  userMessageStartLoadingMessageDetailsAction,
};
