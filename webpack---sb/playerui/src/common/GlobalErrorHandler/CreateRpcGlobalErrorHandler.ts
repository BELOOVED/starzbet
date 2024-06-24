import { type Dispatch } from "redux";
import { isResponseErrors, isRuntimeError } from "@sb/network-bus/Utils";
import { isArray, isObject } from "@sb/utils";
import { production } from "../Constants/Production";
import { Logger } from "../Utils/Logger";
import { createGlobalErrorHandler, type TGlobalErrorHandler } from "./GlobalErrorHandler";

const rpcErrorCodesSelector = (error: unknown) => isResponseErrors(error) ? error.map((it) => it.code) : [];

const secKeys = ["login", "username", "password", "securityAnswer", "securityQuestion"];

const safeRequest = (request?: unknown): unknown => {
  if (!request) {
    return request;
  }

  if (isObject(request)) {
    return Object.entries(request).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: secKeys.includes(key) ? "***" : value,
      }),
      {},
    );
  }

  if (isArray(request)) {
    return request.map((it) => safeRequest(it));
  }

  return request;
};

const createRpcGlobalErrorHandler = (getDispatch: () => Dispatch) => {
  const handler = createGlobalErrorHandler(getDispatch, rpcErrorCodesSelector, "rpc");

  return (source: string, request?: unknown): TGlobalErrorHandler => (error) => {
    if (production && isResponseErrors(error)) {
      error.forEach((e) => {
        if (isRuntimeError(e)) {
          Logger.warn.rpc("[globalErrorHandler]", source, safeRequest(request), e);
        }
      });
    }

    return handler(source)(error);
  };
};

export { createRpcGlobalErrorHandler };
