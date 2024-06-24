import { isArray, isNil, isNotNil, isObject, isPrimitive, type TNullable } from "@sb/utils";
import { type IWithFormsState, type TFieldPath, type TFieldValue } from "../Types";
import { selectFieldDef, selectFieldValue } from "../Store";
import { fieldValidator, formValidator, listValidator, objectFieldValidator } from "../Validators";
import { isFieldDef, isFormDef, isListDef, isObjectFieldDef, isOneOfDef } from "./DefTypeCheckers";

class ReducerError extends Error {
  static typeError(path: TFieldPath, reason: string) {
    return new ReducerError(`Invalid field: "${path.join(" > ")}". ${reason}.`);
  }
}

const assertPrimitive = (value: TNullable<TFieldValue>, path: TFieldPath, parentType?: string) => {
  if (isNotNil(value) && !isPrimitive(value)) {
    const reason = parentType ? `Values in the ${parentType} must be primitives` : "Value must be primitive";
    throw ReducerError.typeError(path, reason);
  }
};

const assertObject = (value: TNullable<TFieldValue>, path: TFieldPath, parentType?: string) => {
  if (isNotNil(value) && (!isObject(value) || isArray(value))) {
    const reason = parentType ? `Values in the ${parentType} must be objects` : "Value must be an object";

    throw ReducerError.typeError(path, reason);
  }
};

const assertArray = (value: TNullable<TFieldValue>, path: TFieldPath, parentType?: string) => {
  if (isNotNil(value) && !isArray(value)) {
    const reason = parentType ? `Values in the ${parentType} must be arrays` : "Value must be an array";

    throw ReducerError.typeError(path, reason);
  }
};

/** throw error if index of next value in array is invalid. valid index is no bigger than array length */
const assertArrayLength = (nextValue: TNullable<TFieldValue>, path: TFieldPath, formName: string, state: IWithFormsState) => {
  if (isNotNil(nextValue)) {
    const pathToList = path.slice(0, path.length - 1);
    const listValue = selectFieldValue<TFieldValue[]>(state, formName, pathToList);
    const indexOfNextValue = path[path.length - 1];

    if (isNil(indexOfNextValue)) {
      throw ReducerError.typeError(path, "Invalid path to value in the array: index of next value is undefined");
    }

    // todo @Gleb Yakush fix me
    // @ts-ignore
    if (isNotNil(listValue) && indexOfNextValue > listValue.length) {
      throw ReducerError.typeError(path, "Invalid path to value in the array: index of next value bigger than array length");
    }
  }
};

/** throw error if next value in item of array is invalid */
const assertArrayItemValue = (nextValue: TNullable<TFieldValue>, path: TFieldPath, formName: string, state: IWithFormsState) => {
  assertArrayLength(nextValue, path, formName, state);

  if (isNotNil(nextValue)) {
    const pathToList = path.slice(0, path.length - 1);
    const pathToListChild = [...pathToList, 0];
    const listChildDef = selectFieldDef(state, formName, pathToListChild);

    if (isFieldDef(listChildDef)) {
      fieldValidator(listChildDef, path, nextValue);
    }

    if (isObjectFieldDef(listChildDef)) {
      objectFieldValidator(listChildDef, path, nextValue);
    }

    if (isFormDef(listChildDef)) {
      formValidator(path, nextValue);
    }

    if (isListDef(listChildDef)) {
      listValidator(path, nextValue);
    }

    if (isOneOfDef(listChildDef)) {
      // TODO implement something
    }
  }
};

export {
  ReducerError,
  assertArray,
  assertArrayLength,
  assertArrayItemValue,
  assertObject,
  assertPrimitive,
};
