import { createLogger } from "@sb/logger";
import { isClientTimeoutError } from "@sb/network-bus/Utils";
import { isArray } from "@sb/utils";
import { networkErrorRegExp } from "./NetworkErrorRegExp";

const SENTRY_IGNORE_ERRORS: RegExp[] = [
  /window.webkit.messageHandlers/i,
  /Script error./,
  /Java object is gone/,
  /ResizeObserver loop limit exceeded/,
  /ResizeObserver loop completed with undelivered notifications./,
  ...networkErrorRegExp,
];

const Logger = createLogger("playerui");

const logWarnOrError = (e: unknown) => {
  if (isClientTimeoutError(e)) {
    return Logger.warn;
  }

  return Logger.error;
};

const logArrayError = (e: unknown, handler: (e: unknown) => void) => {
  const error = isArray(e) ? e : [e];

  error.forEach(handler);
};

export {
  Logger,
  SENTRY_IGNORE_ERRORS,
  logWarnOrError,
  logArrayError,
};
