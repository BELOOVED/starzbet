import { isEmpty, isNotNil } from "@sb/utils";
import { type TWithCallManagerState } from "@sb/call-manager";
import { type IWithFormsState, type TFieldError, type TFieldPath } from "../Types/Types";
import { KindService } from "../Utils";
import {
  selectFieldMetaAsyncValidationErrors,
  selectIsFieldAsyncValid,
  selectIsFormAsyncValid,
} from "./AsyncValidationExtension/AsyncValidationSelectors";
import {
  selectFieldMetaSyncValidationErrors,
  selectIsFieldSyncValid,
  selectIsFormSyncValid,
} from "./ValidationExtension/ValidationSelectors";

const selectIsFormValid = <State extends IWithFormsState & TWithCallManagerState>(state: State, formName: string): boolean => {
  const isSyncValid = selectIsFormSyncValid(state, formName);
  const isAsyncValid = selectIsFormAsyncValid(state, formName);

  return isSyncValid && isAsyncValid;
};

const selectIsFormFieldValid = (state: IWithFormsState, formName: string, fieldPath: TFieldPath): boolean => {
  const isSyncValid = selectIsFieldSyncValid(state, formName, fieldPath);
  const isAsyncValid = selectIsFieldAsyncValid(state, formName, fieldPath);

  return isSyncValid && isAsyncValid;
};

const selectFormFieldErrors = <Error extends TFieldError>(
  state: IWithFormsState,
  formName: string,
  fieldPath: TFieldPath,
) => {
  const fieldErrors: Error[] = [];

  const fieldPathWithoutKind = KindService.getPathWithoutKinds(fieldPath);

  const syncErrors = selectFieldMetaSyncValidationErrors<Error>(state, formName, fieldPathWithoutKind);
  const asyncErrors = selectFieldMetaAsyncValidationErrors<Error>(state, formName, fieldPathWithoutKind);

  if (isNotNil(syncErrors)) {
    fieldErrors.push(...syncErrors);
  }

  if (isNotNil(asyncErrors)) {
    fieldErrors.push(...asyncErrors);
  }

  return isEmpty(fieldErrors) ? null : fieldErrors as [Error, ...Error[]];
};

export {
  selectIsFormValid,
  selectIsFormFieldValid,
  selectFormFieldErrors,
};
