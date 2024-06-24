import { type TExplicitAny } from "./TAny";
import { type TNil } from "./TNil";
import { isNil, isNotNil } from "./IsNil";
import { anyPass } from "./AnyPass";

const isTypeof = (value: unknown, type: string): boolean => typeof value === type;

const isObject = (value: unknown): value is object => isTypeof(value, "object") && value !== null;

const isNumber = (value: unknown): value is number => isTypeof(value, "number") && !isNaN(value as number);

const isString = (value: unknown): value is string => isTypeof(value, "string");

const isBoolean = (value: unknown): value is boolean => isTypeof(value, "boolean");

const TO_STRING_FUNCTION_VALUES = ["[object AsyncFunction]", "[object Function]"] as const;

function isFunction(value: unknown): value is (...args: TExplicitAny[]) => TExplicitAny {
  return isNotNil(value) && TO_STRING_FUNCTION_VALUES.includes(({}).toString.call(value))
}

const isPrimitive = (value: unknown): value is (string | number | boolean | TNil) =>
  anyPass([isString, isNumber, isBoolean, isNil])(value);

const { isArray } = Array;

export {
  isTypeof,
  isObject,
  isNumber,
  isString,
  isBoolean,
  isFunction,
  isPrimitive,
  isArray,
}
