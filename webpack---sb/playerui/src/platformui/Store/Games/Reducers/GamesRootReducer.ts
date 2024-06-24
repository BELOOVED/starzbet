import { createRootReducer, getNotNil, isNil, simpleReducer } from "@sb/utils";
import { EGamePage } from "@sb/betting-core/EGamePage";
import { EProviderCode } from "@sb/betting-core/EProviderCode";
import type { TPlatform_GamePageByPlayer_Fragment } from "@sb/graphql-client/PlayerUI";
import { type TMixAppState } from "../../../../sportsbookui/Store/CreateMixInitialState";
import { type TRootReducer } from "../../../../common/Store/Root/TRootReducer";
import { Logger } from "../../../../common/Utils/Logger";
import { extractIds } from "../../../../common/Utils/IDUtils";
import { casinoToggleFavouriteAction } from "../../Casino/CasinoActions";
import { liveCasinoToggleFavouriteAction } from "../../LiveCasino/LiveCasinoActions";
import { liveGamesToggleFavouriteAction } from "../../LiveGames/LiveGamesActions";
import {
  additionalGamesForSearchReceivedAction,
  changeGridTypeAction,
  gameLinkForExternalGameReceivedAction,
  gamePagesReceivedAction,
  gamesForCombineProvidersAdditionalReceivedAction,
  gamesForCombineProvidersReceivedAction,
  gamesForFavLabelReceivedAction,
  gamesForFreeBetLabelReceivedAction,
  gamesForLabelAdditionalReceivedAction,
  gamesForLabelReceivedAction,
  gamesForProviderAdditionalReceivedAction,
  gamesForProviderReceivedAction,
  gamesForSearchReceivedAction,
  gamesHeightAction,
  removeGameLinkForExternalGameAction,
  replaceShuffleGameAction,
  setVisibleRowsForCombineProvidersPageAction,
  setVisibleRowsForLabelPageAction,
  setVisibleRowsForProviderPageAction,
  simpleGamesLoadedAction,
} from "../Actions/GamesActions";
import { concatIdForLoadingSymbol, reduceGameProviderWithCount } from "../GamesUtils";
import { systemLabels } from "../Model/Games";
import { gameIdsByPageAndLabelIdSelector, labelGamesLoadingSucceededSelector } from "../Selectors/GamesSelectors";
import { gamesAddNewGamesAction } from "../Actions/GamesAddNewGamesActions";
import { onlineUpdateReceiveAction } from "../Actions/OnlineActions";
import { addUniq } from "../Utils/GameUtils";
import { gamesRecentlyPlayedRootReducer } from "./GamesRecentlyPlayedReducer";
import { gameOnlineUpdateReceiveReducer } from "./GameOnlineReceiveReducer";

type TGameStateKey = keyof Pick<TMixAppState, "casino" | "liveCasino" | "liveGames" | "virtual" | "landing">

const hasPragmaticDga = (
  page: EGamePage,
  games: {
    provider: EProviderCode;
  }[],
) => page === EGamePage.LIVE_CASINO && games
  .some(({ provider }) => provider === EProviderCode.PRAGMATIC_PLAY);

const gamePagesNormalizer = (gamePages: TPlatform_GamePageByPlayer_Fragment[]) => gamePages.map((page) => ({
  ...page,
  providers: page.providers
    .sort((a, b) => +a.priority < +b.priority ? -1 : 1)
    .reduce(reduceGameProviderWithCount, []),
  gamesCount: page.activeGamesCount,
}));

const gamePagesReceivedReducer: TRootReducer<typeof gamePagesReceivedAction> = (
  state,
  action,
) => ({
  ...state,
  games: {
    ...state.games,
    gamePages: {
      nodes: gamePagesNormalizer(action.payload.gamePages),
      isServerLoaded: false,
    },
  },
});

const gamesHeightReducer = simpleReducer(["height"], ["games", "height"]);

const changeGridTypeReducer = simpleReducer(["gridType"], ["games", "gridType"]);

const gamesForFavLabelReceivedReducer: TRootReducer<typeof gamesForFavLabelReceivedAction> = (
  state,
  { payload },
) => ({
  ...state,
  games: {
    ...state.games,
    pageLabelToGamesMap: {
      ...state.games.pageLabelToGamesMap,
      [payload.page]: {
        ...state.games.pageLabelToGamesMap[payload.page],
        [systemLabels.favourite]: {
          gameIds: extractIds(payload.games),
          visibleRows: payload.visibleRows,
          isWithDga: hasPragmaticDga(payload.page, payload.games),
        },
      },
    },
    games: addUniq(state.games.games, payload.games),
  },
  [stateKeyByGamePageMap[payload.page]]: {
    ...state[stateKeyByGamePageMap[payload.page]],
    favourites: extractIds(payload.games),
  },
});

const gamesForFreeBetLabelReceivedReducer: TRootReducer<typeof gamesForFreeBetLabelReceivedAction> = (
  state,
  { payload: { games, page, matchedPlayerBonusId } },
) => ({
  ...state,
  games: {
    ...state.games,
    pageLabelToGamesMap: {
      ...state.games.pageLabelToGamesMap,
      [page]: {
        ...state.games.pageLabelToGamesMap[page],
        [systemLabels.activeFreeSpins]: {
          gameIds: extractIds(games),
          loadedForPlayerBonusId: matchedPlayerBonusId,
        },
      },
    },
    games: addUniq(state.games.games, games),
  },
});

const gamesForLabelReceivedReducer: TRootReducer<typeof gamesForLabelReceivedAction> = (
  state,
  { payload },
) => ({
  ...state,
  games: {
    ...state.games,
    pageLabelToGamesMap: {
      ...state.games.pageLabelToGamesMap,
      [payload.page]: {
        ...state.games.pageLabelToGamesMap[payload.page],
        [payload.labelId]: {
          gameIds: extractIds(payload.games),
          pageInfo: payload.pageInfo,
          visibleRows: payload.visibleRows,
          isWithDga: hasPragmaticDga(payload.page, payload.games),
        },
      },
    },
    games: addUniq(state.games.games, payload.games),
  },
});

const setVisibleRowsForLabelPageReducer: TRootReducer<typeof setVisibleRowsForLabelPageAction> = (
  state,
  { payload },
): TMixAppState => ({
  ...state,
  games: {
    ...state.games,
    pageLabelToGamesMap: {
      ...state.games.pageLabelToGamesMap,
      [payload.page]: {
        ...state.games.pageLabelToGamesMap[payload.page],
        [payload.labelId]: {
          ...state.games.pageLabelToGamesMap[payload.page][payload.labelId],
          visibleRows: payload.visibleRows,
        },
      },
    },
  },
});

const gamesForLabelAdditionalReceivedReducer: TRootReducer<typeof gamesForLabelAdditionalReceivedAction> = (
  state,
  { payload },
) => {
  const hasIsWithDga = state.games.pageLabelToGamesMap[payload.page][payload.labelId]?.isWithDga;
  const isWithDga = hasIsWithDga || hasPragmaticDga(payload.page, payload.games);
  const notNilLabel = getNotNil(state.games.pageLabelToGamesMap[payload.page][payload.labelId], ["gamesForLabelAdditionalReceivedReducer"], "Label");

  return ({
    ...state,
    games: {
      ...state.games,
      pageLabelToGamesMap: {
        ...state.games.pageLabelToGamesMap,
        [payload.page]: {
          ...state.games.pageLabelToGamesMap[payload.page],
          [payload.labelId]: {
            gameIds: [
              ...notNilLabel.gameIds,
              ...extractIds(payload.games),
            ],
            pageInfo: {
              ...notNilLabel.pageInfo,
              endCursor: payload.pageInfo.endCursor,
              hasNextPage: payload.pageInfo.hasNextPage,
              total: payload.pageInfo.total,
            },
            visibleRows: payload.visibleRows,
            isWithDga,
          },
        },
      },
      games: addUniq(state.games.games, payload.games),
    },
  });
};

const gamesForProviderReceivedReducer: TRootReducer<typeof gamesForProviderReceivedAction> = (
  state,
  { payload },
) => ({
  ...state,
  games: {
    ...state.games,
    pageProviderToGamesMap: {
      ...state.games.pageProviderToGamesMap,
      [payload.page]: {
        ...state.games.pageProviderToGamesMap[payload.page],
        [payload.provider]: {
          gameIds: extractIds(payload.games),
          pageInfo: payload.pageInfo,
          visibleRows: payload.visibleRows,
        },
      },
    },
    games: addUniq(state.games.games, payload.games),
  },
});

const gamesForCombineProvidersReceivedReducer: TRootReducer<typeof gamesForCombineProvidersReceivedAction> = (
  state,
  {
    payload: {
      pageInfo,
      page,
      games,
      visibleRows,
    },
  },
) => ({
  ...state,
  games: {
    ...state.games,
    pageCombineProvidersToGamesMap: {
      ...state.games.pageCombineProvidersToGamesMap,
      [page]: {
        ...state.games.pageCombineProvidersToGamesMap[page],
        games: {
          gameIds: extractIds(games),
          pageInfo,
          visibleRows,
          isWithDga: hasPragmaticDga(page, games),
        },
      },
    },
    games: addUniq(state.games.games, games),
  },
});

const setVisibleRowsForProviderPageReducer: TRootReducer<typeof setVisibleRowsForProviderPageAction> = (
  state,
  { payload },
) => ({
  ...state,
  games: {
    ...state.games,
    pageProviderToGamesMap: {
      ...state.games.pageProviderToGamesMap,
      [payload.page]: {
        ...state.games.pageProviderToGamesMap[payload.page],
        [payload.provider]: {
          ...state.games.pageProviderToGamesMap[payload.page][payload.provider],
          visibleRows: payload.visibleRows,
        },
      },
    },
  },
});
//combineProviders
const setVisibleRowsForCombineProvidersPageReducer: TRootReducer<typeof setVisibleRowsForCombineProvidersPageAction> = (
  state,
  { payload: { page, visibleRows } },
) => ({
  ...state,
  games: {
    ...state.games,
    pageCombineProvidersToGamesMap: {
      ...state.games.pageCombineProvidersToGamesMap,
      [page]: {
        ...state.games.pageCombineProvidersToGamesMap[page],
        games: {
          ...state.games.pageCombineProvidersToGamesMap[page].games,
          visibleRows,
        },
      },
    },
  },
});

const gamesForProviderAdditionalReceivedReducer: TRootReducer<typeof gamesForProviderAdditionalReceivedAction> = (
  state,
  { payload },
) => {
  const notNilProvider = getNotNil(state.games.pageProviderToGamesMap[payload.page][payload.provider], ["gamesForProviderAdditionalReceivedReducer"], "provider");

  return ({
    ...state,
    games: {
      ...state.games,
      pageProviderToGamesMap: {
        ...state.games.pageProviderToGamesMap,
        [payload.page]: {
          ...state.games.pageProviderToGamesMap[payload.page],
          [payload.provider]: {
            gameIds: [
              ...notNilProvider.gameIds,
              ...extractIds(payload.games),
            ],
            pageInfo: {
              ...notNilProvider.pageInfo,
              endCursor: payload.pageInfo.endCursor,
              hasNextPage: payload.pageInfo.hasNextPage,
              total: payload.pageInfo.total,
            },
            visibleRows: payload.visibleRows,
          },
        },
      },
      games: addUniq(state.games.games, payload.games),
    },
  });
};

const gamesForCombineProvidersAdditionalReceivedReducer: TRootReducer<typeof gamesForCombineProvidersAdditionalReceivedAction> = (
  state,
  {
    payload: {
      page,
      pageInfo,
      games,
      visibleRows,
    },
  },
) => {
  const stateGames = getNotNil(
    state.games.pageCombineProvidersToGamesMap[page].games,
    ["gamesForProviderAdditionalReceivedReducer"],
    "games",
  );
  const hasIsWithDga = stateGames.isWithDga;
  const isWithDga = hasIsWithDga || hasPragmaticDga(page, games);

  return ({
    ...state,
    games: {
      ...state.games,
      pageCombineProvidersToGamesMap: {
        ...state.games.pageCombineProvidersToGamesMap,
        [page]: {
          ...state.games.pageCombineProvidersToGamesMap[page],
          games: {
            gameIds: [
              ...stateGames.gameIds,
              ...extractIds(games),
            ],
            pageInfo: {
              ...stateGames.pageInfo,
              endCursor: pageInfo.endCursor,
              hasNextPage: pageInfo.hasNextPage,
              total: pageInfo.total,
            },
            visibleRows,
            isWithDga,
          },
        },
      },
      games: addUniq(state.games.games, games),
    },
  });
};

const toggleFavouriteReducerFactory = (gamePage: EGamePage): TRootReducer<
  typeof casinoToggleFavouriteAction | typeof liveCasinoToggleFavouriteAction | typeof liveGamesToggleFavouriteAction
> => (
  state,
  { payload },
) => {
  const wasLoaded = labelGamesLoadingSucceededSelector(state, concatIdForLoadingSymbol(systemLabels.favourite, gamePage));

  if (!wasLoaded) {
    return state;
  }

  const favsInMap = gameIdsByPageAndLabelIdSelector(state, gamePage, systemLabels.favourite);

  return ({
    ...state,
    games: {
      ...state.games,
      pageLabelToGamesMap: {
        ...state.games.pageLabelToGamesMap,
        [gamePage]: {
          ...state.games.pageLabelToGamesMap[gamePage],
          [systemLabels.favourite]: {
            ...state.games.pageLabelToGamesMap[gamePage][systemLabels.favourite],
            gameIds: favsInMap.includes(payload.gameId)
              ? favsInMap.filter((it) => it !== payload.gameId)
              : [...favsInMap, payload.gameId],
          },
        },
      },
    },
  });
};

const casinoToggleFavouriteReducer = toggleFavouriteReducerFactory(EGamePage.CASINO);
const liveCasinoToggleFavouriteReducer = toggleFavouriteReducerFactory(EGamePage.LIVE_CASINO);
const liveGamesToggleFavouriteReducer = toggleFavouriteReducerFactory(EGamePage.GAMES);

const simpleGamesLoadedReducer: TRootReducer<typeof simpleGamesLoadedAction> = (
  state,
  { payload },
) => ({
  ...state,
  games: {
    ...state.games,
    games: addUniq(state.games.games, payload.games),
  },
});

const stateKeyByGamePageMap: Record<EGamePage, TGameStateKey> = {
  [EGamePage.CASINO]: "casino",
  [EGamePage.LIVE_CASINO]: "liveCasino",
  [EGamePage.GAMES]: "liveGames",
  [EGamePage.VIRTUAL]: "virtual",
};

const gamesForSearchReceivedReducer: TRootReducer<typeof gamesForSearchReceivedAction> = (
  state,
  { payload },
) => {
  const stateKey = stateKeyByGamePageMap[payload.page];

  if (isNil(stateKey)) {
    Logger.warn.reducer(`[gamesForSearchReceivedReducer] page: ${payload.page} not supported yet`);

    return state;
  }

  const isWithDga = hasPragmaticDga(payload.page, payload.games);

  return ({
    ...state,
    games: {
      ...state.games,
      games: addUniq(state.games.games, payload.games),
    },
    [stateKey]: {
      ...state[stateKey],
      pageInfo: payload.pageInfo,
      gameIds: extractIds(payload.games),
      isWithDga,
    },
  });
};

const additionalGamesForSearchReceivedReducer: TRootReducer<typeof additionalGamesForSearchReceivedAction> = (
  state,
  { payload },
) => {
  const stateKey = stateKeyByGamePageMap[payload.page];

  if (isNil(stateKey) || stateKey === "landing") {
    Logger.warn.reducer(`[additionalGamesForSearchReceivedReducer] page ${payload.page} not supported yet`);

    return state;
  }

  const hasIsWithDga = state.games.pageCombineProvidersToGamesMap[payload.page].games?.isWithDga;
  const isWithDga = hasIsWithDga || hasPragmaticDga(payload.page, payload.games);

  return ({
    ...state,
    games: {
      ...state.games,
      games: addUniq(state.games.games, payload.games),
    },
    [stateKey]: {
      ...state[stateKey],
      pageInfo: {
        ...state[stateKey].pageInfo,
        hasNextPage: payload.pageInfo?.hasNextPage,
        endCursor: payload.pageInfo?.endCursor,
        total: payload.pageInfo?.total,
      },
      gameIds: [
        ...state[stateKey].gameIds,
        ...extractIds(payload.games),
      ],
      isWithDga,
    },
  });
};

const gameLinkForExternalGameReceivedReducer: TRootReducer<typeof gameLinkForExternalGameReceivedAction> = (
  state,
  { payload: { externalGameId, link } },
) => ({
  ...state,
  games: {
    ...state.games,
    externalGameIdToGameUrlMap: {
      ...state.games.externalGameIdToGameUrlMap,
      [externalGameId]: link,
    },
  },
});

const removeGameLinkForExternalGameReducer: TRootReducer<typeof removeGameLinkForExternalGameAction> = (
  state,
  { payload: { externalGameId } },
) => {
  const externalGameIdToGameUrlMap = { ...state.games.externalGameIdToGameUrlMap };

  delete externalGameIdToGameUrlMap[externalGameId];

  return ({
    ...state,
    games: {
      ...state.games,
      externalGameIdToGameUrlMap,
    },
  });
};

const replaceShuffleGameReducer: TRootReducer<typeof replaceShuffleGameAction> = (
  state,
  { payload: { game, page } },
) => {
  if (isNil(game)) {
    return ({
      ...state,
      games: {
        ...state.games,
        shuffleGame: {
          ...state.games.shuffleGame,
          [page]: false,
        },
      },
    });
  }

  return ({
    ...state,
    games: {
      ...state.games,
      games: addUniq(state.games.games, [game]),
      shuffleGame: {
        ...state.games.shuffleGame,
        [page]: game.id,
      },
    },
  });
};

const gamesAddNewGamesReducer: TRootReducer<typeof gamesAddNewGamesAction> = (
  state,
  { payload: { games } },
) => ({
  ...state,
  games: {
    ...state.games,
    games: addUniq(state.games.games, games),
  },
});

const gamesRootReducer = createRootReducer([
  [gamesHeightReducer, gamesHeightAction],
  [gamePagesReceivedReducer, gamePagesReceivedAction],
  [gamesForFavLabelReceivedReducer, gamesForFavLabelReceivedAction],
  [gamesForFreeBetLabelReceivedReducer, gamesForFreeBetLabelReceivedAction],
  [gamesForLabelReceivedReducer, gamesForLabelReceivedAction],
  [setVisibleRowsForLabelPageReducer, setVisibleRowsForLabelPageAction],
  [gamesForLabelAdditionalReceivedReducer, gamesForLabelAdditionalReceivedAction],
  [gamesForProviderReceivedReducer, gamesForProviderReceivedAction],
  [setVisibleRowsForProviderPageReducer, setVisibleRowsForProviderPageAction],
  [gamesForProviderAdditionalReceivedReducer, gamesForProviderAdditionalReceivedAction],
  [changeGridTypeReducer, changeGridTypeAction],
  [casinoToggleFavouriteReducer, casinoToggleFavouriteAction],
  [liveCasinoToggleFavouriteReducer, liveCasinoToggleFavouriteAction],
  [liveGamesToggleFavouriteReducer, liveGamesToggleFavouriteAction],
  [simpleGamesLoadedReducer, simpleGamesLoadedAction],
  [gamesForSearchReceivedReducer, gamesForSearchReceivedAction],
  [additionalGamesForSearchReceivedReducer, additionalGamesForSearchReceivedAction],
  [gameLinkForExternalGameReceivedReducer, gameLinkForExternalGameReceivedAction],
  [removeGameLinkForExternalGameReducer, removeGameLinkForExternalGameAction],
  [gamesAddNewGamesReducer, gamesAddNewGamesAction],
  //combineProviders
  [gamesForCombineProvidersReceivedReducer, gamesForCombineProvidersReceivedAction],
  [setVisibleRowsForCombineProvidersPageReducer, setVisibleRowsForCombineProvidersPageAction],
  [gamesForCombineProvidersAdditionalReceivedReducer, gamesForCombineProvidersAdditionalReceivedAction],
  ...gamesRecentlyPlayedRootReducer,
  [replaceShuffleGameReducer, replaceShuffleGameAction],
  [gameOnlineUpdateReceiveReducer, onlineUpdateReceiveAction],
]);

export { gamePagesNormalizer, gamesRootReducer };
