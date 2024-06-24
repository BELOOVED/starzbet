import { distinctUntilChanged, filter, map, switchMap } from "rxjs/operators";
import { EMPTY, of } from "rxjs";
import { type StateObservable } from "redux-observable";
import { findTokenSelector } from "@sb/auth";
import { type TAppState } from "../../../sportsbookui/Store/InitialState";
import { authTokenService } from "../../../common/Store/Auth/AuthTokenService";
import { removedTokenAction } from "./AuthActions";

const watchTokenChanged = (state$: StateObservable<TAppState>) => state$.pipe(
  map(findTokenSelector),
  distinctUntilChanged(),
  filter((value, index) => value === undefined ? index !== 0 : true), //skip initial token,
  switchMap((token) => {
    if (token) {
      authTokenService.nextToken(token);

      return EMPTY;
    }

    authTokenService.reset();

    return of(removedTokenAction());
  }),
);

export { watchTokenChanged };
