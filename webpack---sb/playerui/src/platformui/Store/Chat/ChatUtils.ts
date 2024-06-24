/**
 * TODO
 * It is impossible to get this type without importing it directly from SDK
 */
import { type IPlayer } from "@sb/sdk/player/chat/api/model/UserProfile/Player";
import { type TChatMessage } from "./Model";

const isPlayerProfile = (profile: TChatMessage["author"]["profile"]): profile is IPlayer => profile.role === "PLAYER";

const getPlayerChatMessageVipLevel = (message: TChatMessage): number => {
  if (isPlayerProfile(message.author.profile)) {
    return message.author.profile.vipLevel ?? 0;
  }

  throw new Error("[getPlayerChatMessageVipLevel] player is not an author");
};

export { getPlayerChatMessageVipLevel };

