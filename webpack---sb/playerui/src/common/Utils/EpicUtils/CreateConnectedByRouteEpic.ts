import { type Epic } from "redux-observable";
import { distinctUntilChanged, map, shareReplay } from "rxjs/operators";
import { defer, EMPTY, merge, type Observable, Subject, switchMap, tap } from "rxjs";
import { type Action } from "redux";
import { matchPath, type TRouteProps } from "@sb/react-router-compat";
import { type IWebsocketConnection } from "@sb/network-bus/Websocket";
import { type IWithRouterState, routerLocationPathnameSelector } from "@sb/router";
import { type TExplicitAny } from "@sb/utils";
import { websocketConnectionFactory, websocketUrlResolver } from "@sb/websocket-connection";
import { uiWebsocketUrl } from "../../Urls";
import { noopEpic } from "./NoopEpic";

interface IDepsWithConnection {
  connection: IWebsocketConnection;
  connectionRestartNumber: number;
}

let cachedObservable$: Observable<IWebsocketConnection>;

let connectionRestartNumber = -1;

const stopies = new Subject();

const createConnection = () => websocketConnectionFactory({
  socketUrl: websocketUrlResolver({
    baseUrl: uiWebsocketUrl,
    prefix: "pui",
  }),
  onStop: () => stopies.next(Date.now()),
  onRetry: () => stopies.next(Date.now()),
});

const getOrCreate = defer(() => {
  if (cachedObservable$) {
    return cachedObservable$;
  }

  cachedObservable$ = createConnection().pipe(
    tap(() => {
      connectionRestartNumber++;
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  return cachedObservable$;
});

const createConnectedEpic = <E extends Epic<Action, Action, S, D & IDepsWithConnection>, S = TExplicitAny, D = unknown>(
  epic: E,
  onStop: Epic = noopEpic,
  onRestart: Epic = noopEpic,
): Epic<Action, Action, S, D> => (
    action$,
    state$,
    dependencies,
  ) => (
    merge(
      getOrCreate.pipe(
        switchMap((connection) => merge(
          epic(action$, state$, { ...dependencies, connection, connectionRestartNumber }),
          connectionRestartNumber === 0 ? EMPTY : onRestart(action$, state$, dependencies),
        )),
      ),
      stopies.pipe(
        switchMap(() => onStop(action$, state$, dependencies)),
      ),
    )
  );

const createConnectedByRouteEpic = <E extends Epic<Action, Action, S, D & IDepsWithConnection>, S = TExplicitAny, D = unknown>(
  paths: (string | TRouteProps)[],
  epic: E,
  onStop: Epic = noopEpic,
  onRestart?: Epic,
): Epic<Action, Action, S & IWithRouterState, D> => (action$, state$, dependencies) => (
    state$.pipe(
      map(routerLocationPathnameSelector),
      map((pathname) => paths.some((path) => !!matchPath(pathname, path))),
      distinctUntilChanged(),
      switchMap((matched) => {
        if (!matched) {
          return onStop(action$, state$, dependencies);
        }

        return createConnectedEpic<E, S, D>(epic, undefined, onRestart)(action$, state$, dependencies);
      }),
    )
  );

export { createConnectedByRouteEpic, createConnectedEpic };
export type { IDepsWithConnection };
