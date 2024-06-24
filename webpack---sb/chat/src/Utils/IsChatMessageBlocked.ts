import { isServiceChatMessage } from "../Utils/IsServiceChatMessage";
import { type TChatMessage } from "../Model/Message";

const isChatMessageBlocked = (message: TChatMessage, blockedUsersIds: string[]) => {
  // isAuthorBlocked
  if (!isServiceChatMessage(message) && blockedUsersIds.includes(message.author.id)) {
    return true;
  }

  // isServiceMessageAuthorBlocked
  return isServiceChatMessage(message) && blockedUsersIds.includes(message.subjectId);
};

export { isChatMessageBlocked };
