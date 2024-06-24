import { concat, EMPTY, finalize, merge, of, pipe, Subject } from "rxjs";
import { distinctUntilChanged, filter, first, map, switchMap, tap } from "rxjs/operators";
import { type Epic } from "redux-observable";
import { type Action } from "redux";
import {
  authEpicFactory,
  authorizedAction,
  type IServer,
  type IStorage,
  type IWithAuthState,
  loggedOutAction,
  loggedSelector,
} from "@sb/auth";
import { isNotNil, isString, notNil } from "@sb/utils";
import { routerLocationSelector } from "@sb/router";
import { type TCallResponsePayload } from "@sb/sdk";
import { type call_LoginPlayerCommand } from "@sb/sdk/SDKClient/platformplayer";
import { getLocalStorage, setLocalStorage } from "../../../common/Store/LocalStorage/localStorageKeys";
import { type IMixAppEpicDependencies, type TMixAppEpic } from "../../../common/Store/Root/Epics/TMixAppEpic";
import {
  type TLoginPlayerResponseDevice,
  type TLoginPlayerResponsePlayer,
} from "../../../common/Store/Player/Model/TLoginPlayerResponse";
import { playerMinimalReceivedAction } from "../../../common/Store/Player/PlayerActions";
import { normalizePlayerMinimal } from "../../../common/Store/Player/Model/IPlayerMinimal";
import { loadPlayerAllEpic } from "../../../common/Store/Player/Epics/LoadPlayerAllEpic";
import { type IWithPlayerState } from "../../../common/Store/Player/InitialState/PlayerInitialState";
import { authTokenService } from "../../../common/Store/Auth/AuthTokenService";
import { monoClock } from "../../../common/Utils/MonoClock";
import { modalOpenAction } from "../../../common/Store/Modal/ModalActions";
import { EModal } from "../../../common/Store/Modal/Model/EModal";
import { callWithAbort } from "../../../common/Utils/EpicUtils/CallWithAbort";
import { platformLocalStorageKeys } from "../../../common/Store/LocalStorage/PlatformLocalStorageKeys";
import { type PlatformHttpApi } from "../../Api/PlatformHttpApi";
import { startVerifyDeviceAction } from "../VerifyDevice/VerifyDeviceActions";
import { COMMON_VERIFY_DEVICE_ENABLE } from "../VerifyDevice/EnableFlags";
import { watchTokenChanged } from "./WatchTokenChanged";
import { checkLoginWithPlayer, wasLoginWithPlayerSubject } from "./WasLoginWithPlayerSubject";

const playerSubject = new Subject<TLoginPlayerResponsePlayer>();

const verifyDeviceSubject = new Subject<TLoginPlayerResponseDevice>();

const afterLogin = () => pipe(
  tap((payload: TCallResponsePayload<typeof call_LoginPlayerCommand>) => {
    if (COMMON_VERIFY_DEVICE_ENABLE) {
      verifyDeviceSubject.next(payload.unverifiedDeviceDetails);
    }

    checkLoginWithPlayer(payload);

    if (payload.player) {
      playerSubject.next(payload.player);
    }

    if (payload.token) {
      authTokenService.nextToken(payload.token);
    }
  }),
);

const server = (platformHttpApi: PlatformHttpApi): IServer => ({
  refreshKeepAlive(platformPlayerAccessToken) {
    return callWithAbort(platformHttpApi.callKeepAliveRefresh, { platformPlayerAccessToken });
  },
  login(token) {
    return callWithAbort(platformHttpApi.callPlatformLogin, token).pipe(
      afterLogin(),
      map(({ token }) => token),
      filter(isNotNil),
    );
  },
  refreshToken(refreshToken) {
    return callWithAbort(platformHttpApi.callRefreshToken, refreshToken).pipe(
      tap({
        error: () => {
          authTokenService.rejectRefresh();
        },
      }),
    );
  },
  logout(token) {
    return callWithAbort(platformHttpApi.callRevokeToken, { accessTokenList: [token] }).pipe(
      finalize(() => authTokenService.reset()),
    );
  },
});

const storage: IStorage = {
  addToken(token) {
    setLocalStorage(platformLocalStorageKeys.token, token);
  },
  removeToken() {
    localStorage.removeItem(platformLocalStorageKeys.token);
  },
  findToken() {
    return getLocalStorage(platformLocalStorageKeys.token);
  },

  isTokenKey(value) {
    return value === platformLocalStorageKeys.token;
  },
};

const watchPlayerReceived: Epic<Action, Action, IWithAuthState & IWithPlayerState, IMixAppEpicDependencies> = (
  action$,
  state$,
  dependencies,
) => merge(
  verifyDeviceSubject.pipe(
    filter(isNotNil),
    switchMap((device) => merge(
      of(startVerifyDeviceAction(device)),
      of(modalOpenAction(EModal.verifyDevice)),
    )),
  ),
  playerSubject.pipe(
    switchMap((player) => state$.pipe(
      map(loggedSelector),
      distinctUntilChanged(),
      first(Boolean),
      map(() => playerMinimalReceivedAction(normalizePlayerMinimal(player))),
    )),
  ),
  state$.pipe(
    map(loggedSelector),
    distinctUntilChanged(),
    filter(Boolean),
    switchMap(() => {
      if (wasLoginWithPlayerSubject.getValue()) {
        wasLoginWithPlayerSubject.next(false);

        return EMPTY;
      }

      return loadPlayerAllEpic(action$, state$, dependencies);
    }),
  ),
);

const loginOneTokenEpic: TMixAppEpic = (action$, state$, dependencies) => state$.pipe(
  map(routerLocationSelector),
  distinctUntilChanged(),
  first((location) => notNil(location.query["ott"])),
  switchMap((location) => {
    const oneTimeToken = location.query["ott"];

    if (!isString(oneTimeToken)) {
      return EMPTY;
    }

    return concat(
      of(loggedOutAction()),
      callWithAbort(dependencies.platformHttpApi.callLoginResponseByOneTimeToken, { oneTimeToken }).pipe(
        afterLogin(),
        switchMap((response) => of(authorizedAction(response.token))),
      ),
    );
  }),
);

const authEpic: TMixAppEpic = (
  action$,
  state$,
  dependencies,
) => {
  const {
    platformHttpApi,
  } = dependencies;

  return merge(
    authEpicFactory(server(platformHttpApi), storage, monoClock, true)(action$, state$, dependencies),
    watchTokenChanged(state$),
    watchPlayerReceived(action$, state$, dependencies),
    loginOneTokenEpic(action$, state$, dependencies),
  );
};

export { authEpic };
