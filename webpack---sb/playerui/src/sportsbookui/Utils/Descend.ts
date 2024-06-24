import { curry } from "@sb/utils/Curry";

const descend = curry(<T>(fn: (a: T) => number, a: T, b: T) => {
  const aa = fn(a);
  const bb = fn(b);

  if (aa > bb) {
    return -1;
  }

  return aa < bb ? 1 : 0;
});

export { descend };
