import { type TGameLinkType } from "../PlayGameState";

const playGameLinkReceivedAction = (link: string | null, type: TGameLinkType | null) => ({
  type: "@PLAY_GAME/PLAY_GAME_LINK_RECEIVED",
  payload: { link, type },
});

const reloadGameLinkAction = () => ({
  type: "@PLAY_GAME/PLAY_GAME_PLAYER_BONUS_REMOVE_ALL_EVENT_DATA",
});

const tryAgainClickedAction = () => ({
  type: "@PLAY_GAME/LOAD_FAILED_TRY_AGAIN_CLICKED",
});

const changeLinkTypeAction = (isDemo: boolean) => ({
  type: "@PLAY_GAME/CHANGE_LINK_TYPE",
  payload: { isDemo },
});

export {
  playGameLinkReceivedAction,
  reloadGameLinkAction,
  tryAgainClickedAction,
  changeLinkTypeAction,
};
