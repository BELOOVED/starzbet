import { routeMap } from "./RouteMap";

const ERIS_ROUTES = [
  routeMap.share,
  routeMap.statistics.root,
  routeMap.preLive.root,
  routeMap.live.root,
  routeMap.search.root,
  routeMap.betSlip,
  routeMap.esport.root,
  routeMap.tournament,
  routeMap.category,
  routeMap.sport,
];

const KIRON_ROUTES = [
  routeMap.virtual.root,
  routeMap.betSlip,
];

const SPORTSBOOK_ROUTES = [
  ...ERIS_ROUTES,
  ...KIRON_ROUTES,
];

export { ERIS_ROUTES, KIRON_ROUTES, SPORTSBOOK_ROUTES };
