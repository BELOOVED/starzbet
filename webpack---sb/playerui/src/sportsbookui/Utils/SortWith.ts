import { curry } from "@sb/utils/Curry";
import { sort } from "@sb/utils";

const baseSortWith = <T>(fns: ((a: T, b: T) => number)[], list: T[]) => sort(
  (a, b) => {
    let result = 0;
    let i = 0;
    while (result === 0 && i < fns.length) {
      result = fns[i]!(a, b);
      i += 1;
    }

    return result;
  },
  list,
);

const sortWith = curry(baseSortWith);

export { sortWith, baseSortWith };
