import { createDispatchHook, createSelectorHook, type ReactReduxContextValue } from "react-redux";
import { createContext, type Context } from "react";
import { type TExplicitAny } from "@sb/utils";

const TranslatorEditorContext: Context<TExplicitAny> = createContext(null as unknown as ReactReduxContextValue);

const useDispatch = createDispatchHook(TranslatorEditorContext);

const useSelector = createSelectorHook(TranslatorEditorContext);

const useParamSelector = <S, A extends TExplicitAny[], R>(
  selector: (state: S, ...args: A) => R,
  args: A,
  equalityFn?: Parameters<typeof useSelector<S, R>>[1],
) => useSelector(
  (_: S) => selector(_, ...args),
  equalityFn,
) as A["length"] extends 0
  ? never
  : R;

export {
  TranslatorEditorContext,
  useDispatch,
  useSelector,
  useParamSelector,
};
