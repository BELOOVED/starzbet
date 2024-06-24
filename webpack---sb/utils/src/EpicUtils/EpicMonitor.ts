import { Epic } from "redux-observable";
import { finalize } from "rxjs/operators";
import { defer, Observable } from "rxjs";
import { TExplicitAny } from "../TAny";

const __runningNow: Record<string, number> = {};

if (typeof window !== 'undefined') {
  (window as TExplicitAny).__runningNow = __runningNow;
}

const startWithTap = <T>(callback: () => void) =>
  (source: Observable<T>) => defer(() => {
    callback();

    return source;
  });

// todo^eb add uniq id
const epicMonitor = <T extends Epic = Epic>(base: T, name: string): Epic => (...args) => {
  const uniqName = `${name}__${Math.random()}`;

  return base(...args).pipe(
    startWithTap(() => {
      __runningNow[uniqName] = Date.now();
    }),
    finalize(() => {
      delete __runningNow[uniqName];
    }),
  );
};

export { epicMonitor };
