import { concat, debounceTime, EMPTY, from, map, merge, mergeMap, of, switchMap } from "rxjs";
import { filter } from "rxjs/operators";
import { isCreator, isNotEmpty } from "@sb/utils";
import {
  dropFormFieldAction,
  selectFieldValue,
  selectIsFieldConnectedToExtension,
  setFieldValueAction,
  setFormFieldEmptyValueAction,
} from "../../Store";
import { type IFormAction, type TFieldPath, type TFormEpic } from "../../Types";
import { ifFormFieldPath } from "../../Utils";
import { getFormFieldsPathsByExtensionKey } from "../ExtensionsSelectors";
import { selectFieldDefAsyncValidationExtension } from "./AsyncValidationSelectors";
import {
  asyncValidateFormFieldAction,
  asyncValidateFormFieldsAction,
  setFormFieldAsyncErrorsAction,
  startFormFieldAsyncValidationAction,
  succeedFormFieldAsyncValidationAction,
} from "./AsyncValidationActions";
import { ASYNC_VALIDATION_EXTENSION_KEY } from "./Model/AsyncValidationExtensionKey";

const runFormFieldValidatorsEpicFactory = (
  formName: string,
  fieldPath: TFieldPath,
): TFormEpic<IFormAction> =>
  (action$, state$, dependencies) => {
    const value = selectFieldValue(state$.value, formName, fieldPath);
    const asyncValidation = selectFieldDefAsyncValidationExtension(state$.value, formName, fieldPath);

    if (!asyncValidation?.validators) {
      return EMPTY;
    }

    return concat(
      of(startFormFieldAsyncValidationAction(formName, fieldPath)),
      from(
        Promise.all(asyncValidation.validators.map((validator) => validator(value, state$.value, dependencies))),
      ).pipe(
        map((errors) => errors.filter(Boolean)),
        mergeMap((errors) => concat(
          of(setFormFieldAsyncErrorsAction(formName, fieldPath, isNotEmpty(errors) ? errors : null)),
          of(succeedFormFieldAsyncValidationAction(formName, fieldPath)),
        )),
      ),
    );
  };

const createFormFieldWatcherEpic = (
  formName: string,
  fieldPath: TFieldPath,
  debounce: number,
): TFormEpic<IFormAction> => (action$, state$, dependencies) => action$.pipe(
  isCreator(setFieldValueAction, setFormFieldEmptyValueAction, dropFormFieldAction),
  ifFormFieldPath(fieldPath),
  debounceTime(debounce),
  switchMap(() => runFormFieldValidatorsEpicFactory(formName, fieldPath)(action$, state$, dependencies)),
);

/**
 * run async validators for any field with debounce
 *
 * @param {number} debounce the timeout duration in milliseconds for
 * time required to wait before emitting the most recent value.
 */
const createFormFieldsWatcherEpic = (debounce: number): TFormEpic<IFormAction> =>
  (action$, state$, dependencies) => {
    const formFieldsRunningInstances = new Map<string, number>();

    return action$.pipe(
      isCreator(setFieldValueAction, setFormFieldEmptyValueAction, dropFormFieldAction),
      filter(({ payload: { fieldPath }, metadata: { formName } }) =>
        selectIsFieldConnectedToExtension(state$.value, formName, fieldPath, ASYNC_VALIDATION_EXTENSION_KEY) &&
        !formFieldsRunningInstances.has(fieldPath.join(""))),
      mergeMap(
        (action) => {
          const { payload: { fieldPath }, metadata: { formName } } = action;

          formFieldsRunningInstances.set(fieldPath.join(""), Date.now());

          return createFormFieldWatcherEpic(formName, fieldPath, debounce)(concat(of(action), action$), state$, dependencies);
        },
      ),
    );
  };

const validateFormFieldEpic: TFormEpic<IFormAction> =
  (action$, state$, dependencies) => action$.pipe(
    isCreator(asyncValidateFormFieldAction),
    filter(({ payload: { fieldPath }, metadata: { formName } }) =>
      selectIsFieldConnectedToExtension(state$.value, formName, fieldPath, ASYNC_VALIDATION_EXTENSION_KEY)),
    switchMap(({ payload: { fieldPath }, metadata: { formName } }) =>
      runFormFieldValidatorsEpicFactory(formName, fieldPath)(action$, state$, dependencies)),
  );

const validateFormFieldsEpic: TFormEpic<IFormAction> =
  (action$, state$, dependencies) => action$.pipe(
    isCreator(asyncValidateFormFieldsAction),
    switchMap(({ metadata: { formName } }) => {
      const fieldPaths = getFormFieldsPathsByExtensionKey(state$.value, formName, ASYNC_VALIDATION_EXTENSION_KEY);

      return merge(
        ...fieldPaths.map((fieldPath) => runFormFieldValidatorsEpicFactory(formName, fieldPath)(action$, state$, dependencies)),
      );
    }),
  );

export {
  createFormFieldsWatcherEpic,
  validateFormFieldEpic,
  validateFormFieldsEpic,
};
