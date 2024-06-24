import { ActionCreator, AnyAction } from "redux";
import { TExplicitAny } from "./TAny";

export type TReducer<S extends TExplicitAny, AC extends ActionCreator<AnyAction>, FS extends TExplicitAny = TExplicitAny> = (
  state: S,
  action: ReturnType<AC>,
  fullState: FS,
) => S

export type TFullStateReducer<S extends TExplicitAny, AC extends ActionCreator<AnyAction>> = (
  state: S,
  action: ReturnType<AC>,
) => S

export const mergeReducer = <A extends ActionCreator<AnyAction>, S extends TExplicitAny>(
  ...reducers: TFullStateReducer<S, A>[]
) => (state: S, action: ReturnType<A>) => reducers
  .reduce((nextState, reducer) => reducer(nextState, action), state);
