import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { TExplicitAny } from "./TAny";
import { Action } from "redux";

type TActionCreator<Args extends TExplicitAny[], Action> = (...args: Args) => Action;

interface IAnyAction extends Action<string> {
  // Allows any extra properties to be defined in an action.
  [extraProps: string]: any;
}

const useAction = <Args extends TExplicitAny[]>(
  actionCreator: TActionCreator<Args, IAnyAction>,
  ...deps: TExplicitAny[]
) => {
  const dispatch = useDispatch();

  return useCallback(
    (...args: Args) => {
      dispatch(actionCreator(...args))
    },
    deps,
  );
};

const useActionWithBind = <Args extends TExplicitAny[]>(
  actionCreator: TActionCreator<Args, IAnyAction>,
  ...args: Args
) => {
  const dispatch = useDispatch();

  return useCallback(
    () => {
      dispatch(actionCreator(...args))
    },
    args,
  );
};

export {
  useAction,
  useActionWithBind,
}

export type {
  IAnyAction,
  TActionCreator,
}
