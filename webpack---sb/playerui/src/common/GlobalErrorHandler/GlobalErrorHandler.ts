import { type Dispatch } from "redux";
import { loggedOutAction, requestRefreshTokenAction } from "@sb/auth";
import { type TLoggerZone } from "@sb/logger";
import { Logger } from "../Utils/Logger";

type TGlobalErrorHandler = (e: unknown) => unknown | Promise<unknown>;

type TGlobalErrorHandlerCreator = ReturnType<typeof createGlobalErrorHandler>;

const hasError = (errorCodes: string[], validationCode: string) => errorCodes.some((code) => code === validationCode);

const checkAuthorizedError = (
  errorCodesSelector: (error: unknown) => string[],
  zone: TLoggerZone,
  source: string,
  error: unknown,
) => {
  const errorCodes = errorCodesSelector(error);

  if (hasError(errorCodes, "token.token_expired")) {
    Logger.warn[zone]("checkAuthorizedError", source, error);

    return requestRefreshTokenAction();
  }

  if (hasError(errorCodes, "token.invalid_token")) {
    Logger.warn[zone]("checkAuthorizedError", source, error);

    return loggedOutAction();
  }

  if (hasError(errorCodes, "operator.token_not_active")) {
    Logger.warn[zone]("checkAuthorizedError", source, error);

    return loggedOutAction();
  }

  if (hasError(errorCodes, "token.token_disabled")) {
    Logger.warn[zone]("checkAuthorizedError", source, error);

    return loggedOutAction();
  }

  if (hasError(errorCodes, "session.session_closed")) {
    Logger.warn[zone]("checkAuthorizedError", source, error);

    return loggedOutAction();
  }

  if (hasError(errorCodes, "session.session_disabled")) {
    Logger.warn[zone]("checkAuthorizedError", source, error);

    return loggedOutAction();
  }

  if (hasError(errorCodes, "session.not_found_by_access_token")) {
    Logger.warn[zone]("checkAuthorizedError", source, error);

    return loggedOutAction();
  }

  if (hasError(errorCodes, "session.not_found_by_refresh_token")) {
    Logger.warn[zone]("checkAuthorizedError", source, error);

    return loggedOutAction();
  }

  if (hasError(errorCodes, "authentication.access_denied")) {
    Logger.warn[zone]("checkAuthorizedError", source, error);
  }

  if (hasError(errorCodes, "authentication.token_for_message_not_found")) {
    Logger.warn[zone]("checkAuthorizedError", source, error);
  }

  return null;
};

const createGlobalErrorHandler = (
  getDispatch: () => Dispatch,
  errorCodesSelector: (error: unknown) => string[],
  zone: TLoggerZone,
) => (source: string): TGlobalErrorHandler => (error) => {
  const dispatch = getDispatch();

  const onErrorAction = checkAuthorizedError(errorCodesSelector, zone, source, error);

  if (onErrorAction !== null) {
    dispatch(onErrorAction);
  }

  return Promise.reject(error);
};

export { createGlobalErrorHandler, checkAuthorizedError };

export type { TGlobalErrorHandlerCreator, TGlobalErrorHandler };
