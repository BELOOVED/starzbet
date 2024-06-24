import { type StateObservable } from "redux-observable";
import { pipe, retry, throwError, timer } from "rxjs";
import { catchError, filter, map } from "rxjs/operators";
import { type TExplicitAny } from "@sb/utils";
import { type IWithAuthState, loggedSelector } from "@sb/auth";
import { Logger } from "../Logger";

const retryWhenLogged = <T extends TExplicitAny>(state$: StateObservable<IWithAuthState>, errorTitle?: string) => pipe(
  catchError((error) => {
    if (errorTitle) {
      Logger.warn.epic("retryWhenLogged", errorTitle, error);
    } else {
      Logger.warn.epic("retryWhenLogged", error);
    }

    return throwError(() => error);
  }),
  retry<T>({
    delay: () => timer(5000).pipe(
      map(() => loggedSelector(state$.value)),
      filter(Boolean),
    ),
  }),
);

export { retryWhenLogged };
