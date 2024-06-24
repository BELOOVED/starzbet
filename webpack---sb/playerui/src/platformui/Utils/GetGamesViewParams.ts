import { type TPageInfo_Fragment } from "@sb/graphql-client";
import { EGamePage } from "@sb/betting-core/EGamePage";
import { createSimpleSelector, isEmpty, type TActionWithPayload, type TSelector } from "@sb/utils";
import { type TMixAppState } from "../../sportsbookui/Store/CreateMixInitialState";
import { type TLocalizedRoutePath } from "../../common/Client/Core/Services/RouterService/Model/LocalizedRoute";
import {
  casinoFavouriteByGameId,
  casinoFavouritesSelector,
  casinoFavouritesSelectorLength,
  casinoGameIdsSelector,
  casinoPageInfoSelector,
} from "../Store/Casino/Selectors/CasinoSelectors";
import { routeMap, type TRoutePath } from "../RouteMap/RouteMap";
import {
  liveCasinoFavouriteByGameId,
  liveCasinoFavouritesSelector,
  liveCasinoFavouritesSelectorLength,
  liveCasinoGameIdsSelector,
  liveCasinoPageInfoSelector,
} from "../Store/LiveCasino/Selectors/LiveCasinoSelectors";
import {
  liveGamesFavouriteByGameId,
  liveGamesFavouritesSelector,
  liveGamesFavouritesSelectorLength,
  liveGamesGameIdsSelector,
  liveGamesPageInfoSelector,
} from "../Store/LiveGames/Selectors/LiveGamesSelectors";
import { virtualFavouriteByGameId, virtualFavouritesSelector } from "../Store/Virtual/Selectors/VirtualSelectors";
import { casinoToggleFavouriteAction } from "../Store/Casino/CasinoActions";
import { liveCasinoToggleFavouriteAction } from "../Store/LiveCasino/LiveCasinoActions";
import { type TGameManagerPage } from "../Store/Games/Model/Games";
import { liveGamesToggleFavouriteAction } from "../Store/LiveGames/LiveGamesActions";
import { type TPlatformAppState } from "../Store/PlatformInitialState";

const searchGameIdsByGamePageMap: Record<TGameManagerPage, TSelector<TMixAppState, string[]>> = {
  [EGamePage.CASINO]: casinoGameIdsSelector,
  [EGamePage.LIVE_CASINO]: liveCasinoGameIdsSelector,
  [EGamePage.GAMES]: liveGamesGameIdsSelector,
};

const searchPageInfoByGamePageMap: Record<
  TGameManagerPage,
  TSelector<TMixAppState, TPageInfo_Fragment | null>
> = {
  [EGamePage.CASINO]: casinoPageInfoSelector,
  [EGamePage.LIVE_CASINO]: liveCasinoPageInfoSelector,
  [EGamePage.GAMES]: liveGamesPageInfoSelector,
};

const isEmptyGameIdsByGamePageMap: Record<
  TGameManagerPage,
  TSelector<TMixAppState, boolean>
> = {
  [EGamePage.CASINO]: createSimpleSelector([casinoGameIdsSelector], isEmpty),
  [EGamePage.LIVE_CASINO]: createSimpleSelector([liveCasinoGameIdsSelector], isEmpty),
  [EGamePage.GAMES]: createSimpleSelector([liveGamesGameIdsSelector], isEmpty),
};

const favoritesLengthByGamePageMap: Record<
  TGameManagerPage,
  TSelector<TPlatformAppState, number>
> = {
  [EGamePage.CASINO]: casinoFavouritesSelectorLength,
  [EGamePage.LIVE_CASINO]: liveCasinoFavouritesSelectorLength,
  [EGamePage.GAMES]: liveGamesFavouritesSelectorLength,
};

const favoritesByGamePageMap: Partial<Record<EGamePage, TSelector<TMixAppState, string[]>>> = {
  [EGamePage.CASINO]: casinoFavouritesSelector,
  [EGamePage.LIVE_CASINO]: liveCasinoFavouritesSelector,
  [EGamePage.GAMES]: liveGamesFavouritesSelector,
  [EGamePage.VIRTUAL]: virtualFavouritesSelector,
} satisfies Record<
  EGamePage,
  TSelector<TMixAppState, string[]>
>;

type TPathWithSearchText = TLocalizedRoutePath<`${string}/:searchText`>

const searchTextPathByGamePageMap: Record<TGameManagerPage, TPathWithSearchText> = {
  [EGamePage.CASINO]: routeMap.casinoSearchText,
  [EGamePage.LIVE_CASINO]: routeMap.liveCasinoSearchText,
  [EGamePage.GAMES]: routeMap.gamesSearchText,
};

const labelPathByGamePageMap: Record<TGameManagerPage, TLocalizedRoutePath<`${string}/:labelId`>> = {
  [EGamePage.CASINO]: routeMap.casinoLabel,
  [EGamePage.LIVE_CASINO]: routeMap.liveCasinoLabel,
  [EGamePage.GAMES]: routeMap.gamesLabel,
};

const providerPathByGamePageMap: Record<TGameManagerPage, TLocalizedRoutePath<`${string}/:provider`>> = {
  [EGamePage.CASINO]: routeMap.casinoProvider,
  [EGamePage.LIVE_CASINO]: routeMap.liveCasinoProvider,
  [EGamePage.GAMES]: routeMap.gamesProvider,
};

const searchPathByGamePageMap: Record<TGameManagerPage, TLocalizedRoutePath<string>> = {
  [EGamePage.CASINO]: routeMap.casinoSearch,
  [EGamePage.LIVE_CASINO]: routeMap.liveCasinoSearch,
  [EGamePage.GAMES]: routeMap.gamesSearch,
};

const mainPathByGamePageMap: Record<TGameManagerPage, TRoutePath> = {
  [EGamePage.CASINO]: routeMap.casino,
  [EGamePage.LIVE_CASINO]: routeMap.liveCasino,
  [EGamePage.GAMES]: routeMap.games,
};

const combineProvidersPathByGamePageMap: Record<TGameManagerPage, TRoutePath> = {
  [EGamePage.CASINO]: routeMap.casinoCombineProviders,
  [EGamePage.LIVE_CASINO]: routeMap.liveCasinoCombineProviders,
  [EGamePage.GAMES]: routeMap.gamesCombineProviders,
};

type TGameView = {
  currentSelector: TSelector<TMixAppState, string | undefined, [gameId: string]>;
  toggleFavActionCreator: (gameId: string) => TActionWithPayload<{ gameId: string; }>;
}

const gameView: Record<EGamePage, TGameView> = {
  [EGamePage.CASINO]: {
    currentSelector: casinoFavouriteByGameId,
    toggleFavActionCreator: casinoToggleFavouriteAction,
  },
  [EGamePage.LIVE_CASINO]: {
    currentSelector: liveCasinoFavouriteByGameId,
    toggleFavActionCreator: liveCasinoToggleFavouriteAction,
  },
  [EGamePage.GAMES]: {
    currentSelector: liveGamesFavouriteByGameId,
    toggleFavActionCreator: liveGamesToggleFavouriteAction,
  },
  [EGamePage.VIRTUAL]: {
    currentSelector: virtualFavouriteByGameId,
    toggleFavActionCreator: liveCasinoToggleFavouriteAction,
  },
};

export type { TGameView, TPathWithSearchText };

export {
  mainPathByGamePageMap,
  searchGameIdsByGamePageMap,
  searchPathByGamePageMap,
  searchTextPathByGamePageMap,
  labelPathByGamePageMap,
  providerPathByGamePageMap,
  searchPageInfoByGamePageMap,
  isEmptyGameIdsByGamePageMap,
  favoritesByGamePageMap,
  favoritesLengthByGamePageMap,
  gameView,
  combineProvidersPathByGamePageMap,
};
