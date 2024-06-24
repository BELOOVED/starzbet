import { TExplicitAny } from "../TAny";
import { actionTypeWithPrefix } from "../ActionTypeWithPrefix";
import { Action } from "redux";

type TActionWithPayload<T> = Action<string> & {
  payload: T;
};

const createAction = (prefix: string, type: string) => (): Action<string> => ({
  type: actionTypeWithPrefix(prefix)(type),
});

const createActionWithPayload = <Args extends TExplicitAny[] = TExplicitAny[], Payload = TExplicitAny>(
  prefix: string, type: string, payload: (...args: Args) => Payload) => (...args: Args): TActionWithPayload<Payload> => ({
  type: actionTypeWithPrefix(prefix)(type),
  payload: payload(...args),
});

const actionCreator = (prefix: string) => (type: string) => createAction(prefix, type);

const actionWithPayloadCreator = (prefix: string) => <Args extends TExplicitAny[] = TExplicitAny[], Payload = TExplicitAny>(
  type: string,
  payload: (...args: Args) => Payload) => createActionWithPayload<Args, Payload>(prefix, type, payload);

export {
  createAction,
  createActionWithPayload,
  actionCreator,
  actionWithPayloadCreator
}

export type {
  TActionWithPayload
}
