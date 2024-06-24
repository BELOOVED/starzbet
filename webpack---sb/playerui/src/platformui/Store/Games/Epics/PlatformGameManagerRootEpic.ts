import { EMPTY, of, switchMap } from "rxjs";
import { combineEpics } from "redux-observable";
import { distinctUntilChanged, filter, map } from "rxjs/operators";
import { EGamePage } from "@sb/betting-core/EGamePage";
import { routerEpic } from "@sb/router";
import { type TMatch } from "@sb/react-router-compat";
import { extractExport, isDev } from "@sb/utils";
import { getMatch } from "../../../../common/Utils/RouterUtils/GetMatch";
import { restartOnParamsChanged } from "../../../../common/Utils/RouterUtils/RestartOnParamsChanged";
import { type TMixAppEpic } from "../../../../common/Store/Root/Epics/TMixAppEpic";
import { type TGameProviderTab } from "../../../../common/Store/Provider/ProviderModel";
import { routeMap } from "../../../RouteMap/RouteMap";
import {
  labelPathByGamePageMap,
  mainPathByGamePageMap,
  providerPathByGamePageMap,
  searchTextPathByGamePageMap,
} from "../../../Utils/GetGamesViewParams";
import { searchDgaEpic } from "../../PragmaticDga/Epics/PragmaticDgaConnectedByRouteEpic";
import { virtualGameRootEpic } from "../../VirtualGame/VirtualGameRootEpic";
import { removeGameLinkForExternalGameAction } from "../Actions/GamesActions";
import { gameManagerPages, gameManagerPageToProductMap, type TGameManagerPage } from "../Model/Games";
import { EExternalGameId } from "../GamesModels";
import { isEmptyGameRecentlySelector } from "../Selectors/GamesRecentlyPlayedSelectors";
import { loadGamesAfterGridChangeEpic, watchGridTypeEpic } from "./WatchGridTypeEpic";
import { handleLoadMoreLabelGamesEpic } from "./HandleLoadMoreLabelGamesEpic";
import { handleLoadMoreProviderGamesEpic } from "./HandleLoadMoreProviderGamesEpic";
import { watchSimilarGamesEpic } from "./WatchSimilarGamesEpic";
import {
  gamePageSearchPageEpicFactory,
  handleLeaveSearchPageEpicFactory,
  onActionLoadMoreSearchGame,
  onActionSearchGame,
} from "./GamePageSearchPageEpicFactory";
import { gameManagerUpdateFavouritesEpic } from "./GameManagerUpdateFavouritesEpic";
import { gameByExternalIdLoadingEpic } from "./GameByExternalIdLoadingEpic";
import { loadGamePagesEpic, whenGamePagesLoaded } from "./GamesPagesEpic";
import { handleLoadMoreCombineProvidersGamesEpic } from "./HandleLoadMoreCombineProvidersGamesEpic";
import { gamesRecentlyPlayedLoadingFactory } from "./GameManagerEpicFactories";
import { loadingShuffleGameEpicFactory, loadShuffleGameIdByActionEpic } from "./ShuffleGameEpic";
import { gamesByExternalIdsEpic, loadLandingGamesEpicFactory } from "./GamesByExternalIdsEpic";
import { betfairPageEpic } from "./BetfairEpic";
import { casinoOnlineEpic } from "./WatchCasinoOnlineEpic";

const recentlyPlayedRouterEpicFactory = (page: TGameManagerPage): TMixAppEpic =>
  (action$, state$, dependencies) => state$
    .pipe(
      map(() => isEmptyGameRecentlySelector(state$.value)),
      distinctUntilChanged(),
      filter(Boolean),
      switchMap(
        () => routerEpic(
          {
            name: `platform ${page} loading recently played`,
            match: getMatch({ path: mainPathByGamePageMap[page], exact: false }),
            onStart: (): TMixAppEpic => gamesRecentlyPlayedLoadingFactory(gameManagerPageToProductMap[page]),
          },
        )(action$, state$, dependencies),
      ),
    );

const recentlyPlayedGamesEpics = combineEpics(
  ...gameManagerPages.map(recentlyPlayedRouterEpicFactory),
);

const shuffleGameEpics = combineEpics(
  ...gameManagerPages.map((page) => routerEpic(
    {
      name: `platform ${page} loading recently played`,
      match: getMatch({ path: mainPathByGamePageMap[page], exact: false }),
      onStart: (): TMixAppEpic => loadingShuffleGameEpicFactory(page),
    },
  )),
);

const platformProviderPageEpicFactory = (page: TGameManagerPage) => routerEpic({
  name: "platformCasinoProviderPage",
  match: getMatch<{ provider: TGameProviderTab; }>({ path: providerPathByGamePageMap[page], exact: true }),
  onStart: () => import("./GameProviderPageEpicFactory")
    .then(extractExport("gameProviderPageEpicFactory"))
    .then((epic) => epic(page)),
  shouldRestart: restartOnParamsChanged,
});

const gamesProviderPageEpic = combineEpics(
  ...gameManagerPages.map(platformProviderPageEpicFactory),
);

const platformLabelPageEpicFactory = (page: TGameManagerPage) => routerEpic({
  name: `platform${page}LabelPage`,
  match: getMatch<{ labelId: string; }>({ path: labelPathByGamePageMap[page], exact: true }),
  onStart: () => import("./PlatformLabelPageRouteEpic")
    .then(extractExport("platformLabelPageRouteEpic"))
    .then((epic) => epic(page)),
  shouldRestart: restartOnParamsChanged,
});

const gamesLabelsPageEpic = combineEpics(
  ...gameManagerPages.map(platformLabelPageEpicFactory),
);

const gamesSearchPageEpicFactory = (page: TGameManagerPage) => routerEpic({
  name: `${page}SearchPage`,
  match: getMatch<{ text: string; }>({ path: searchTextPathByGamePageMap[page], exact: true }),
  onStart: (nextMatched: TMatch<{ searchText: string; }>) => {
    const epics = [gamePageSearchPageEpicFactory(page)(nextMatched)];

    if (page === EGamePage.LIVE_CASINO) {
      epics.push(searchDgaEpic());
    }

    return combineEpics(
      ...epics,
    );
  },
  onStop: () => handleLeaveSearchPageEpicFactory(page),
});

const platformGamesSearchPageEpic = combineEpics(
  ...gameManagerPages.map(gamesSearchPageEpicFactory),
);

const bingoPageEpic = routerEpic({
  name: "bingoPage",
  match: getMatch({ path: routeMap.bingo }),
  onStart: () => gameByExternalIdLoadingEpic(EExternalGameId.FALCON_TOMBALA),
  onStop: () => () => of(removeGameLinkForExternalGameAction(EExternalGameId.FALCON_TOMBALA)),
});

const parlayBayPageEpic = routerEpic({
  name: "parlayBayPage",
  match: getMatch({ path: routeMap.parlayBay }),
  onStart: () => gameByExternalIdLoadingEpic(EExternalGameId.STREAK),
  onStop: () => () => of(removeGameLinkForExternalGameAction(EExternalGameId.STREAK)),
});

// Zlot
const landingLoadGatesOfOlympusEpic = routerEpic({
  name: "landingGatesOfOlympus",
  match: getMatch({ path: routeMap.root, exact: true }),
  onStart: () => loadLandingGamesEpicFactory(EExternalGameId.GATES_OF_OLYMPUS),
});

const GAMES_ROUTES = [routeMap.casino, routeMap.liveCasino, routeMap.games, routeMap.gamePreview, routeMap.playGame, routeMap.playDemoGame];

const onlinePlayersEpic = isDev
  ? () => EMPTY
  : routerEpic(
    {
      name: "onlinePlayers",
      match: getMatch(GAMES_ROUTES),
      onStart: () => casinoOnlineEpic,
    },
  );

const platformGameManagerRootEpic = combineEpics(
  watchGridTypeEpic,
  loadGamesAfterGridChangeEpic,
  loadGamePagesEpic,
  gamesByExternalIdsEpic,
  watchSimilarGamesEpic,
  whenGamePagesLoaded(
    gamesLabelsPageEpic,
    gamesProviderPageEpic,
    platformGamesSearchPageEpic,
    onActionLoadMoreSearchGame,
    onActionSearchGame,
    handleLoadMoreLabelGamesEpic,
    handleLoadMoreProviderGamesEpic,
    handleLoadMoreCombineProvidersGamesEpic,
    virtualGameRootEpic,
    loadShuffleGameIdByActionEpic,
  ),
  bingoPageEpic,
  gameManagerUpdateFavouritesEpic,
  parlayBayPageEpic,
  betfairPageEpic,
);

export {
  shuffleGameEpics,
  platformGameManagerRootEpic,
  recentlyPlayedGamesEpics,
  onlinePlayersEpic,
  landingLoadGatesOfOlympusEpic,
};
