// @ts-nocheck
import { useCallback, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { not, useAction, withProps } from "@sb/utils";
import { playerDetailsSelectors } from "../../../../common/Store/Player/Selectors/PlayerSelectors";
import { removeElementByIndex } from "../../../Utils/RemoveElementByIndex";
import { FileUploader as FileUploaderBase } from "../../../Components/FileUploader/FileUploader";
import { allowedFileTypes, validateFile } from "../../../Utils/ValidateFile";
import { playerKycUploadFilesAction } from "../KycActions";

const useGetAddFilesHelpers = (type) => {
  const { pending, successfulUploads, failedUploads } = useSelector(playerDetailsSelectors.kycLoader);

  const [files, setFiles] = useState([]);

  const [reading, toggleReading] = useReducer(not<boolean>, false);

  const [readingErrors, setReadingErrors] = useState([]);

  const uploadFile = useAction(playerKycUploadFilesAction);

  const handleCancelClick = () => {
    setReadingErrors([]);

    setFiles([]);
  };

  const handleUploadClick = () => {
    setReadingErrors([]);

    setFiles([]);

    uploadFile(files);
  };

  const setFileType = (index) => (type) => {
    setReadingErrors([]);

    const updatedFile = { ...files[index], type };

    const updateFiles = [...files];

    updateFiles[index] = updatedFile;

    setFiles(updateFiles);
  };

  const removeFile = (index) => () => {
    setReadingErrors([]);

    setFiles(removeElementByIndex(files, index));
  };

  const onFileUploaderStart = useCallback(
    () => {
      setReadingErrors([]);

      toggleReading();
    },
    [],
  );

  const onFileUploaderResult = useCallback(
    (file: any) => {
      setFiles((prevState) => [...prevState, { ...file, type }]);
    },
    [type],
  );

  const onFileUploaderError = useCallback(
    (e: any) => {
      setReadingErrors((prevState) => [...prevState, e.message]);
    },
    [],
  );

  const FileUploader = withProps(FileUploaderBase)({
    multiple: false,
    onStart: onFileUploaderStart,
    onEnd: toggleReading,
    onError: onFileUploaderError,
    onResult: onFileUploaderResult,
    allowedTypes: allowedFileTypes,
    validateFile,
  });

  return {
    reading,
    files,
    setFileType,
    removeFile,
    readingErrors,
    handleUploadClick,
    handleCancelClick,
    pending,
    failedUploads,
    successfulUploads,
    FileUploader,
  };
};

export { useGetAddFilesHelpers };
