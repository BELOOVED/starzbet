import { distinctUntilChanged, map, switchMap } from "rxjs/operators";
import { debounceTime, EMPTY, of } from "rxjs";
import { routerLocationSelector } from "@sb/router";
import { entries, getNotNil, sortBy } from "@sb/utils";
import { matchPath } from "@sb/react-router-compat";
import { keys } from "@sb/utils/Keys";
import { routeMap } from "../../../../platformui/RouteMap/RouteMap";
import { localeSelector } from "../../../../sportsbookui/Store/Locale/LocaleSelector";
import type { TPlatformEpic } from "../../../../platformui/Store/Root/Epic/TPlatformEpic";
import { replaceLocalized } from "../../../Client/Core/Services/RouterService/Utils/LocationChangeLocalized";
import { EPermissionKey, permissionsPagesMap } from "../Model/Permissions";
import { allowPageByPermissionSelector } from "../Selectors/PlayerSelectors";

const priorityKeys = [
  EPermissionKey.allowSports,
  EPermissionKey.allowCasino,
  EPermissionKey.allowLiveCasino,
  EPermissionKey.allowGames,
  EPermissionKey.allowVirtual,
  EPermissionKey.allowBingo,
  EPermissionKey.allowESports,
];

const permissionKeys = sortBy((key) => priorityKeys.indexOf(key), keys(permissionsPagesMap));

const permissionsEpic: TPlatformEpic = (action$, state$) => state$.pipe(
  map(routerLocationSelector),
  distinctUntilChanged(),
  debounceTime(100), //todo
  switchMap((location) => {
    const disallow = entries(permissionsPagesMap).some(([permissionKey, routes]) => {
      const allow = allowPageByPermissionSelector(state$.value, permissionKey);

      return !allow && !!matchPath(location.pathname, routes);
    });

    if(disallow){
      const locale = localeSelector(state$.value);

      const permissionKey = permissionKeys
        .find((permissionKey) => allowPageByPermissionSelector(state$.value, permissionKey));

      const routes = permissionKey ? permissionsPagesMap[permissionKey] : [routeMap.myDetailsRoute];

      const route= getNotNil(routes[0], ["permissionsEpic"], "route");

      return of(replaceLocalized(locale, route));
    }

    return EMPTY;
  }),
);

export { permissionsEpic };

