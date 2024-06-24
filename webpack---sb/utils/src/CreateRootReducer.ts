// @ts-nocheck
import { getType } from "./GetType";
import { Action, AnyAction } from "redux";

export type ExtendedReducer<S = any, A extends Action = AnyAction, F = any> = (
  state: S | undefined,
  action: A,
  fullState?: Readonly<F>,
) => S;

export const createRootReducer = <S>(reducerMap): ExtendedReducer<S> => {
  const map = reducerMap.reduce((acc, [reducer, ...actions]) => createMap(actions, reducer, acc), {});

  return (state = null, action, fullState) => {
    return map.hasOwnProperty(action.type)
      ? map[action.type].reduce((nextState, reducer) => reducer(nextState, action, fullState), state)
      : state;
  };
};

const createMap = (actions, reducer, prevMap) => actions.reduce((acc, action) => {
  const type = getType(action);

  if (!acc.hasOwnProperty(type)) {
    acc[type] = [];
  }

  acc[type].push(reducer);

  return acc;
}, prevMap);
