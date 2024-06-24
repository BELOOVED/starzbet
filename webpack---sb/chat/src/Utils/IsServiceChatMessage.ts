import { EChatMessageType, type IServiceChatMessage, type TChatMessage } from "../Model/Message";

const isServiceChatMessage = (candidate: TChatMessage):
  candidate is IServiceChatMessage => candidate.type === EChatMessageType.serviceMessage;

export { isServiceChatMessage };
