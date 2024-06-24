import { EMPTY, of, switchMap } from "rxjs";
import { isNil } from "@sb/utils";
import { waitUntil } from "../../../../common/Utils/EpicUtils/WaitUntil";
import { getLocalStorage, localStorageKeys, setLocalStorage } from "../../../../common/Store/LocalStorage/localStorageKeys";
import { type TAppEpic } from "../../../../common/Store/Root/Epics/TAppEpic";
import { erisLineIsReadySelector, eventsSelector, tournamentsSelector } from "../../Feed/Selectors/FeedSelectors";
import { restoreFavouritesAction } from "../FavouritesActions";
import { type IFavourites } from "../FavouritesState";

const favouritesRestoreFromStorageEpic: TAppEpic = (action$, state$) => state$.pipe(
  waitUntil(erisLineIsReadySelector),
  switchMap(() => {
    const favourites: IFavourites = getLocalStorage(localStorageKeys.favourites);
    if (isNil(favourites)) {
      return EMPTY;
    }

    const event = eventsSelector(state$.value);

    if (Object.keys(event).length === 0) {
      return EMPTY;
    }

    const eventMap = eventsSelector(state$.value);
    const tournamentMap = tournamentsSelector(state$.value);

    const events = (favourites.events || []).filter((eventId) => eventMap[eventId]);
    const tournaments = (favourites.tournaments || []).filter((tournamentId) => tournamentMap[tournamentId]);

    const newFavourites = { events, tournaments };

    setLocalStorage(localStorageKeys.favourites, newFavourites);

    return of(restoreFavouritesAction(newFavourites));
  }),
);

export { favouritesRestoreFromStorageEpic };
