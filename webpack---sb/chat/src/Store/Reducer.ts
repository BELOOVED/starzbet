import { type ActionCreator, type AnyAction } from "redux";
import { ascend, createRootReducer, descend, entries, sort } from "@sb/utils";
import { fromEntries } from "@sb/utils/FromEntries";
import { chatMessageMapper, chatMessagesListMapper } from "../Utils/ChatMessageMapper";
import { type IUserChatMessage } from "../Model/Message";
import {
  chatActiveMessageChangedAction,
  chatActiveMessageClosedAction,
  chatCleanedAction,
  chatIntrospectionUpdatedAction,
  chatLocaleChangedAction,
  chatLocaleChangingDialogVisibilityChangedAction,
  chatMessageDeletedAction,
  chatMessageHighlightedAction,
  chatMessageHighlightHiddenAction,
  chatMessagesFetchedAction,
  chatMessagesFetchedByCursorAction,
  chatMessageUpdatedAction,
  chatOnlineUsersCountUpdatedAction,
  chatReplyModeChangedAction,
} from "./Actions";
import { createChatInitialState, type IChatState } from "./State";

type TReducer<A extends ActionCreator<AnyAction> = ActionCreator<AnyAction>, S extends IChatState = IChatState> =
  (state: S, action: ReturnType<A>) => S;

/**
 * This reducer map and set (NOT MERGE) messages to store.
 *
 * Messages in payload sort ascending by date and then first message id set as cursor to store.
 *
 * @param state
 * @param data
 */
const chatMessagesFetchedReducer: TReducer<typeof chatMessagesFetchedAction> = (
  state,
  { payload: { data } },
) => {
  const sortedByDateMessages = sort(
    ascend((message) => Number(message.timestamp)),
    data.messages,
  );

  return {
    ...state,
    messages: chatMessagesListMapper(data.messages),
    repliedMessages: chatMessagesListMapper(data.repliedMessages),
    meta: {
      ...state.meta,
      hasUnreadMessages: false,
      bottomMessageId: null,
      isReplyModeEnabled: false,
      activeMessageId: null,
      topMessageId: sortedByDateMessages.at(0)?.id ?? null,
      initialMessagesFetched: true,
    },
  };
};

const chatMessagesFetchedByCursorReducer: TReducer<typeof chatMessagesFetchedByCursorAction> = (
  state,
  { payload: { data } },
) => {
  const {
    messages,
    repliedMessages,
    preservedMessages,
    clean,
    direction,
  } = data;

  const mappedPreservedMessages = (preservedMessages ?? []).reduce<Record<string, IUserChatMessage>>(
    (acc, item) => {
      acc[item.id] = item;

      return acc;
    },
    {},
  );

  if (clean) {
    const sortedByDateMessages = sort(
      ascend((message) => Number(message.timestamp)),
      data.messages,
    );

    return {
      ...state,
      messages: {
        ...mappedPreservedMessages,
        ...chatMessagesListMapper(messages),
      },
      repliedMessages: chatMessagesListMapper(repliedMessages),
      meta: {
        ...state.meta,
        activeMessageId: null,
        isReplyModeEnabled: false,
        topMessageId: sortedByDateMessages.at(0)?.id ?? null,
        bottomMessageId: sortedByDateMessages.at(-1)?.id ?? null,
      },
    };
  }

  const newMessages = {
    ...mappedPreservedMessages,
    ...chatMessagesListMapper(messages),
  };

  const sortedMessages = Object.values(
    newMessages,
  ).sort(
    ascend((message) => message.timestamp),
  );

  const nextState = {
    ...state,
    messages: newMessages,
    repliedMessages: {
      ...state.repliedMessages,
      ...chatMessagesListMapper(repliedMessages),
    },
    meta: {
      ...state.meta,
      targetMessageId: null,
      isReplyModeEnabled: false,
      topMessageId: sortedMessages.at(0)?.id ?? null,
      bottomMessageId: sortedMessages.at(-1)?.id ?? null,
    },
  };

  if (direction === "up" && state.meta.topMessageId === sortedMessages.at(0)?.id) {
    nextState.meta.topMessageId = null;
  }

  if (direction === "down" && state.meta.bottomMessageId === sortedMessages.at(-1)?.id) {
    nextState.meta.bottomMessageId = null;
    nextState.meta.hasUnreadMessages = false;
  }

  return nextState;
};

const chatMessageUpdatedReducer: TReducer<typeof chatMessageUpdatedAction> = (
  state,
  { payload: { data } },
) => {
  if (state.meta.bottomMessageId !== null) {
    return {
      ...state,
      meta: {
        ...state.meta,
        hasUnreadMessages: true,
      },
    };
  }

  const { message, repliedMessages } = data;

  const sortedEntries = sort(
    descend(([_, message]) => Number(message.timestamp)),
    entries({
      ...state.messages,
      [message.id]: chatMessageMapper({ ...message, timestamp: message.timestamp.toString() }),
    }),
  );

  const stackedEntries = state.messages[message.id]
    ? sortedEntries
    : sortedEntries.slice(0, state.meta.messagesLimit);

  return {
    ...state,
    messages: fromEntries(stackedEntries),
    repliedMessages: {
      ...state.repliedMessages,
      ...chatMessagesListMapper(repliedMessages),
    },
    meta: {
      ...state.meta,
      topMessageId: stackedEntries.at(-1)?.[1].id ?? null,
      isReplyModeEnabled: state.meta.activeMessageId === sortedEntries.at(-1)?.[1].id ? false : state.meta.isReplyModeEnabled,
      activeMessageId: state.meta.activeMessageId === sortedEntries.at(-1)?.[1].id ? null : state.meta.activeMessageId,
    },
  };
};

const chatMessageDeletedReducer: TReducer<typeof chatMessageDeletedAction> = (
  state,
  { payload: { data } },
) => {
  const { messageId } = data;

  const message = state.messages[messageId];
  const repliedMessage = state.repliedMessages[messageId];

  if (!message && !repliedMessage) {
    return state;
  }

  const nextState = { ...state };

  if (message) {
    nextState.messages = {
      ...nextState.messages,
      [message.id]: {
        ...message,
        deleted: true,
      },
    };
  }

  if (repliedMessage) {
    nextState.repliedMessages = {
      ...nextState.repliedMessages,
      [repliedMessage.id]: {
        ...repliedMessage,
        deleted: true,
      },
    };
  }

  const sortedEntries = sort(
    descend(([_, message]) => Number(message.timestamp)),
    entries(nextState.messages).filter(([, message]) => !message.deleted),
  );

  const meta = {
    ...nextState.meta,
    isReplyModeEnabled: nextState.meta.activeMessageId === sortedEntries.at(-1)?.[1].id ? false : nextState.meta.isReplyModeEnabled,
  };

  if (meta.topMessageId) {
    meta.topMessageId = sortedEntries.at(-1)?.[1].id ?? null;
  }

  if (meta.bottomMessageId) {
    meta.bottomMessageId = sortedEntries.at(0)?.[1].id ?? null;
  }

  if (nextState.meta.activeMessageId === messageId) {
    meta.activeMessageId = null;
    meta.highlightedMessageId = null;
  }

  return {
    ...nextState,
    meta,
  };
};

const chatIntrospectionUpdatedReducer: TReducer<typeof chatIntrospectionUpdatedAction> = (
  state,
  { payload: { data } },
) => ({
  ...state,
  messages: {
    ...state.messages,
    [data.message.id]: data.message,
  },
  meta: {
    ...state.meta,
    usersOnline: data.usersOnline,
  },
});

const chatOnlineUsersCountUpdatedReducer: TReducer<typeof chatOnlineUsersCountUpdatedAction> = (
  state,
  { payload: { data } },
) => ({
  ...state,
  meta: {
    ...state.meta,
    usersOnline: data,
  },
});

const chatActiveMessageChangedReducer: TReducer<typeof chatActiveMessageChangedAction> = (
  state,
  { payload: { data } },
) => ({
  ...state,
  meta: {
    ...state.meta,
    activeMessageId: state.meta.activeMessageId === data ? null : data,
    isReplyModeEnabled: false,
  },
});

const chatActiveMessageClosedReducer: TReducer =
  (state) => ({
    ...state,
    meta: {
      ...state.meta,
      activeMessageId: null,
    },
  });

const chatStateCleanedReducer: TReducer = (state) => createChatInitialState(state.meta.locale)["com.chat"];

const chatLocaleChangedReducer: TReducer<typeof chatLocaleChangedAction> = (
  state,
  { payload: { data } },
) => ({
  ...state,
  meta: {
    ...state.meta,
    locale: data,
  },
});

const chatReplyModeChangedReducer: TReducer = (
  state,
) => ({
  ...state,
  meta: {
    ...state.meta,
    isReplyModeEnabled: !state.meta.isReplyModeEnabled,
  },
});

const chatLocaleChangingDialogVisibilityChangedReducer: TReducer<typeof chatLocaleChangingDialogVisibilityChangedAction> = (
  state,
  { payload: { data } },
) => ({
  ...state,
  meta: {
    ...state.meta,
    isReplyModeEnabled: !state.meta.isReplyModeEnabled,
    isLocaleBottomSheetVisible: data,
  },
});

const chatMessageHighlightedReducer: TReducer<typeof chatMessageHighlightedAction> = (
  state,
  { payload: { data } },
) => {
  const repliedMessage = state.repliedMessages[data];

  if (repliedMessage === undefined) {
    return ({
      ...state,
      meta: {
        ...state.meta,
        highlightedMessageId: data,
      },
    });
  }

  return ({
    ...state,
    meta: {
      ...state.meta,
      highlightedMessageId: data,
    },
  });
};

const chatMessageHighlightHiddenReducer: TReducer = (
  state,
) => ({
  ...state,
  meta: {
    ...state.meta,
    highlightedMessageId: null,
  },
});

const chatReducer = {
  "com.chat": createRootReducer<IChatState>([
    [chatMessagesFetchedReducer, chatMessagesFetchedAction],
    [chatMessagesFetchedByCursorReducer, chatMessagesFetchedByCursorAction],
    [chatMessageUpdatedReducer, chatMessageUpdatedAction],
    [chatMessageDeletedReducer, chatMessageDeletedAction],
    [chatStateCleanedReducer, chatCleanedAction],
    [chatOnlineUsersCountUpdatedReducer, chatOnlineUsersCountUpdatedAction],
    [chatIntrospectionUpdatedReducer, chatIntrospectionUpdatedAction],
    [chatActiveMessageChangedReducer, chatActiveMessageChangedAction],
    [chatActiveMessageClosedReducer, chatActiveMessageClosedAction],
    [chatReplyModeChangedReducer, chatReplyModeChangedAction],
    [chatLocaleChangedReducer, chatLocaleChangedAction],
    [chatLocaleChangingDialogVisibilityChangedReducer, chatLocaleChangingDialogVisibilityChangedAction],
    [chatMessageHighlightedReducer, chatMessageHighlightedAction],
    [chatMessageHighlightHiddenReducer, chatMessageHighlightHiddenAction],
  ]),
};

export { chatReducer };
