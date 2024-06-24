import {
  getFormFieldsPathsByExtensionKey,
  type IWithFormsState,
  selectFieldDefExtension,
  selectFieldValue,
  selectIsFieldAndFormConnectedToExtension,
  type TFieldPath,
} from "@sb/form-new";
import {
  EFileStateType,
  EFileType,
  fileServiceSelectors,
  fileServiceStartedUploadSelector,
  type TFileDto,
  type TPermanentSelector,
  type TWithFileServiceState,
} from "@sb/file-service";
import { getNotNil, isEmpty, isNil, isNotEmpty, isVoid } from "@sb/utils";
import {
  FILE_EXTENSION_KEY,
  type IFormFileField,
  type IWithFiles,
  type TFileFieldValue,
  type TFileInForm,
  type TFileServiceExtensionState,
} from "./Model";

const selectFieldDefFilesExtension = (
  state: IWithFormsState,
  formName: string,
  fieldPath: TFieldPath,
) =>
  selectFieldDefExtension<IWithFiles>(
    state,
    formName,
    fieldPath,
    FILE_EXTENSION_KEY,
  );

const selectIsFieldAndFormConnectedToFilesExtension = (
  state: IWithFormsState,
  formName: string,
  fieldPath: TFieldPath,
) =>
  selectIsFieldAndFormConnectedToExtension(state, formName, fieldPath, FILE_EXTENSION_KEY);

const selectFilesFieldsPaths = (state: IWithFormsState, formName: string) =>
  getFormFieldsPathsByExtensionKey(state, formName, FILE_EXTENSION_KEY);

//transforms to fileDTO - the value that is stored in the form
const formValueToFilesDtoSelectorFactory = <S extends TWithFileServiceState>(
  permanentSelector: TPermanentSelector,
) =>
    (state: S, files: TFileInForm[]): TFileDto[] => files.map(({ type, id }) => {
      if (type === EFileType.temporary) {
        return getNotNil(
          fileServiceSelectors[EFileStateType.temporary](state)[id],
          ["getFilesDtoFormSubmitFactory", "EFileType.temporary"],
          "TFileDto",
        );
      }

      if (type === EFileType.permanent) {
        return permanentSelector(state, id);
      }

      throw Error("[getFilesDtoFormSubmitFactory] Not Found status");
    });

const getFilesToRemoveSelector = <State extends TFileServiceExtensionState>(
  state: State,
  fileFieldPaths: TFieldPath[],
  formName: string,
) => fileFieldPaths.reduce<string[]>(
  (acc, fieldPath) => {
    const fieldValue = selectFieldValue<TFileFieldValue>(state, formName, fieldPath);

    if(isNil(fieldValue?.files)) {
      return acc;
    }

    const files = fieldValue.files
      .filter((file) => file.type !== EFileType.permanent)
      .map(({ id }) => id);

    if (isNotEmpty(files)) {
      return [...acc, ...files];
    }

    return acc;
  },
  [],
);

const fileServiceStartedUploadFormFilesSelector = <State extends TFileServiceExtensionState>(state: State, value: IFormFileField["value"]) => {
  if(!value || isVoid(value.files)){
    return false;
  }

  const filtered = value.files.filter((file) => file.type !== EFileType.permanent);
  if(isEmpty(filtered)){
    return false;
  }

  return fileServiceStartedUploadSelector(state, filtered.map(({ id }) => id));
};

export {
  selectFieldDefFilesExtension,
  selectIsFieldAndFormConnectedToFilesExtension,
  selectFilesFieldsPaths,
  getFilesToRemoveSelector,
  formValueToFilesDtoSelectorFactory,
  fileServiceStartedUploadFormFilesSelector,
};
