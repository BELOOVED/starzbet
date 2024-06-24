import { sort, TSortFunc } from "./Sort";
import { deprecatedGetNotNil } from "./IsNil";

const sortWith = <T>(fns: TSortFunc<T>[], list: T[]) => {
  const sortFn = (a: T, b: T) => {
    let result = 0;
    let i = 0;
    while (result === 0 && i < fns.length) {
      result = deprecatedGetNotNil(fns[i])(a, b);
      i += 1;
    }
    return result;
  }

  return sort(sortFn, list)
}

export { sortWith }
