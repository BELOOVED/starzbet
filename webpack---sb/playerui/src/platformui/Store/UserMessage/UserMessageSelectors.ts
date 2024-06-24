import { createPropertySelectors, createSimpleSelector, getNotNil, isEmpty, isNil, isNotNil } from "@sb/utils";
import type { TPlatform_UserMessage_Fragment } from "@sb/graphql-client/PlayerUI";
import { callManagerStartedSelector, callManagerWasSucceededSelector } from "@sb/call-manager";
import { routerLocationPathnameSelector } from "@sb/router";
import { matchPath } from "@sb/react-router-compat";
import { type TPlatformAppState } from "../PlatformInitialState";
import { userMessageDetailsMatchOptions, userMessagesMatchOptions } from "../PlatformMatchOptions";
import { type IUserMessageState, type IWithUserMessageState, userMessageInitialState } from "./UserMessageInitialState";
import {
  USER_MESSAGE_INITIAL_MESSAGES_LOADING_SYMBOL,
  USER_MESSAGE_MESSAGE_LOADING_SYMBOL,
  USER_MESSAGE_MORE_MESSAGES_LOADING_SYMBOL,
} from "./UserMessageVariables";
import { EUserMessageState } from "./UserMessageModels";

const userMessageSelector = (state: IWithUserMessageState): IUserMessageState => state.userMessage;

const userMessagePropertySelectors = createPropertySelectors(userMessageSelector);

const userMessageGetUnseenMessageIdSelector = createSimpleSelector(
  [userMessagePropertySelectors.unseenId],
  (it) => getNotNil(it, ["userMessageGetUnseenMessageIdSelector"], "unseenId"),
);

const userMessageShouldResetSelector = createSimpleSelector(
  [userMessageSelector],
  (it) => it !== userMessageInitialState.userMessage,
);

const userMessageHasUnseenIdSelector = createSimpleSelector(
  [userMessagePropertySelectors.unseenId],
  isNotNil,
);

const userMessageHasUnseenMessagesSelector = createSimpleSelector(
  [userMessagePropertySelectors.unseenCount],
  Boolean,
);

const userMessageHasMoreMessagesSelector = createSimpleSelector(
  [userMessagePropertySelectors.pageInfo],
  (it) => !!it?.hasNextPage,
);

const userMessageFindMessageByIdSelector = (state: IWithUserMessageState, id: string): undefined | TPlatform_UserMessage_Fragment => {
  const messages = userMessagePropertySelectors.messages(state);

  return messages[id];
};

const userMessageIsMessageExistsSelector = createSimpleSelector(
  [userMessageFindMessageByIdSelector],
  Boolean,
);

const userMessageMessageSelector = (state: IWithUserMessageState, id: string): TPlatform_UserMessage_Fragment => {
  const message = userMessageFindMessageByIdSelector(state, id);

  return getNotNil(message, ["userMessageByIdSelector", id], "message");
};

const userMessageMessagePropertySelectors = createPropertySelectors(userMessageMessageSelector);

const userMessagesIsMessagesRouteMatchedSelector = (state: TPlatformAppState) => {
  const pathname = routerLocationPathnameSelector(state);

  return !!matchPath(pathname, userMessagesMatchOptions);
};

const userMessageMessageDetailsRouteMatchSelector = (state: TPlatformAppState) => {
  const pathname = routerLocationPathnameSelector(state);

  return matchPath<IWithId>(pathname, userMessageDetailsMatchOptions);
};

const userMessageIsMessageDetailsIsRouteMatchedSelector = createSimpleSelector(
  [userMessageMessageDetailsRouteMatchSelector],
  isNotNil,
);

const userMessageFindDetailedMessageIdSelector = createSimpleSelector(
  [userMessageMessageDetailsRouteMatchSelector],
  (it) => it?.params.id,
);

const userMessageDetailedMessageIdSelector = createSimpleSelector(
  [userMessageFindDetailedMessageIdSelector],
  (it) => getNotNil(it, ["userMessageDetailsIdSelector"], "id"),
);

const userMessageIsMessageSeenSelector = createSimpleSelector(
  [userMessageMessagePropertySelectors.seenAt],
  isNotNil,
);

const userMessageUnseenMessagesSelector = (state: IWithUserMessageState) => {
  const messageIds = userMessagePropertySelectors.messageIds(state);

  return messageIds.filter((id) => !userMessageIsMessageSeenSelector(state, id));
};

const userMessageSeenMessagesSelector = (state: IWithUserMessageState) => {
  const messageIds = userMessagePropertySelectors.messageIds(state);

  return messageIds.filter((id) => userMessageIsMessageSeenSelector(state, id));
};

const userMessageMessagesLoadingSelector = callManagerStartedSelector.with.symbol([
  USER_MESSAGE_INITIAL_MESSAGES_LOADING_SYMBOL,
  USER_MESSAGE_MORE_MESSAGES_LOADING_SYMBOL,
]);

const userMessageMessagesWasLoadedSelector = callManagerWasSucceededSelector.with.symbol(USER_MESSAGE_INITIAL_MESSAGES_LOADING_SYMBOL);

const userMessageIsDetailedMessageExistSelector = (state: TPlatformAppState) => {
  const id = userMessageDetailedMessageIdSelector(state);

  return userMessageIsMessageExistsSelector(state, id);
};

const userMessageNotNilDetailedMessageFromStoreSelector = createSimpleSelector(
  [userMessagePropertySelectors.detailedId],
  (id) => getNotNil(id, ["UserMessageSelectors", "userMessageNotNilDetailedMessageFromStoreSelector"], "id"),
);

const userMessageIsDetailedMessageExistInStoreSelector = (state: TPlatformAppState) => {
  const id = userMessagePropertySelectors.detailedId(state);
  if(isNil(id)) {
    return false;
  }

  return userMessageIsMessageExistsSelector(state, id);
};

const userMessageDetailedMessageLoadingSelector = (state: TPlatformAppState) => {
  const id = userMessageDetailedMessageIdSelector(state);

  const loading = callManagerStartedSelector(state, USER_MESSAGE_MESSAGE_LOADING_SYMBOL, id);

  if (!loading) {
    return false;
  }

  const wasLoaded = callManagerWasSucceededSelector(state, USER_MESSAGE_MESSAGE_LOADING_SYMBOL, id);

  return loading && !wasLoaded;
};

const userMessageWasLoadedAndEmptyMessagesSelector = (state: TPlatformAppState) => {
  const wasLoaded = userMessageMessagesWasLoadedSelector(state);
  const ids = userMessagePropertySelectors.messageIds(state);

  return wasLoaded && isEmpty(ids);
};

const userMessageStateSelector = (state: TPlatformAppState) => {
  const loading = userMessageMessagesLoadingSelector(state);
  if (loading) {
    return EUserMessageState.loading;
  }

  const wasLoadedAndEmpty = userMessageWasLoadedAndEmptyMessagesSelector(state);
  if (wasLoadedAndEmpty) {
    return EUserMessageState.empty;
  }

  return EUserMessageState.full;
};

const userMessageDetailedMessageStateSelector = (state: TPlatformAppState) => {
  const loading = userMessageDetailedMessageLoadingSelector(state);
  if (loading) {
    return EUserMessageState.loading;
  }

  const exist = userMessageIsDetailedMessageExistSelector(state);
  if (!exist) {
    return EUserMessageState.empty;
  }

  return EUserMessageState.full;
};

export {
  userMessagePropertySelectors,
  userMessageGetUnseenMessageIdSelector,
  userMessageShouldResetSelector,
  userMessageHasMoreMessagesSelector,
  userMessageMessagesWasLoadedSelector,
  userMessageIsDetailedMessageExistSelector,
  userMessageFindMessageByIdSelector,
  userMessageIsMessageExistsSelector,
  userMessageMessageSelector,
  userMessageMessagePropertySelectors,
  userMessageIsMessageDetailsIsRouteMatchedSelector,
  userMessageDetailedMessageIdSelector,
  userMessageIsMessageSeenSelector,
  userMessageUnseenMessagesSelector,
  userMessageSeenMessagesSelector,
  userMessageHasUnseenIdSelector,
  userMessageHasUnseenMessagesSelector,
  userMessagesIsMessagesRouteMatchedSelector,
  userMessageFindDetailedMessageIdSelector,
  userMessageStateSelector,
  userMessageDetailedMessageStateSelector,
  userMessageNotNilDetailedMessageFromStoreSelector,
  userMessageIsDetailedMessageExistInStoreSelector,
};
