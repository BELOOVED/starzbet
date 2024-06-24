import type { TExplicitAny } from "../TAny";
import { isArray } from "../IsTypeOf";
import { isEmpty } from "../IsEmpty";
import { isNil } from "../IsNil";
import type { TNullable } from "../TNullable";
import type { TSelector } from "./TSelector";

/* one property */
function createPropertySelector<S, R, A extends TExplicitAny[],
  P extends keyof R,
>(selector: TSelector<S, R, A>, property: P):
  TSelector<S, R[P], A>;

/* one property */
function createPropertySelector<S, R, A extends TExplicitAny[],
  P1 extends keyof R>(selector: TSelector<S, R, A>, property: [P1]):
  TSelector<S, R[P1], A>;

/* two properties */
function createPropertySelector<S, A extends TExplicitAny[], R,
  P1 extends keyof R,
  P2 extends keyof R[P1]>(selector: TSelector<S, R, A>, property: [P1, P2]):
  TSelector<S, R[P1][P2], A>;

/* three properties */
function createPropertySelector<S, R, A extends TExplicitAny[],
  P1 extends keyof R,
  P2 extends keyof R[P1],
  P3 extends keyof R[P1][P2]>(selector: TSelector<S, R, A>, property: [P1, P2, P3]):
  TSelector<S, R[P1][P2][P3], A>;

/* four properties */
function createPropertySelector<S, R, A extends TExplicitAny[],
  P1 extends keyof R,
  P2 extends keyof R[P1],
  P3 extends keyof R[P1][P2],
  P4 extends keyof R[P1][P2][P3]>(selector: TSelector<S, R, A>, property: [P1, P2, P3, P4]):
  TSelector<S, R[P1][P2][P3][P4], A>;

/* five properties */
function createPropertySelector<S, R, A extends TExplicitAny[],
  P1 extends keyof R,
  P2 extends keyof R[P1],
  P3 extends keyof R[P1][P2],
  P4 extends keyof R[P1][P2][P3],
  P5 extends keyof R[P1][P2][P3][P4]>(selector: TSelector<S, R, A>, property: [P1, P2, P3, P4, P5]):
  TSelector<S, R[P1][P2][P3][P4][P5], A>;

function createPropertySelector(
  selector: TSelector<TExplicitAny, TExplicitAny, TExplicitAny>,
  property: string | number | Array<string | number>,
) {
  if (isEmpty(property)) {
    throw new Error("Property can not be empty");
  }

  if (isArray(property)) {
    return function (state: TExplicitAny, ...args: TExplicitAny[]) {
      let result = selector(state, ...args);

      for (const p of property) {
        result = result[p];
      }

      return result;
    }
  }

  return function (state: TExplicitAny, ...args: TExplicitAny) {
    return selector(state, ...args)[property];
  }
}

/* one property */
function createOptionalPropertySelector<S, R, A extends TExplicitAny[],
  P extends keyof NonNullable<R>>(selector: TSelector<S, R, A>, property: P):
  TSelector<S, TNullable<NonNullable<R>[P]>, A>;

/* one property */
function createOptionalPropertySelector<S, R, A extends TExplicitAny[],
  P1 extends keyof NonNullable<R>>(selector: TSelector<S, R, A>, property: [P1]):
  TSelector<S, TNullable<NonNullable<R>[P1]>, A>;

/* two properties */
function createOptionalPropertySelector<S, R, A extends TExplicitAny[],
  P1 extends keyof NonNullable<R>,
  P2 extends keyof NonNullable<NonNullable<R>[P1]>>(selector: TSelector<S, R, A>, property: [P1, P2]):
  TSelector<S, TNullable<NonNullable<NonNullable<R>[P1]>[P2]>, A>;

/* three properties */
function createOptionalPropertySelector<S, R, A extends TExplicitAny[],
  P1 extends keyof NonNullable<R>,
  P2 extends keyof NonNullable<NonNullable<R>[P1]>,
  P3 extends keyof NonNullable<NonNullable<NonNullable<R>[P1]>[P2]>>(selector: TSelector<S, R, A>, property: [P1, P2, P3]):
  TSelector<S, TNullable<NonNullable<NonNullable<NonNullable<R>[P1]>[P2]>[P3]>, A>;

/* four properties */
function createOptionalPropertySelector<S, R, A extends TExplicitAny[],
  P1 extends keyof NonNullable<R>,
  P2 extends keyof NonNullable<NonNullable<R>[P1]>,
  P3 extends keyof NonNullable<NonNullable<R>[P1]>[P2],
  P4 extends keyof NonNullable<NonNullable<NonNullable<R>[P1]>[P2]>[P3]>(selector: TSelector<S, R, A>, property: [P1, P2, P3, P4]):
  TSelector<S, TNullable<NonNullable<NonNullable<NonNullable<NonNullable<R>[P1]>[P2]>[P3]>[P4]>, A>;

/* five properties */
function createOptionalPropertySelector<S, R, A extends TExplicitAny[],
  P1 extends keyof NonNullable<R>,
  P2 extends keyof NonNullable<NonNullable<R>[P1]>,
  P3 extends keyof NonNullable<NonNullable<NonNullable<R>[P1]>[P2]>,
  P4 extends keyof NonNullable<NonNullable<NonNullable<NonNullable<R>[P1]>[P2]>[P3]>,
  P5 extends keyof NonNullable<NonNullable<NonNullable<NonNullable<NonNullable<R>[P1]>[P2]>[P3]>[P4]>>(selector: TSelector<S, R, A>, property: [P1, P2, P3, P4, P5]):
  TSelector<S, TNullable<NonNullable<NonNullable<NonNullable<NonNullable<NonNullable<R>[P1]>[P2]>[P3]>[P4]>[P5]>, A>;

function createOptionalPropertySelector(
  selector: TSelector<TExplicitAny, TExplicitAny, TExplicitAny>,
  property: string | number | Array<string | number>,
) {
  if (isEmpty(property)) {
    throw new Error("Property can not be empty");
  }

  if (isArray(property)) {
    return function (state: TExplicitAny, ...args: TExplicitAny[]) {
      let result = selector(state, ...args);

      for (const p of property) {
        if (isNil(result)) {
          break;
        }

        result = result[p];
      }

      return result;
    }
  }

  return function (state: TExplicitAny, ...args: TExplicitAny[]) {
    return selector(state, ...args)?.[property];
  }
}

/**
 * @deprecated
 * Use createPropertySelector
 */
function createParamPropertySelector<
  S,
  R,
  A1 extends TExplicitAny[],
  A2 extends [state: S, ...args: A1],
  P extends keyof R,
>(selector: TSelector<S, R, A1>, property: P): (...args: A1) => (state: S) => R[P]

/**
 * @deprecated
 * Use createPropertySelector
 */
function createParamPropertySelector<
  S,
  R,
  A1 extends TExplicitAny[],
  A2 extends [state: S, ...args: A1],
  P1 extends keyof R,
  P2 extends keyof R[P1]>(selector: TSelector<S, R, A1>, property: [P1, P2]): (...args: A1) => (state: S) => R[P1][P2]

function createParamPropertySelector(
  selector: TSelector<TExplicitAny, TExplicitAny, TExplicitAny>,
  property: string | number | Array<string | number>,
) {
  if (isEmpty(property)) {
    throw new Error("Property can not be empty");
  }

  if (isArray(property)) {
    return (...args: TExplicitAny[]) =>
      (state: TExplicitAny) => {
        let result = selector(state, ...args);

        for (const p of property) {
          result = result[p];
        }

        return result;
      }
  }

  return (...args: TExplicitAny) =>
    (state: TExplicitAny) =>
      selector(state, ...args)[property];
}

/**
 * @deprecated
 * Use createOptionalPropertySelector
 */
function createParamOptionalPropertySelector<
  S,
  R,
  A1 extends TExplicitAny[],
  A2 extends [state: S, ...args: A1],
  P extends keyof NonNullable<R>,
>(selector: TSelector<S, R, A1>, property: P): (...args: A1) => (state: S) => TNullable<NonNullable<R>[P]>

/**
 * @deprecated
 * Use createOptionalPropertySelector
 */
function createParamOptionalPropertySelector<
  S,
  R,
  A1 extends TExplicitAny[],
  A2 extends [state: S, ...args: A1],
  P1 extends keyof NonNullable<R>,
  P2 extends keyof NonNullable<NonNullable<R>[P1]>>(selector: TSelector<S, R, A1>, property: [P1, P2]): (...args: A1) => (state: S) => TNullable<NonNullable<NonNullable<R>[P1]>[P2]>

function createParamOptionalPropertySelector(
  selector: TSelector<TExplicitAny, TExplicitAny, TExplicitAny>,
  property: string | number | Array<string | number>,
) {
  if (isEmpty(property)) {
    throw new Error("Property can not be empty");
  }

  if (isArray(property)) {
    return (...args: TExplicitAny[]) =>
      (state: TExplicitAny) => {
        let result = selector(state, ...args);

        for (const p of property) {
          if (isNil(result)) {
            break;
          }

          result = result[p];
        }

        return result;
      }
  }

  return (...args: TExplicitAny[]) =>
    (state: TExplicitAny) =>
      selector(state, ...args)?.[property];
}

export {
  createPropertySelector,
  createOptionalPropertySelector,
  createParamPropertySelector,
  createParamOptionalPropertySelector,
};
