import { pipe } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";
import { deepEqual } from "fast-equals";
import { findTokenSelector } from "../Store/AuthSelectors";

const pipeTokenChanged = pipe(
  map(findTokenSelector),
  distinctUntilChanged(deepEqual),
);

export { pipeTokenChanged };
