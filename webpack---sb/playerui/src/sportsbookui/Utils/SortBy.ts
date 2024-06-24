import { sort, type TExplicitAny } from "@sb/utils";

function sortBy<T>(fn: (v: T) => TExplicitAny): (list: T[]) => T[];
function sortBy<T>(fn: (v: T) => TExplicitAny, list: T[]): T[];

function sortBy(...args: TExplicitAny) {
  if (args.length === 1) {
    return (array: TExplicitAny[]) => sort(extractor(args[0]), array);
  }

  // ignore not used args for backward compatibility
  const [fn, list] = args;

  return sort(extractor(fn), list);
}

const extractor = <T>(fn: (v: T) => TExplicitAny) => (a: T, b: T) => {
  const aa = fn(a);
  const bb = fn(b);

  if (aa < bb) {
    return -1;
  }

  return aa > bb ? 1 : 0;
};

export { sortBy };
