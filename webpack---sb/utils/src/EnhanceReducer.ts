import { shallowEqual } from "fast-equals";
import { Action } from "redux";
import { path } from "./Path";
import { assocPath } from "./AssocPath";

type TPartSelector<S> = (s: S) => string[]

type TPart<S = unknown> = string | TPartSelector<S>;

export const enhanceReducer = <State extends object, Part, A extends Action>(
  part: TPart<State>,
  reducer: (part: Part | null | undefined, action: A, sate: State) => Part
) => (state: State, action: A) => {
  const pathToPart = typeof part === "string" ? [part] : part(state);

  const statePart = path<Part>(pathToPart, state);

  const nextStatePart = reducer(statePart, action, state);

  if (!shallowEqual(nextStatePart, statePart)) {
    return assocPath(pathToPart, nextStatePart, state);
  }

  return state;
};
