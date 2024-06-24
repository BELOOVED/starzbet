import { filter, ignoreElements, map, switchMap, tap } from "rxjs/operators";
import { combineEpics } from "redux-observable";
import { of } from "rxjs";
import { isNil } from "@sb/utils";
import { type IAuthToken, type IStorage, type TAuthEpic } from "../../Types/AuthTypes";
import { pipeTokenChanged } from "../../Utils/PipeTokenChanged";
import { storage$ } from "../../Streams/StorageStream";
import { assertIsAuthToken } from "../../Utils/IsAuthToken";
import { awaitRecoverySelector } from "../AuthSelectors";
import { loggedOutAction, tokenRefreshedAction } from "../AuthActions";

/**
 * This epic subscribes on store token changes.
 * If token was updated - rewrite it to storage (LocalStorage).
 * If token was removed (Logout) - remove it from storage.
 * @param storage - interface that provides storage methods.
 * As storage can be use (LocalStorage, SessionStorage, etc...)
 */
const writeToStorageEpicFactory = (storage: IStorage): TAuthEpic => (
  action$,
  state$,
) => state$.pipe(
  pipeTokenChanged,
  /**
   * To prevent token removing from storage on init we need to await token recovery.
   */
  filter(() => !awaitRecoverySelector(state$.value)),
  tap((token: IAuthToken | undefined) => {
    if (isNil(token)) {
      return storage.removeToken();
    }

    return storage.addToken(token);
  }),
  ignoreElements(),
);

const updateTokenFromStorageEpicFactory = (storage: IStorage): TAuthEpic => () => storage$.pipe(
  filter((event) => {
    if (event.key === null) {
      return false;
    }

    return storage.isTokenKey(event.key);
  }),
  map(() => storage.findToken()),
  switchMap((newToken) => {
    if (isNil(newToken)) {
      return of(loggedOutAction());
    }

    assertIsAuthToken(newToken);

    return of(tokenRefreshedAction(newToken));
  }),
);

const syncWithStorageEpicFactory = (storage: IStorage): TAuthEpic => combineEpics(
  writeToStorageEpicFactory(storage),
  updateTokenFromStorageEpicFactory(storage),
);

export { syncWithStorageEpicFactory };
