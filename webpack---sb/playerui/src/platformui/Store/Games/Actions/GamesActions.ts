import { type EGamePage } from "@sb/betting-core/EGamePage";
import type {
  TPlatform_Game_Fragment,
  TPlatform_GamePageByPlayer_Fragment,
  TPlatform_GamePageInfo_Fragment,
} from "@sb/graphql-client/PlayerUI";
import { type EPlatform_GameGridType } from "@sb/graphql-client";
import { type TGameProviderEnum } from "../../../../common/Store/Provider/ProviderModel";
import { type TGameManagerPage } from "../Model/Games";
import { type EExternalGameId } from "../GamesModels";

const gamePagesReceivedAction = (gamePages: TPlatform_GamePageByPlayer_Fragment[]) => ({
  type: "@GAMES/GAME_PAGES_RECEIVED",
  payload: { gamePages },
});

const gamesForFavLabelReceivedAction = (
  games: TPlatform_Game_Fragment[],
  page: EGamePage,
  visibleRows: number,
) => ({
  type: "@GAMES/GAMES_FOR_FAV_LABEL_RECEIVED",
  payload: {
    games,
    page,
    visibleRows,
  },
});

const gamesForFreeBetLabelReceivedAction = (
  games: TPlatform_Game_Fragment[],
  page: EGamePage,
  matchedPlayerBonusId: string | undefined,
) => ({
  type: "@GAMES/GAMES_FOR_FREE_BET_LABEL_RECEIVED",
  payload: { games, page, matchedPlayerBonusId },
});

const gamesForLabelReceivedAction = (
  games: TPlatform_Game_Fragment[],
  pageInfo: TPlatform_GamePageInfo_Fragment,
  page: EGamePage,
  labelId: string,
  visibleRows: number,
) => ({
  type: "@GAMES/GAMES_FOR_LABEL_RECEIVED",
  payload: {
    games,
    pageInfo,
    labelId,
    page,
    visibleRows,
  },
});

const gamesForLabelAdditionalReceivedAction = (
  games: TPlatform_Game_Fragment[],
  pageInfo: TPlatform_GamePageInfo_Fragment,
  page: EGamePage,
  labelId: string,
  visibleRows: number,
) => ({
  type: "@GAMES/GAMES_FOR_LABEL_ADDITIONAL_RECEIVED",
  payload: {
    games,
    pageInfo,
    labelId,
    page,
    visibleRows,
  },
});

const gamesForProviderReceivedAction = (
  games: TPlatform_Game_Fragment[],
  pageInfo: TPlatform_GamePageInfo_Fragment,
  page: EGamePage,
  provider: TGameProviderEnum,
  visibleRows: number,
) => ({
  type: "@GAMES/GAMES_FOR_PROVIDER_RECEIVED",
  payload: {
    games,
    pageInfo,
    provider,
    page,
    visibleRows,
  },
});

const gamesForCombineProvidersReceivedAction = (
  games: TPlatform_Game_Fragment[],
  pageInfo: TPlatform_GamePageInfo_Fragment,
  page: EGamePage,
  visibleRows: number,
) => ({
  type: "@GAMES/GAMES_FOR_COMBINE_PROVIDERS_RECEIVED",
  payload: {
    games,
    pageInfo,
    page,
    visibleRows,
  },
});

const gamesForProviderAdditionalReceivedAction = (
  games: TPlatform_Game_Fragment[],
  pageInfo: TPlatform_GamePageInfo_Fragment,
  page: EGamePage,
  provider: TGameProviderEnum,
  visibleRows: number,
) => ({
  type: "@GAMES/GAMES_FOR_PROVIDER_ADDITIONAL_RECEIVED",
  payload: {
    games,
    pageInfo,
    provider,
    page,
    visibleRows,
  },
});

const gamesForCombineProvidersAdditionalReceivedAction = (
  games: TPlatform_Game_Fragment[],
  pageInfo: TPlatform_GamePageInfo_Fragment,
  page: EGamePage,
  visibleRows: number,
) => ({
  type: "@GAMES/GAMES_FOR_COMBINE_PROVIDERS_ADDITIONAL_RECEIVED",
  payload: {
    games,
    pageInfo,
    page,
    visibleRows,
  },
});

const gamesHeightAction = (height: string) => ({
  type: "@GAMES/HEIGHT",
  payload: { height },
});

const changeGridTypeAction = (gridType: EPlatform_GameGridType) => ({
  type: "@GAMES/CHANGE_GRID_TYPE",
  payload: { gridType },
});

const loadMoreGamesForLabel = (page: EGamePage, labelId: string) => ({
  type: "@GAMES/LOAD_MORE_GAMES_FOR_LABEL",
  payload: { page, labelId },
});

const loadMoreGamesForProvider = (page: EGamePage, provider: TGameProviderEnum) => ({
  type: "@GAMES/LOAD_MORE_GAMES_FOR_PROVIDER",
  payload: { page, provider },
});

const loadMoreGamesForCombineProviders = (page: TGameManagerPage) => ({
  type: "@GAMES/LOAD_MORE_GAMES_FOR_COMBINE_PROVIDER",
  payload: { page },
});

const setVisibleRowsForLabelPageAction = (page: EGamePage, labelId: string, visibleRows: number) => ({
  type: "@GAMES/SET_VISIBLE_ROWS_FOR_LABEL",
  payload: { page, labelId, visibleRows },
});

const setVisibleRowsForProviderPageAction = (page: EGamePage, provider: TGameProviderEnum, visibleRows: number) => ({
  type: "@GAMES/SET_VISIBLE_ROWS_FOR_PROVIDER",
  payload: { page, provider, visibleRows },
});

//combineProviders

const setVisibleRowsForCombineProvidersPageAction = (page: EGamePage, visibleRows: number) => ({
  type: "@GAMES/SET_VISIBLE_ROWS_FOR_COMBINE_PROVIDERS",
  payload: { page, visibleRows },
});

/**
 * just to add uniq games to state.games.games
 */
const simpleGamesLoadedAction = (games: TPlatform_Game_Fragment[]) => ({
  type: "@GAMES/SIMPLE_GAMES_LOADED",
  payload: { games },
});

const gamesForSearchReceivedAction = (
  games: TPlatform_Game_Fragment[],
  pageInfo: TPlatform_GamePageInfo_Fragment | null,
  page: EGamePage,
) => ({
  type: "@GAMES/GAMES_FOR_SEARCH_RECEIVED",
  payload: {
    games,
    pageInfo,
    page,
  },
});

const loadMoreSearchGamesAction = () => ({
  type: "@GAMES/LOAD_MORE_GAMES_FOR_SEARCH",
});

const searchGamesAction = (text: string, page: EGamePage) => ({
  type: "@GAMES/SEARCH_GAMES",
  payload: {
    text,
    page,
  },
});

const searchLoadMoreGamesAction = (text: string, page: TGameManagerPage) => ({
  type: "@GAMES/SEARCH_GAMES_LOAD_MORE",
  payload: {
    text,
    page,
  },
});

const additionalGamesForSearchReceivedAction = (
  games: TPlatform_Game_Fragment[],
  pageInfo: TPlatform_GamePageInfo_Fragment | null,
  page: EGamePage,
) => ({
  type: "@GAMES/ADDITIONAL_GAMES_FOR_SEARCH_RECEIVED",
  payload: {
    games,
    pageInfo,
    page,
  },
});

const gameLinkForExternalGameReceivedAction = (externalGameId: EExternalGameId, link: string) => ({
  type: "@GAMES/GAME_LINK_FOR_EXTERNAL_GAME_RECEIVED",
  payload: { externalGameId, link },
});

const removeGameLinkForExternalGameAction = (externalGameId: EExternalGameId) => ({
  type: "@GAMES/REMOVE_GAME_LINK_FOR_EXTERNAL_GAME",
  payload: { externalGameId },
});

const landingGameLabelSelectedAction = (labelId: string, page: TGameManagerPage) => ({
  type: "@GAMES/LANDING_GAME_LABEL_SELECTED",
  payload: { labelId, page },
});

const openShuffleGameAction = (page: TGameManagerPage) => ({
  type: "@GAMES/OPEN_SHUFFLE_GAME",
  payload: { page },
});

const replaceShuffleGameAction = (page: TGameManagerPage, game: TPlatform_Game_Fragment | null) => ({
  type: "@GAMES/REPLACE_SHUFFLE_GAME_ID",
  payload: { game, page },
});

const gamesByExternalIdsAction = (ids: EExternalGameId[]) => ({
  type: "@GAMES/GAMES_BY_EXTERNAL_IDS",
  payload: { ids },
});

export {
  gamesByExternalIdsAction,
  gamePagesReceivedAction,
  gamesForFavLabelReceivedAction,
  gamesForFreeBetLabelReceivedAction,
  gamesForLabelReceivedAction,
  gamesForLabelAdditionalReceivedAction,
  gamesForProviderReceivedAction,
  gamesForProviderAdditionalReceivedAction,
  gamesHeightAction,
  changeGridTypeAction,
  loadMoreGamesForLabel,
  loadMoreGamesForProvider,
  setVisibleRowsForLabelPageAction,
  setVisibleRowsForProviderPageAction,
  simpleGamesLoadedAction,
  gamesForSearchReceivedAction,
  loadMoreSearchGamesAction,
  additionalGamesForSearchReceivedAction,
  gameLinkForExternalGameReceivedAction,
  removeGameLinkForExternalGameAction,
  landingGameLabelSelectedAction,

  //combineProviders
  gamesForCombineProvidersReceivedAction,
  setVisibleRowsForCombineProvidersPageAction,
  loadMoreGamesForCombineProviders,
  gamesForCombineProvidersAdditionalReceivedAction,

  replaceShuffleGameAction,
  openShuffleGameAction,

  searchGamesAction,
  searchLoadMoreGamesAction,
};
