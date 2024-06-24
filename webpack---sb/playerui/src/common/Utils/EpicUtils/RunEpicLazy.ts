import { from, switchMap } from "rxjs";
import { type Epic } from "redux-observable";
import type { Action } from "redux";

const runEpicLazy = <
  Input extends Action = Action,
  Output extends Input = Input,
  State = unknown,
  D = unknown
>(lazySource: () => Promise<Epic<Input, Output, State, D>>): Epic<Input, Output, State, D> => (
    action$,
    state$,
    deps,
  ) =>
    from(lazySource())
      .pipe(
        switchMap(
          (lazyEpic) => lazyEpic(action$, state$, deps),
        ),
      );

export { runEpicLazy };
