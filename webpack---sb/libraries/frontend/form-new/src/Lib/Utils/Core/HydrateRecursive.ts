import { deprecatedGetNotNil, isArray, isNil, isNotEmpty, isNotNil, isVoid } from "@sb/utils";
import { type IWithFormsState, type TFieldDef, type TFieldPath, type TFieldValue } from "../../Types";
import { selectFieldDef, selectFieldDefResolver, setFormFieldValue } from "../../Store";
import { fieldValidator, formValidator, listValidator, objectFieldValidator, oneOfValidator } from "../../Validators";
import { KindService } from "../KindService";
import { isFieldDef, isFormDef, isListDef, isObjectFieldDef, isOneOfDef } from "../DefTypeCheckers";
import { ReducerError } from "../Asserts";
import { isFromValueArray } from "../IsFromValueArray";

const hydrateRecursive = <S extends IWithFormsState = IWithFormsState>(
  state: S,
  formName: string,
  values: Exclude<TFieldValue, null>,
  path: TFieldPath = [],
): S => {
  let nextState = state;

  Object.entries(values)
    .forEach(([key, currentValue]: [key: string, currentValue: TFieldValue]) => {
      const currentFieldPath = [...path, key];

      const currentDef = selectFieldDef(state, formName, currentFieldPath);

      if (!currentDef) {
        throw ReducerError.typeError(currentFieldPath, `Field does not exist in the form "${formName}"`);
      }

      if (isFieldDef(currentDef)) {
        fieldValidator(currentDef, currentFieldPath, currentValue);

        nextState = setFormFieldValue(
          nextState,
          formName,
          currentFieldPath,
          currentValue,
        );

        return;
      }

      if (isObjectFieldDef(currentDef)) {
        objectFieldValidator(currentDef, currentFieldPath, currentValue);

        nextState = setFormFieldValue(
          nextState,
          formName,
          currentFieldPath,
          currentValue,
        );

        return;
      }

      if (isFormDef(currentDef)) {
        formValidator(currentFieldPath, currentValue);

        if (isVoid(currentValue)) {
          nextState = setFormFieldValue(
            nextState,
            formName,
            currentFieldPath,
            currentValue,
          );

          return;
        }

        nextState = hydrateRecursive(
          nextState,
          formName,
          currentValue,
          currentFieldPath,
        );

        return;
      }

      if (isListDef(currentDef)) {
        listValidator(currentFieldPath, currentValue);

        if (isVoid(currentValue)) {
          nextState = setFormFieldValue(
            nextState,
            formName,
            currentFieldPath,
            currentValue,
          );

          return;
        }

        const listChildDef = selectFieldDef(state, formName, [...currentFieldPath, 0]);

        if (isFormDef(listChildDef) && isFromValueArray(currentValue) && isNotEmpty(currentValue)) {
          nextState = currentValue
            .filter(isNotNil) // TODO^HY
            .reduce<S>(
              (state, valueItem, index) => hydrateRecursive(
                state,
                formName,
                valueItem,
                [...currentFieldPath, index],
              ),
              nextState,
            );

          return;
        }

        nextState = hydrateRecursive(
          nextState,
          formName,
          currentValue,
          currentFieldPath,
        );

        return;
      }

      if (isOneOfDef(currentDef)) {
        if (isArray(currentValue) && currentValue.length === 0) {
          nextState = setFormFieldValue(
            nextState,
            formName,
            currentFieldPath,
            currentValue,
          );

          return;
        }

        const typeResolver = deprecatedGetNotNil(selectFieldDefResolver(state, formName, currentFieldPath));
        const kindOfDef = typeResolver(currentValue, currentFieldPath, formName, state);

        if (isNil(kindOfDef)) {
          throw ReducerError.typeError(currentFieldPath, "Field cannot extract kind of definition");
        }

        const selectedOneOfDef = currentDef.fields[kindOfDef];

        if (isNil(selectedOneOfDef)) {
          throw ReducerError.typeError(currentFieldPath, "Field cannot extract definition from kind");
        }

        // TODO^HY refactor, improve types and remove cast
        oneOfValidator(selectedOneOfDef as TFieldDef, currentFieldPath, currentValue);

        const newCurrentPath = KindService.addKindToLast(currentFieldPath, kindOfDef);

        if (isNil(selectedOneOfDef)) {
          throw new Error("don't have currentDef");
        }

        // TODO^HY refactor, improve types and remove cast
        oneOfValidator(selectedOneOfDef as TFieldDef, currentFieldPath, currentValue);

        if (isListDef(selectedOneOfDef) || isFormDef(selectedOneOfDef)) {
          if (currentValue === null) {
            return; // TODO^HY
          }

          nextState = hydrateRecursive(
            nextState,
            formName,
            currentValue,
            newCurrentPath,
          );

          return;
        }

        if (isFieldDef(selectedOneOfDef) || isObjectFieldDef(selectedOneOfDef)) {
          nextState = setFormFieldValue(
            nextState,
            formName,
            currentFieldPath,
            currentValue,
          );

          return;
        }
      }

      const type = currentDef.type;
      throw new Error(`Not supported definition type: ${type}.`);
    });

  return nextState;
};

export { hydrateRecursive };
