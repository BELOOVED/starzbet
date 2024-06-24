import { createRootReducer } from "@sb/utils";
import { assocPath } from "@sb/utils/AssocPath";
import { type IWithAuthState } from "../Types/AuthTypes";
import {
  authorizedAction,
  cancelKeepAliveExpirationAction,
  keepAliveExpiredAction,
  keepAliveUpdatedAction,
  loggedOutAction,
  loginFailedAction,
  recoveryFinishedAction,
  refreshFailedAction,
  requestLoginAction,
  showKeepAliveExpireAction,
  startRefreshedAction,
  tokenRefreshedAction,
} from "./AuthActions";
import { authInitialState } from "./AuthInitialState";
import { getTokenSelector } from "./AuthSelectors";

const setToken = (token: unknown | undefined, state: IWithAuthState) => assocPath(["auth", "token"], token, state);

const setAwaitRecovery = (value: boolean, state: IWithAuthState) => assocPath(["auth", "awaitRecovery"], value, state);

const setAwaitLogin = (value: boolean, state: IWithAuthState) => assocPath(["auth", "awaitLogin"], value, state);

const setShowKeepAliveExpired = (value: boolean, state: IWithAuthState) => assocPath(["auth", "showKeepAliveExpired"], value, state);

const setStartRefresh = (value: boolean, state: IWithAuthState) => assocPath(["auth", "startRefresh"], value, state);

const updateTokenReducer = (state: IWithAuthState, action: ReturnType<typeof tokenRefreshedAction>) =>
  setToken(action.payload.token, state);

const keepAliveUpdatedReducer = (state: IWithAuthState, action: ReturnType<typeof keepAliveUpdatedAction>) =>
  setToken({ ...getTokenSelector(state), ...action.payload.keepAliveUpdate }, state);

const loggedOutReducer = (state: IWithAuthState): IWithAuthState => assocPath(
  ["auth"],
  {
    ...authInitialState,
    awaitRecovery: false,
  },
  state,
);

const recoveryFinishedReducer = (state: IWithAuthState, action: ReturnType<typeof recoveryFinishedAction>) =>
  setAwaitRecovery(false, setToken(action.payload.token, state));

const requestLoginReducer = (state: IWithAuthState) => setAwaitLogin(true, state);

const authorizedReducer = (state: IWithAuthState, action: ReturnType<typeof authorizedAction>) =>
  setAwaitLogin(
    false,
    setToken(action.payload.token, state),
  );

const loginFailedReducer = (state: IWithAuthState, action: ReturnType<typeof loginFailedAction>) =>
  assocPath(
    ["auth", "lastLoginError"],
    action.payload.error,

    setAwaitLogin(false, state),
  );

const showKeepAliveExpireReducer = (state: IWithAuthState, _: ReturnType<typeof showKeepAliveExpireAction>) => (
  setShowKeepAliveExpired(true, state)
);

const cancelKeepAliveExpireReducer = (state: IWithAuthState, _: ReturnType<typeof showKeepAliveExpireAction>) => (
  setShowKeepAliveExpired(false, state)
);

const startRefreshedReducer = (state: IWithAuthState) => assocPath(
  ["auth", "refreshFailed"],
  false,
  setStartRefresh(true, state),
);

const refreshFailedReducer = (state: IWithAuthState) => assocPath(
  ["auth", "refreshFailed"],
  true,
  setStartRefresh(false, state),
);

const refreshCompletedReducer = (state: IWithAuthState) => assocPath(
  ["auth", "refreshFailed"],
  false,
  setStartRefresh(false, state),
);

const authReducer = createRootReducer<IWithAuthState>([
  [updateTokenReducer, tokenRefreshedAction],
  [loggedOutReducer, loggedOutAction],
  [recoveryFinishedReducer, recoveryFinishedAction],
  [requestLoginReducer, requestLoginAction],
  [authorizedReducer, authorizedAction],
  [loginFailedReducer, loginFailedAction],
  [keepAliveUpdatedReducer, keepAliveUpdatedAction],
  [loggedOutReducer, keepAliveExpiredAction],
  [showKeepAliveExpireReducer, showKeepAliveExpireAction],
  [cancelKeepAliveExpireReducer, cancelKeepAliveExpirationAction],
  [startRefreshedReducer, startRefreshedAction],
  [refreshFailedReducer, refreshFailedAction],
  [refreshCompletedReducer, recoveryFinishedAction],
  [refreshCompletedReducer, tokenRefreshedAction],
]);

export { authReducer };
