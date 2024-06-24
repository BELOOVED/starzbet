import { TExplicitAny } from "./TAny";
import { sort } from "./Sort";

const sortBy = <T>(fn: (value: T) => TExplicitAny, list: T[]) => sort((a, b) => {
  const aa = fn(a);
  const bb = fn(b);
  if(aa < bb) {
    return -1
  }
  return aa > bb ? 1 : 0;
}, list);

export { sortBy }
