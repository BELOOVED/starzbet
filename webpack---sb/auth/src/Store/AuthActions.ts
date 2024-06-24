import { type IKeepAliveUpdate } from "../Types/AuthTypes";

/**
 * Base login / logout actions:
 */

const requestLoginAction = <CREDENTIALS>(credentials: CREDENTIALS) =>
  ({ type: "@AUTH/REQUEST_LOGIN", payload: { credentials } });

const requestLogoutAction = () => ({ type: "@AUTH/REQUEST_LOGOUT" });

const requestRefreshTokenAction = () => ({ type: "@AUTH/REQUEST_REFRESH_TOKEN" });

/**
 * Keep-alive actions:
 */

/**
 * Used for possibility to show message on UI when user has been logged out due keep-alive expiration.
 */
const showKeepAliveExpireAction = () => ({ type: "@AUTH/SHOW_KEEP_ALIVE_EXPIRE" });

const keepAliveExpiredAction = () => ({ type: "@AUTH/KEEP_ALIVE_EXPIRED" });

const keepAliveUpdatedAction = (keepAliveUpdate: IKeepAliveUpdate) =>
  ({ type: "@AUTH/KEEP_ALIVE_UPDATED", payload: { keepAliveUpdate } });

/**
 * Used for disable keep-alive on UI.
 * If user activity hasn't been detected, package runs timer for 10 seconds.
 * If this action hasn't been dispatched during this 10 seconds - user will be logged out due inactivity.
 */
const cancelKeepAliveExpirationAction = () => ({ type: "@AUTH/CANCEL_KEEP_ALIVE_EXPIRATION" });

const startRefreshedAction = () => ({ type: "@AUTH/START_REFRESH" });

const refreshFailedAction = () => ({ type: "@AUTH/REFRESH_FAILED" });

const tokenRefreshedAction = <SOURCE_TOKEN>(token: SOURCE_TOKEN | undefined) =>
  ({ type: "@AUTH/TOKEN_REFRESHED", payload: { token } });

const authorizedAction = <SOURCE_TOKEN>(token: SOURCE_TOKEN) =>
  ({ type: "@AUTH/AUTHORIZED", payload: { token } });

const loggedOutAction = () => ({ type: "@AUTH/LOGGED_OUT" });

const loginFailedAction = <T>(error: T) => ({ type: "@AUTH/LOGIN_FAILED", payload: { error } });

const recoveryFinishedAction = <SOURCE_TOKEN>(token: SOURCE_TOKEN | undefined) =>
  ({ type: "@AUTH/RECOVER_FINISHED", payload: { token } });

export {
  showKeepAliveExpireAction,
  tokenRefreshedAction,
  cancelKeepAliveExpirationAction,
  requestLogoutAction,
  requestLoginAction,
  recoveryFinishedAction,
  authorizedAction,
  loginFailedAction,
  loggedOutAction,
  keepAliveUpdatedAction,
  keepAliveExpiredAction,
  requestRefreshTokenAction,
  startRefreshedAction,
  refreshFailedAction,
};
