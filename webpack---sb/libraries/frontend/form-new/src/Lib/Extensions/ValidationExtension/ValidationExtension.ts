import { type ActionCreator } from "redux";
import { isNil, isNotEmpty, isNotNil, type TAnyObject, type TNullable } from "@sb/utils";
import { selectFieldValue, setFieldValueAction, setFormFieldEmptyValueAction, submitFormAction } from "../../Store/";
import {
  type IDecoratorDefinition,
  type IFormAction,
  type IWithFormsState,
  type TFieldPath,
  type TFieldValue,
  type THandler,
} from "../../Types/";
import { KindService, onAction, type TFormExtension } from "../../Utils/";
import { getFormFieldPaths, putFieldExtensionValue } from "../ExtensionsUtils";
import { VALIDATION_EXTENSION_KEY } from "./Model/ValidationExtensionKey";
import { validateFormFieldAction, validateFormFieldsAction } from "./ValidationActions";
import { validationRules } from "./ValidationRules";
import { selectFieldDefValidationExtension } from "./ValidationSelectors";

type TSyncValidatorError = string | TAnyObject;

type TSyncValidator<Value extends TFieldValue = TFieldValue,
  State extends IWithFormsState = IWithFormsState,
  Error extends TSyncValidatorError = TSyncValidatorError> = (
  value: TNullable<Value>,
  fieldPath: TFieldPath,
  formName: string,
  state: State,
) => Error | undefined;

type TConditionSyncValidator<Value extends TFieldValue = TFieldValue,
  State extends IWithFormsState = IWithFormsState,
  Error extends TSyncValidatorError = TSyncValidatorError> = (
  condition: TConditionValidateParams<Value, State>,
  validator: TSyncValidator<Value, State, Error>,
) => Error | undefined

type TValidationMeta<E extends TSyncValidatorError = TSyncValidatorError> =
  { isValid: true; errors: null; }
  | { isValid: false; errors: [E, ...E[]]; }

interface IWithSyncValidators<Value extends TFieldValue = TFieldValue, State extends IWithFormsState = IWithFormsState> {
  validators: (TSyncValidator<Value, State> | TConditionSyncValidator<Value, State>)[];
}

type TConditionValidateParams<Value extends TFieldValue = TFieldValue, State extends IWithFormsState = IWithFormsState> =
  (...p: Parameters<TSyncValidator<Value, State>>) => boolean;

const conditionValidate = <Value extends TFieldValue = TFieldValue, State extends IWithFormsState = IWithFormsState>(
  condition: TConditionValidateParams<Value, State>,
  validator: TSyncValidator<Value, State>,
): TSyncValidator<Value, State> => (value, fieldPath, formName, state) => {
    if (condition(value, fieldPath, formName, state)) {
      return validator(value, fieldPath, formName, state);
    }

    return undefined;
  };

/** pass synchronous validators of field to definition */
const withValidation = <Value extends TFieldValue = TFieldValue, State extends IWithFormsState = IWithFormsState>(
  ...validators: (TSyncValidator<Value, State> | TConditionSyncValidator<Value, State>)[]
): Record<string, IWithSyncValidators<Value, State>> => ({
    [VALIDATION_EXTENSION_KEY]: { validators },
  });

/** run validators and return array with errors */
const createValidator = <Value extends TFieldValue = TFieldValue, State extends IWithFormsState = IWithFormsState>(
  validators: (TSyncValidator<Value, State> | TConditionSyncValidator<Value, State>)[],
) =>
    (value: TNullable<Value>, fieldPath: TFieldPath, formName: string, state: State): TSyncValidatorError[] => validators
    // FIXME^GY
    // @ts-ignore
      .map((validator) => validator(value, fieldPath, formName, state))
      .filter(isNotNil);

/** run validators and put errors in meta for each field deeper headPath */
const validateFormFields = <State extends IWithFormsState>(
  state: State,
  formName: string,
  headPath: TFieldPath | undefined = undefined,
): State => {
  let nextState = state;
  const fieldPaths = getFormFieldPaths(nextState, formName, headPath);

  fieldPaths.forEach((fieldPath) => {
    const validation = selectFieldDefValidationExtension(state, formName, fieldPath);

    if (isNil(validation)) {
      return;
    }

    const fieldValidators = createValidator(validation.validators);
    const value = selectFieldValue(state, formName, fieldPath);
    const errors = fieldValidators(value, fieldPath, formName, nextState);

    const validationMeta: TValidationMeta = isNotEmpty<TSyncValidatorError>(errors)
      ? { isValid: false, errors }
      : { isValid: true, errors: null };

    nextState = putFieldExtensionValue<TValidationMeta, State>(
      nextState,
      formName,
      KindService.getPathWithoutKinds(fieldPath),
      VALIDATION_EXTENSION_KEY,
      validationMeta,
    );
  });

  return nextState;
};

const validateFormFieldsHandler: THandler = (state, action, next) => {
  const nextState = next(state, action);
  const { metadata: { formName } } = action;

  return validateFormFields(nextState, formName);
};

const validateFormFieldHandler: THandler<typeof validateFormFieldAction | typeof setFieldValueAction> = (
  state,
  action,
  next,
) => {
  const nextState = next(state, action);
  const { payload: { fieldPath }, metadata: { formName } } = action;

  return validateFormFields(nextState, formName, fieldPath);
};

const VALIDATION_DECORATORS: IDecoratorDefinition[] = [
  onAction(validateFormFieldAction, validateFormFieldHandler),
  onAction(setFieldValueAction, validateFormFieldHandler),
  onAction(setFormFieldEmptyValueAction, validateFormFieldHandler),
  onAction(validateFormFieldsAction, validateFormFieldsHandler),
  onAction(submitFormAction, validateFormFieldsHandler),
];

const validationExtension = <State extends IWithFormsState = IWithFormsState>(
  base: Parameters<TFormExtension<State>>[0],
): ReturnType<TFormExtension<State>> => ({
    ...base,
    def: {
      ...base.def,
      extensions: {
        ...base.def.extensions,
        ...withValidation(validationRules.childValidation()),
      },
    },
    decorators: [
      ...base.decorators,
      ...VALIDATION_DECORATORS,
    ] as IDecoratorDefinition<ActionCreator<IFormAction>, State>[], // TODO^HY improve types
    extensionsKeys: [
      ...base.extensionsKeys,
      VALIDATION_EXTENSION_KEY,
    ],
  });

export {
  withValidation,
  createValidator,
  conditionValidate,
  validateFormFieldsHandler,
  validateFormFieldHandler,
  validationExtension,
  validateFormFields,
};

export type {
  TValidationMeta,
  TSyncValidatorError,
  TSyncValidator,
  TConditionSyncValidator,
  IWithSyncValidators,
  TConditionValidateParams,

};

