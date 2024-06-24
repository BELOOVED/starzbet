import { TExplicitAny } from "./TAny";
import { isArray, isBoolean, isFunction, isNumber, isObject, isPrimitive, isString } from "./IsTypeOf";
import { TNil } from "./TNil";

function assertIsObject(value: TExplicitAny): asserts value is object {
  if (!isObject(value)) {
    throw new Error("Expected 'object'");
  }
}

function assertIsNumber(value: TExplicitAny, errorContext: string): asserts value is number {
  if (!isNumber(value)) {
    throw new Error(`${errorContext}: Expected 'number'`);
  }
}

function assertIsString<V extends string = string>(value: TExplicitAny, errorContext: string): asserts value is V {
  if (!isString(value)) {
    throw new Error(`${errorContext}: Expected 'string'`);
  }
}

function assertIsBoolean(value: TExplicitAny): asserts value is boolean {
  if (!isBoolean(value)) {
    throw new Error("Expected 'boolean'");
  }
}

function assertIsFunction(value: TExplicitAny): asserts value is (...args: unknown[]) => unknown {
  if (!isFunction(value)) {
    throw new Error("Expected 'function'");
  }
}

function assertIsPrimitive(value: TExplicitAny): asserts value is (string | number | boolean | TNil) {
  if (!isPrimitive(value)) {
    throw new Error("Expected 'string' | 'number' | 'boolean' | 'null' | 'undefined'");
  }
}

function assertIsArray(value: TExplicitAny): asserts value is Array<unknown> {
  if (!isArray(value)) {
    throw new Error("Expected 'Array'");
  }
}

export {
  assertIsObject,
  assertIsNumber,
  assertIsString,
  assertIsBoolean,
  assertIsFunction,
  assertIsPrimitive,
  assertIsArray,
}
