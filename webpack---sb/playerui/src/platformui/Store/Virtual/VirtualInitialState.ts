import { getLocalStorage } from "../../../common/Store/LocalStorage/localStorageKeys";
import { platformLocalStorageKeys } from "../../../common/Store/LocalStorage/PlatformLocalStorageKeys";
import { type TCasinoState } from "../Casino/CasinoInitialState";

type TWithVirtualState = {
  virtual: TCasinoState;
}
const virtualInitialState: TWithVirtualState = {
  virtual: {
    favourites: getLocalStorage(platformLocalStorageKeys.virtualFavourites) || [],
    pageInfo: null,
    gameIds: [],
  },
};

export type {
  TWithVirtualState,
};

export { virtualInitialState };
