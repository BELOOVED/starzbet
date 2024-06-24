import { combineEpics } from "redux-observable";
import { distinctUntilChanged, ignoreElements, map, switchMap, tap } from "rxjs/operators";
import { EMPTY, fromEvent, of } from "rxjs";
import { EEventType, type TMessageEvent } from "@sb/tabs-manager";
import { type TAuthEpic } from "../../Types/AuthTypes";
import { refreshFailedSelector, startRefreshSelector } from "../AuthSelectors";
import { authTabsManager, ERefreshStatus, type IRefreshMessage } from "../AuthTabsManager";
import { refreshFailedAction, startRefreshedAction } from "../AuthActions";
import { whenTabIsFollowerEpic, whenTabIsLeaderEpic } from "./TabStatusWatcherFactory";

const createRefreshStatusMessage = (status: ERefreshStatus) => ({
  type: "@@AUTH/REFRESH_STATUS",
  payload: { status },
});

const refreshStatus$ = fromEvent<TMessageEvent<IRefreshMessage>>(authTabsManager, EEventType.message);

const publishRefreshStatusEpic: TAuthEpic = (action$, state$) => (
  state$.pipe(
    map(startRefreshSelector),
    distinctUntilChanged(),
    tap((start) => {
      const failed = refreshFailedSelector(state$.value);

      if(!failed && !start){
        return;
      }

      const status = failed ? ERefreshStatus.failed : ERefreshStatus.started;

      authTabsManager.postMessage(createRefreshStatusMessage(status));
    }),
    ignoreElements(),
  )
);

const subscribeToRefreshStatusEpic: TAuthEpic = () => (
  refreshStatus$.pipe(
    switchMap(({ message }) => {
      const status = message.payload.status;

      switch (status) {
        case ERefreshStatus.started: {
          return of(startRefreshedAction());
        }

        case ERefreshStatus.failed: {
          return of(refreshFailedAction());
        }

        default: {
          return EMPTY;
        }
      }
    }),
  )
);

const syncRefreshStatusEpic: TAuthEpic = combineEpics(
  whenTabIsLeaderEpic(publishRefreshStatusEpic),
  whenTabIsFollowerEpic(subscribeToRefreshStatusEpic),
);

export { syncRefreshStatusEpic };
