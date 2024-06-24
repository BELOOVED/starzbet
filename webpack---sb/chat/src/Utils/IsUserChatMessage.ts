import { EChatMessageType, type IUserChatMessage, type TChatMessage } from "../Model/Message";

const isUserChatMessage = (candidate: TChatMessage):
  candidate is IUserChatMessage => candidate.type === EChatMessageType.userMessage;

export { isUserChatMessage };
