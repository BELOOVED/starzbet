import { concat, merge, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { isNil } from "@sb/utils";
import type { IClock } from "@sb/utils/TimeUtils/IClock";
import { isImpersonatedToken } from "../../Utils/IsImpersonatedToken";
import { type IServer, type IStorage, type TAuthEpic } from "../../Types/AuthTypes";
import { assertIsAuthToken } from "../../Utils/IsAuthToken";
import { Logger } from "../../Utils/Logger";
import { recoveryFinishedAction, refreshFailedAction, startRefreshedAction } from "../AuthActions";
import { whenTabIsLeaderEpic } from "./TabStatusWatcherFactory";

const MIN_ALLOWED_TOKEN_EXPIRATION_TIME = 30 * 1000;

/**
 * This epic is responsible for token recovery in the authentication flow.
 *
 * It checks if a valid token exists in the storage and whether it needs to be refreshed.
 * If a valid token is found, it returns an action indicating successful recovery.
 * If the token is about to expire, it attempts to refresh it.
 * If no valid token is found or an error occurs during the refresh, it returns an action indicating recovery failure.
 *
 * @param {IServer} server - The server instance used to refresh the token.
 * @param {IStorage} storage - The storage instance used to find the token.
 * @param {IClock} clock - An entity with a method that returns the number of milliseconds elapsed since the epoch.
 * @returns {TAuthEpic} An epic function.
 */
const tokenRecoveryEpicFactory = (
  server: IServer,
  storage: IStorage,
  clock: IClock,
): TAuthEpic => (action$, state$, deps) => {
  const token = storage.findToken();

  if (isNil(token)) {
    Logger.info.epic("[TokenRecoveryEpicFactory] => Token not founded");

    return of(recoveryFinishedAction(undefined));
  }

  if (isImpersonatedToken(token)) {
    Logger.info.epic("[TokenRecoveryEpicFactory] => Recovered as impersonated token");

    return of(recoveryFinishedAction(token));
  }

  const isAccessTokenWillBeExpiredSoon = token.accessTokenExpiresIn - clock.now() < MIN_ALLOWED_TOKEN_EXPIRATION_TIME;

  if (!isAccessTokenWillBeExpiredSoon) {
    Logger.info.epic("[TokenRecoveryEpicFactory] => Token hasn't expired yet");

    storage.removeToken();

    return of(recoveryFinishedAction(token));
  }

  const isRefreshTokenWillBeExpiredSoon = token.refreshTokenExpiresIn - clock.now() < MIN_ALLOWED_TOKEN_EXPIRATION_TIME;

  if (isRefreshTokenWillBeExpiredSoon) {
    Logger.info.epic("[TokenRecoveryEpicFactory] => Token has been expired");

    storage.removeToken();

    return of(recoveryFinishedAction(undefined));
  }

  return whenTabIsLeaderEpic(
    () => concat(
      of(startRefreshedAction()),
      server.refreshToken(token.refreshToken).pipe(
        map((newToken) => {
          assertIsAuthToken(newToken);

          Logger.info.epic("[recoveryFromStorage] Token recovered.");

          return recoveryFinishedAction(newToken);
        }),
        catchError((error) => {
          Logger.error.epic("[recoveryFromStorage] Error occurred when call `server.refreshToken`.", error);

          storage.removeToken();

          return merge(
            of(refreshFailedAction()),
            of(recoveryFinishedAction(undefined)),
          );
        }),
      ),
    ),
  )(action$, state$, deps);
};
export { tokenRecoveryEpicFactory };
