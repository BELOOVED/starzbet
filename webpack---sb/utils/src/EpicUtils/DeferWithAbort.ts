import { EMPTY, from, Observable, ObservableInput, ObservedValueOf } from "rxjs";
import { TExplicitAny } from "../TAny";

function deferWithAbort<R extends ObservableInput<TExplicitAny> | void>(
  observableFactory: (signal: AbortSignal) => R,
): Observable<ObservedValueOf<R>> {
  return new Observable<ObservedValueOf<R>>((subscriber) => {
    const abortController = new AbortController();

    let input: R | void;

    // setTimeout(() => {
    //   abortController.abort();
    // }, 100);

    try {
      input = observableFactory(abortController.signal);
    } catch (err) {
      subscriber.error(err);

      return () => {
        abortController.abort();
      };
    }

    const source = input
      ? from(input as ObservableInput<ObservedValueOf<R>>)
      : EMPTY;

    return source.subscribe(subscriber).add(() => {
      abortController.abort();
    });
  });
}

export { deferWithAbort };
