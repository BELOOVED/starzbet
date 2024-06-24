import { combineEpics } from "redux-observable";
import { type Action, type ActionCreator } from "redux";
import { ignoreElements, tap } from "rxjs";
import { isCreator, type TSelector } from "@sb/utils";
import { setLocalStorage } from "../../../../common/Store/LocalStorage/localStorageKeys";
import { platformLocalStorageKeys } from "../../../../common/Store/LocalStorage/PlatformLocalStorageKeys";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { casinoToggleFavouriteAction } from "../../Casino/CasinoActions";
import { casinoFavouritesSelector } from "../../Casino/Selectors/CasinoSelectors";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { virtualFavouritesSelector } from "../../Virtual/Selectors/VirtualSelectors";
import { virtualToggleFavouriteAction } from "../../Virtual/VirtualActions";
import { liveGamesFavouritesSelector } from "../../LiveGames/Selectors/LiveGamesSelectors";
import { liveGamesToggleFavouriteAction } from "../../LiveGames/LiveGamesActions";
import { liveCasinoFavouritesSelector } from "../../LiveCasino/Selectors/LiveCasinoSelectors";
import { liveCasinoToggleFavouriteAction } from "../../LiveCasino/LiveCasinoActions";

const updateFavouritesEpicFactory = (
  toggleAction: ActionCreator<Action>,
  favouritesSelector: TSelector<TPlatformAppState, string[]>,
  localStorageKey: string,
): TPlatformEpic => (action$, state$) => action$.pipe(
  isCreator(toggleAction),
  tap(() => {
    const favourites = favouritesSelector(state$.value);

    setLocalStorage(localStorageKey, favourites);
  }),
  ignoreElements(),
);

const gameManagerUpdateFavouritesEpic = combineEpics(
  updateFavouritesEpicFactory(casinoToggleFavouriteAction, casinoFavouritesSelector, platformLocalStorageKeys.casinoFavourites),
  updateFavouritesEpicFactory(virtualToggleFavouriteAction, virtualFavouritesSelector, platformLocalStorageKeys.virtualFavourites),
  updateFavouritesEpicFactory(liveGamesToggleFavouriteAction, liveGamesFavouritesSelector, platformLocalStorageKeys.liveGamesFavourites),
  updateFavouritesEpicFactory(liveCasinoToggleFavouriteAction, liveCasinoFavouritesSelector, platformLocalStorageKeys.liveCasinoFavourites),
);

export { gameManagerUpdateFavouritesEpic };
