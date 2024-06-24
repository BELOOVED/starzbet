import { actionTypeWithPrefix, type TExplicitAny } from "@sb/utils";
import { type ISetFieldValueAction, type TFieldPath, type TFieldValue } from "../Types/";
import { type IFormConfig } from "../Utils";

const formActionType = actionTypeWithPrefix("@FORM-NEW");

const formMountedAction = (formName: string) => ({
  type: formActionType("FORM_MOUNTED"),
  metadata: { formName },
});

// TODO exclude undefined from action
const setFieldValueAction = <Value extends TFieldValue = TFieldValue>(
  formName: string,
  fieldPath: TFieldPath,
  value: Value | undefined,
): ISetFieldValueAction<Value> => ({
    type: formActionType("SET_FIELD_VALUE"),
    payload: { fieldPath, value },
    metadata: { formName },
  });

const setFormFieldEmptyValueAction = (formName: string, fieldPath: TFieldPath) => ({
  type: formActionType("SET_FIELD_EMPTY_VALUE"),
  payload: { fieldPath },
  metadata: { formName },
});

const dropFormFieldAction = (formName: string, fieldPath: TFieldPath) => ({
  type: formActionType("DROP_FIELD"),
  payload: { fieldPath },
  metadata: { formName },
});

const mountFormAction = <V extends Record<string, TExplicitAny>>(
  formName: string,
  formConfig: IFormConfig<TExplicitAny>,
  initialState?: V,
) => ({
    type: formActionType("MOUNT"),
    payload: {
      form: formConfig,
      initialState,
    },
    metadata: { formName },
  });

const resetFormAction = <V extends Record<string, TExplicitAny>>(
  formName: string,
  initialState?: V,
) => ({
    type: formActionType("RESET"),
    payload: { initialState },
    metadata: { formName },
  });

const updateFormInitialStateAction = <V extends Record<string, TExplicitAny>>(
  formName: string,
  initialState: V,
) => ({
    type: formActionType("UPDATE_INITIAL"),
    payload: { initialState },
    metadata: { formName },
  });

const resetFormToInitialAction = (
  formName: string,
) => ({
  type: formActionType("RESET_TO_INITIAL"),
  metadata: { formName },
});

const unmountFormAction = (formName: string) => ({
  type: formActionType("UNMOUNT"),
  metadata: { formName },
});

/**
 *  value - name that associated with submit button
 *  can be identifier of form instance if it used multiple times on page
 *  provided by 'useSubmitHandler' or manually
 */
const submitFormAction = <V extends string>(formName: string, value?: V) => ({
  type: formActionType("SUBMITTING_EXTENSION/SUBMIT_FORM"),
  payload: { value },
  metadata: { formName },
});

export {
  formActionType,
  formMountedAction,
  setFieldValueAction,
  setFormFieldEmptyValueAction,
  dropFormFieldAction,
  mountFormAction,
  resetFormAction,
  updateFormInitialStateAction,
  resetFormToInitialAction,
  unmountFormAction,
  submitFormAction,
};
