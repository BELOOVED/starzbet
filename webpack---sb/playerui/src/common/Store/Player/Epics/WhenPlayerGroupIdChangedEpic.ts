import { type Epic } from "redux-observable";
import { distinctUntilChanged, map, switchMap } from "rxjs/operators";
import { filter } from "rxjs";
import { type Action } from "redux";
import { playerDetailsSelectors } from "../Selectors/PlayerSelectors";

const whenPlayerGroupIdChangedEpic = <E extends Epic<Action, Action>>(epic: E): Epic<Action, Action> => (
  action$,
  state$,
  dependencies,
) => state$.pipe(
  map(playerDetailsSelectors.groupId),
  distinctUntilChanged(),
  filter(Boolean),
  switchMap(() => epic(action$, state$, dependencies)),
);

export { whenPlayerGroupIdChangedEpic };
