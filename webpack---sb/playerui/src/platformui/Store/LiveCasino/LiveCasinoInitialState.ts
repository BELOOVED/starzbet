import { getLocalStorage } from "../../../common/Store/LocalStorage/localStorageKeys";
import { platformLocalStorageKeys } from "../../../common/Store/LocalStorage/PlatformLocalStorageKeys";
import { type TCasinoState } from "../Casino/CasinoInitialState";

type TWithLiveCasinoState = {
  liveCasino: TCasinoState;
}

const liveCasinoInitialState: TWithLiveCasinoState = {
  liveCasino: {
    favourites: getLocalStorage(platformLocalStorageKeys.liveCasinoFavourites) || [],
    pageInfo: null,
    gameIds: [],
  },
};

export type { TWithLiveCasinoState };

export { liveCasinoInitialState };
