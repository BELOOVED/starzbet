import { type TUserInfo } from "./ChatUserInfo";

enum EChatMessageType {
  userMessage = "userMessage",
  serviceMessage = "serviceMessage",
}

type TBaseChatMessage<T extends TUserInfo = TUserInfo> = {
  author: T;
  chatId: string;
  id: string;
  repliedTo?: string | null | undefined;
  text: string;
  timestamp: string;
  translates: Record<string, string>;
}

interface IUserChatMessage<U extends TUserInfo = TUserInfo> extends Omit<TBaseChatMessage<U>, "timestamp"> {
  type: EChatMessageType.userMessage;
  translates: Record<string, string>;
  originalMessageTimestamp?: number;
  timestamp: number;
  deleted?: true;
}

interface IServiceChatMessage {
  type: EChatMessageType.serviceMessage;
  id: string;
  chatId: string;
  subjectName: string;
  subjectId: string;
  timestamp: number;
  deleted?: true;
}

type TChatMessage = IUserChatMessage | IServiceChatMessage;

type TChatMessagesMap = Record<string, TChatMessage>;

type TRepliedChatMessagesMap = Record<string, TChatMessage>;

export {
  type TChatMessage,
  type TChatMessagesMap,
  type IServiceChatMessage,
  type IUserChatMessage,
  type TBaseChatMessage,
  type TRepliedChatMessagesMap,
  EChatMessageType,
};
