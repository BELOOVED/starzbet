import { EMPTY, zip } from "rxjs";
import { distinctUntilChanged, map, switchMap } from "rxjs/operators";
import { deepEqual } from "fast-equals";
import { awaitRecoverySelector, loggedSelector } from "@sb/auth";
import { type TMixAppEpic } from "../../Store/Root/Epics/TMixAppEpic";
import { noopEpic } from "./NoopEpic";

const dependLoggedConditionEpic = (epicOnLogged = noopEpic, epicOnNotWillBeLogged = noopEpic): TMixAppEpic =>
  (action$, state$, dependencies) => zip(
    state$.pipe(map(loggedSelector)),
    state$.pipe(map(awaitRecoverySelector)),
  ).pipe(
    distinctUntilChanged(deepEqual),
    switchMap(([logged, awaitRecovery]) => {
      if (logged) {
        return epicOnLogged(action$, state$, dependencies);
      }

      return awaitRecovery ? EMPTY : epicOnNotWillBeLogged(action$, state$, dependencies);
    }),
  );

export { dependLoggedConditionEpic };
