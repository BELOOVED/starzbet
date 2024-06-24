import { type TPlatform_PlayerChatRules_Fragment } from "@sb/graphql-client/PlayerUI";
import { type TChatPlayerBanInfo, type TPinnedMessage } from "./Model";

type TChatState = {
  isDrawerVisible: boolean;
  banInfo: null | TChatPlayerBanInfo;
  rules: null | TPlatform_PlayerChatRules_Fragment;
  name?: string | null;
  isActive: boolean;
  id: string | null;
  pinnedMessage: TPinnedMessage | null;
}

type TWithChatState = {
  chat: TChatState;
}

const chatInitialState: TWithChatState = {
  chat: {
    isDrawerVisible: false,
    banInfo: null,
    rules: null,
    isActive: false,
    id: null,
    pinnedMessage: null,
  },
};

export { type TChatState, type TWithChatState, chatInitialState };
