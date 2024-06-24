import { Selector, useSelector } from "react-redux";
import { ComponentType, createElement, forwardRef, ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from "react";
import { TExplicitAny } from "../TAny";
import { useParamSelector } from "../ReduxUtils/UseParamSelector";
import { isNotEmpty } from "../IsEmpty";
import { isNotNil } from "../IsNil";
import { TAnyObject } from "../UtilityTypes/TAnyObject";
import { not } from "../Not";
import { isNotVoid } from "../IsVoid";

type TInferType<Type> = Type extends infer Return
  ? Return
  : never;

type TKeysForArgs<
  P extends TAnyObject,
  A extends TExplicitAny[],
  K extends (keyof P)[],
> = TInferType<A> extends TInferType<P[K[number]][]>
  ? K
  : never[]

const withCondition = <State, Props extends TAnyObject>(
  selector: Selector<State, boolean>,
  component: ComponentType<Props>,
) => forwardRef<unknown, Props>((props, ref) => {
    const condition = useSelector(selector);

    if (condition) {
      return createElement(component, { ...props, ref });
    }

    return null;
  },
);


const withCustomCondition = <State, Props extends TAnyObject, Value>(
  toBoolean: (value: Value) => boolean,
  render: (
    selector: Selector<State, boolean>,
    component: ComponentType<Props>,
  ) => ForwardRefExoticComponent<PropsWithoutRef<Props> & RefAttributes<unknown>>,
) => (
  selector: (state: State) => Value,
  component: Parameters<typeof render>[1],
) => {
  const decoratedSelector = (state: State): boolean => toBoolean(selector(state))

  return render(decoratedSelector, component)
}


const withBooleanCondition = withCustomCondition(Boolean, withCondition)
const withFalsyCondition = withCustomCondition(not<boolean>, withCondition)
const withNotNilCondition = withCustomCondition(isNotNil, withCondition)
const withNotEmptyCondition = withCustomCondition(isNotEmpty, withCondition)
const withNotVoidCondition = withCustomCondition(isNotVoid, withCondition)


// TODO improve type for keys -> check order and length in the array
const withParamCondition = <
  State,
  Props extends TAnyObject,
  Args extends TExplicitAny[],
  Keys extends (keyof Props)[],
>(
  selector: (state: State, ...args: Args) => boolean,
  keys: TKeysForArgs<Props, Args, Keys>,
  component: ComponentType<Props>,
) =>
  forwardRef<unknown, Props>((props, ref) => {
      const selectorArgs = keys.map((key) => props[key]);
      const condition = useParamSelector(selector, selectorArgs as Args);

      if (condition) {
        return createElement(component, { ...props, ref });
      }

      return null;
    },
  );


const withCustomParamCondition = <
  State,
  Props extends TAnyObject,
  Args extends TExplicitAny[],
  Keys extends (keyof Props)[],
  Value
>(
  toBoolean: (value: Value) => boolean,
  render: (
    selector: (state: State, ...args: Args) => boolean,
    keys: TKeysForArgs<Props, Args, Keys>,
    component: ComponentType<Props>,
  ) => ForwardRefExoticComponent<PropsWithoutRef<Props> & RefAttributes<unknown>>,
) => (
  selector: (state: State, ...args: Args) => Value,
  keys: Parameters<typeof render>[1],
  component: Parameters<typeof render>[2],
) => {
  const decoratedSelector = (state: State, ...args: Args): boolean => toBoolean(selector(state, ...args))

  return render(decoratedSelector, keys, component)
}


const withBooleanParamCondition = withCustomParamCondition(Boolean, withParamCondition)
const withNotNilParamCondition = withCustomParamCondition(isNotNil, withParamCondition)
const withNotEmptyParamCondition = withCustomParamCondition(isNotEmpty, withParamCondition)


export {
  withCondition,
  withCustomCondition,
  withBooleanCondition,
  withFalsyCondition,
  withNotNilCondition,
  withNotEmptyCondition,
  withNotVoidCondition,
  withParamCondition,
  withCustomParamCondition,
  withBooleanParamCondition,
  withNotNilParamCondition,
  withNotEmptyParamCondition,
};
