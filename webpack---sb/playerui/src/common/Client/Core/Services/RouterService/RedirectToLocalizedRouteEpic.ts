import { EMPTY, of } from "rxjs";
import { matchPath } from "@sb/react-router-compat";
import { routerLocationPathnameSelector, routerLocationSearchSelector } from "@sb/router";
import { baseRouteMap as platformBaseRouteMap } from "../../../../../platformui/RouteMap/RouteMap";
import { baseRouteMap as sportsbookBaseRouteMap } from "../../../../../sportsbookui/RouteMap/RouteMap";
import { localeSelector } from "../../../../../sportsbookui/Store/Locale/LocaleSelector";
import type { TAppEpic } from "../../../../Store/Root/Epics/TAppEpic";
import { IS_SERVER_SIDE_SETUP } from "../../../../IsServerSideSetup";
import { getAllRoutePaths } from "./Utils/GetAllRoutePaths";
import { replaceLocalized } from "./Utils/LocationChangeLocalized";
import { getLocalizedPathPatternByRoute } from "./Utils/GetLocalizedPathPatternByRoute";

const ALL_PATHS = getAllRoutePaths({
  ...platformBaseRouteMap,
  ...sportsbookBaseRouteMap,
});

const redirectToLocalizedRouteEpic: TAppEpic = (_, state$) => {
  const pathname = routerLocationPathnameSelector(state$.value);
  const match = matchPath(pathname, ALL_PATHS);

  if (match && IS_SERVER_SIDE_SETUP) {
    const search = routerLocationSearchSelector(state$.value);
    const locale = localeSelector(state$.value);

    return of(
      replaceLocalized(
        locale,
        getLocalizedPathPatternByRoute(pathname),
        {},
        (v) => `${v}${search}`,
      ),
    );
  }

  return EMPTY;
};

export { redirectToLocalizedRouteEpic };
