import { getLocalStorage } from "../../../common/Store/LocalStorage/localStorageKeys";
import { platformLocalStorageKeys } from "../../../common/Store/LocalStorage/PlatformLocalStorageKeys";
import { type TCasinoState } from "../Casino/CasinoInitialState";

type TWithLiveGamesState = {
  liveGames: TCasinoState;
}

const liveGamesInitialState: TWithLiveGamesState = {
  liveGames: {
    favourites: getLocalStorage(platformLocalStorageKeys.liveGamesFavourites) || [],
    pageInfo: null,
    gameIds: [],
  },
};

export type { TWithLiveGamesState };

export { liveGamesInitialState };
