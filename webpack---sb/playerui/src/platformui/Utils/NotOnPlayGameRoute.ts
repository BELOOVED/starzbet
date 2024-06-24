import { filter, map, switchMap } from "rxjs/operators";
import { combineEpics, type Epic } from "redux-observable";
import { take } from "rxjs";
import { type Action } from "redux";
import { type IWithRouterState, routerLocationPathnameSelector } from "@sb/router";
import { matchPath } from "@sb/react-router-compat";
import { routeMap } from "../RouteMap/RouteMap";

const playGameRoutes = [
  routeMap.play,
  routeMap.playDemo,
];

const notOnPlayGameRoute = <D>(...epics: Epic<Action, Action>[]): Epic<Action, Action, IWithRouterState, D> => (
  (action$, state$, deps: D) => (
    state$.pipe(
      map(routerLocationPathnameSelector),
      take(1), // should start(or not) these epics just once
      filter((pathname) => !playGameRoutes.some((path) => matchPath(pathname, { path, exact: true }))),
      switchMap(() => combineEpics(...epics)(action$, state$, deps)),
    )
  )
);

export { notOnPlayGameRoute };
