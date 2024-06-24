import { ignoreElements, switchMap, tap } from "rxjs/operators";
import { EMPTY, merge, of } from "rxjs";
import { isCreator, isNil } from "@sb/utils";
import { type IServer, type TAuthEpic } from "../../Types/AuthTypes";
import { isImpersonatedToken } from "../../Utils/IsImpersonatedToken";
import { Logger } from "../../Utils/Logger";
import { isLeaderTab } from "../../Utils/IsLeaderTab";
import { loggedOutAction, requestLogoutAction } from "../AuthActions";
import { findTokenSelector, getAccessTokenSelector } from "../AuthSelectors";

const logoutEpicFactory = (server: IServer): TAuthEpic => (
  action$,
  state$,
) => action$.pipe(
  isCreator(requestLogoutAction),
  switchMap(() => {
    const token = findTokenSelector(state$.value);

    if (isNil(token)) {
      Logger.error.epic("[logout] failed, user not logged.");

      return EMPTY;
    }

    if (isImpersonatedToken(token)) {
      return of(loggedOutAction());
    }

    return merge(
      isLeaderTab()
        ? server.logout(getAccessTokenSelector(state$.value)).pipe(
          tap({
            error: (error) => Logger.error.epic("[logout] failed, server error.", error),
          }),
          ignoreElements(),
        )
        : EMPTY,
      of(loggedOutAction()),
    );
  }),
);

export { logoutEpicFactory };
