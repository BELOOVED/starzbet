import { createSimpleSelector } from "@sb/utils";
import { routerLocationPathnameSelector } from "@sb/router";
import { matchPath } from "@sb/react-router-compat";
import { localStorageKeys } from "../../../../common/Store/LocalStorage/localStorageKeys";
import { KIRON_ROUTES } from "../../../RouteMap/SBRoutesModel";

const isKironRouteSelector = createSimpleSelector(
  [routerLocationPathnameSelector],
  (pathname) => !!matchPath(pathname, KIRON_ROUTES),
);

const betSlipLocalStorageKeySelector = createSimpleSelector(
  [isKironRouteSelector],
  (isKiron) => isKiron ? localStorageKeys.kironBetSlipPicks : localStorageKeys.betSlipPicks,
);

export { betSlipLocalStorageKeySelector, isKironRouteSelector };
