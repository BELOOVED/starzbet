import { distinctUntilChanged, map, switchMap } from "rxjs/operators";
import { combineEpics, type Epic } from "redux-observable";
import { EMPTY } from "rxjs";
import { isNil } from "@sb/utils";
import { playerDetailsSelectors } from "../Selectors/PlayerSelectors";

const whenPlayerIdExist = (...epics: Epic[]): Epic => (action$, state$, dependencies) => state$.pipe(
  map(playerDetailsSelectors.id),
  distinctUntilChanged(),
  switchMap((id) => {
    if(isNil(id)) {
      return EMPTY;
    }

    return combineEpics(...epics)(action$, state$, dependencies);
  }),
);

export { whenPlayerIdExist };
