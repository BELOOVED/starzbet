import type { TPlatform_Game_Fragment } from "@sb/graphql-client/PlayerUI";
import { type EPlatform_GameGridType } from "@sb/graphql-client";
import { EGamePage } from "@sb/betting-core/EGamePage";
import { isNotNil, type TNil } from "@sb/utils";
import { getLocalStorage } from "../../../common/Store/LocalStorage/localStorageKeys";
import { type TGameProviderEnum } from "../../../common/Store/Provider/ProviderModel";
import { platformLocalStorageKeys } from "../../../common/Store/LocalStorage/PlatformLocalStorageKeys";
import { type TWithIsServerLoaded } from "../../../common/IWith";
import { type EExternalGameId, type IGamePage, type IGamesWithPageInfo } from "./GamesModels";
import { type TGameManagerPage } from "./Model/Games";
import { getInitialGridType } from "./GetInitialGridType";

type TShuffleGame = TNil | string | false;

interface IGamesPreloadedState {
  gridType: EPlatform_GameGridType;
  gamePages: {
    nodes: IGamePage[];
  };
  /**
   * for (live)casino/label/:labelId & (live)casino/provider/all
   */
  pageLabelToGamesMap: Record<EGamePage, Record<string, IGamesWithPageInfo>>;
  /**
   * for (live)casino/provider/:provider
   */
  pageProviderToGamesMap: Record<EGamePage, Partial<Record<TGameProviderEnum, IGamesWithPageInfo>>>;

  pageCombineProvidersToGamesMap: Record<EGamePage, {
    games?: IGamesWithPageInfo;
    providers: TGameProviderEnum[];
  }>;
  /**
   * storage for all games, smt like orm
   */
  games: TPlatform_Game_Fragment[];
  height?: string; // ??
  externalGameIdToGameUrlMap: Partial<Record<EExternalGameId, string>>;
  shuffleGame: Record<TGameManagerPage, TShuffleGame>;
  recentlyGames: string[];
  online: Record<string, number> | null;
}

type TGamesState = TWithIsServerLoaded<IGamesPreloadedState, "gamePages">

type TWithGamesState = {
  games: TGamesState;
}

type TWithGamesPreloadedState = {
  games: Partial<IGamesPreloadedState>;
}

const initialProviders = getLocalStorage(platformLocalStorageKeys.combineProviders);

const getInitialProviders = (page: EGamePage) => ({ providers: initialProviders?.[page] as TGameProviderEnum[] ?? [] });

const getGamesInitialState = (preloadedState: TWithGamesPreloadedState["games"] = {}, isMobile: boolean): TWithGamesState => ({
  games: {
    gridType: getInitialGridType(isMobile),
    gamePages: {
      nodes: preloadedState.gamePages?.nodes ?? [],
      isServerLoaded: isNotNil(preloadedState.gamePages),
    },
    pageLabelToGamesMap: {
      [EGamePage.CASINO]: {},
      [EGamePage.LIVE_CASINO]: {},
      [EGamePage.GAMES]: {},
      [EGamePage.VIRTUAL]: {},
    },
    pageProviderToGamesMap: {
      [EGamePage.CASINO]: {},
      [EGamePage.LIVE_CASINO]: {},
      [EGamePage.GAMES]: {},
      [EGamePage.VIRTUAL]: {},
    },
    games: [],
    externalGameIdToGameUrlMap: {},
    pageCombineProvidersToGamesMap: {
      [EGamePage.CASINO]: getInitialProviders(EGamePage.CASINO),
      [EGamePage.LIVE_CASINO]: getInitialProviders(EGamePage.LIVE_CASINO),
      [EGamePage.GAMES]: getInitialProviders(EGamePage.GAMES),
      [EGamePage.VIRTUAL]: getInitialProviders(EGamePage.VIRTUAL),
    },
    shuffleGame: {
      [EGamePage.CASINO]: null,
      [EGamePage.LIVE_CASINO]: null,
      [EGamePage.GAMES]: null,
    },
    recentlyGames: [],
    online: null,
  },
});

export type { TWithGamesPreloadedState, TGamesState, TWithGamesState };

export { getGamesInitialState };
