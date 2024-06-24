import { isNil, isNotNil } from "@sb/utils";
import { callManagerStartedSelector, callManagerSucceededSelector, type TWithCallManagerState } from "@sb/call-manager";
import { selectFieldDefExtension, selectFieldMetaExtension } from "../../Store";
import { type IWithFormsState, type TFieldPath } from "../../Types";
import { getFormFieldsPathsByExtensionKey } from "../ExtensionsSelectors";
import { type IWithAsyncValidators, type TAsyncValidationMeta, type TAsyncValidatorError } from "./AsyncValidationExtension";
import { ASYNC_VALIDATION_EXTENSION_KEY } from "./Model/AsyncValidationExtensionKey";
import { createFormFieldID } from "./Utils/CreateFormFieldID";
import { ASYNC_VALIDATION_EXTENSION_CALL_SYMBOL } from "./Model/AsyncValidationExtensionCallSymbol";

const selectFieldDefAsyncValidationExtension = (state: IWithFormsState, formName: string, fieldPath: TFieldPath) =>
  selectFieldDefExtension<IWithAsyncValidators>(state, formName, fieldPath, ASYNC_VALIDATION_EXTENSION_KEY);

const selectFieldMetaAsyncValidationExtension = <
  Error extends TAsyncValidatorError
>(state: IWithFormsState, formName: string, fieldPath: TFieldPath) =>
    selectFieldMetaExtension<TAsyncValidationMeta<Error>>(state, formName, fieldPath, ASYNC_VALIDATION_EXTENSION_KEY);

const selectIsFieldAsyncValid = <
  Error extends TAsyncValidatorError
>(state: IWithFormsState, formName: string, fieldPath: TFieldPath): boolean => {
  const fieldAsyncValidationMeta = selectFieldMetaAsyncValidationExtension<Error>(state, formName, fieldPath);

  return isNotNil(fieldAsyncValidationMeta)
    ? isNil(fieldAsyncValidationMeta.errors)
    : true;
};

const selectFieldMetaAsyncValidationErrors = <
  Error extends TAsyncValidatorError
>(state: IWithFormsState, formName: string, fieldPath: TFieldPath) => {
  const fieldAsyncValidationMeta = selectFieldMetaAsyncValidationExtension<Error>(state, formName, fieldPath);

  return isNil(fieldAsyncValidationMeta) ? undefined : fieldAsyncValidationMeta.errors;
};

const selectIsFormFieldAsyncValidationStarted = (state: TWithCallManagerState, formName: string, fieldPath: TFieldPath): boolean => {
  const formFieldID = createFormFieldID(formName, fieldPath);

  return callManagerStartedSelector(state, ASYNC_VALIDATION_EXTENSION_CALL_SYMBOL, formFieldID);
};

const selectIsFormFieldAsyncValidationSucceeded = (state: TWithCallManagerState, formName: string, fieldPath: TFieldPath): boolean => {
  const formFieldID = createFormFieldID(formName, fieldPath);

  return callManagerSucceededSelector(state, ASYNC_VALIDATION_EXTENSION_CALL_SYMBOL, formFieldID);
};

const selectIsFormAsyncValid = <State extends IWithFormsState & TWithCallManagerState>(state: State, formName: string): boolean => {
  const fieldPaths = getFormFieldsPathsByExtensionKey(state, formName, ASYNC_VALIDATION_EXTENSION_KEY);

  return !fieldPaths.some((fieldPath) => selectIsFormFieldAsyncValidationStarted(state, formName, fieldPath) ||
    !selectIsFieldAsyncValid(state, formName, fieldPath));
};

export {
  selectFieldDefAsyncValidationExtension,
  selectFieldMetaAsyncValidationExtension,
  selectIsFieldAsyncValid,
  selectFieldMetaAsyncValidationErrors,
  selectIsFormFieldAsyncValidationStarted,
  selectIsFormFieldAsyncValidationSucceeded,
  selectIsFormAsyncValid,
};
