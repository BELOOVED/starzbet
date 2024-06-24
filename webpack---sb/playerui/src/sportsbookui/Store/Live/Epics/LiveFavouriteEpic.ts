import { EMPTY, ignoreElements, of, tap } from "rxjs";
import { combineEpics } from "redux-observable";
import { isArray, isCreator, isString } from "@sb/utils";
import { getLocalStorage, localStorageKeys, setLocalStorage } from "../../../../common/Store/LocalStorage/localStorageKeys";
import { type TAppEpic } from "../../../../common/Store/Root/Epics/TAppEpic";
import { liveFavoritesFetchedAction, liveToggleFavouriteAction } from "../LiveActions";
import { liveFavoritesSelector } from "../Selectors/LiveSelectors";

const getFavouriteFromStorage = () => {
  const fav = getLocalStorage(localStorageKeys.liveFavourites);

  if (fav && isArray(fav) && fav.every(isString)) {
    return fav;
  }

  return [];
};

const updateFavoritesEpic: TAppEpic = (action$, state$) => action$.pipe(
  isCreator(liveToggleFavouriteAction),
  tap(() => {
    const favourites = liveFavoritesSelector(state$.value);

    setLocalStorage(localStorageKeys.liveFavourites, favourites);
  }),
  ignoreElements(),
);

const restoreFavouritesEpic: TAppEpic = () => {
  const favs = getFavouriteFromStorage();

  if (favs.length > 0) {
    return of(liveFavoritesFetchedAction(favs));
  }

  return EMPTY;
};

const liveFavouriteEpic = combineEpics(
  restoreFavouritesEpic,
  updateFavoritesEpic,
);

export { liveFavouriteEpic };
