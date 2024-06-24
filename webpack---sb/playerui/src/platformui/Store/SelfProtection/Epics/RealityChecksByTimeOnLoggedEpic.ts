import { delay, EMPTY, of, switchMap, takeUntil } from "rxjs";
import { combineEpics } from "redux-observable";
import { isCreator, toMaxSafeDelayInteger } from "@sb/utils";
import { EPlatform_SelfProtectionBagKind, EPlatform_SelfProtectionBagType } from "@sb/graphql-client";
import type { TPlatform_RealityCheckByTimeBag_Fragment } from "@sb/graphql-client/PlayerUI";
import { getLocalStorage, setLocalStorage } from "../../../../common/Store/LocalStorage/localStorageKeys";
import { platformLocalStorageKeys } from "../../../../common/Store/LocalStorage/PlatformLocalStorageKeys";
import { secToMs } from "../../../Utils/SecToMs";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { currentBagSelector } from "../Selectors/SelfProtectionSelectors";
import { realityChecksTimeExpiredAction, setRealityChecksTimerAction } from "../SelfProtectionActions";

const startTimerEpic: TPlatformEpic = (action$, state$) => {
  const bag = currentBagSelector<TPlatform_RealityCheckByTimeBag_Fragment>(
    state$.value,
    EPlatform_SelfProtectionBagType.realityCheckByTimeBag,
  );

  if (!bag || bag.payloadKind === EPlatform_SelfProtectionBagKind.noLimitKind) {
    return EMPTY;
  }

  let lastTime = getLocalStorage(platformLocalStorageKeys.lastRealityCheckTime);

  if (!lastTime) {
    lastTime = Date.now();
    setLocalStorage(platformLocalStorageKeys.lastRealityCheckTime, lastTime);
  }

  const expiredAt = Number(lastTime) + secToMs(bag.period);

  const timeout = (expiredAt - Date.now()) || secToMs(bag.period);

  return of(realityChecksTimeExpiredAction()).pipe(
    delay(toMaxSafeDelayInteger(timeout)),
    takeUntil(
      action$
        .pipe(
          isCreator(
            setRealityChecksTimerAction,
          ),
        ),
    ),
  );
};

const firstEpic: TPlatformEpic = (
  action$,
  state$,
  deps,
) => startTimerEpic(action$, state$, deps)
  .pipe(
    takeUntil(
      action$
        .pipe(
          isCreator(
            setRealityChecksTimerAction,
          ),
        ),
    ),
  );

const watcherEpic: TPlatformEpic = (
  action$,
  state$,
  deps,
) => action$.pipe(
  isCreator(setRealityChecksTimerAction),
  switchMap(() => {
    localStorage.removeItem(platformLocalStorageKeys.lastRealityCheckTime);

    return startTimerEpic(action$, state$, deps);
  }),
);

const realityChecksByTimeOnLoggedEpic: TPlatformEpic = combineEpics(
  firstEpic,
  watcherEpic,
);

export { realityChecksByTimeOnLoggedEpic };
