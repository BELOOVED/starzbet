import { routeMap } from "../../platformui/RouteMap/RouteMap";
import { sportsBookRoutes } from "../../platformui/RouteMap/SportsbookRoutes";

const SPORTS_BOOK_ROUTES_WITH_BONUSES = [
  ...sportsBookRoutes,
  routeMap.bonusesRoute,
  routeMap.availableBonusesRoute,
  routeMap.availableBonusRoute,
  routeMap.myBonusesRoute,
  routeMap.myBonusRoute,
  routeMap.historyBonusesRoute,
  routeMap.historyBonusRoute,
  routeMap.sportsHistoryRoute,
  routeMap.virtual,
];

export { SPORTS_BOOK_ROUTES_WITH_BONUSES };
