import { type Location, matchPath } from "@sb/react-router-compat";
import { routeMap } from "../../../RouteMap/RouteMap";

const SPORT_ROUTES = [
  routeMap.preLive.root,
  routeMap.esport.preLive.root,
  routeMap.live.root,
  routeMap.esport.live.root,
  routeMap.tournament,
];

const couponsMatchOptions = {
  path: [routeMap.preLive.coupons, routeMap.esport.preLive.coupons],
  exact: true,
};

const selectionMatchOptions = {
  path: [routeMap.preLive.selection, routeMap.esport.preLive.selection],
  exact: true,
};

const sportMatchOptions = { path: [routeMap.preLive.sport, routeMap.esport.preLive.category], exact: true };

const eSportMatchOptions = { path: routeMap.esport.preLive.root };

const liveOptions = { path: [routeMap.live.root, routeMap.esport.live.root] };

const getSelectionMatch = (location: Location) => {
  if (matchPath(location.pathname, sportMatchOptions)) {
    return null;
  }

  return matchPath(location.pathname, selectionMatchOptions);
};

export {
  SPORT_ROUTES,
  couponsMatchOptions,
  eSportMatchOptions,
  getSelectionMatch,
  liveOptions,
};
