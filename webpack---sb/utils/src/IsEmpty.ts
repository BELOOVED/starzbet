import { isArray, isObject, isString } from "./IsTypeOf";
import { TExplicitAny } from "./TAny";
import { TArrayMinLength } from "./TArrayMinLength";

function isEmpty<T>(value: T[]): value is [];
function isEmpty(value: TExplicitAny): boolean;

function isEmpty(value: TExplicitAny) {
  if (isArray(value) || isString(value)) {
    return value.length === 0;
  }

  if (value instanceof Set || value instanceof Map) {
    return value.size === 0;
  }

  if (isObject(value)) {
    return Object.entries(value).length === 0;
  }

  return false;
}

function isNotEmpty<T>(value: T[]): value is TArrayMinLength<T, 1>;
function isNotEmpty(value: TExplicitAny): boolean;

function isNotEmpty(value: TExplicitAny) {
  return !isEmpty(value);
}

export { isEmpty, isNotEmpty }
