import { isNotNil, type TNullable, isArray } from "@sb/utils";
import { type IFieldDef, type IObjectFieldDef, type TFieldPath, type TFieldDef, type TFieldValue } from "../Types";
import {
  assertArray,
  assertObject,
  assertPrimitive,
  isFieldDef,
  isFormDef,
  isListDef,
  isObjectFieldDef,
  isOneOfDef,
  ReducerError,
} from "../Utils";

const fieldValidator = (
  fieldDef: IFieldDef,
  fieldPath: TFieldPath,
  value: TNullable<TFieldValue>,
) => {
  if (!fieldDef.multi) {
    assertPrimitive(value, fieldPath);
  }

  if (fieldDef.multi) {
    assertArray(value, fieldPath);

    if (isNotNil(value) && isArray(value)) {
      for (const item of value) {
        // @ts-ignore FIXME @strong-ts
        assertPrimitive(item, fieldPath, "array");
      }
    }
  }
};

const objectFieldValidator = (
  objectFieldDef: IObjectFieldDef,
  fieldPath: TFieldPath,
  value: TNullable<TFieldValue>,
) => {
  if (!objectFieldDef.multi) {
    assertObject(value, fieldPath);
  }

  if (objectFieldDef.multi) {
    assertArray(value, fieldPath);

    if (isNotNil(value) && isArray(value)) {
      for (const item of value) {
        // @ts-ignore FIXME @strong-ts
        assertObject(item, fieldPath, "array");
      }
    }
  }
};

const listValidator = (
  fieldPath: TFieldPath,
  value: TNullable<TFieldValue>,
) => {
  assertArray(value, fieldPath);
};

const formValidator = (
  fieldPath: TFieldPath,
  value: TNullable<TFieldValue>,
) => {
  assertObject(value, fieldPath);
};

const oneOfValidator = (
  def: TFieldDef,
  fieldPath: TFieldPath,
  value: TNullable<TFieldValue>,
) => {
  if (isFieldDef(def)) {
    fieldValidator(def, fieldPath, value);

    return;
  }

  if (isObjectFieldDef(def)) {
    objectFieldValidator(def, fieldPath, value);

    return;
  }

  if (isFormDef(def)) {
    formValidator(fieldPath, value);

    return;
  }

  if (isListDef(def)) {
    listValidator(fieldPath, value);

    return;
  }

  if (isOneOfDef(def)) {
    throw ReducerError.typeError(fieldPath, "OneOf field cannot exist inside another oneOf field");
  }

  const type = (def as Record<"type", string>).type;
  throw ReducerError.typeError(fieldPath, `Not supported definition type: "${type}"`);
};

export {
  formValidator,
  objectFieldValidator,
  fieldValidator,
  oneOfValidator,
  listValidator,
};
