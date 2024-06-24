import type { TExplicitAny } from "../TAny";

const createPropertySelectors = <S, T extends Record<string, TExplicitAny>, A extends never | TExplicitAny[]>(
  selector: (state: S, ...args: A) => T,
): { [P in keyof Required<T>]: (state: S, ...args: A) => T[P]; } =>
  new Proxy({} as T, {
    get: (_, name) =>
      (state: S, ...args: A) =>
        selector(state, ...args)[name as keyof T],
  });

export { createPropertySelectors };
