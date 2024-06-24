import { AnyAction } from "redux";
import { path } from "./Path";
import { assocPath } from "./AssocPath";
import { mergeRight } from "./MergeRight";
import { TAnyObject } from "./UtilityTypes/TAnyObject";

const simpleReducer = <State extends TAnyObject>(
  actionPath: string[] = [],
  statePath?: string[],
  mergeState: Partial<State> = {},
) => (state: State, action: AnyAction): State => {
  const value = path(["payload", ...actionPath], action);

  const nextState = assocPath(statePath ?? actionPath, value, state);

  return mergeRight<State, Partial<State>>(nextState, mergeState);
};

const valueByPathReducer = <State extends TAnyObject, Value>(
  statePath: string[],
  value: Value,
) => (state: State) => assocPath(statePath, value, state);

export {
  simpleReducer,
  valueByPathReducer,
}
