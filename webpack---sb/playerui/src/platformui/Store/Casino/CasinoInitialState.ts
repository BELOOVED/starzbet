import { type TPageInfo_Fragment } from "@sb/graphql-client";
import { getLocalStorage } from "../../../common/Store/LocalStorage/localStorageKeys";
import { platformLocalStorageKeys } from "../../../common/Store/LocalStorage/PlatformLocalStorageKeys";

type TCasinoState = {
  favourites: string[];
  gameIds: string[];
  pageInfo: TPageInfo_Fragment | null;
  isWithDga?: boolean;
}

type TWithCasinoState = {
  casino: TCasinoState;
}

const casinoInitialState: TWithCasinoState = {
  casino: {
    favourites: getLocalStorage(platformLocalStorageKeys.casinoFavourites) || [],
    gameIds: [],
    pageInfo: null,
  },
};

export type { TCasinoState, TWithCasinoState };

export { casinoInitialState };
