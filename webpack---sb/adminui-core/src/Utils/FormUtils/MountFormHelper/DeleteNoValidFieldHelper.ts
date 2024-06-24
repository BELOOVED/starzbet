import {
  _HIDDEN_FIELD_,
  fieldValidator,
  formValidator,
  isFieldDef,
  isFormDef,
  isFromValueArray,
  isListDef,
  isObjectFieldDef,
  isOneOfDef,
  type IWithFormsState,
  KindService,
  listValidator,
  objectFieldValidator,
  oneOfValidator,
  selectFieldDef,
  selectFieldDefResolver,
  type TFieldDef,
  type TFieldPath,
  type TFieldValue,
} from "@sb/form-new";
import { getNotNil, createMemoSelector, isNil, isNotEmpty, isAnyObject, isString } from "@sb/utils";
import { type IBlockContent } from "@sb/cms-core";
import { deleteFieldByPath, localBlockContentPath } from "./Utils";
// type TWithoutNullFieldValue = Exclude<TFieldValue, null | TFieldValue[]> | TWithoutNullFieldValue[]

const deleteNoValidFieldHelper = createMemoSelector(
  (
    state: IWithFormsState,
    formName: string,
    values: TFieldValue,
    path: TFieldPath = [],
  ):IBlockContent => {
    let finalValue = values;

    const recursiveMap = (path: TFieldPath, values: TFieldValue) => {
      if(isNil(values)) {
        return;
      }
      for (const value of Object.entries(values)) {
        const [key, currentValue]:[key: string, currentValue: TFieldValue] = value;
        const currentFieldPath = [...path, key];

        let currentDef:TFieldDef;

        try {
          currentDef = selectFieldDef(state, formName, currentFieldPath);
        } catch {
          finalValue = deleteFieldByPath(localBlockContentPath(currentFieldPath), finalValue);
          continue;
        }

        if (isNil(currentDef)) {
          finalValue = deleteFieldByPath(localBlockContentPath(currentFieldPath), finalValue);

          continue;
        }

        if (isFieldDef(currentDef)) {
          try {
            fieldValidator(currentDef, currentFieldPath, currentValue);
          } catch {
            finalValue = deleteFieldByPath(localBlockContentPath(currentFieldPath), finalValue);

            continue;
          }

          continue;
        }

        if (isObjectFieldDef(currentDef)) {
          try {
            objectFieldValidator(currentDef, currentFieldPath, currentValue);
          } catch {
            finalValue = deleteFieldByPath(localBlockContentPath(currentFieldPath), finalValue);
          }

          continue;
        }

        if (isFormDef(currentDef)) {
          formValidator(currentFieldPath, currentValue);

          try {
            formValidator(currentFieldPath, currentValue);
          } catch {
            finalValue = deleteFieldByPath(localBlockContentPath(currentFieldPath), finalValue);
          }

          recursiveMap(currentFieldPath, currentValue);

          continue;
        }

        if (isListDef(currentDef)) {
          try {
            listValidator(currentFieldPath, currentValue);
          } catch {
            finalValue = deleteFieldByPath(localBlockContentPath(currentFieldPath), finalValue);
            continue;
          }
          const listChildDef = selectFieldDef(state, formName, [...currentFieldPath, 0]);

          if (isFormDef(listChildDef) && isFromValueArray(currentValue) && isNotEmpty(currentValue)) {
            for (let i = 0; i < currentValue.length; i++) {
              const listElementValue = currentValue[i];
              const hiddenField = isAnyObject(listElementValue) && _HIDDEN_FIELD_ in listElementValue
                ? listElementValue[_HIDDEN_FIELD_]
                : null;
              const keyWithKind = isString(hiddenField) ? KindService.addKind(i, hiddenField) : i;
              const currentFieldPath = [...path, "content", keyWithKind];

              recursiveMap(currentFieldPath, getNotNil(listElementValue, ["deleteNoValidFieldHelper"], "recursiveMap"));
            }

            continue;
          }

          recursiveMap(currentFieldPath, currentValue);

          continue;
        }

        if (isOneOfDef(currentDef)) {
          const typeResolver = getNotNil(selectFieldDefResolver(state, formName, currentFieldPath), ["deleteNoValidFieldHelper"], "typeResolver");
          const kindOfDef = getNotNil(typeResolver(currentValue, currentFieldPath, formName, state), ["deleteNoValidFieldHelper"], "kindOfDef");
          const selectedOneOfDef = getNotNil(currentDef.fields[kindOfDef], ["deleteNoValidFieldHelper"], "selectedOneOfDef");
          try {
            oneOfValidator(selectedOneOfDef, currentFieldPath, currentValue);
          } catch {
            finalValue = deleteFieldByPath(localBlockContentPath(currentFieldPath), finalValue);

            continue;
          }

          if (isNil(kindOfDef)) {
            finalValue = deleteFieldByPath(localBlockContentPath(currentFieldPath), finalValue);

            continue;
          }

          if (isNil(selectedOneOfDef)) {
            finalValue = deleteFieldByPath(localBlockContentPath(currentFieldPath), finalValue);

            continue;
          }

          const newCurrentPath = KindService.addKindToLast(currentFieldPath, kindOfDef);

          if (isNil(selectedOneOfDef)) {
            finalValue = deleteFieldByPath(localBlockContentPath(currentFieldPath), finalValue);

            continue;
          }

          if (isListDef(selectedOneOfDef) || isFormDef(selectedOneOfDef)) {
            recursiveMap(newCurrentPath, currentValue);
          }
        }
      }
    };

    recursiveMap(path, values);

    return finalValue as IBlockContent;
  },
  {
    resultEqual: "deepEqual",
  },
);

export { deleteNoValidFieldHelper };
