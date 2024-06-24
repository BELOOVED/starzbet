import { createRootReducer, type TReducer } from "@sb/utils";
import {
  chatBanInfoChangedAction,
  chatNameChangedAction,
  chatReceivedAction,
  chatRemovePinnedMessageAction,
  chatRulesReceivedAction,
  chatUserInfoChangedAction,
  chatVisibilityChangedAction,
  chatVisibilityToggleAction,
} from "./ChatActions";
import { type TWithChatState } from "./ChatInitialState";

const chatVisibilityChangedReducer: TReducer<TWithChatState, typeof chatVisibilityChangedAction> = (
  state,
  { payload: { visible } },
) => ({
  ...state,
  chat: {
    ...state.chat,
    isDrawerVisible: visible,
  },
});

const chatVisibilityToggleReducer: TReducer<TWithChatState, typeof chatVisibilityToggleAction> = (
  state,
) => ({
  ...state,
  chat: {
    ...state.chat,
    isDrawerVisible: !state.chat.isDrawerVisible,
  },
});

const chatBannedInfoChangedReducer: TReducer<TWithChatState, typeof chatBanInfoChangedAction> = (
  state,
  { payload: { banInfo } },
) => ({
  ...state,
  chat: {
    ...state.chat,
    banInfo,
  },
});

const chatUserInfoChangedReducer: TReducer<TWithChatState, typeof chatUserInfoChangedAction> = (
  state,
  { payload: { banInfo, name } },
) => ({
  ...state,
  chat: {
    ...state.chat,
    banInfo,
    name,
  },
});

const chatNameChangedReducer: TReducer<TWithChatState, typeof chatNameChangedAction> = (
  state,
  { payload: { name } },
) => ({
  ...state,
  chat: {
    ...state.chat,
    name,
  },
});

const chatRulesReceivedReducer: TReducer<TWithChatState, typeof chatRulesReceivedAction> = (
  state,
  { payload: { rules } },
) => ({
  ...state,
  chat: {
    ...state.chat,
    rules,
  },
});

const chatReceivedReducer: TReducer<TWithChatState, typeof chatReceivedAction> = (
  state,
  { payload },
) => ({
  ...state,
  chat: {
    ...state.chat,
    ...payload,
  },
});

const chatRemovePinnedMessageReducer: TReducer<TWithChatState, typeof chatRemovePinnedMessageAction> = (
  state,
) => ({
  ...state,
  chat: {
    ...state.chat,
    pinnedMessage: null,
  },
});

const chatRootReducer = createRootReducer([
  [chatVisibilityChangedReducer, chatVisibilityChangedAction],
  [chatVisibilityToggleReducer, chatVisibilityToggleAction],
  [chatBannedInfoChangedReducer, chatBanInfoChangedAction],
  [chatUserInfoChangedReducer, chatUserInfoChangedAction],
  [chatRulesReceivedReducer, chatRulesReceivedAction],
  [chatNameChangedReducer, chatNameChangedAction],
  [chatReceivedReducer, chatReceivedAction],
  [chatRemovePinnedMessageReducer, chatRemovePinnedMessageAction],
]);

export { chatRootReducer };
