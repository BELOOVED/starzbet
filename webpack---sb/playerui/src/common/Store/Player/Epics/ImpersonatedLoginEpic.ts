import { concat, EMPTY, filter, merge, of } from "rxjs";
import { distinctUntilChanged, map, switchMap } from "rxjs/operators";
import { type IWithRouterState, routerEpic } from "@sb/router";
import {
  authorizedAction,
  awaitRecoverySelector,
  type IAuthToken,
  type IWithAuthState,
  loggedSelector,
  requestLogoutAction,
} from "@sb/auth";
import { not } from "@sb/utils";
import { baseRouteMap, routeMap } from "../../../../platformui/RouteMap/RouteMap";
import { type TEpicWithGraphQLClient } from "../../../../platformui/Store/Root/Epic/TEpicWithGraphQLClient";
import { localeSelector } from "../../../../sportsbookui/Store/Locale/LocaleSelector";
import { type IWithLocaleState } from "../../../../sportsbookui/Store/Locale/LocaleState";
import { getMatch } from "../../../Utils/RouterUtils/GetMatch";
import { replaceLocalized } from "../../../Client/Core/Services/RouterService/Utils/LocationChangeLocalized";
import { loadPlayerAllEpic } from "./LoadPlayerAllEpic";

const createImpersonatedToken = (accessToken: string): IAuthToken => ({
  accessToken,
  accessTokenExpiresIn: 0,
  accessTokenInMs: 0,
  refreshToken: "impersonate",
  refreshTokenExpiresIn: 0,
  refreshTokenInMs: 0,
  keepAliveInMs: null,
  keepAliveUntil: null,
  sessionId: "impersonate",
});

type TState = IWithAuthState & IWithRouterState & IWithLocaleState

const requestImpersonatedLogin = (): TEpicWithGraphQLClient<TState> => (action$, state$, dependencies) => {
  const parse = new URLSearchParams(window.location.search);
  const locale = localeSelector(state$.value);

  const rawToken = parse.get("token");

  if (!rawToken) {
    return of(replaceLocalized(locale, routeMap.root));
  }

  const accessToken = decodeURIComponent(rawToken);

  return state$.pipe(
    map(awaitRecoverySelector),
    distinctUntilChanged(),
    filter(not<boolean>),
    switchMap(() => {
      const prev = loggedSelector(state$.value) ? of(requestLogoutAction()) : EMPTY;

      return concat(
        prev,
        merge(
          of(authorizedAction(createImpersonatedToken(accessToken))),
          of(replaceLocalized(locale, routeMap.root)),
          state$.pipe(
            map(loggedSelector),
            distinctUntilChanged(),
            filter(Boolean),
            switchMap(() => loadPlayerAllEpic(action$, state$, dependencies)),
          ),
        ),
      );
    }),
  );
};

const impersonatedLoginEpic = routerEpic({
  name: "impersonatedLogin",
  match: getMatch({ path: baseRouteMap.impersonatedLogin }),
  onStart: requestImpersonatedLogin,
});

export { impersonatedLoginEpic };
