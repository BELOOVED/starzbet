import { ignoreElements, tap } from "rxjs";
import { combineEpics } from "redux-observable";
import { isCreator } from "@sb/utils";
import { localStorageKeys, setLocalStorage } from "../../../../common/Store/LocalStorage/localStorageKeys";
import { type TAppEpic } from "../../../../common/Store/Root/Epics/TAppEpic";
import { toggleFavouriteEventIdAction, toggleFavouriteTournamentIdAction } from "../FavouritesActions";
import { favouritesSelector } from "../Selectors/FavouritesSelectors";
import { favouritesRestoreFromStorageEpic } from "./FavouritesRestoreFromStorageEpic";

const saveFavouritesEpic: TAppEpic = (action$, state$) => action$.pipe(
  isCreator(toggleFavouriteEventIdAction, toggleFavouriteTournamentIdAction),
  tap(() => {
    const favourites = favouritesSelector(state$.value);

    setLocalStorage(localStorageKeys.favourites, favourites);
  }),
  ignoreElements(),
);

const favouritesRootEpic = combineEpics(
  saveFavouritesEpic,
  favouritesRestoreFromStorageEpic,
);

export { favouritesRootEpic };
