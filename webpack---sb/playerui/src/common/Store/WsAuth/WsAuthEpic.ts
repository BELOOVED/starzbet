import { type Epic } from "redux-observable";
import { EMPTY, from, merge, of } from "rxjs";
import { catchError, distinctUntilChanged, map, switchMap } from "rxjs/operators";
import { type Action } from "redux";
import { isImpersonatedToken, type IWithAuthState, loggedSelector } from "@sb/auth";
import { type IWithRouterState } from "@sb/router";
import { type TExplicitAny } from "@sb/utils";
import { routeMap } from "../../../sportsbookui/RouteMap/RouteMap";
import { Logger } from "../../Utils/Logger";
import { wsGlobalErrorHandler } from "../../GlobalErrorHandler/WsGlobalErrorHandler";
import { createConnectedByRouteEpic, type IDepsWithConnection } from "../../Utils/EpicUtils/CreateConnectedByRouteEpic";
import { type IWithPlayerState } from "../Player/InitialState/PlayerInitialState";
import { whenPlayerIdExist } from "../Player/Epics/WhenPlayerIdExist";
import { playerGroupIdNotNilSelector } from "../Player/Selectors/PlayerGroupIdSelectors";
import { authTokenService } from "../Auth/AuthTokenService";
import { setAuthenticatedAction } from "./WsAuthActions";
import { authenticatedWsSelector, loggedAndAuthenticatedWsSelector } from "./WsAuthSelectors";
import { type IWithWsAuthState } from "./WsAuthState";

const AUTHENTICATE_URI = "sumstats.websocket.authentication.platform";
const AUTHENTICATE_IMPERSONATE_URI = "sumstats.websocket.authentication.platform-impersonate-player";

const callWsAuthEpic: Epic<Action, Action, IWithAuthState, IDepsWithConnection> = (
  action$,
  state$,
  dependencies,
) => from(authTokenService.getTokenOrError()).pipe(
  switchMap((token) => {
    const impersonated = isImpersonatedToken(token);

    const uri = impersonated ? AUTHENTICATE_IMPERSONATE_URI : AUTHENTICATE_URI;

    return from(dependencies.connection.login(
      uri,
      {},
      { token: token.accessToken },
    )).pipe(
      switchMap(() => {
        Logger.info.epic("[wsAuthEpic] ws authenticated successfully");

        return of(setAuthenticatedAction(true));
      }),
      catchError((error) => {
        Logger.warn.epic("[wsAuthEpic] failed", error);

        return merge(
          wsGlobalErrorHandler(uri, error),
          of(setAuthenticatedAction(false)),
        );
      }),
    );
  }),
);

const resetAuthenticated = () => of(setAuthenticatedAction(false));

const wsAuthSubscribeEpic: Epic<Action, Action, IWithAuthState & IWithRouterState & IWithPlayerState> = (
  action$,
  state$,
  dependencies,
) => state$.pipe(
  map(playerGroupIdNotNilSelector),
  distinctUntilChanged(),
  switchMap(() => createConnectedByRouteEpic(
    [routeMap.any],
    callWsAuthEpic,
    resetAuthenticated,
    resetAuthenticated,
  )(action$, state$, dependencies)),
);

const wsAuthEpic: Epic<Action, Action, IWithAuthState & IWithRouterState & IWithPlayerState> = (
  action$,
  state$,
  dependencies,
) => state$.pipe(
  map(loggedSelector),
  distinctUntilChanged(),
  switchMap((logged) => {
    if (!logged) {
      Logger.info.epic("[wsAuthEpic] stopped");

      return of(setAuthenticatedAction(false));
    }

    return whenPlayerIdExist(wsAuthSubscribeEpic)(action$, state$, dependencies);
  }),
);

const whenLoggedAndWsAuthenticatedEpic = <E extends Epic<Action, Action, S, D>, S = TExplicitAny, D = TExplicitAny>(
  epic: E,
): Epic<Action, Action, S & IWithAuthState & IWithWsAuthState, D> => (
    action$,
    state$,
    dependencies,
  ) => state$.pipe(
    map(loggedAndAuthenticatedWsSelector),
    distinctUntilChanged(),
    switchMap((logged) => {
      if (!logged) {
        return EMPTY;
      }

      return epic(action$, state$, dependencies);
    }),
  );

const whenWsAuthenticatedEpic = <E extends Epic<Action, Action, S, D>, S = TExplicitAny, D = TExplicitAny>(
  epic: E,
): Epic<Action, Action, S & IWithAuthState & IWithWsAuthState, D> => (
    action$,
    state$,
    dependencies,
  ) => state$.pipe(
    map(authenticatedWsSelector),
    distinctUntilChanged(),
    switchMap((authenticated) => {
      if (!authenticated) {
        return EMPTY;
      }

      return epic(action$, state$, dependencies);
    }),
  );

export { wsAuthEpic, whenLoggedAndWsAuthenticatedEpic, whenWsAuthenticatedEpic };
