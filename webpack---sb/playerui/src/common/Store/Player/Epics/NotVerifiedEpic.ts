import { distinctUntilChanged, map, switchMap } from "rxjs/operators";
import { EMPTY, filter } from "rxjs";
import { routerLocationSelector } from "@sb/router";
import { matchPath } from "@sb/react-router-compat";
import { routeMap } from "../../../../platformui/RouteMap/RouteMap";
import { localeSelector } from "../../../../sportsbookui/Store/Locale/LocaleSelector";
import type { TPlatformEpic } from "../../../../platformui/Store/Root/Epic/TPlatformEpic";
import { replaceLocalized } from "../../../Client/Core/Services/RouterService/Utils/LocationChangeLocalized";
import { playerNotVerifiedSelector } from "../Selectors/PlayerSelectors";

const allowedRoutes = [
  routeMap.myDetailsRoute,
  routeMap.passwordRoute,
  routeMap.contactUs,
  routeMap.helpCenter,
];

const dissalowedRoutes = [
  routeMap.accountVVerificationRoute,
  routeMap.bonusesRoute,
  routeMap.depositLimitRoute,
  routeMap.timeOutRoute,
  routeMap.selfExclusionRoute,
  routeMap.accountClosureRoute,
  routeMap.realityChecksRoute,
  routeMap.playLimitRoute,
  routeMap.callRequestsRoute,
  routeMap.historyRoute,
  routeMap.tickets,
  routeMap.bankingRoute,
  routeMap.gamblingControl,
];

const notVerifiedEpic: TPlatformEpic = (_, state$) => state$.pipe(
  map(playerNotVerifiedSelector),
  distinctUntilChanged(),
  switchMap((notVerified) => {
    if (!notVerified) {
      return EMPTY;
    }
    const locale = localeSelector(state$.value);

    return state$.pipe(
      map(routerLocationSelector),
      distinctUntilChanged(),
      filter((location) => !matchPath(location.pathname, allowedRoutes)),
      filter((location) => !!matchPath(location.pathname, dissalowedRoutes)),
      map(() => replaceLocalized(locale, routeMap.myDetailsRoute)),
    );
  }),
);

export { notVerifiedEpic };
