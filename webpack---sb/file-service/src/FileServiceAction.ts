import { actionWithPayloadCreator, type TExplicitAny } from "@sb/utils";
import { type EFileStateType, type IMetadata, type TFileDto, type TFullFileInfo } from "./Model";

const createActionWithPayload = actionWithPayloadCreator("@SB/FILE_SERVICE");

const filesServiceStartUploadAction = createActionWithPayload(
  "START_UPLOAD_FILES",
  (files: { id: string; file: File; }[], toShared = false) => ({ files, toShared }),
);

const fileServiceSucceededUploadAction = createActionWithPayload(
  "SUCCEEDED_UPLOAD",
  (id: string, file: TFileDto) => ({ id, file }),
);

const cancelUploadFilesAction = createActionWithPayload(
  "CANCEL_UPLOAD",
  (ids: string[]) => ({ ids }),
);

const fileServiceFailedAction = createActionWithPayload(
  "FAILED",
  (id: string, isUpload: boolean, error: TExplicitAny) => ({ id, error, isUpload }),
);

const fileServiceStartDownloadAction = createActionWithPayload(
  "START_DOWNLOAD",
  (file: TFileDto, fromShared = false) => ({ file, fromShared }),
);

const fileServiceSucceededDownloadAction = createActionWithPayload(
  "SUCCEEDED_DOWNLOAD",
  (id: string, file: TFullFileInfo) => ({ id, file }),
);

const fileServiceSetMetadataAction = createActionWithPayload(
  "SET_METADATA",
  (metadata: IMetadata) => ({ metadata }),
);

const fileServiceRemoveFilesAction =
  createActionWithPayload(
    "REMOVE_FILES",
    (type: EFileStateType, ids: string[]) => ({ type, ids }),
  );

export {
  fileServiceSetMetadataAction,
  fileServiceSucceededUploadAction,
  fileServiceFailedAction,
  fileServiceStartDownloadAction,
  fileServiceSucceededDownloadAction,
  fileServiceRemoveFilesAction,
  filesServiceStartUploadAction,
  cancelUploadFilesAction,
};
