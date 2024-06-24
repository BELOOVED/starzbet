import { createRootReducer, type TReducer } from "@sb/utils";
import { callManagerFailed, callManagerRemoveSymbols, callManagerStart, callManagerSucceeded } from "@sb/call-manager";
import {
  cancelUploadFilesAction,
  fileServiceFailedAction,
  fileServiceRemoveFilesAction,
  fileServiceSetMetadataAction,
  fileServiceStartDownloadAction,
  fileServiceSucceededDownloadAction,
  fileServiceSucceededUploadAction,
  filesServiceStartUploadAction,
} from "./FileServiceAction";
import {
  EFileStateType,
  FILE_SERVICE_DOWNLOAD_CALL_SYMBOL,
  FILE_SERVICE_UPLOAD_CALL_SYMBOL,
  type TPrevFileInfoRecord,
  type TWithFileServiceState,
} from "./Model";
import { removeFiles } from "./Utils/RemoveFiles";
import { fileServiceStartedUploadSelector, fileServiceSucceededUploadSelector } from "./Selectors";

const startUploadFilesReducer: TReducer<
  TWithFileServiceState, typeof filesServiceStartUploadAction
> = (state, { payload: { files } }) => {
  const prevFileInfo = files.reduce<TPrevFileInfoRecord>(
    (prev, { id, file }) => {
      if (!(fileServiceSucceededUploadSelector(state, [id]) || fileServiceStartedUploadSelector(state, [id]))) {
        prev[id] = {
          name: file.name,
          size: file.size,
          type: file.type,
        };
      }

      return prev;
    },
    {
      ...state.fileService.prevFileInfo,
    },
  );

  return {
    ...state,
    fileService: {
      ...state.fileService,
      prevFileInfo: prevFileInfo,
    },
  };
};

const succeededUploadReducer: TReducer<
  TWithFileServiceState, typeof fileServiceSucceededUploadAction
> = (state, action) => {
  const prevFileInfo = { ...state.fileService.prevFileInfo };

  delete prevFileInfo[action.payload.id];

  return callManagerSucceeded(
    {
      ...state,
      fileService: {
        ...state.fileService,
        prevFileInfo,
        [EFileStateType.temporary]: {
          ...state.fileService[EFileStateType.temporary],
          [action.payload.id]: action.payload.file,
        },
      },
    },
    FILE_SERVICE_UPLOAD_CALL_SYMBOL,
    action.payload.id,
  );
};

const failedReducer: TReducer<
  TWithFileServiceState, typeof fileServiceFailedAction
> = (state, { payload: { error, id, isUpload } }) => callManagerFailed(
  state,
  isUpload ? FILE_SERVICE_UPLOAD_CALL_SYMBOL : FILE_SERVICE_DOWNLOAD_CALL_SYMBOL,
  error,
  id,
);

const startDownloadReducer: TReducer<
  TWithFileServiceState, typeof fileServiceStartDownloadAction
> = (state, action) => callManagerStart(
  state,
  FILE_SERVICE_DOWNLOAD_CALL_SYMBOL,
  action.payload.file.id,
);

const succeededDownloadReducer: TReducer<
  TWithFileServiceState, typeof fileServiceSucceededDownloadAction
> = (state, action) => callManagerSucceeded(
  {
    ...state,
    fileService: {
      ...state.fileService,
      [EFileStateType.privatePermanent]: {
        ...state.fileService[EFileStateType.privatePermanent],
        [action.payload.id]: action.payload.file,
      },
    },
  },
  FILE_SERVICE_DOWNLOAD_CALL_SYMBOL,
  action.payload.id,
);

const fileServiceRemoveFiles: TReducer<
  TWithFileServiceState, typeof fileServiceRemoveFilesAction
> = (state, { payload: { type, ids } }) =>
  removeFiles(state, type, ids);

const cancelUploadFilesReducer: TReducer<
  TWithFileServiceState, typeof cancelUploadFilesAction
> = (state, { payload: { ids } }) => {
  const prevFileInfo = { ...state.fileService.prevFileInfo };

  ids.forEach((id) => {
    delete prevFileInfo[id];
  });

  return callManagerRemoveSymbols(
    {
      ...state,
      fileService: {
        ...state.fileService,
        prevFileInfo,
      },
    },
    FILE_SERVICE_UPLOAD_CALL_SYMBOL,
    ids,
  );
};

const fileServiceSetMetadataReducer: TReducer<
  TWithFileServiceState, typeof fileServiceSetMetadataAction
> = (state, { payload: { metadata } }) => (
  {
    ...state,
    fileService: {
      ...state.fileService,
      metadata,
    },
  }
);

const fileServiceRootReducer = createRootReducer([
  [fileServiceSetMetadataReducer, fileServiceSetMetadataAction],
  [succeededUploadReducer, fileServiceSucceededUploadAction],
  [failedReducer, fileServiceFailedAction],
  [startDownloadReducer, fileServiceStartDownloadAction],
  [succeededDownloadReducer, fileServiceSucceededDownloadAction],
  [fileServiceRemoveFiles, fileServiceRemoveFilesAction],
  [startUploadFilesReducer, filesServiceStartUploadAction],
  [cancelUploadFilesReducer, cancelUploadFilesAction],
]);

export { fileServiceRootReducer };
