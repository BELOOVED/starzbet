import { type ActionCreator } from "redux";
import {
  type IDecoratorDefinition,
  type IFormAction,
  isFormName,
  onAction,
  resetFormAction,
  selectFieldValue,
  selectIsFormConnectedToExtension,
  setFieldValue,
  setFieldValueAction,
  submitFormSucceedAction,
  type THandler,
  unmountFormAction,
  whenIs,
} from "@sb/form-new";
import { isNil, type TExplicitAny } from "@sb/utils";
import { EFileStateType, EFileType, removeFiles } from "@sb/file-service";
import { FILE_EXTENSION_KEY, type TFileFieldValue, type TFileInForm, type TFileServiceExtensionState } from "./Model";
import { getFilesToRemoveSelector, selectFilesFieldsPaths, selectIsFieldAndFormConnectedToFilesExtension } from "./Selectors";

const removeServiceFilesReducer = <State extends TFileServiceExtensionState>(): THandler<ActionCreator<IFormAction>, State> =>
  (state, action, next) => {
    const fileFieldPaths = selectFilesFieldsPaths(state, action.metadata.formName);

    const files = getFilesToRemoveSelector(state, fileFieldPaths, action.metadata.formName);

    return removeFiles(
      next(state, action),
      EFileStateType.temporary,
      files,
    );
  };

const setFieldValueReducer = <
  State extends TFileServiceExtensionState
>(): THandler<typeof setFieldValueAction<TFileFieldValue>, State> =>
    (
      state,
      action,
      next,
    ) => {
      const {
        payload: { fieldPath, value },
        metadata: { formName },
      } = action;

      const nextState = next(state, action);

      if (!selectIsFieldAndFormConnectedToFilesExtension(state, formName, fieldPath)) {
        return nextState;
      }

      return isNil(value)
        ? nextState
        : setFieldValue(nextState, fieldPath, { files: [...value.files] }, formName);
    };

const submitFormSucceedReducer = <
  State extends TFileServiceExtensionState
>(): THandler<typeof submitFormSucceedAction, State> =>
    (
      state,
      action,
      next,
    ) => {
      const {
        metadata: { formName },
      } = action;

      const nextState = next(state, action);

      if (!selectIsFormConnectedToExtension(state, formName, FILE_EXTENSION_KEY)) {
        return nextState;
      }

      const fileFieldPaths = selectFilesFieldsPaths(nextState, formName);

      const toRemove: string[] = [];
      //очищаем стейт формы от temporary файлов
      const newState = fileFieldPaths
        .reduce(
          (acc, fieldPath) => {
            const fieldValue = selectFieldValue<TFileFieldValue>(state, formName, fieldPath);

            const files = fieldValue?.files.reduce<TFileInForm[]>(
              (acc, file) => {
                if (file.type === EFileType.permanent) {
                  acc.push(file);
                } else {
                  toRemove.push(file.id);
                }

                return acc;
              },
              [],
            );

            return setFieldValue(acc, fieldPath, { files }, formName);
          },
          nextState,
        );

      //удаляем из файл сервиса temporary файлы
      return removeFiles(newState, EFileStateType.temporary, toRemove);
    };

const fileDecoratorsFactory = <State extends TFileServiceExtensionState>(
  formName: string,
): IDecoratorDefinition<ActionCreator<IFormAction & TExplicitAny>, State>[] =>
    [
      onAction(
        setFieldValueAction,
        whenIs(isFormName(formName), setFieldValueReducer()),
      ),
      onAction(
        unmountFormAction,
        whenIs(isFormName(formName), removeServiceFilesReducer()),
      ),
      onAction(
        resetFormAction,
        whenIs(isFormName(formName), removeServiceFilesReducer()),
      ),
      onAction(
        submitFormSucceedAction,
        whenIs(isFormName(formName), submitFormSucceedReducer()),
      ),
    ];

export {
  fileDecoratorsFactory,
};
