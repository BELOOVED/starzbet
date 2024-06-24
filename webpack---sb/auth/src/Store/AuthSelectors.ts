import {
  createOptionalPropertySelector,
  createPropertySelector,
  createSimpleSelector,
  getNotNil,
  isNotVoid,
  type TSelector,
} from "@sb/utils";
import { type IAuthState, type IWithAuthState } from "../Types/AuthTypes";

const authStateSelector: TSelector<IWithAuthState, IAuthState, []> = (state) => state.auth;

const lastLoginErrorSelector = createPropertySelector(
  authStateSelector,
  "lastLoginError",
);

const lastLoginHasErrorSelector = createSimpleSelector(
  [lastLoginErrorSelector],
  (error) => isNotVoid(error),
);

const lastLoginErrorCodeSelector = createSimpleSelector(
  [lastLoginErrorSelector],
  (error) => error?.[0]?.code,
);

const awaitLoginSelector = createPropertySelector(
  authStateSelector,
  "awaitLogin",
);

const awaitRecoverySelector = createPropertySelector(
  authStateSelector,
  "awaitRecovery",
);

const showKeepAliveExpiredSelector = createPropertySelector(
  authStateSelector,
  "showKeepAliveExpired",
);

const findTokenSelector = createPropertySelector(
  authStateSelector,
  "token",
);

const findAccessTokenSelector = createOptionalPropertySelector(
  findTokenSelector,
  "accessToken",
);

const loggedSelector: TSelector<IWithAuthState, boolean, []> =
  (state) => Boolean(findTokenSelector(state));

const getTokenSelector = createSimpleSelector(
  [findTokenSelector],
  (token) =>
    getNotNil(
      token,
      ["auth", "getTokenSelector"],
      "state.token",
    )
  ,
);

const getAccessTokenSelector = createPropertySelector(
  getTokenSelector,
  "accessToken",
);

const getDeviceIdSelector = createPropertySelector(
  getTokenSelector,
  "deviceId",
);

const getRefreshTokenSelector = createPropertySelector(
  getTokenSelector,
  "refreshToken",
);

const getSessionIdSelector = createPropertySelector(
  getTokenSelector,
  "sessionId",
);

const startRefreshSelector = createPropertySelector(
  authStateSelector,
  "startRefresh",
);

const refreshFailedSelector = createPropertySelector(
  authStateSelector,
  "refreshFailed",
);

export {
  authStateSelector,
  findTokenSelector,
  findAccessTokenSelector,
  loggedSelector,
  getAccessTokenSelector,
  getTokenSelector,
  getSessionIdSelector,
  lastLoginErrorSelector,
  lastLoginHasErrorSelector,
  awaitLoginSelector,
  awaitRecoverySelector,
  showKeepAliveExpiredSelector,
  lastLoginErrorCodeSelector,
  getRefreshTokenSelector,
  startRefreshSelector,
  refreshFailedSelector,
  getDeviceIdSelector,
};
