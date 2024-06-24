import { createSimpleSelector, isNil } from "@sb/utils";
import { routerLocationPathnameSelector } from "@sb/router";
import { matchPath } from "@sb/react-router-compat";
import { routeMap } from "../../../RouteMap/RouteMap";
import { activePlayerBonusStatuses } from "../Model/PlayerBonusStatusList";
import { availableBonusesWithoutInvalidatedMatchResultsSelector, platformBonusesSelectors } from "./BonusesSelectors";

/**
 * should be used just on 'routeMap.availableBonusRoute' after it loaded
 */
const isAvailableBonusRouteOutdatedSelector = createSimpleSelector(
  [
    availableBonusesWithoutInvalidatedMatchResultsSelector,
    routerLocationPathnameSelector,
  ],
  (availableBonuses, pathname) => {
    const match = matchPath<IWithId>(pathname, { path: routeMap.availableBonusRoute, exact: true });

    return !match || availableBonuses.findIndex(({ id }) => id === match.params.id) === -1;
  },
);

/**
 * should be used just on 'routeMap.myBonusRoute' after it loaded
 */
const isMyBonusRouteOutdatedSelector = createSimpleSelector(
  [
    platformBonusesSelectors.playerBonuses,
    routerLocationPathnameSelector,
  ],
  (playerBonuses, pathname) => {
    const match = matchPath<IWithId>(pathname, { path: routeMap.myBonusRoute, exact: true });

    if (!match) {
      return true;
    }

    const playerBonus = playerBonuses.find((bonus) => bonus.id === match.params.id);

    if (isNil(playerBonus)) {
      return true;
    }

    return !activePlayerBonusStatuses.includes(playerBonus.status);
  },
);

/**
 * should be used just on 'routeMap.availableBonusRoute' after it loaded
 */
const isBonusHistoryRouteOutdatedSelector = createSimpleSelector(
  [
    platformBonusesSelectors.historyBonuses,
    routerLocationPathnameSelector,
  ],
  (historyBonuses, pathname) => {
    const match = matchPath<IWithId>(pathname, { path: routeMap.historyBonusRoute, exact: true });

    return !match || historyBonuses.findIndex(({ id }) => id === match.params.id) === -1;
  },
);
export {
  isAvailableBonusRouteOutdatedSelector,
  isMyBonusRouteOutdatedSelector,
  isBonusHistoryRouteOutdatedSelector,
};
