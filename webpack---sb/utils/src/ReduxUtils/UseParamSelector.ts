import type { TExplicitAny } from "../TAny";
import { useSelector } from "react-redux";

const useParamSelector = <S, A extends TExplicitAny[], R>(
  selector: (state: S, ...args: A) => R,
  args: A,
  equalityFn?: Parameters<typeof useSelector<S, R>>[1]
) => useSelector(
  (state: S) => selector(state, ...args),
  equalityFn,
) as A["length"] extends 0
  ? never
  : R;

export { useParamSelector };
