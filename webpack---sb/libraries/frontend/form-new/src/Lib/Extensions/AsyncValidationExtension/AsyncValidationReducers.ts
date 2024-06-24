import { callManagerRemoveSymbols, callManagerStart, callManagerSucceeded, type TWithCallManagerState } from "@sb/call-manager";
import { type IWithFormsState, type THandler } from "../../Types";
import { type resetFormAction, type setFieldValueAction, type setFormFieldEmptyValueAction, type unmountFormAction } from "../../Store";
import { putFieldExtensionValue } from "../ExtensionsUtils";
import { getFormFieldsPathsByExtensionKey } from "../ExtensionsSelectors";
import {
  type setFormFieldAsyncErrorsAction,
  type startFormFieldAsyncValidationAction,
  type succeedFormFieldAsyncValidationAction,
} from "./AsyncValidationActions";
import { type TAsyncValidationMeta } from "./AsyncValidationExtension";
import { ASYNC_VALIDATION_EXTENSION_KEY } from "./Model/AsyncValidationExtensionKey";
import { ASYNC_VALIDATION_EXTENSION_CALL_SYMBOL } from "./Model/AsyncValidationExtensionCallSymbol";
import { createFormFieldID } from "./Utils/CreateFormFieldID";

const startFormFieldAsyncValidationHandler: THandler<
  typeof startFormFieldAsyncValidationAction,
  IWithFormsState & TWithCallManagerState
> = (state, action, next) => {
  const nextState = next(state, action);
  const { payload: { fieldPath }, metadata: { formName } } = action;

  const formFieldID = createFormFieldID(formName, fieldPath);

  return callManagerStart(nextState, ASYNC_VALIDATION_EXTENSION_CALL_SYMBOL, formFieldID);
};

const succeedFormFieldAsyncValidationHandler: THandler<
  typeof succeedFormFieldAsyncValidationAction,
  IWithFormsState & TWithCallManagerState
> = (state, action, next) => {
  const nextState = next(state, action);
  const { payload: { fieldPath }, metadata: { formName } } = action;

  const formFieldID = createFormFieldID(formName, fieldPath);

  return callManagerSucceeded(nextState, ASYNC_VALIDATION_EXTENSION_CALL_SYMBOL, formFieldID);
};

const setFieldAsyncErrorsHandler: THandler<
  typeof setFormFieldAsyncErrorsAction,
  IWithFormsState & TWithCallManagerState
> = (state, action, next) => {
  const nextState = next(state, action);
  const { payload: { fieldPath, errors }, metadata: { formName } } = action;

  const validationMeta: TAsyncValidationMeta = errors !== null
    ? { isValid: false, errors }
    : { isValid: true, errors: null };

  return putFieldExtensionValue<TAsyncValidationMeta, IWithFormsState & TWithCallManagerState>(
    nextState,
    formName,
    fieldPath,
    ASYNC_VALIDATION_EXTENSION_KEY,
    validationMeta,
  );
};

const resetFormFieldAsyncErrorHandler: THandler<
  typeof setFieldValueAction | typeof setFormFieldEmptyValueAction,
  IWithFormsState & TWithCallManagerState
> = (state, action, next) => {
  let nextState = next(state, action);
  const { payload: { fieldPath }, metadata: { formName } } = action;

  const formFieldID = createFormFieldID(formName, fieldPath);

  nextState = callManagerRemoveSymbols(nextState, [ASYNC_VALIDATION_EXTENSION_CALL_SYMBOL], formFieldID);

  return putFieldExtensionValue<TAsyncValidationMeta, IWithFormsState & TWithCallManagerState>(
    nextState,
    formName,
    fieldPath,
    ASYNC_VALIDATION_EXTENSION_KEY,
    { isValid: true, errors: null },
  );
};

const resetFormFieldsAsyncErrorsHandler: THandler<
  typeof resetFormAction | typeof unmountFormAction,
  IWithFormsState & TWithCallManagerState
> = (state, action, next) => {
  const nextState = next(state, action);
  const { metadata: { formName } } = action;

  const fieldPaths = getFormFieldsPathsByExtensionKey(state, formName, ASYNC_VALIDATION_EXTENSION_KEY);
  const formFieldIDs = fieldPaths.map((fieldPath) => createFormFieldID(formName, fieldPath));

  return callManagerRemoveSymbols(nextState, [ASYNC_VALIDATION_EXTENSION_CALL_SYMBOL], formFieldIDs);
};

export {
  startFormFieldAsyncValidationHandler,
  succeedFormFieldAsyncValidationHandler,
  setFieldAsyncErrorsHandler,
  resetFormFieldAsyncErrorHandler,
  resetFormFieldsAsyncErrorsHandler,
};
