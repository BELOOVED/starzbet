import { isFunction, isObject } from "./IsTypeOf";

type TMaybePromise<Value, PromiseValue = Value> = Value | Promise<PromiseValue>;

const isPromise = <Value, PromiseValue = Value>(
  value: TMaybePromise<Value, PromiseValue>
): value is Promise<PromiseValue> => isObject(value) && isFunction(value.then);

const extractMaybePromise = async <T>(value: TMaybePromise<T>): Promise<T> => {
  if (!isPromise(value)) {
    return value;
  }
  
  return await value;
};

export { type TMaybePromise, isPromise, extractMaybePromise };
