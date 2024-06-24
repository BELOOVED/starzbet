import { filter, finalize, map, retry, switchMap, tap } from "rxjs/operators";
import { EMPTY, of, timer, zip } from "rxjs";
import { type StateObservable } from "redux-observable";
import { isNil, toMaxSafeDelayInteger } from "@sb/utils";
import type { IClock } from "@sb/utils/TimeUtils/IClock";
import { isKeepAliveUpdate } from "../../Utils/IsKeepAliveUpdate";
import { type IAuthToken, type IServer, type IWithAuthState, type TAuthEpic } from "../../Types/AuthTypes";
import { pipeTokenChanged } from "../../Utils/PipeTokenChanged";
import { userActionsStream$ } from "../../Streams/UserActionStream";
import { Logger } from "../../Utils/Logger";
import { keepAliveUpdatedAction } from "../AuthActions";
import { getAccessTokenSelector, showKeepAliveExpiredSelector } from "../AuthSelectors";

// 30 min
const MAX_INACTIVITY_TIME = 1_800_000;

const RETRY_INTERVAL_WHEN_FAILED = 15_000;

const THROTTLE_TIME = 30_000;

const updateKeepAlive = (
  server: IServer,
  state$: StateObservable<IWithAuthState>,
) => server
  .refreshKeepAlive(getAccessTokenSelector(state$.value))
  .pipe(
    switchMap((token) => {
      if (!isKeepAliveUpdate(token)) {
        return EMPTY;
      }

      return of(keepAliveUpdatedAction(token));
    }),
  );

const calcKeepAliveTime = (keepAliveUntil: number, clock: IClock) => {
  const expiresIn = keepAliveUntil - clock.now();
  const isTokenExpired = expiresIn < 0;

  if (isTokenExpired) {
    return 0;
  }

  return expiresIn - Math.ceil(expiresIn * 0.1);
};

const activityTimer$ = (
  keepAliveUntil: number,
  clock: IClock,
) => timer(Math.max(toMaxSafeDelayInteger(calcKeepAliveTime(keepAliveUntil, clock)), THROTTLE_TIME));

/**
 * Used for keep user alive. When token changed we restart keep-alive loop.
 */
const keepAliveEpicFactory = (server: IServer, clock: IClock): TAuthEpic => (
  action$,
  state$,
) => {
  const startKeepAliveLoop = (token: IAuthToken) => {
    Logger.info.epic("[auth/KeepAliveEpicFactory]: Enter to startKeepAliveLoop");

    const keepAliveUntil = token.keepAliveUntil ?? clock.now();

    return zip(
      userActionsStream$(clock),
      activityTimer$(keepAliveUntil, clock),
    ).pipe(
      map(([lastActivityTime]) => lastActivityTime),
      filter(() => !showKeepAliveExpiredSelector(state$.value)),
      tap((lastActivityTime) => {
        Logger.info.epic(`[auth/KeepAliveEpicFactory]: Last activity time: ${lastActivityTime}`);
      }),
      switchMap((lastActivityTime: number) => {
        const idle = clock.now() - lastActivityTime;

        if (idle > MAX_INACTIVITY_TIME) {
          Logger.info.epic("[auth/KeepAliveEpicFactory]: Keep alive is expired");

          return EMPTY;
        }

        return updateKeepAlive(server, state$);
      }),
      finalize(() => Logger.info.epic("[auth/KeepAliveEpicFactory]: Exit from iteration")),
    );
  };

  return state$.pipe(
    pipeTokenChanged,
    switchMap((token: IAuthToken | undefined) => {
      if (isNil(token)) {
        return EMPTY;
      }

      return startKeepAliveLoop(token);
    }),
    tap({
      error: (error) => Logger.warn.epic("[auth/KeepAliveEpicFactory]: Keep-alive failed", error),
    }),
    retry({ delay: RETRY_INTERVAL_WHEN_FAILED }),
  );
};

export { keepAliveEpicFactory };
