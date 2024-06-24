import { deepEqual } from "fast-equals";
import { isEmpty } from "./IsEmpty";
import { isArray, isObject } from "./IsTypeOf";
import { TExplicitAny } from "./TAny";

function updateArray(left: Array<TExplicitAny>, right: Array<TExplicitAny>) {
  if (isEmpty(left) && isEmpty(right)) {
    return left;
  }

  if (isEmpty(left) || isEmpty(right)) {
    return right;
  }

  const result: Array<TExplicitAny> = [];

  let isEqualContent = true;
  let isEqualOrder = true;

  right.forEach((rightItem, rightIndex) => {
    const leftIndex = left.findIndex((leftItem) => deepEqual(leftItem, rightItem));

    if (leftIndex !== rightIndex) {
      isEqualOrder = false;
    }

    if (leftIndex === -1) {
      result.push(rightItem);

      isEqualContent = false;
    } else {
      result.push(left[leftIndex]);
    }
  });

  const isEqual = left.length === result.length && isEqualContent && isEqualOrder;

  return isEqual ? left : result;
}

function updateDeepObject(left: Record<string, TExplicitAny>, right: Record<string, TExplicitAny>) {
  let leftPropertyNames = Object.getOwnPropertyNames(left);
  let rightPropertyNames = Object.getOwnPropertyNames(right);

  let isEqual = true;

  if (leftPropertyNames.length !== rightPropertyNames.length) {
    isEqual = false;
  }

  const result: Record<string, TExplicitAny> = {};

  rightPropertyNames.forEach((key) => {
    const rightValue = right[key];

    if (left.hasOwnProperty(key)) {
      const leftValue = left[key];

      const value = updateDeepBase(leftValue, rightValue);

      if (leftValue === value) {
        result[key] = leftValue;
      } else {
        result[key] = value;

        isEqual = false;
      }

      return;
    }

    result[key] = rightValue;

    isEqual = false;
  });

  return isEqual ? left : result;
}

function updateDeepBase<T = unknown>(left: TExplicitAny, right: TExplicitAny): T {
  if (isArray(left) && isArray(right)) {
    return updateArray(left, right) as unknown as T;
  }

  if (isObject(left) && isObject(right)) {
    return updateDeepObject(left, right) as unknown as T;
  }

  return left === right ? left : right;
}

/**
 * If both are arrays
 * - Both empty - returns first
 * - One empty - returns second
 * - Both have same length and every element from second deeply equal element from first with same index - returns first
 * - Returns copy of second with elements from first, that was deeply equal some element from second
 *
 * If both are objects
 * - Same property names and every property from second deeply equal same property from first - returns first
 * - Returns copy of second with properties from first, that was deeply equal same property from second
 *
 * Otherwise
 * - Second shallowly equal first - returns first
 * - Second shallowly not equal first - returns second
 *
 * Rules works for nested properties
 */
function updateDeep<T, U>(left: T, right: U): U;
function updateDeep<T>(left: T): <U>(right: U) => U;

function updateDeep(...args: TExplicitAny[]) {
  if (arguments.length === 1) {
    return function (right: TExplicitAny) {
      return updateDeepBase(args[0], right);
    }
  }

  return updateDeepBase(args[0], args[1]);
}

export { updateDeep };
