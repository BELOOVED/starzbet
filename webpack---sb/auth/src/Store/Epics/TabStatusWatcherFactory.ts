import { distinctUntilChanged, map, startWith, switchMap } from "rxjs/operators";
import { EMPTY, fromEvent } from "rxjs";
import { ETabStatus, EEventType, type TStatusChangeEvent } from "@sb/tabs-manager";
import { type TAuthEpic } from "../../Types/AuthTypes";
import { authTabsManager } from "../AuthTabsManager";

const statusChange$ = fromEvent<TStatusChangeEvent>(authTabsManager, EEventType.statusChange);

const tabStatusWatcherFactory = (status: ETabStatus) => (epic: TAuthEpic): TAuthEpic => (action$, state$, deps) => (
  statusChange$.pipe(
    map((event) => event.status),
    distinctUntilChanged(),
    startWith(authTabsManager.status),
    map((currentStatus) => currentStatus === status),
    switchMap((leader) => {
      if (!leader) {
        return EMPTY;
      }

      return epic(action$, state$, deps);
    }),
  )
);

const whenTabIsLeaderEpic = tabStatusWatcherFactory(ETabStatus.leader);

const whenTabIsFollowerEpic = tabStatusWatcherFactory(ETabStatus.follower);

export { whenTabIsLeaderEpic, whenTabIsFollowerEpic };
