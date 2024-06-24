import { type Epic } from "redux-observable";
import { catchError, distinctUntilChanged, map, switchMap } from "rxjs/operators";
import { EMPTY, type Observable, of } from "rxjs";
import { type Action } from "redux";
import { getSessionIdSelector, type IWithAuthState, loggedOutAction, loggedSelector } from "@sb/auth";
import { type TPlatformEpic } from "../../../../platformui/Store/Root/Epic/TPlatformEpic";
import { routeMap } from "../../../../sportsbookui/RouteMap/RouteMap";
import { createSubscribe } from "../../../Utils/EpicUtils/CreateSubscribe";
import {
  createConnectedByRouteEpic,
  type IDepsWithConnection,
} from "../../../Utils/EpicUtils/CreateConnectedByRouteEpic";
import { Logger } from "../../../Utils/Logger";

type TSessionClosedConnectedEpic = Epic<Action, Action, IWithAuthState, IDepsWithConnection>;

const closedEpic: TSessionClosedConnectedEpic = (action$, state$, dependencies) => {
  const sessionId = getSessionIdSelector(state$.value);

  return createSubscribe(
    `sumstats.platform.player.event.session_closed.${sessionId}`,
    () => () => {
      if (!loggedSelector(state$.value)) {
        return EMPTY;
      }

      return of(loggedOutAction());
    },
  )(action$, state$, dependencies);
};

const sessionClosedConnectedEpic: TPlatformEpic = (action$, state$, dependencies) => state$.pipe(
  map(loggedSelector),
  distinctUntilChanged(),
  switchMap<boolean, Observable<Action>>((logged) => {
    if (!logged) {
      return EMPTY;
    }

    return createConnectedByRouteEpic([routeMap.any], closedEpic)(action$, state$, dependencies);
  }),
  catchError((error) => {
    Logger.warn.epic("Fail sessionClosedEpic:", error);

    return EMPTY;
  }),
);

export { sessionClosedConnectedEpic };
