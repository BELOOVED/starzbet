import { EChatMessageType, type IUserChatMessage, type TBaseChatMessage, type TChatMessagesMap } from "../Model/Message";
import { chatMessageLocalesMapper } from "./ChatMessageLocalesMapper";

const chatMessageMapper = ({ timestamp, ...message }: TBaseChatMessage): IUserChatMessage => ({
  ...message,
  translates: chatMessageLocalesMapper(message),
  type: EChatMessageType.userMessage,
  timestamp: Number(timestamp),
});

const chatMessagesListMapper = (messages: TBaseChatMessage[]): TChatMessagesMap =>
  messages.reduce<TChatMessagesMap>(
    (acc, message) => {
      acc[message.id] = chatMessageMapper(message);

      return acc;
    },
    {},
  );

export { chatMessageMapper, chatMessagesListMapper };
