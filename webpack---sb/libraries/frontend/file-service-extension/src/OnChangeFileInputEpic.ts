import { type AnyAction } from "redux";
import { distinctUntilChanged, map, mergeMap } from "rxjs/operators";
import { filter, merge, of } from "rxjs";
import { combineEpics } from "redux-observable";
import {
  type IFormAction,
  isFormCreator,
  type IWithFormsState,
  selectFieldValue,
  setFieldValueAction,
  type TFieldPath,
  type TFormEpic,
  validateFormFieldAction,
} from "@sb/form-new";
import { isEmpty, isNotNil, type TExplicitAny } from "@sb/utils";
import { EFileType, fileServiceSucceededUploadSelector, filesServiceStartUploadAction } from "@sb/file-service";
import { selectFieldDefFilesExtension } from "./Selectors";
import { setFileFieldValueAction } from "./Actions";
import { type TFileFieldValue } from "./Model";

//todo @DS check for memory leaks if file download is canceled
const onSuccessEpicFactory = (
  fileId: string,
  fieldPath: TFieldPath,
  formName: string,
): TFormEpic<IFormAction, IFormAction, TExplicitAny> => (action$, state$) =>
  state$.pipe(
    map(() => fileServiceSucceededUploadSelector(state$.value, fileId)),
    distinctUntilChanged(),
    filter(Boolean),
    map(() => validateFormFieldAction(formName, fieldPath)),
  );

const onChangeFileInputEpic = <S extends IWithFormsState>(
  formName: string,
  toShared: boolean,
): TFormEpic<IFormAction, AnyAction, S> =>
    (action$, state$, dependencies) =>
      action$.pipe(
        isFormCreator(formName)(setFileFieldValueAction),
        map(
          ({ payload: { fieldPath, value } }) =>
            (isNotNil(selectFieldDefFilesExtension(state$.value, formName, fieldPath)) && isNotNil(value))
              ? { value, fieldPath }
              : null,
        ),
        filter(isNotNil),
        mergeMap(({ value, fieldPath }) => {
          const formValue = selectFieldValue<TFileFieldValue>(state$.value, formName, fieldPath);

          const prevValue = formValue
            ? [...formValue.files]
            : [];

          const filtered = isEmpty(prevValue)
            ? value
            : value
              .filter(
                ({ id: fileId }) => prevValue
                  .find(({ id }) => id === fileId) === undefined,
              );

          const onSuccessObservables = filtered.map(
            ({ id }) => onSuccessEpicFactory(id, fieldPath, formName),
          );

          return merge(
            combineEpics(
              ...onSuccessObservables,
            )(action$, state$, dependencies),
            of(filesServiceStartUploadAction(filtered, toShared)),
            of(
              setFieldValueAction(
                formName,
                fieldPath,
                {
                  files: [
                    ...filtered.map(({ id }) => ({ id, type: EFileType.temporary })),
                    ...prevValue,
                  ],
                },
              ),
            ),
          );
        }),
      );

export {
  onChangeFileInputEpic,
};
