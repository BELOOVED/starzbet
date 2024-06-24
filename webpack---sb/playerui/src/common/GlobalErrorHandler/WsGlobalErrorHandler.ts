import { EMPTY, type Observable, of } from "rxjs";
import { type Action } from "redux";
import { isArray } from "@sb/utils";
import { checkAuthorizedError } from "./GlobalErrorHandler";

type TWsErrorResponse = { code: string; }[];

const isWSErrorResponse = (error: unknown): error is TWsErrorResponse => (
  !!error && isArray(error) && error.every((err) => err?.hasOwnProperty("code"))
);

const wsErrorCodesSelector = (error: unknown) => isWSErrorResponse(error) ? error.map((it) => it.code) : [];

const wsGlobalErrorHandler = <T = Action>(source: string, error: unknown): Observable<T> => {
  const onErrorAction = checkAuthorizedError(wsErrorCodesSelector, "websocket", source, error);

  if (onErrorAction !== null) {
    return of(onErrorAction) as Observable<T>;
  }

  return EMPTY;
};

export { wsGlobalErrorHandler };
