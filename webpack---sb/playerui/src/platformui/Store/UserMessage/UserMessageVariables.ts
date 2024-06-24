import { createCallManagerSymbol } from "@sb/call-manager";

const createCommand = (name: string) => `user_message/${name}`;

const USER_MESSAGE_UNSEEN_COUNT_LOADING_SYMBOL = createCallManagerSymbol(createCommand("unseen_count"));
const USER_MESSAGE_LAST_MESSAGE_LOADING_SYMBOL = createCallManagerSymbol(createCommand("last_message"));
const USER_MESSAGE_INITIAL_MESSAGES_LOADING_SYMBOL = createCallManagerSymbol(createCommand("initial_messages"));
const USER_MESSAGE_MORE_MESSAGES_LOADING_SYMBOL = createCallManagerSymbol(createCommand("more_messages"));
const USER_MESSAGE_MESSAGE_LOADING_SYMBOL = createCallManagerSymbol(createCommand("message"));

export {
  USER_MESSAGE_UNSEEN_COUNT_LOADING_SYMBOL,
  USER_MESSAGE_LAST_MESSAGE_LOADING_SYMBOL,
  USER_MESSAGE_INITIAL_MESSAGES_LOADING_SYMBOL,
  USER_MESSAGE_MORE_MESSAGES_LOADING_SYMBOL,
  USER_MESSAGE_MESSAGE_LOADING_SYMBOL,
};
