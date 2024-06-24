import { createRootReducer } from "@sb/utils";
import {
  userMessageDropUnseenMessageIdAction,
  userMessageRestAction,
  userMessageInitialMessagesReceivedAction,
  userMessageLastMessageReceivedAction,
  userMessageMessageCreatedAction,
  userMessageMessageDeletedAction,
  userMessageMessageReceivedAction,
  userMessageMessageSeenAction,
  userMessageMoreMessagesReceivedAction,
  userMessageUnseenCountReceivedAction,
  userMessageStartLoadingMessageDetailsAction,
} from "../UserMessageActions";
import { userMessageMoreMessagesReceivedReducer } from "./UserMessageMoreMessagesReceivedReducer";
import { userMessageUnseenCountReceivedReducer } from "./UserMessageUnseenCountReceivedReducer";
import { userMessageMessageReceivedReducer } from "./UserMessageMessageReceivedReducer";
import { userMessageMessageCreatedReducer } from "./UserMessageMessageCreatedReducer";
import { userMessageMessageSeenReducer } from "./UserMessageMessageSeenReducer";
import { userMessageMessageDeletedReducer } from "./UserMessageMessageDeletedReducer";
import { userMessageResetReducer } from "./UserMessageResetReducer";
import { userMessageDropUnseenMessageIdReducer } from "./UserMessageDropUnseenMessageIdReducer";
import { userMessageLastMessageReceivedReducer } from "./UserMessageLastMessageReceivedReducer";
import { userMessageInitialMessagesReceivedReducer } from "./UserMessageInitialMessagesReceivedReducer";
import { userMessageStartLoadingMessageDetailsReducer } from "./UserMessageStartLoadingMessageDetailsReducer";

const userMessageRootReducer = createRootReducer([
  [userMessageResetReducer, userMessageRestAction],
  [userMessageDropUnseenMessageIdReducer, userMessageDropUnseenMessageIdAction],
  [userMessageStartLoadingMessageDetailsReducer, userMessageStartLoadingMessageDetailsAction],
  // loading
  [userMessageUnseenCountReceivedReducer, userMessageUnseenCountReceivedAction],
  [userMessageLastMessageReceivedReducer, userMessageLastMessageReceivedAction],
  [userMessageInitialMessagesReceivedReducer, userMessageInitialMessagesReceivedAction],
  [userMessageMoreMessagesReceivedReducer, userMessageMoreMessagesReceivedAction],
  [userMessageMessageReceivedReducer, userMessageMessageReceivedAction],
  // subscriptions
  [userMessageMessageSeenReducer, userMessageMessageSeenAction],
  [userMessageMessageCreatedReducer, userMessageMessageCreatedAction],
  [userMessageMessageDeletedReducer, userMessageMessageDeletedAction],
]);

export { userMessageRootReducer };
