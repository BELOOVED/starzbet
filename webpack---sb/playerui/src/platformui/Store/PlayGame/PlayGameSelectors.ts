import { createPropertySelectors, createSimpleSelector, getNotNil, withParams } from "@sb/utils";
import {
  callManagerFailedSelector,
  callManagerStartedSelector,
  callManagerSucceededSelector,
  type TWithCallManagerState,
} from "@sb/call-manager";
import { callManagerErrorTranslateParamsSelectorFactory } from "../../Utils/СallManagerErrorTranslateParamsSelector";
import { type TWithPlayGameState } from "./PlayGameState";
import { PLAY_GAME_GAME_LOAD_SYMBOL, PLAY_GAME_LINK_LOAD_SYMBOL } from "./PlayGameVariables";
import { getGameLinkAdditionalErrorMap, getGameLinkErrorMap } from "./GetGameLinkErrorMap";

const playGameStateSelector = (state: TWithPlayGameState) => state.playGame;
const playGameStateSelectors = createPropertySelectors(playGameStateSelector);

const playGameLinkSelector = createSimpleSelector(
  [playGameStateSelectors.link],
  (link) => getNotNil(link, ["playGameLinkSelector"], "link"),
);
const playGameGameSelector = createSimpleSelector(
  [playGameStateSelectors.game],
  (game) => getNotNil(game, ["playGameGameSelector"], "game"),
);
const playGameTypeSelector = createSimpleSelector(
  [playGameStateSelectors.type],
  (link) => getNotNil(link, ["playGameTypeSelector"], "type"),
);

const playGameGameLoadedSelector = callManagerSucceededSelector.with.symbol(PLAY_GAME_GAME_LOAD_SYMBOL);
const playGameLinkLoadedSelector = callManagerSucceededSelector.with.symbol(PLAY_GAME_LINK_LOAD_SYMBOL);

const playGameGameLoadFailedSelector = callManagerFailedSelector.with.symbol(PLAY_GAME_GAME_LOAD_SYMBOL);
const playGameLinkLoadFailedSelector = callManagerFailedSelector.with.symbol(PLAY_GAME_LINK_LOAD_SYMBOL);
const playGameLinkLoadingSelector = callManagerStartedSelector.with.symbol(PLAY_GAME_LINK_LOAD_SYMBOL);

const playGameDataLoadedSelector = (state: TWithCallManagerState) => [
  playGameGameLoadedSelector,
  playGameLinkLoadedSelector,
].every((selector) => selector(state));

const playGameDataLoadFailedSelector = (state: TWithCallManagerState) => [
  playGameGameLoadFailedSelector,
  playGameLinkLoadFailedSelector,
].some((selector) => selector(state));

const getGameLinkMainTranslateParamsSelector = callManagerErrorTranslateParamsSelectorFactory(getGameLinkErrorMap);
const getGameLinkMainErrorTranslateParamsSelector = withParams(
  getGameLinkMainTranslateParamsSelector,
  PLAY_GAME_LINK_LOAD_SYMBOL,
);

const getGameLinkSecondTranslateParamsSelector = callManagerErrorTranslateParamsSelectorFactory(getGameLinkAdditionalErrorMap);
const getGameLinkSecondErrorTranslateParamsSelector = withParams(
  getGameLinkSecondTranslateParamsSelector,
  PLAY_GAME_LINK_LOAD_SYMBOL,
);

export {
  playGameStateSelectors,
  playGameLinkSelector,
  playGameTypeSelector,
  playGameGameSelector,
  playGameGameLoadedSelector,
  playGameLinkLoadedSelector,
  playGameLinkLoadingSelector,
  playGameDataLoadedSelector,
  playGameDataLoadFailedSelector,
  getGameLinkMainErrorTranslateParamsSelector,
  getGameLinkSecondErrorTranslateParamsSelector,
};
