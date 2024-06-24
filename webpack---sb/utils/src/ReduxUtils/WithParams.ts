import type { TSelector } from "./TSelector";
import type { TExplicitAny } from "../TAny";

const withParams = <S, A extends TExplicitAny[], R>(selector: (state: S, ...args: A) => R, ...args: A): TSelector<S, R, never> =>
  (state: S) =>
    selector(state, ...args);

/**
 * @deprecated
 * !!DO NOT USE!!
 * Only to temporary handle incorrect selectors according to reselect 4.1.7
 */
const toDeprecatedSelector = <S, R, A extends TExplicitAny[]>(selector: TSelector<S, R, A>) => (...args: A) =>
  (state: S) => selector(state, ...args);

export {withParams, toDeprecatedSelector};
