import { distinctUntilChanged, map, switchMap } from "rxjs/operators";
import { EMPTY, of, skip } from "rxjs";
import { deepEqual } from "fast-equals";
import { routerEpic, routerLocationSelector, routerPrevLocationSelector } from "@sb/router";
import { type Location, matchPath } from "@sb/react-router-compat";
import { isEmpty } from "@sb/utils";
import { pushLocalized } from "../../../../common/Client/Core/Services/RouterService/Utils/LocationChangeLocalized";
import { generateLocalizedPathByRoute } from "../../../../common/Client/Core/Services/RouterService/Utils/GenerateLocalizedPathByRoute";
import { type TAppEpic } from "../../../../common/Store/Root/Epics/TAppEpic";
import { routeMap } from "../../../RouteMap/RouteMap";
import { localeSelector } from "../../Locale/LocaleSelector";
import {
  sportMenuActiveTournamentIdsMatchesSelector,
  sportMenuActiveTournamentIdsSelector,
} from "../Selectors/SportMenuActiveTournamentIdsSelector";
import { eventPeriodSelector } from "../Selectors/SportMenuSelectors";
import { couponsMatchOptions, eSportMatchOptions, getSelectionMatch, liveOptions, SPORT_ROUTES } from "./MatchOptions";

const getMatch = (location: Location) => {
  if (matchPath(location.pathname, couponsMatchOptions)) {
    return null;
  }

  return matchPath(location.pathname, SPORT_ROUTES);
};

const syncPathBySportMenuEpic = routerEpic({
  name: "syncPathBySportMenu",
  match: getMatch,
  onStart: (): TAppEpic => (action$, state$) => state$.pipe(
    map(sportMenuActiveTournamentIdsSelector),
    distinctUntilChanged((prev, next) => deepEqual(prev, next)),
    skip(1),
    switchMap((tournamentIds: string[]) => {
      const current = routerLocationSelector(state$.value);

      const isESportPage = matchPath(current.pathname, eSportMatchOptions);

      const matches = sportMenuActiveTournamentIdsMatchesSelector(state$.value, tournamentIds);

      if (isEmpty(matches)) {
        const prev = routerPrevLocationSelector(state$.value);

        const isSelectionPrevPage = !!getSelectionMatch(prev);
        const isSelectionCurrentPage = !!getSelectionMatch(current);

        if (isSelectionPrevPage && !isSelectionCurrentPage) {
          return EMPTY;
        }

        const root = isESportPage ? routeMap.esport.preLive.root : routeMap.preLive.root;
        const locale = localeSelector(state$.value);

        return of(pushLocalized(locale, root));
      }

      const eventPeriod = eventPeriodSelector(state$.value);

      const isLive = matchPath(current.pathname, liveOptions);

      const path = matches
        .map((match) => `${match.sportSlug}/${match.categorySlug}/${match.tournamentSlugs}`)
        .join("/");

      const esportPage = isLive ? routeMap.esport.live.selection : routeMap.esport.preLive.selection;

      const sportPage = isLive ? routeMap.live.selection : routeMap.preLive.selection;

      const root = isESportPage ? esportPage : sportPage;

      const locale = localeSelector(state$.value);

      const params = [
        locale,
        root,
        { period: isLive ? undefined : eventPeriod, path },
        decodeURIComponent,
      ] as const;

      const nextPath = generateLocalizedPathByRoute(...params);

      if (matchPath(current.pathname, { path: nextPath, exact: true })) {
        return EMPTY;
      }

      return of(pushLocalized(...params));
    }),
  ),
});

export { syncPathBySportMenuEpic };
