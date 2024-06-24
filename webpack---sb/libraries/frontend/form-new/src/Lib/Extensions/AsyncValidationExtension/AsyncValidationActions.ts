import { actionTypeWithPrefix, type TArrayNotEmpty } from "@sb/utils";
import { type TFieldPath } from "../../Types";
import { formActionType } from "../../Store";
import { type TAsyncValidatorError } from "./AsyncValidationExtension";

const asyncValidationActionType = actionTypeWithPrefix(formActionType("ASYNC_VALIDATION_EXTENSION"));

const asyncValidateFormFieldsAction = (formName: string) => ({
  type: asyncValidationActionType("VALIDATE_FORM_FIELDS"),
  metadata: { formName },
});

const asyncValidateFormFieldAction = (formName: string, fieldPath: TFieldPath) => ({
  type: asyncValidationActionType("VALIDATE_FORM_FIELD"),
  payload: { fieldPath },
  metadata: { formName },
});

/** @internal avoid using outside the form-new package */
const startFormFieldAsyncValidationAction = (formName: string, fieldPath: TFieldPath) => ({
  type: asyncValidationActionType("START_FORM_FIELD_VALIDATION"),
  payload: { fieldPath },
  metadata: { formName },
});

/** @internal avoid using outside the form-new package */
const succeedFormFieldAsyncValidationAction = (formName: string, fieldPath: TFieldPath) => ({
  type: asyncValidationActionType("SUCCEED_FORM_FIELD_VALIDATION"),
  payload: { fieldPath },
  metadata: { formName },
});

/** @internal avoid using outside the form-new package */
const setFormFieldAsyncErrorsAction = (formName: string, fieldPath: TFieldPath, errors: TArrayNotEmpty<TAsyncValidatorError> | null) => ({
  type: asyncValidationActionType("SET_FORM_FIELD_ERRORS"),
  payload: { fieldPath, errors },
  metadata: { formName },
});

export {
  asyncValidateFormFieldsAction,
  asyncValidationActionType,
  asyncValidateFormFieldAction,
  startFormFieldAsyncValidationAction,
  succeedFormFieldAsyncValidationAction,
  setFormFieldAsyncErrorsAction,
};
