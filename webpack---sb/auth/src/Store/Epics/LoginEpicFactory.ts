import { catchError, filter, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { isCreator } from "@sb/utils";
import { type IServer, type TAuthEpic } from "../../Types/AuthTypes";
import { assertIsAuthToken } from "../../Utils/IsAuthToken";
import { Logger } from "../../Utils/Logger";
import { authorizedAction, loginFailedAction, requestLoginAction } from "../AuthActions";
import { loggedSelector } from "../AuthSelectors";

/**
 * Login flow:
 *
 * 1) requestLoginAction ->
 *    1.1 user not logged; state: {awaitLogin: true, lastLoginError: undefined}
 *      1.1.1 success: loggedAction; state: {awaitLogin: false, lastLoginError: undefined, token: <TOKEN> >}
 *      1.1.1 error: loginFailedAction; state: {awaitLogin: false, lastLoginError: <Error>, token: undefined }
 *
 *    1.2 user already logged; do nothing
 */

const loginEpicFactory = (server: IServer): TAuthEpic => (
  action$,
  state$,
) => action$.pipe(
  isCreator(requestLoginAction),
  filter(() => {
    if (loggedSelector(state$.value)) {
      Logger.error.epic("[login] Login failed user already logged.");

      return false;
    }

    return true;
  }),
  switchMap((action) => server.login(action.payload.credentials).pipe(
    switchMap((token) => {
      assertIsAuthToken(token);

      return of(authorizedAction(token));
    }),
    catchError((error) => {
      Logger.info.epic("[login] Error occurred during login", error);

      return of(loginFailedAction(error));
    }),
  )),
);

export { loginEpicFactory };
