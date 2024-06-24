import type { TPlatform_PlayerChatRules_Fragment } from "@sb/graphql-client/PlayerUI";
import { type IChatReceivedPayload, type TChatPlayerBanInfo } from "./Model";

const chatMessageSentAction = (text: string, repliedTo?: string) => ({
  type: "@@CHAT/MESSAGE_SENT",
  payload: { text, repliedTo },
});

const chatVisibilityChangedAction = (visible: boolean) => ({
  type: "@@CHAT/VISIBILITY_CHANGED",
  payload: { visible },
});

const chatVisibilityToggleAction = () => ({
  type: "@@CHAT/VISIBILITY_TOGGLE",
});

const chatUserInfoChangedAction = (banInfo: null | TChatPlayerBanInfo, name: string | null | undefined) => ({
  type: "@@CHAT/USER_INFO_CHANGED",
  payload: { banInfo, name },
});

const chatBanInfoChangedAction = (banInfo: null | TChatPlayerBanInfo) => ({
  type: "@@CHAT/BAN_INFO_CHANGED",
  payload: { banInfo },
});

const chatNameChangedAction = (name: string | null | undefined) => ({
  type: "@@CHAT/NAME_CHANGED",
  payload: { name },
});

const chatRulesReceivedAction = (rules: TPlatform_PlayerChatRules_Fragment) => ({
  type: "@@CHAT/RULES_RECEIVED",
  payload: { rules },
});

const chatReceivedAction = (payload: IChatReceivedPayload) => ({
  type: "@@CHAT/RECEIVED",
  payload,
});

const chatRemovePinnedMessageAction = () => ({
  type: "@@CHAT/PINNED_REMOVE",
});

export {
  chatMessageSentAction,
  chatVisibilityChangedAction,
  chatVisibilityToggleAction,
  chatUserInfoChangedAction,
  chatRulesReceivedAction,
  chatBanInfoChangedAction,
  chatNameChangedAction,
  chatReceivedAction,
  chatRemovePinnedMessageAction,
};
