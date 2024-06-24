import { isEmpty, isNil, type TNullable } from "@sb/utils";
import { type IWithFormsState, type TFieldPath } from "../../Types";
import {
  selectFieldDefExtension,
  selectFieldMetaExtension,
  selectFieldValue,
  selectFormDef,
  selectFormMetaExtension,
  selectFormValue,
} from "../../Store";
import { VALIDATION_EXTENSION_KEY } from "./Model/ValidationExtensionKey";
import { createValidator, type IWithSyncValidators, type TSyncValidatorError, type TValidationMeta } from "./ValidationExtension";

const selectFieldDefValidationExtension = (s: IWithFormsState, formName: string, fieldPath: TFieldPath) =>
  selectFieldDefExtension<IWithSyncValidators>(s, formName, fieldPath, VALIDATION_EXTENSION_KEY);

const selectFieldMetaValidationExtension = <E extends TSyncValidatorError>(
  s: IWithFormsState,
  formName: string,
  fieldPath: TFieldPath,
) => selectFieldMetaExtension<TValidationMeta<E>>(s, formName, fieldPath, VALIDATION_EXTENSION_KEY);

const selectIsFieldSyncValid = (
  state: IWithFormsState,
  formName: string,
  fieldPath: TFieldPath,
): boolean => {
  const fieldValidationDef = selectFieldDefValidationExtension(state, formName, fieldPath);

  if (isNil(fieldValidationDef)) {
    return true;
  }

  const fieldValidator = createValidator(fieldValidationDef.validators);
  const value = selectFieldValue(state, formName, fieldPath);
  const errors = fieldValidator(value, fieldPath, formName, state);

  return isEmpty(errors);
};

const selectFieldMetaSyncValidationErrors = <Error extends TSyncValidatorError>(
  state: IWithFormsState,
  formName: string,
  fieldPath: TFieldPath,
) => {
  const fieldValidationMeta = selectFieldMetaValidationExtension<Error>(state, formName, fieldPath);

  return isNil(fieldValidationMeta) ? undefined : fieldValidationMeta.errors;
};

const selectFormValidationExtension = (s: IWithFormsState, formName: string): TValidationMeta | undefined =>
  selectFormMetaExtension<TValidationMeta>(s, formName, VALIDATION_EXTENSION_KEY);

const selectIsFormSyncValid = (state: IWithFormsState, formName: string) => {
  const formDef = selectFormDef(state, formName);

  const formValidationDef = formDef
    .extensions[VALIDATION_EXTENSION_KEY] as TNullable<IWithSyncValidators>;

  if (isNil(formValidationDef)) {
    return true;
  }

  const formValidator = createValidator(formValidationDef.validators);
  const value = selectFormValue(state, formName);
  const errors = formValidator(value, [], formName, state);

  return isEmpty(errors);
};

export {
  selectFieldMetaValidationExtension,
  selectFieldDefValidationExtension,
  selectIsFieldSyncValid,
  selectFieldMetaSyncValidationErrors,
  selectFormValidationExtension,
  selectIsFormSyncValid,
};
