import type { ActionCreator } from "redux";
import { type TWithCallManagerState } from "@sb/call-manager";
import { type IDecoratorDefinition, type IFormAction, type IWithFormsState, type TFieldValue, type THandler } from "../Types";
import { onAction } from "../Utils";
import { type setFieldValueAction } from "../Store";
import { type TSyncValidator, validateFormFields } from "./ValidationExtension";
import {
  selectIsFormFieldAsyncValidationSucceeded,
  startFormFieldAsyncValidationAction,
  succeedFormFieldAsyncValidationAction,
} from "./AsyncValidationExtension";

const validateFormFieldHandler: THandler<
  typeof succeedFormFieldAsyncValidationAction | typeof setFieldValueAction,
  IWithFormsState & TWithCallManagerState
> = (state, action, next) => {
  const nextState = next(state, action);
  const { payload: { fieldPath }, metadata: { formName } } = action;

  return validateFormFields(nextState, formName, fieldPath);
};

const VALIDATE_FORM_FIELD_ON_ASYNC_VALIDATION_DECORATORS: IDecoratorDefinition<
  ActionCreator<IFormAction>,
  IWithFormsState & TWithCallManagerState
>[] = [
  onAction(startFormFieldAsyncValidationAction, validateFormFieldHandler),
  onAction(succeedFormFieldAsyncValidationAction, validateFormFieldHandler),
];

const isAsyncValidationSucceededValidator: TSyncValidator<TFieldValue, IWithFormsState & TWithCallManagerState> =
  (value, fieldPath, formName, state) =>
    selectIsFormFieldAsyncValidationSucceeded(state, formName, fieldPath)
      ? undefined
      : "Validation is not succeeded";

export {
  VALIDATE_FORM_FIELD_ON_ASYNC_VALIDATION_DECORATORS,
  isAsyncValidationSucceededValidator,
};
