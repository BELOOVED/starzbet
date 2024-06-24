import type { TPlatform_Game_Fragment, TPlatform_PlayerBonus_Fragment } from "@sb/graphql-client/PlayerUI";
import { type TGameLinkType, type TPlayerBonusEventStateKey } from "./PlayGameState";

const playGameLinkReceivedAction = (link: string | null, type: TGameLinkType | null) => ({
  type: "@PLAY_GAME/PLAY_GAME_LINK_RECEIVED",
  payload: { link, type },
});

const playGameGameReceivedAction = (game: TPlatform_Game_Fragment) => ({
  type: "@PLAY_GAME/PLAY_GAME_GAME_RECEIVED",
  payload: { game },
});

const playGamePlayerBonusesReceivedAction = (playerBonuses: TPlatform_PlayerBonus_Fragment[]) => ({
  type: "@PLAY_GAME/PLAY_GAME_PLAYER_BONUSES_RECEIVED",
  payload: { playerBonuses },
});

const playGamePlayerBonusRemoveEventDataAction = (eventStateKey: TPlayerBonusEventStateKey) => ({
  type: "@PLAY_GAME/PLAY_GAME_PLAYER_BONUS_REMOVE_EVENT_DATA",
  payload: { eventStateKey },
});

const playGamePlayerBonusRemoveAllEventDataAction = () => ({
  type: "@PLAY_GAME/PLAY_GAME_PLAYER_BONUS_REMOVE_ALL_EVENT_DATA",
});

const tryAgainClickedAction = () => ({
  type: "@PLAY_GAME/LOAD_FAILED_TRY_AGAIN_CLICKED",
});

export {
  playGameLinkReceivedAction,
  playGameGameReceivedAction,
  playGamePlayerBonusesReceivedAction,
  playGamePlayerBonusRemoveEventDataAction,
  playGamePlayerBonusRemoveAllEventDataAction,
  tryAgainClickedAction,
};
