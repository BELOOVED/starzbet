import { catchError, filter, first, map, repeat, switchMap } from "rxjs/operators";
import { concat, EMPTY, interval, merge, of, race, timer } from "rxjs";
import { isCreator, isNil } from "@sb/utils";
import type { IClock } from "@sb/utils/TimeUtils/IClock";
import { type IServer, type TAuthEpic } from "../../Types/AuthTypes";
import { pipeTokenChanged } from "../../Utils/PipeTokenChanged";
import { assertIsAuthToken } from "../../Utils/IsAuthToken";
import { isImpersonatedToken } from "../../Utils/IsImpersonatedToken";
import { Logger } from "../../Utils/Logger";
import {
  loggedOutAction,
  refreshFailedAction,
  requestRefreshTokenAction,
  startRefreshedAction,
  tokenRefreshedAction,
} from "../AuthActions";
import { getRefreshTokenSelector } from "../AuthSelectors";

const MIN_ALLOWED_TOKEN_EXPIRATION_TIME = 40 * 1000;

const MAX_TOKEN_EXPIRATION_TIME = 5 * 60 * 60 * 1000; // 5 hours

const THROTTLE_TIME = 30_000;

const refreshTokenEpicFactory = (server: IServer, clock: IClock): TAuthEpic => (
  action$,
  state$,
) => state$.pipe(
  pipeTokenChanged,
  switchMap((token) => {
    if (isNil(token) || isImpersonatedToken(token)) {
      return EMPTY;
    }

    assertIsAuthToken(token);

    let lastTime = clock.now();

    const val = token.accessTokenExpiresIn - clock.now() - MIN_ALLOWED_TOKEN_EXPIRATION_TIME;

    return race(
      action$.pipe(isCreator(requestRefreshTokenAction)),
      timer(Math.min(Math.max(val, THROTTLE_TIME), MAX_TOKEN_EXPIRATION_TIME)),
      interval(2000)
        .pipe(
          filter(() => {
            const currentTime = clock.now();
            const shouldTrigger = currentTime > (lastTime + (2000 * 2)); // ignore small delays
            lastTime = currentTime;

            return shouldTrigger && token.accessTokenExpiresIn - clock.now() < MIN_ALLOWED_TOKEN_EXPIRATION_TIME; // Probably just woke up
          }),
        ),
    ).pipe(
      first(),
      switchMap(() => concat(
        of(startRefreshedAction()),
        timer(1_000).pipe(
          switchMap(() => server.refreshToken(getRefreshTokenSelector(state$.value)).pipe(
            map((newToken) => {
              assertIsAuthToken(newToken);

              return tokenRefreshedAction(newToken);
            }),
          )),
        ),
      )),
    );
  }),
  catchError((error) => {
    Logger.error.epic("[refreshToken] refreshToken failed, server error.", error);

    return merge(
      of(loggedOutAction()),
      of(refreshFailedAction()),
    );
  }),
  repeat(),
);

export { refreshTokenEpicFactory };
