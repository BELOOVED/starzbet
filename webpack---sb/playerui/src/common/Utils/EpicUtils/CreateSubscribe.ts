import { defer, Observable } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { type Epic } from "redux-observable";
import { loggedSelector } from "@sb/auth";
import { type TLoggerArgs } from "@sb/logger";
import { isJsError, isObject, isString } from "@sb/utils";
import { type IMetadata } from "@sb/network-bus/Model";
import { wsGlobalErrorHandler } from "../../GlobalErrorHandler/WsGlobalErrorHandler";
import { authenticatedWsSelector } from "../../Store/WsAuth/WsAuthSelectors";
import { logArrayError, logWarnOrError } from "../Logger";

const isNonErrorInstanceObject = (e: unknown): e is { message: string; } => isObject(e) && e.hasOwnProperty("message");

const isAccessDenied = (e: unknown) => {
  if (isString(e) && e.includes("Access denied")) {
    return true;
  }

  return (isNonErrorInstanceObject(e) || isJsError(e)) && e.message.includes("Access denied");
};

type TPayload<T> = { payload: T; uri: string; }

const createSubscribe = <T, E extends Epic = Epic>(uri: string, onUpdate: (payload: T, uri: string) => E, warnTitle?: string): Epic => (
  action$,
  state$,
  dependencies,
) => defer(() => new Observable<TPayload<T>>((subscriber) => {
  let subscribed = false;

  dependencies.connection.subscribe(
    uri,
    {
      subscriber: (payload: T, meta: IMetadata, uri: string) => {
        subscriber.next({ payload, uri });
      },
      unsubscriber: () => subscriber.unsubscribe(),
    },
  )
    .then(() => subscribed = true)
    .catch((err: unknown) => subscriber.error(err));

  return () => subscribed && dependencies.connection.unsubscribe(uri)
    .catch((error: unknown) => logArrayError(error, (e) => logWarnOrError(e).epic("[createSubscribe]", e)));
})).pipe(
  switchMap(({ payload, uri }) => onUpdate(payload, uri)(action$, state$, dependencies)),
  catchError((error) => {
    logArrayError(
      error,
      (e) => {
        const args: TLoggerArgs = ["createSubscribe"];

        if (warnTitle) {
          args.push(warnTitle);
        }

        if (isAccessDenied(e)) {
          args.push(JSON.stringify({
            logged: loggedSelector(state$.value),
            ws: authenticatedWsSelector(state$.value),
            uri,
          }));
        }

        //logWarnOrError(e).epic(...args, e);
      },
    );

    return wsGlobalErrorHandler<T>(uri, error);
  }),
);

export { createSubscribe };
