import { type ELocale } from "@sb/utils";
import { type TChatMessagesMap, type TRepliedChatMessagesMap } from "../Model/Message";
import { EMPTY_CHAT_LOCALE, type TChatLocale } from "../Model/TChatLocale";

interface IWithChatState {
  "com.chat": IChatState;
}

interface IChatState {
  messages: TChatMessagesMap;
  repliedMessages: TRepliedChatMessagesMap;
  meta: {
    usersOnline: number;
    hasUnreadMessages: boolean;
    activeMessageId: string | null;
    isBlockingModalVisible: boolean;
    isReplyModeEnabled: boolean;
    locale: TChatLocale;
    isLocaleBottomSheetVisible: boolean;
    highlightedMessageId: string | null;
    bottomMessageId: string | null;
    topMessageId: string | null;
    initialMessagesFetched: boolean;
    messagesLimit: number;
  };
}

const createChatInitialState = (
  locale: ELocale | typeof EMPTY_CHAT_LOCALE = EMPTY_CHAT_LOCALE,
  messagesLimit: number = 150,
): IWithChatState => ({
  "com.chat": {
    messages: {},
    repliedMessages: {},
    meta: {
      usersOnline: 0,
      hasUnreadMessages: false,
      activeMessageId: null,
      isBlockingModalVisible: false,
      isReplyModeEnabled: false,
      locale,
      isLocaleBottomSheetVisible: false,
      highlightedMessageId: null,
      topMessageId: null,
      bottomMessageId: null,
      initialMessagesFetched: false,
      messagesLimit,
    },
  },
});

export {
  type IWithChatState,
  type IChatState,
  createChatInitialState,
};
