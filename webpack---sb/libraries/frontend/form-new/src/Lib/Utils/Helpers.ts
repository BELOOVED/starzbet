import { isArray, isEmpty, isNotNil, isNumber, isObject, isString, type TAnyObject, type TExplicitAny } from "@sb/utils";
import { _HIDDEN_FIELD_, EDefType } from "../Model";
import { type IFormMeta, type IWithFormsState, type TFieldPath, type TFieldValue } from "../Types";
import { dropFormField, selectFieldDef, selectFieldValue, setFieldValueAction, setFormFieldValue } from "../Store";
import { every, isFormFieldPath, isFormName, onAction, whenIs } from "./Builders";
import { isFieldDef, isFormDef, isListDef, isObjectFieldDef, isOneOfDef } from "./DefTypeCheckers";
import { ReducerError } from "./Asserts";

// TODO^HY refactor this and implement new decorator utils
const createChangeDependentValueDecorator = <State extends IWithFormsState>(
  formName: string,
  sourcePath: TFieldPath,
  dependedPath: TFieldPath,
  computeTarget: (source: TFieldValue | undefined, currentTarget: TFieldValue | undefined) => TFieldValue | undefined,
) => onAction<typeof setFieldValueAction, State>(
  setFieldValueAction,
  whenIs(
    every(
      isFormName(formName),
      isFormFieldPath(sourcePath),
    ),
    (state, action, next) => {
      const nextState = next(state, action);

      const { payload: { value }, metadata: { formName } } = action;

      const currentTargetValue = selectFieldValue(state, formName, dependedPath);

      const nextValue = computeTarget(value, currentTargetValue);

      return nextValue === undefined
        ? dropFormField(nextState, formName, dependedPath)
        : setFormFieldValue(nextState, formName, dependedPath, nextValue);
    },
  ),
);

/** use it only in reducer or epic */
const createEmptyValue = (fieldPath: TFieldPath) =>
  (formName: string) =>
    (state: IWithFormsState): TFieldValue => {
      const fieldDefinition = selectFieldDef(state, formName, fieldPath);

      if (isFieldDef(fieldDefinition)) {
        if (fieldDefinition.multi) {
          return [];
        }

        return "";
      }

      if (isObjectFieldDef(fieldDefinition)) {
        if (fieldDefinition.multi) {
          return [];
        }

        return {};
      }

      if (isFormDef(fieldDefinition)) {
        return {};
      }

      if (isListDef(fieldDefinition)) {
        return [];
      }

      if (isOneOfDef(fieldDefinition)) {
        throw ReducerError.typeError(fieldPath, `Cannot create an empty value for ${EDefType.oneOf} without a kind in the path"`);
      }

      throw ReducerError.typeError(fieldPath, "Cannot create empty value");
    };

const addHiddenFieldToValue = <T extends TFieldValue = TFieldValue>(value: T, hiddenField: string) => {
  if (isEmpty(hiddenField)) {
    throw new Error("Cannot add hidden field with empty value.");
  }

  if (!isObject(value) || isArray(value)) {
    throw new Error("A hidden field can be added only to an object.");
  }

  return { ...value, [_HIDDEN_FIELD_]: hiddenField };
};

const isEqualPath = (a: TFieldPath, b: TFieldPath) => a.join(".") === b.join(".");

const pathStringToNumberCorrector = (fieldPath: TFieldPath) => fieldPath.map((currentPathItem) => {
  if (currentPathItem && isString(currentPathItem) && !isNaN(Number(currentPathItem))) {
    return +currentPathItem;
  }

  return currentPathItem;
});

const pathNumberToStringCorrector = (fieldPath: TFieldPath) => fieldPath.map((currentPathItem) => {
  if (isNotNil(currentPathItem) && isNumber(currentPathItem)) {
    return `${currentPathItem}`;
  }

  return currentPathItem;
});

const getPathWithNewLastElem = (path: TFieldPath, lastElem: string | number): TFieldPath =>
  [...path.slice(0, path.length - 1), lastElem];

const getPathByTouchedKey = (formMeta: IFormMeta, keyName: string) => {
  const fieldPaths: TFieldPath[] = [];
  const recursiveMetaTraversal = (formMeta: TAnyObject | TExplicitAny[], fieldPath: TFieldPath) => {
    Object.entries(formMeta)
      .forEach(([key, value]) => {
        if (value?.[keyName]) {
          fieldPaths.push(fieldPath);

          return;
        }
        if (isNotNil(value) && isObject(value)) {
          recursiveMetaTraversal(value, [...fieldPath, key]);
        }
      });
  };

  recursiveMetaTraversal(formMeta, []);

  return fieldPaths;
};

export {
  getPathByTouchedKey,
  createChangeDependentValueDecorator,
  createEmptyValue,
  isEqualPath,
  pathStringToNumberCorrector,
  pathNumberToStringCorrector,
  getPathWithNewLastElem,
  addHiddenFieldToValue,
};
