import { EMPTY, fromEvent, Observable, switchMap } from "rxjs";
import { Epic } from "redux-observable";
import { TExplicitAny } from "../TAny";
import { Cheater } from "../Cheater";
import { Action } from "redux";

const cheaterEpicFactory = <T extends Epic<Action, Action, TExplicitAny, TExplicitAny>>(
  words: string[],
  onCheat: T,
  description: string,
): T => {
  const epic: Epic<Action, Action, TExplicitAny, TExplicitAny> = (action$, state$, dependencies): Observable<Action> => {
    if (typeof window === "undefined") {
      return EMPTY;
    }

    const { isUsed, reset } = Cheater.create(words, description);

    return fromEvent<KeyboardEvent>(window, "keypress")
      .pipe(
        switchMap(() => {
          if (isUsed()) {
            reset();

            return onCheat(action$, state$, dependencies);
          }

          return EMPTY;
        }),
      )
  };

  return epic as unknown as T;
}

export { cheaterEpicFactory };
