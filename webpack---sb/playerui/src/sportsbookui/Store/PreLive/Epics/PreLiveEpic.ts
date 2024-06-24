import { EMPTY, filter, ignoreElements, of, tap } from "rxjs";
import { map } from "rxjs/operators";
import { combineEpics } from "redux-observable";
import { routerEpic, routerLocationPathnameSelector } from "@sb/router";
import { matchPath } from "@sb/react-router-compat";
import { isArray, isCreator, isNotNil, isString } from "@sb/utils";
import { getMatch } from "../../../../common/Utils/RouterUtils/GetMatch";
import { getLocalStorage, localStorageKeys, setLocalStorage } from "../../../../common/Store/LocalStorage/localStorageKeys";
import { pushLocalized } from "../../../../common/Client/Core/Services/RouterService/Utils/LocationChangeLocalized";
import { type TAppEpic } from "../../../../common/Store/Root/Epics/TAppEpic";
import { routeMap } from "../../../RouteMap/RouteMap";
import { localeSelector } from "../../Locale/LocaleSelector";
import {
  preLiveFavoritesFetchedAction,
  preLiveToggleFavouriteAction,
  resetPreLiveCustomAction,
  setPreLiveCustomAction,
} from "../PreLiveActions";
import { preLiveFavouritesSelector } from "../Selectors/PreLiveSelectors";

const customMatch = { path: [routeMap.preLive.custom, routeMap.esport.preLive.custom] };

const getFavouriteFromStorage = () => {
  const fav = getLocalStorage(localStorageKeys.preLiveFavourites);

  if (fav && isArray(fav) && fav.every(isString)) {
    return fav;
  }

  return [];
};

const resetEpic = () => of(resetPreLiveCustomAction());

const resetCustomEpic = routerEpic({
  name: "resetCustom",
  match: getMatch([routeMap.preLive.custom, routeMap.esport.preLive.custom]),
  onStart: () => resetEpic,
});

// FIXME @DECORATOR

const setPreLiveCustomEpic: TAppEpic = (action$, state$) => action$.pipe(
  isCreator(setPreLiveCustomAction),
  map(() => routerLocationPathnameSelector(state$.value)),
  filter((pathname) => isNotNil(matchPath(pathname, customMatch))),
  map((pathname) => {
    const path = matchPath(pathname, { path: routeMap.esport.root })
      ? routeMap.esport.preLive.custom
      : routeMap.preLive.custom;

    const locale = localeSelector(state$.value);

    return pushLocalized(locale, path);
  }),
);

const restoreFavouritesEpic: TAppEpic = () => {
  const favs = getFavouriteFromStorage();

  if (favs.length > 0) {
    return of(preLiveFavoritesFetchedAction(favs));
  }

  return EMPTY;
};

const updateFavouritesEpic: TAppEpic = (action$, state$) => action$.pipe(
  isCreator(preLiveToggleFavouriteAction),
  tap(() => {
    const favourites = preLiveFavouritesSelector(state$.value);

    setLocalStorage(localStorageKeys.preLiveFavourites, favourites);
  }),
  ignoreElements(),
);

const preLiveEpic = combineEpics(
  restoreFavouritesEpic,
  updateFavouritesEpic,
  setPreLiveCustomEpic,
  resetCustomEpic,
);

export { preLiveEpic };
