import { type ActionCreator } from "redux";
import { type TExplicitAny, type TNullable } from "@sb/utils";
import type { TWithCallManagerState } from "@sb/call-manager";
import { type IDecoratorDefinition, type IFormAction, type IWithFormsState, type TFieldValue } from "../../Types";
import { onAction, type TFormExtension } from "../../Utils";
import { resetFormAction, setFieldValueAction, setFormFieldEmptyValueAction, unmountFormAction } from "../../Store";
import { createFormFieldsWatcherEpic, validateFormFieldEpic, validateFormFieldsEpic } from "./AsyncValidationEpics";
import {
  setFormFieldAsyncErrorsAction,
  startFormFieldAsyncValidationAction,
  succeedFormFieldAsyncValidationAction,
} from "./AsyncValidationActions";
import {
  resetFormFieldAsyncErrorHandler,
  resetFormFieldsAsyncErrorsHandler,
  setFieldAsyncErrorsHandler,
  startFormFieldAsyncValidationHandler,
  succeedFormFieldAsyncValidationHandler,
} from "./AsyncValidationReducers";
import { ASYNC_VALIDATION_EXTENSION_KEY } from "./Model/AsyncValidationExtensionKey";

type TAsyncValidatorError = string | Record<string, TExplicitAny>;

type TAsyncValidator<Value extends TFieldValue = TFieldValue,
  State extends IWithFormsState = IWithFormsState,
  Error extends TAsyncValidatorError = TAsyncValidatorError,
  Dependencies extends Record<string, TExplicitAny> = TExplicitAny> = (
  value: TNullable<Value>,
  state: State,
  dependencies: Dependencies,
) => Promise<Error | undefined>;

type TAsyncValidationMeta<E extends TAsyncValidatorError = TAsyncValidatorError> =
  { isValid: true; errors: null; }
  | { isValid: false; errors: [E, ...E[]]; }

interface IWithAsyncValidators<Value extends TFieldValue = TFieldValue, State extends IWithFormsState = IWithFormsState> {
  validators: TAsyncValidator<Value, State>[];
}

/** pass asynchronous validators of field to definition */
const withAsyncValidation = <Value extends TFieldValue = TFieldValue, State extends IWithFormsState = IWithFormsState>(
  ...validators: TAsyncValidator<Value, State>[]
): Record<string, IWithAsyncValidators<Value, State>> => ({
    [ASYNC_VALIDATION_EXTENSION_KEY]: { validators },
  });

const ASYNC_VALIDATION_DECORATORS: IDecoratorDefinition<ActionCreator<IFormAction>, IWithFormsState & TWithCallManagerState>[] = [
  onAction(startFormFieldAsyncValidationAction, startFormFieldAsyncValidationHandler),
  onAction(succeedFormFieldAsyncValidationAction, succeedFormFieldAsyncValidationHandler),
  onAction(setFormFieldAsyncErrorsAction, setFieldAsyncErrorsHandler),
  onAction(setFieldValueAction, resetFormFieldAsyncErrorHandler),
  onAction(setFormFieldEmptyValueAction, resetFormFieldAsyncErrorHandler),
  onAction(resetFormAction, resetFormFieldsAsyncErrorsHandler),
  onAction(unmountFormAction, resetFormFieldsAsyncErrorsHandler),
];

/**
 * @param {boolean} autoRun boolean value for autorun validators for a changed field.
 *
 * @param {number} debounce the timeout duration in milliseconds for
 * time required to wait before run validators for a changed field.
 */
type TAsyncValidationConfig = { autoRun: false; } | { autoRun: true; debounce: number; }

const DEFAULT_EXTENSION_CONFIG: TAsyncValidationConfig = {
  autoRun: false,
};

/** extension for async validation of fields */
const createAsyncValidationExtension = (
  config: TAsyncValidationConfig = DEFAULT_EXTENSION_CONFIG,
) => <State extends IWithFormsState = IWithFormsState>(
  base: Parameters<TFormExtension<State>>[0],
): ReturnType<TFormExtension<State>> => {
  const epics = [
    ...base.epics,
    validateFormFieldEpic,
    validateFormFieldsEpic,
  ];

  if (config.autoRun) {
    epics.push(createFormFieldsWatcherEpic(config.debounce));
  }

  return ({
    ...base,
    epics,
    decorators: [
      ...base.decorators,
      ...ASYNC_VALIDATION_DECORATORS,
    ] as IDecoratorDefinition<ActionCreator<IFormAction>, State>[], // TODO^HY improve types,
    extensionsKeys: [
      ...base.extensionsKeys,
      ASYNC_VALIDATION_EXTENSION_KEY,
    ],
  });
};

export {
  withAsyncValidation,
  createAsyncValidationExtension,
};

export type {
  TAsyncValidationMeta,
  TAsyncValidatorError,
  TAsyncValidator,
  IWithAsyncValidators,
};
