/**
 * It is impossible to use selectors with different parameters with createMemoSelector
 * For those cases this function must be used to specify which parameters go to which selector
 */
import type { TExplicitAny } from "../TAny";
import type { TSelector } from "./TSelector";

type TOrReadonly<T> = T | Readonly<T>;

/* two selectors */
function combineSelectors<
  S1, S2,
  R1, R2,
  A extends TExplicitAny[],
  A1 extends TExplicitAny[], A2 extends TExplicitAny[],
>(
  selectors: [
    TSelector<S1, R1, A1>,
    TSelector<S2, R2, A2>,
  ],
  combiner: (...args: A) => TOrReadonly<[TOrReadonly<A1>, TOrReadonly<A2>]>,
): [
  TSelector<S1, R1, A>,
  TSelector<S2, R2, A>,
];

/* three selectors */
function combineSelectors<
  S1, S2, S3,
  R1, R2, R3,
  A extends TExplicitAny[],
  A1 extends TExplicitAny[], A2 extends TExplicitAny[], A3 extends TExplicitAny[],
>(
  selectors: [
    TSelector<S1, R1, A1>,
    TSelector<S2, R2, A2>,
    TSelector<S3, R3, A3>,
  ],
  combiner: (...args: A) => TOrReadonly<[TOrReadonly<A1>, TOrReadonly<A2>, TOrReadonly<A3>]>,
): [
  TSelector<S1, R1, A>,
  TSelector<S2, R2, A>,
  TSelector<S3, R3, A>,
];

/* four selectors */
function combineSelectors<
  S1, S2, S3, S4,
  R1, R2, R3, R4,
  A extends TExplicitAny[],
  A1 extends TExplicitAny[], A2 extends TExplicitAny[], A3 extends TExplicitAny[], A4 extends TExplicitAny[],
>(
  selectors: [
    TSelector<S1, R1, A1>,
    TSelector<S2, R2, A2>,
    TSelector<S3, R3, A3>,
    TSelector<S4, R4, A4>,
  ],
  combiner: (...args: A) => TOrReadonly<[TOrReadonly<A1>, TOrReadonly<A2>, TOrReadonly<A3>, TOrReadonly<A4>]>,
): [
  TSelector<S1, R1, A>,
  TSelector<S2, R2, A>,
  TSelector<S3, R3, A>,
  TSelector<S4, R4, A>,
];

/* five selectors */
function combineSelectors<
  S1, S2, S3, S4, S5,
  R1, R2, R3, R4, R5,
  A extends TExplicitAny[],
  A1 extends TExplicitAny[], A2 extends TExplicitAny[], A3 extends TExplicitAny[], A4 extends TExplicitAny[], A5 extends TExplicitAny[],
>(
  selectors: [
    TSelector<S1, R1, A1>,
    TSelector<S2, R2, A2>,
    TSelector<S3, R3, A3>,
    TSelector<S4, R4, A4>,
    TSelector<S5, R5, A5>,
  ],
  combiner: (...args: A) => TOrReadonly<[TOrReadonly<A1>, TOrReadonly<A2>, TOrReadonly<A3>, TOrReadonly<A4>, TOrReadonly<A5>]>,
): [
  TSelector<S1, R1, A>,
  TSelector<S2, R2, A>,
  TSelector<S3, R3, A>,
  TSelector<S4, R4, A>,
  TSelector<S5, R5, A>,
];

function combineSelectors(selectors: TExplicitAny[], combiner: TExplicitAny) {
  let combined: TExplicitAny = null;

  const result = selectors
    .map(
      (func, index) =>
        (state: TExplicitAny, ...args: TExplicitAny[]) => {
          if (index === 0) {
            combined = combiner(...args);
          }

          return func(state, ...combined[index]);
        },
    );

  /**
   * Using this function not with createMemoSelector is redundant - unfortunately there was such usages
   * Flag added to throw error when used with createSimpleSelector
   */
  // @ts-ignore
  result.__COMBINED_SELECTORS__ = true;

  return result;
}

export { combineSelectors };
