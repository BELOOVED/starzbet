import { createCallManagerSymbol } from "@sb/call-manager";

const PLAY_GAME_LINK_LOAD_SYMBOL = createCallManagerSymbol("playGameLink");
const PLAY_GAME_GAME_LOAD_SYMBOL = createCallManagerSymbol("playGameGame");
const PLAY_GAME_PLAYER_BONUSES_LOAD_SYMBOL = createCallManagerSymbol("playGamePlayerBonuses");

export {
  PLAY_GAME_LINK_LOAD_SYMBOL,
  PLAY_GAME_GAME_LOAD_SYMBOL,
  PLAY_GAME_PLAYER_BONUSES_LOAD_SYMBOL,
};
