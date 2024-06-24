import type { TExplicitAny } from "../TAny";
import type { TMergeArrays } from "../TMergeArrays";
import type { TSelector } from "./TSelector";
import { USE_STRICT_MODE } from "../UseStrict";

const REDUNDANT_COMBINE_SELECTORS_MESSAGE = "Usage of combineSelectors with createSimpleSelector is redundant - create regular selector";

/* one selector */
function createSimpleSelector<
  S1,
  R1,
  A1 extends TExplicitAny[],
  T,
>(
  selectors: [
    TSelector<S1, R1, A1>,
  ],
  combiner: (res: R1) => T,
): TSelector<S1, T, A1>;

/* two selectors */
function createSimpleSelector<
  S1, S2,
  R1, R2,
  A1 extends TExplicitAny[], A2 extends TExplicitAny[],
  T,
>(
  selectors: [
    TSelector<S1, R1, A1>,
    TSelector<S2, R2, A2>,
  ],
  combiner: (res1: R1, res2: R2) => T,
): TSelector<
  S1 & S2,
  T,
  TMergeArrays<[A1, A2]>
>;

/* three selectors */
function createSimpleSelector<
  S1, S2, S3,
  R1, R2, R3,
  A1 extends TExplicitAny[], A2 extends TExplicitAny[], A3 extends TExplicitAny[],
  T,
>(
  selectors: [
    TSelector<S1, R1, A1>,
    TSelector<S2, R2, A2>,
    TSelector<S3, R3, A3>,
  ],
  combiner: (res1: R1, res2: R2, res3: R3) => T,
): TSelector<
  S1 & S2 & S3,
  T,
  TMergeArrays<[A1, A2, A3]>
>;

/* four selectors */
function createSimpleSelector<
  S1, S2, S3, S4,
  R1, R2, R3, R4,
  A1 extends TExplicitAny[], A2 extends TExplicitAny[], A3 extends TExplicitAny[], A4 extends TExplicitAny[],
  T,
>(
  selectors: [
    TSelector<S1, R1, A1>,
    TSelector<S2, R2, A2>,
    TSelector<S3, R3, A3>,
    TSelector<S4, R4, A4>,
  ],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4) => T,
): TSelector<
  S1 & S2 & S3 & S4,
  T,
  TMergeArrays<[A1, A2, A3, A4]>
>;

/* five selectors */
function createSimpleSelector<
  S1, S2, S3, S4, S5,
  R1, R2, R3, R4, R5,
  A1 extends TExplicitAny[], A2 extends TExplicitAny[], A3 extends TExplicitAny[], A4 extends TExplicitAny[], A5 extends TExplicitAny[],
  T,
>(
  selectors: [
    TSelector<S1, R1, A1>,
    TSelector<S2, R2, A2>,
    TSelector<S3, R3, A3>,
    TSelector<S4, R4, A4>,
    TSelector<S5, R5, A5>,
  ],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5) => T,
): TSelector<
  S1 & S2 & S3 & S4 & S5,
  T,
  TMergeArrays<[A1, A2, A3, A4, A5]>
>;

/* six selectors */
function createSimpleSelector<
  S1, S2, S3, S4, S5, S6,
  R1, R2, R3, R4, R5, R6,
  A1 extends TExplicitAny[], A2 extends TExplicitAny[], A3 extends TExplicitAny[], A4 extends TExplicitAny[], A5 extends TExplicitAny[], A6 extends TExplicitAny[],
  T,
>(
  selectors: [
    TSelector<S1, R1, A1>,
    TSelector<S2, R2, A2>,
    TSelector<S3, R3, A3>,
    TSelector<S4, R4, A4>,
    TSelector<S5, R5, A5>,
    TSelector<S6, R6, A6>,
  ],
  combiner: (res1: R1, res2: R2, res3: R3, res4: R4, res5: R5, res6: R6) => T,
): TSelector<
  S1 & S2 & S3 & S4 & S5 & S6,
  T,
  TMergeArrays<[A1, A2, A3, A4, A5, A6]>
>;

function createSimpleSelector(selectors: TExplicitAny[], combiner: TExplicitAny) {
  // @ts-ignore
  if (selectors.__COMBINED_SELECTORS__) {
    if (USE_STRICT_MODE) {
      throw new Error(REDUNDANT_COMBINE_SELECTORS_MESSAGE);
    } else {
      console.error(REDUNDANT_COMBINE_SELECTORS_MESSAGE);
    }
  }

  return function (state: TExplicitAny, ...args: TExplicitAny[]) {
    return combiner(...selectors.reduce((acc, cur) => [...acc, cur(state, ...args)], []))
  }
}

export { createSimpleSelector };

