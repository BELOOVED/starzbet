import { callManagerStartedSelector, createCallManagerSymbol } from "@sb/call-manager";

const CHAT_ID = "6ac2f1dc-528f-434e-8a7d-d23d75c7913e";

const CHAT_SCROLL_TO_BOTTOM_BUTTON_CALL_SYMBOL = createCallManagerSymbol("@@chat/scrollToBottomButton");

const CHAT_MESSAGES_CALL_SYMBOL = createCallManagerSymbol("@@chat/messages");

const messagesLoadingSelector = callManagerStartedSelector.with.symbol(CHAT_MESSAGES_CALL_SYMBOL);

const CHAT_PREV_MESSAGES_CALL_SYMBOL = createCallManagerSymbol("@@chat/prevMessages");

const CHAT_NEXT_MESSAGES_CALL_SYMBOL = createCallManagerSymbol("@@chat/nextMessages");

const CHAT_SEND_MESSAGE_BUTTON_CALL_SYMBOL = createCallManagerSymbol("@@chat/sendMessageButton");

const CHAT_BANNED_CALL_SYMBOL = createCallManagerSymbol("@@chat/banned");

const CHAT_RULES_LOADING_SYMBOL = createCallManagerSymbol("@@chat/rules");

const CHAT_LOADING_SYMBOL = createCallManagerSymbol("@@chat");

export {
  CHAT_ID,
  CHAT_SCROLL_TO_BOTTOM_BUTTON_CALL_SYMBOL,
  CHAT_MESSAGES_CALL_SYMBOL,
  CHAT_PREV_MESSAGES_CALL_SYMBOL,
  CHAT_NEXT_MESSAGES_CALL_SYMBOL,
  CHAT_SEND_MESSAGE_BUTTON_CALL_SYMBOL,
  CHAT_BANNED_CALL_SYMBOL,
  CHAT_RULES_LOADING_SYMBOL,
  CHAT_LOADING_SYMBOL,
  messagesLoadingSelector,
};
