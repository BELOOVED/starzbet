import { assocPath, dissocPath, last } from "ramda";
import { deprecatedGetNotNil, isNil, isNotEmpty, isString, isVoid, type TNullable } from "@sb/utils";
import { type IWithFormsState, type TFieldPath, type TFieldValue } from "../../Types";
import { selectFieldDef, selectFieldDefResolver, selectFieldValue } from "../../Store";
import { fieldValidator, formValidator, listValidator, objectFieldValidator } from "../../Validators";
import { createPathToFieldValue } from "../Builders";
import { KindService } from "../KindService";
import { assertArrayLength, ReducerError } from "../Asserts";
import { isFieldDef, isFormDef, isListDef, isObjectFieldDef, isOneOfDef } from "../DefTypeCheckers";
import { isFromValueArray } from "../IsFromValueArray";

// todo @form-new - refactor? comments?
const setFormFieldValueRecursive = <S extends IWithFormsState = IWithFormsState>(
  state: S,
  fieldPath: TFieldPath,
  value: TNullable<TFieldValue>,
  formName: string,
  currentPosition = 0,
): S => {
  /** insert value if we are at the end of the path to value */
  if (currentPosition > fieldPath.length) {
    return assocPath(createPathToFieldValue(formName, KindService.getPathWithoutKinds(fieldPath)), value, state);
  }

  const currentFieldPath = fieldPath.slice(0, currentPosition);
  const nextFieldPath = fieldPath.slice(0, currentPosition + 1);
  const currentValue = selectFieldValue(state, formName, currentFieldPath);
  const nextValue = nextFieldPath.length === fieldPath.length ? value : selectFieldValue(state, formName, nextFieldPath);
  const currentDef = selectFieldDef(state, formName, currentFieldPath);

  if (!currentDef) {
    throw ReducerError.typeError(currentFieldPath, `Field not defined in form "${formName}"`);
  }

  if (isFieldDef(currentDef)) {
    fieldValidator(currentDef, nextFieldPath, nextValue);

    return setFormFieldValueRecursive(
      state,
      fieldPath,
      value,
      formName,
      currentPosition + 1,
    );
  }

  if (isObjectFieldDef(currentDef)) {
    objectFieldValidator(currentDef, nextFieldPath, nextValue);

    return setFormFieldValueRecursive(
      state,
      fieldPath,
      value,
      formName,
      currentPosition + 1,
    );
  }

  if (isOneOfDef(currentDef)) {
    const currentField = last(currentFieldPath);
    const typeResolver = deprecatedGetNotNil(selectFieldDefResolver(state, formName, currentFieldPath));

    if (isNil(currentField)) {
      throw ReducerError.typeError(fieldPath, "Invalid path");
    }

    const kindOfDef = KindService.getKind(currentField) ?? typeResolver(nextValue, currentFieldPath, formName, state);

    if (isNil(kindOfDef)) {
      throw ReducerError.typeError(currentFieldPath, "Field cannot extract kind of definition");
    }

    const selectedOneOfDef = currentDef.fields[kindOfDef];

    if (isNil(selectedOneOfDef)) {
      throw ReducerError.typeError(currentFieldPath, "Field cannot extract definition from kind");
    }

    return setFormFieldValueRecursive(state, fieldPath, value, formName, currentPosition + 1);
  }

  if (isListDef(currentDef)) {
    listValidator(currentFieldPath, currentValue);
    assertArrayLength(nextValue, nextFieldPath, formName, state);

    if (currentFieldPath.length === fieldPath.length) {
      listValidator(fieldPath, nextValue);

      if (isVoid(nextValue)) {
        return setFormFieldValueRecursive(
          state,
          fieldPath,
          nextValue,
          formName,
          currentPosition + 1,
        );
      }

      if (isFromValueArray(nextValue) && isNotEmpty(nextValue)) {
        return nextValue.reduce<S>(
          (nextState, itemValue, index) => setFormFieldValueRecursive(
            nextState,
            [...fieldPath, index],
            itemValue,
            formName,
            currentPosition + 1,
          ),
          dissocPath(createPathToFieldValue(formName, fieldPath), state),
        );
      }
    }

    const currentPathItem = fieldPath[currentPosition];
    if (isString(currentPathItem) && !isNaN(Number(currentPathItem))) {
      fieldPath[currentPosition] = parseInt(currentPathItem, 10);
    }

    return setFormFieldValueRecursive(state, fieldPath, value, formName, currentPosition + 1);
  }

  if (isFormDef(currentDef)) {
    formValidator(currentFieldPath, currentValue);

    if (currentFieldPath.length === fieldPath.length) {
      formValidator(fieldPath, nextValue);

      if (isVoid(nextValue)) {
        return setFormFieldValueRecursive(
          state,
          fieldPath,
          nextValue,
          formName,
          currentPosition + 1,
        );
      }

      // TODO implement here deeper recursive call
    }

    return setFormFieldValueRecursive(state, fieldPath, value, formName, currentPosition + 1);
  }

  const type = (currentDef as Record<"type", string>).type;
  throw ReducerError.typeError(currentFieldPath, `Not supported definition type: "${type}"`);
};

export { setFormFieldValueRecursive };
