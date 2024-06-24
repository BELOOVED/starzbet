import { type Epic } from "redux-observable";
import { type Action } from "redux";
import { distinctUntilChanged, map } from "rxjs/operators";
import { ignoreElements, tap } from "rxjs";
import { type IWithAuthState, refreshFailedSelector, startRefreshSelector } from "@sb/auth";
import { authTokenService } from "./AuthTokenService";

const authSubjectUpdateEpic: Epic<Action, Action, IWithAuthState> = (action$, state$) => state$.pipe(
  map(startRefreshSelector),
  distinctUntilChanged(),
  tap((start) => {
    if(refreshFailedSelector(state$.value)) {
      authTokenService.rejectRefresh();

      return;
    }

    if(start) {
      authTokenService.refresh();
    }
  }),
  ignoreElements(),
);

export { authSubjectUpdateEpic };
