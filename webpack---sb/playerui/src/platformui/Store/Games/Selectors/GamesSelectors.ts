import { type Selector } from "react-redux";
import {
  computeGameGridLayout,
  createMemoSelector,
  createOptionalPropertySelector,
  createPropertySelector,
  createPropertySelectors,
  createSimpleSelector,
  getNotNil,
  isNil,
  isNotEmpty,
  isNotNil,
  isNotVoid,
  type TExplicitAny,
  withParams,
} from "@sb/utils";
import { EPlatform_GameGridType } from "@sb/graphql-client";
import { callManagerStartedSelector, callManagerSucceededSelector } from "@sb/call-manager";
import type { TPlatform_Game_Fragment } from "@sb/graphql-client/PlayerUI";
import { type EGamePage } from "@sb/betting-core/EGamePage";
import { loggedSelector } from "@sb/auth";
import { routerLocationPathnameSelector } from "@sb/router";
import { type TMixAppState } from "../../../../sportsbookui/Store/CreateMixInitialState";
import { Logger } from "../../../../common/Utils/Logger";
import { type TGameProviderEnum } from "../../../../common/Store/Provider/ProviderModel";
import { favoritesByGamePageMap, searchPageInfoByGamePageMap } from "../../../Utils/GetGamesViewParams";
import { EExternalGameId, type IGameProviderWithCount, type IGamesWithPageInfo } from "../GamesModels";
import { type TGamesState, type TWithGamesState } from "../GamesInitialState";
import { gameGridWidthMap, systemLabels, type TGameManagerPage } from "../Model/Games";
import {
  GAME_MANAGER_GAME_PAGES_LOADING_SYMBOL,
  GAME_MANAGER_LABEL_GAMES_ADDITIONAL_LOADING_SYMBOL,
  GAME_MANAGER_LABEL_GAMES_LOADING_SYMBOL,
  GAME_MANAGER_PROVIDER_GAMES_ADDITIONAL_LOADING_SYMBOL,
  GAME_MANAGER_PROVIDER_GAMES_LOADING_SYMBOL,
  GAME_MANAGER_SEARCH_ADDITIONAL_GAMES_LOADING_SYMBOL,
  GAME_MANAGER_SEARCH_GAMES_LOADING_SYMBOL,
  GAME_MANAGER_SIMILAR_GAMES_LOADING_SYMBOL,
} from "../Variables";
import {
  computeByRow,
  concatIdForLoadingSymbol,
  deepEqualNodeIds,
  gamePositionByLabelId,
  gamePositionByProvider,
  getProviders,
} from "../GamesUtils";

const gamePagesLoadingSucceededSelector = withParams(callManagerSucceededSelector, GAME_MANAGER_GAME_PAGES_LOADING_SYMBOL);

const labelGamesLoadingSucceededSelector = callManagerSucceededSelector.with.symbol(
  GAME_MANAGER_LABEL_GAMES_LOADING_SYMBOL,
);

const labelGamesLoadingStartedSelector = callManagerStartedSelector.with.symbol(
  GAME_MANAGER_LABEL_GAMES_LOADING_SYMBOL,
);

const labelGamesAdditionalLoadingStartedSelector = callManagerStartedSelector.with.symbol(
  GAME_MANAGER_LABEL_GAMES_ADDITIONAL_LOADING_SYMBOL,
);

const providerGamesLoadingSucceededSelector = callManagerSucceededSelector.with.symbol(
  GAME_MANAGER_PROVIDER_GAMES_LOADING_SYMBOL,
);

const providerGamesAdditionalLoadingStartedSelector = callManagerStartedSelector.with.symbol(
  GAME_MANAGER_PROVIDER_GAMES_ADDITIONAL_LOADING_SYMBOL,
);

const similarGamesLoadingStartedSelector = callManagerStartedSelector.with.symbol(
  GAME_MANAGER_SIMILAR_GAMES_LOADING_SYMBOL,
);

const notNilProvider = (
  gamesMap: Record<EGamePage, Partial<Record<TGameProviderEnum, IGamesWithPageInfo>>>,
  page: EGamePage,
  provider: TGameProviderEnum,
) => getNotNil(
  gamesMap[page][provider],
  ["GamesSelector"],
  "Provider",
);

const notNilLabelId = (
  gamesMap: Record<EGamePage, Record<string, IGamesWithPageInfo>>,
  page: EGamePage,
  labelId: string,
) => getNotNil(
  gamesMap[page][labelId],
  ["GamesSelector"],
  "labelId",
);

const searchGamesLoadingStartedSelector = withParams(callManagerStartedSelector, GAME_MANAGER_SEARCH_GAMES_LOADING_SYMBOL);
const searchGamesLoadingSucceededSelector = withParams(callManagerSucceededSelector, GAME_MANAGER_SEARCH_GAMES_LOADING_SYMBOL);

const searchAdditionalGamesLoadingStartedSelector =
  withParams(callManagerStartedSelector, GAME_MANAGER_SEARCH_ADDITIONAL_GAMES_LOADING_SYMBOL);

const isAllLabelGamesLoadingSucceededSelector = (state: TMixAppState, labelIds: string[], page: EGamePage) => labelIds
  .map((id) => labelGamesLoadingSucceededSelector(state, concatIdForLoadingSymbol(id, page)))
  .every(Boolean);

const gamesStateSelector: Selector<TWithGamesState, TGamesState> = ({ games }) => games;

const gamePagesSelector = createPropertySelector(gamesStateSelector, ["gamePages", "nodes"]);
const isGamePagesServerLoadedSelector = createPropertySelector(gamesStateSelector, ["gamePages", "isServerLoaded"]);
const pageLabelToGamesMapSelector = createPropertySelector(gamesStateSelector, "pageLabelToGamesMap");
const pageProviderToGamesMapSelector = createPropertySelector(gamesStateSelector, "pageProviderToGamesMap");
const pageCombineProvidersToGamesMapSelector = createPropertySelector(gamesStateSelector, "pageCombineProvidersToGamesMap");

const combineProvidersSelector = createMemoSelector(
  [
    routerLocationPathnameSelector,
    (_, page: TGameManagerPage) => page,
  ],
  (path, page) => getProviders(path, page),
);

const isNilCombineProvidersSelector = createSimpleSelector([combineProvidersSelector], isNil);

const notNilCombineProvidersSelector = createSimpleSelector(
  [combineProvidersSelector],
  (providers) => getNotNil(providers, ["GamesSelectors", "notNilCombineProvidersSelector"], "providers"),
);

const gridTypeSelector = createPropertySelector(gamesStateSelector, "gridType");
const gamesSelector = createPropertySelector(gamesStateSelector, "games");

const externalGameIdToGameUrlMapSelector = createPropertySelector(gamesStateSelector, "externalGameIdToGameUrlMap");

const isLabelEnabledForPageSelector = createSimpleSelector(
  [
    gamePagesSelector,
    (_, page: EGamePage, labelId: string) => ({ page, labelId }),
  ],
  (gamePages, { page, labelId }) => Boolean(gamePages
    .find((it) => it.page === page)
    ?.labels
    .find(({ label: { id } }) => id === labelId)),
);

const isFavEnabledForPageSelector = (
  state: TWithGamesState,
  page: EGamePage,
) => isLabelEnabledForPageSelector(state, page, systemLabels.favourite);

const isFreeSpinsEnabledForPageSelector = (
  state: TWithGamesState,
  page: EGamePage,
) => isNotVoid(gamesStateSelector(state))
  ? isLabelEnabledForPageSelector(state, page, systemLabels.activeFreeSpins)
  : false;

const gameByIdSelector = createSimpleSelector(
  [
    gamesSelector,
    (_, gameId: string) => gameId,
  ],
  (games, gameId) => games.find(({ id }) => id === gameId),
);

const existedGamesByIdsSelector = createSimpleSelector(
  [
    gamesSelector,
    (_, gameIds: string[]) => gameIds,
  ],
  (games, gameIds) => gameIds.filter((gameId) => games.find(({ id }) => id === gameId)),
);

const gameByExternalIdSelector = createSimpleSelector(
  [
    gamesSelector,
    (_, gameExternalId: string) => gameExternalId,
  ],
  (games, gameExternalId) => games.find(({ externalId }) => gameExternalId === externalId),
);

const assertNotNilGameByIdSelector = createSimpleSelector(
  [gameByIdSelector],
  (game) => getNotNil(game, ["assertNotNilGameByIdSelector"], "game"),
);

const gameByIdNotNilSelectors = createPropertySelectors(assertNotNilGameByIdSelector);

const gamesByIdsSelector = createSimpleSelector(
  [
    gamesSelector,
    (_, gameIds: string[]) => gameIds,
  ],
  (games, gameIds) => games.filter(({ id }) => gameIds.includes(id)),
);

const gamesByExternalIdsSelector = (state: TMixAppState, gameIds: string[]) => {
  const games = gamesSelector(state);

  return games.filter(({ externalId }) => gameIds.includes(externalId));
};

const gameInternalIdByExternalIdsSelector = createSimpleSelector(
  [
    gamesSelector,
    (_, id: EExternalGameId) => id,
  ],
  (games, externalId) => {
    const game = games.find((game) => externalId === game.externalId);

    return game?.id;
  },
);

const gamesByPageSelector = createSimpleSelector(
  [
    gamesSelector,
    (_, page: EGamePage) => page,
  ],
  (games, page) => games.filter(({ gamePage }) => gamePage === page),
);

const emptyProviders: IGameProviderWithCount[] = [];

const providersWithGameCountByPageSelector = createSimpleSelector(
  [
    gamePagesSelector,
    (_, page: EGamePage) => page,
  ],
  (gamePages, page) => gamePages.find((it) => it.page === page)?.providers ?? emptyProviders,
);

const providersWithGamesByPageSelector = createMemoSelector(
  [providersWithGameCountByPageSelector],
  (providersWithGameCount) => providersWithGameCount
    .filter(({ gamesCount }) => gamesCount > 0)
    .map(({ provider }) => provider),
);
providersWithGamesByPageSelector.displayName = "providersWithGamesByPageSelector";

const providersByPageExistSelector = createSimpleSelector([providersWithGamesByPageSelector], isNotEmpty);

const gamesFavouritesSelector = (state: TMixAppState, page: EGamePage) => {
  const selector = favoritesByGamePageMap[page];

  if (!selector) {
    throw new Error(`[gamesFavouritesSelector] Favourites for page "${page}" not supported`);
  }

  return selector(state);
};

const labelByLabelIdAndPageSelector = createSimpleSelector(
  [
    gamePagesSelector,
    (_, page: EGamePage, labelId: string) => ({ page, labelId }),
  ],
  (gamePages, { page, labelId }) => {
    const gamePage = getNotNil(
      gamePages.find((it) => it.page === page),
      ["game page is nil in GamesSelector"],
      "error",
    );

    return getNotNil(
      gamePage.labels.find((it) => it.label.id === labelId),
      ["labelByLabelIdAndPageSelector"],
      "label",
    ).label;
  },
);

const labelNameByLabelIdAndPageSelector = createPropertySelector(
  labelByLabelIdAndPageSelector,
  "name",
);

// should be used after 'GAME_MANAGER_LABEL_GAMES_LOADING_SYMBOL' was succeeded
const gameIdsByPageAndLabelIdSelector = createSimpleSelector(
  [
    pageLabelToGamesMapSelector,
    (_, page: EGamePage, labelId: string) => ({ labelId, page }),
  ],
  (gamesMap, { labelId, page }) => notNilLabelId(gamesMap, page, labelId).gameIds,
);

const pageInfoByPageAndLabelIdSelector = createSimpleSelector(
  [
    pageLabelToGamesMapSelector,
    (_, page: EGamePage, labelId: string) => ({ labelId, page }),
  ],
  (gamesMap, { labelId, page }) => gamesMap[page][labelId]?.pageInfo,
);

const gameTotalByPageAndLabelSelector = createOptionalPropertySelector(pageInfoByPageAndLabelIdSelector, "total");

const isWithDgaByPageAndLabelIdSelector = createSimpleSelector(
  [
    pageLabelToGamesMapSelector,
    (_, page: EGamePage, labelId: string) => ({ labelId, page }),
  ],
  (gamesMap, { labelId, page }) => Boolean(gamesMap[page][labelId]?.isWithDga),
);

const visibleRowsByPageAndLabelIdSelector = createSimpleSelector(
  [
    pageLabelToGamesMapSelector,
    (_, page: EGamePage, labelId: string) => ({ labelId, page }),
  ],
  (gamesMap, { labelId, page }) => notNilLabelId(gamesMap, page, labelId).visibleRows,
);

const fetchedGamesCountByPageAndLabelIdSelector = createSimpleSelector(
  [
    pageLabelToGamesMapSelector,
    (_, page: EGamePage, labelId: string) => ({ labelId, page }),
  ],
  (gamesMap, { labelId, page }) => gamesMap[page][labelId]?.gameIds.length || 0,
);

const gamesWithFreeSpinsLoadedForPlayerBonusIdByPageSelector = createSimpleSelector(
  [
    pageLabelToGamesMapSelector,
    (_, page: EGamePage) => page,
  ],
  (gamesMap, page) => gamesMap[page][systemLabels.activeFreeSpins]?.loadedForPlayerBonusId,
);

const gamesByPageAndLabelIdSelector = createMemoSelector<TMixAppState, TPlatform_Game_Fragment[], TExplicitAny[]>(
  (state, page: EGamePage, labelId: string) => {
    const gameIds = gameIdsByPageAndLabelIdSelector(state, page, labelId);

    return gameIds.map((gameId) => assertNotNilGameByIdSelector(state, gameId));
  },
  { resultEqual: deepEqualNodeIds },
);

const gamesByPageAndProviderSelector = createMemoSelector<TMixAppState, TPlatform_Game_Fragment[], TExplicitAny[]>(
  (state, page: EGamePage, provider: TGameProviderEnum) => {
    const gameIds = gameIdsByPageAndProviderSelector(state, page, provider);

    return gameIds.map((gameId) => assertNotNilGameByIdSelector(state, gameId));
  },
  { resultEqual: deepEqualNodeIds },
);

const getLabelLayout = (labelId: string, games: TPlatform_Game_Fragment[], gridType: EPlatform_GameGridType, visibleRows: number) => {
  const items = labelId === systemLabels.favourite || labelId === systemLabels.popular
    ? games.map(({ id }, index) => ({ id: id, size: 1, order: index.toString() })) // favourite and popular labels doesn't configurable in adminui
    : games.map(({ id, labelPositionSettings, positionSettings }) => {
      const { priority, size } = gamePositionByLabelId(labelId, gridType, labelPositionSettings, positionSettings);

      return { id, size, order: priority };
    });

  return computeByRow(visibleRows, computeGameGridLayout(items, gameGridWidthMap[gridType]));
};

const getProviderLayout = (
  games: TPlatform_Game_Fragment[],
  gridType: EPlatform_GameGridType,
  visibleRows: number,
) => {
  const items = games.map(({ id, providerPositionSettings, positionSettings }) => {
    const { priority, size } = gamePositionByProvider(gridType, providerPositionSettings, positionSettings);

    return { id, size, order: priority };
  });

  return computeByRow(visibleRows, computeGameGridLayout(items, gameGridWidthMap[gridType]));
};

const labelGamesLayoutSelector = createMemoSelector(
  [
    gamesByPageAndLabelIdSelector,
    gridTypeSelector,
    visibleRowsByPageAndLabelIdSelector,
    (_, __, labelId: string) => labelId,
  ],
  (games, gridType, visibleRows, labelId) => getLabelLayout(labelId, games, gridType, visibleRows),
);
labelGamesLayoutSelector.displayName = "labelGamesLayoutSelector";

const labelGamesLayoutLandingPageSelector = createMemoSelector(
  [
    gamesByPageAndLabelIdSelector,
    visibleRowsByPageAndLabelIdSelector,
    (_, __, labelId: string) => labelId,
  ],
  (games, visibleRows, labelId) => getLabelLayout(labelId, games, EPlatform_GameGridType.size6, visibleRows),
);
labelGamesLayoutSelector.displayName = "labelGamesLayoutSelector";

const labelGamesLayoutLandingPageBatchSelector = createMemoSelector(
  [labelGamesLayoutLandingPageSelector],
  (games) => [games.slice(0, Math.ceil(games.length / 2)), games.slice(Math.ceil(games.length / 2))] as const,
);

const labelGamesVisibleGamesCountSelector = createPropertySelector(
  labelGamesLayoutSelector,
  "length",
);

const isLoadMorePossibleForLabelSelector = (state: TMixAppState, page: EGamePage, labelId: string) => {
  if (labelId === systemLabels.favourite) {
    const gridWidth = gameGridWidthMap[gridTypeSelector(state)];
    const visibleRows = visibleRowsByPageAndLabelIdSelector(state, page, labelId);

    const maxVisibleGamesCount = gridWidth * visibleRows;

    const favIds = gamesFavouritesSelector(state, page);

    const totalCount = favIds.length;

    return totalCount > maxVisibleGamesCount;
  }

  const visibleGamesCount = labelGamesVisibleGamesCountSelector(state, page, labelId);
  const pageInfo = pageInfoByPageAndLabelIdSelector(state, page, labelId);
  const fetchedCount = fetchedGamesCountByPageAndLabelIdSelector(state, page, labelId);

  return fetchedCount > visibleGamesCount || pageInfo?.hasNextPage;
};

// should be used after 'GAME_MANAGER_PROVIDER_GAMES_LOADING_SYMBOL' was succeeded
const pageProviderToGameMapNotNilSelector = createSimpleSelector(
  [
    pageProviderToGamesMapSelector,
    (_, page: EGamePage, provider: TGameProviderEnum) => ({ provider, page }),
  ],
  (gamesMap, { provider, page }) => notNilProvider(gamesMap, page, provider),
);

const pageProviderToGameMapNotNilSelectors = createPropertySelectors(pageProviderToGameMapNotNilSelector);

const gameInfoProviderByPageAndProviderSelector = createPropertySelectors(
  pageProviderToGameMapNotNilSelectors.pageInfo,
);

const gameIdsByPageAndProviderSelector = createSimpleSelector(
  [
    gridTypeSelector,
    pageProviderToGameMapNotNilSelectors.gameIds,
    pageProviderToGameMapNotNilSelectors.visibleRows,
  ],
  (gridType, gameIds, visibleRows) => gameIds.slice(0, gameGridWidthMap[gridType] * visibleRows),
);

const providersGamesLayoutSelector = createMemoSelector(
  [
    gamesByPageAndProviderSelector,
    gridTypeSelector,
    pageProviderToGameMapNotNilSelectors.visibleRows,
  ],
  (games, gridType, visibleRows) => (
    getProviderLayout(games, gridType, visibleRows)),
);

const fetchedGamesCountByPageAndProviderSelector = createSimpleSelector(
  [
    pageProviderToGamesMapSelector,
    (_, page: EGamePage, provider: TGameProviderEnum) => ({ provider, page }),
  ],
  (gamesMap, { provider, page }) => gamesMap[page][provider]?.gameIds.length || 0,
);

//CombineProviders

const pageInfoCombineProviderGamesByPageSelector = createSimpleSelector(
  [
    pageCombineProvidersToGamesMapSelector,
    (_, page: EGamePage) => ({ page }),
  ],
  (gamesMap, { page }) =>
    getNotNil(gamesMap[page].games, ["pageInfoCombineProviderGamesByPageSelector"], "games").pageInfo,
);

const gameInfoCombineProviderByPageSelector = createPropertySelectors(
  pageInfoCombineProviderGamesByPageSelector,
);

const gameIdsCombineProvidersByPageSelector = createSimpleSelector(
  [
    gridTypeSelector,
    pageCombineProvidersToGamesMapSelector,
    (_, page: EGamePage) => ({ page }),
  ],
  (gridType, gamesMap, { page }) => {
    const { gameIds, visibleRows } = getNotNil(
      gamesMap[page].games,
      ["gameIdsCombineProvidersByPageSelector"],
      "games",
    );

    return gameIds.slice(0, gameGridWidthMap[gridType] * visibleRows);
  },
);

const visibleRowsCombineProvidersGamesByPageSelector = createSimpleSelector(
  [
    pageCombineProvidersToGamesMapSelector,
    (_, page: EGamePage) => ({ page }),
  ],
  (gamesMap, { page }) =>
    getNotNil(gamesMap[page].games, ["visibleRowsCombineProvidersGamesByPageSelector"], "games").visibleRows,
);

const fetchedCombineProvidersGamesCountByPageSelector = createSimpleSelector(
  [
    pageCombineProvidersToGamesMapSelector,
    (_, page: EGamePage) => ({ page }),
  ],
  (gamesMap, { page }) => gamesMap[page].games?.gameIds.length || 0,
);

const isWithDgaByPageAndCombineProvidersSelector = createSimpleSelector(
  [
    pageCombineProvidersToGamesMapSelector,
    (_, page: EGamePage) => ({ page }),
  ],
  (gamesMap, { page }) => Boolean(gamesMap[page].games?.isWithDga),
);

const combineProviderGamesVisibleGamesCountSelector = createSimpleSelector(
  [
    visibleRowsCombineProvidersGamesByPageSelector,
    gridTypeSelector,
  ],
  (visibleRows, gridType) => visibleRows * gameGridWidthMap[gridType], // cause game size always 1x1
);

const isLoadMorePossibleForCombineProvidersSelector = createSimpleSelector(
  [
    pageInfoCombineProviderGamesByPageSelector,
    fetchedCombineProvidersGamesCountByPageSelector,
    combineProviderGamesVisibleGamesCountSelector,
  ],
  ({ hasNextPage }, fetchedCount, visibleGamesCount) => fetchedCount > visibleGamesCount || hasNextPage,
);

const providerGamesVisibleGamesCountSelector = createSimpleSelector(
  [
    pageProviderToGameMapNotNilSelectors.visibleRows,
    gridTypeSelector,
  ],
  (visibleRows, gridType) => visibleRows * gameGridWidthMap[gridType], // cause game size always 1x1
);

const isLoadMorePossibleForProviderSelector = createSimpleSelector(
  [
    pageProviderToGameMapNotNilSelectors.pageInfo,
    fetchedGamesCountByPageAndProviderSelector,
    providerGamesVisibleGamesCountSelector,
  ],
  ({ hasNextPage }, fetchedCount, visibleGamesCount) => fetchedCount > visibleGamesCount || hasNextPage,
);

const isAllFavGamesFetchedSelector = (state: TMixAppState, page: EGamePage) => {
  const favIds = gamesFavouritesSelector(state, page);

  return favIds.every((favId) => isNotNil(gameByIdSelector(state, favId)));
};

const isLoadMorePossibleForSearchSelector = (state: TMixAppState, page: TGameManagerPage) => {
  const pageInfoSelector = searchPageInfoByGamePageMap[page];

  if (!pageInfoSelector) {
    Logger.warn.selector(`[isLoadMorePossibleForSearchSelector] game page ${page} not supported yet`);

    return false;
  }

  const pageInfo = pageInfoSelector(state);

  return pageInfo?.hasNextPage ?? false;
};

const gameLinkByGameIdSelector = createSimpleSelector(
  [
    externalGameIdToGameUrlMapSelector,
    gameByExternalIdSelector,
    loggedSelector,
    (_, gameId: EExternalGameId) => gameId,
  ],
  (externalGameIdToGameUrlMap, game, logged, gameId) => {
    const link = externalGameIdToGameUrlMap[gameId];

    if (gameId === EExternalGameId.BETFAIR) {
      return link;
    }

    if (!game || (!game.isDemoAvailable && !logged)) {
      return null;
    }

    return link;
  },
);

const isGameOpenLoginModalSelector = createSimpleSelector(
  [
    gameByExternalIdSelector,
    loggedSelector,
  ],
  (game, logged) => !game || game.isDemoAvailable ? false : !logged,
);

const shuffleGameSelector = createPropertySelectors(
  createPropertySelector(
    gamesStateSelector,
    "shuffleGame",
  ),
);

const gamesOnlineSelector = createPropertySelector(gamesStateSelector, "online");

const gameOnlineByIdSelector = (state: TWithGamesState, id: string) => gamesOnlineSelector(state)?.[id];

export {
  gamePagesLoadingSucceededSelector,
  labelGamesLoadingSucceededSelector,
  labelGamesLoadingStartedSelector,
  labelGamesAdditionalLoadingStartedSelector,
  providerGamesLoadingSucceededSelector,
  providerGamesAdditionalLoadingStartedSelector,
  isAllLabelGamesLoadingSucceededSelector,
  similarGamesLoadingStartedSelector,
  searchGamesLoadingStartedSelector,
  searchAdditionalGamesLoadingStartedSelector,
  existedGamesByIdsSelector,

  gamesByIdsSelector,
  isFavEnabledForPageSelector,
  isFreeSpinsEnabledForPageSelector,
  gridTypeSelector,
  gamePagesSelector,
  isGamePagesServerLoadedSelector,
  labelByLabelIdAndPageSelector,
  labelNameByLabelIdAndPageSelector,
  gameIdsByPageAndLabelIdSelector,
  gameIdsByPageAndProviderSelector,
  pageProviderToGameMapNotNilSelectors,
  pageInfoByPageAndLabelIdSelector,
  fetchedGamesCountByPageAndLabelIdSelector,
  gamesWithFreeSpinsLoadedForPlayerBonusIdByPageSelector,
  fetchedGamesCountByPageAndProviderSelector,
  visibleRowsByPageAndLabelIdSelector,
  isLoadMorePossibleForLabelSelector,
  isLoadMorePossibleForProviderSelector,
  gamesByExternalIdsSelector,
  gameInternalIdByExternalIdsSelector,

  isLoadMorePossibleForSearchSelector,

  providersWithGameCountByPageSelector,
  providersByPageExistSelector,
  gamesSelector,
  gamesByPageSelector,
  providersWithGamesByPageSelector,
  gameByIdSelector,

  labelGamesVisibleGamesCountSelector,
  labelGamesLayoutSelector,

  providersGamesLayoutSelector,

  isAllFavGamesFetchedSelector,
  gamesFavouritesSelector,
  gamesByPageAndLabelIdSelector,
  labelGamesLayoutLandingPageSelector,
  labelGamesLayoutLandingPageBatchSelector,
  assertNotNilGameByIdSelector,
  gameByIdNotNilSelectors,
  gameLinkByGameIdSelector,
  isGameOpenLoginModalSelector,

  //combineProviders
  fetchedCombineProvidersGamesCountByPageSelector,
  visibleRowsCombineProvidersGamesByPageSelector,
  pageInfoCombineProviderGamesByPageSelector,
  combineProvidersSelector,
  isNilCombineProvidersSelector,
  gameIdsCombineProvidersByPageSelector,
  isLoadMorePossibleForCombineProvidersSelector,
  notNilCombineProvidersSelector,

  //dga
  isWithDgaByPageAndLabelIdSelector,
  isWithDgaByPageAndCombineProvidersSelector,

  gamesStateSelector,

  shuffleGameSelector,
  searchGamesLoadingSucceededSelector,

  gamesOnlineSelector,
  gameOnlineByIdSelector,

  //total count
  gameTotalByPageAndLabelSelector,
  gameInfoCombineProviderByPageSelector,
  gameInfoProviderByPageAndProviderSelector,
};
