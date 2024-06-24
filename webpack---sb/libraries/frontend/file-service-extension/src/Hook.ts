import { useCallback, useMemo } from "react";
import { getNotNil, isEmpty, isVoid, type TNullable, useAction } from "@sb/utils";
import {
  selectIsFormConnectedToExtension,
  simpleValueExtractor,
  SUBMITTING_EXTENSION_KEY,
  type TFieldError,
  type TFieldPath,
  useFormInputField,
  useFormName,
  useFormSelector,
} from "@sb/form-new";
import { cancelUploadFilesAction } from "@sb/file-service";
import { type IFormFileField, type TFileFieldValue } from "./Model";
import { selectIsFieldAndFormConnectedToFilesExtension } from "./Selectors";
import { setFileFieldValueAction } from "./Actions";

const createFileId = (fieldPath: TFieldPath, file: File) => `${file.name}:${file.size}:${file.lastModified}:@${fieldPath.join()}`;

const useFormFileField = <Error extends TFieldError = TFieldError>(fieldPath: TFieldPath) => {
  const isConnected = useFormSelector(selectIsFieldAndFormConnectedToFilesExtension, [fieldPath]);

  if (!isConnected) {
    throw Error("Files extension is not enabled. Check the Form Extension or check for withFiles");
  }

  const isConnectedToSubmittingExtension = useFormSelector(selectIsFormConnectedToExtension, [SUBMITTING_EXTENSION_KEY]);

  if (!isConnectedToSubmittingExtension) {
    throw Error("the extension file cannot be used without a submit extension");
  }

  const formName = useFormName();
  const cancelUpload = useAction(cancelUploadFilesAction);
  const setFileFieldValue = useAction(setFileFieldValueAction);

  const { input: { onChange, value }, disabled } =
    useFormInputField<TFileFieldValue, TFieldError | Error>(
      fieldPath,
      false,
      simpleValueExtractor,
    );

  const fileInputOnChange = useCallback(
    (files: TNullable<FileList>) => {
      const toUpload: { id: string; file: File; }[] = [];

      if (isVoid(files)) {
        return;
      }

      for (const file of files) {
        const id = createFileId(fieldPath, file);
        toUpload.push({ id, file });
      }
      setFileFieldValue(formName, fieldPath, toUpload);
    },
    [],
  );

  const remove = useCallback(
    (fileId: string) => {
      const files = getNotNil(
        value,
        ["useFormFileField", "attempt to delete a file with the undefined form value"],
        "value",
      ).files
        .filter(({ id }) => fileId !== id);

      cancelUpload([fileId]);

      if (isEmpty(files)) {
        onChange(undefined);

        return;
      }
      onChange({ files });
    },
    [value, value?.files],
  );

  return useMemo<IFormFileField>(
    () => ({
      value,
      onChange: fileInputOnChange,
      disabled,
      remove,
    }),
    [value, onChange, fileInputOnChange, remove, disabled, value?.files],
  );
};

export { useFormFileField, createFileId };
