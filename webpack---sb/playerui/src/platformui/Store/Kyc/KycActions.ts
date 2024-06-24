import { type TImplicitAny } from "@sb/utils";
import type { TPlatform_Player_Fragment } from "@sb/graphql-client/PlayerUI";
import { type IFiles } from "./Model/IFiles";

const playerKycUploadFilesAction = (files: IFiles[]) => ({
  type: "@KYC/UPLOAD_FILES",
  payload: { files },
});

const playerKycUpdateUploadingStatusActionPending = (pending: boolean) => ({
  type: "@KYC/UPDATE_UPLOADING_STATUS_PENDING",
  payload: { pending },
});

const playerKycUpdateUploadingStatusActionSuccessful = (successfulUploads: boolean) => ({
  type: "@KYC/UPDATE_UPLOADING_STATUS_SUCCESSFUL",
  payload: { successfulUploads },
});

const playerKycUpdateUploadingStatusActionFailed = (failedUploads: boolean) => ({
  type: "@KYC/UPDATE_UPLOADING_STATUS_FAILED",
  payload: { failedUploads },
});

const playerKycReceivedAction = (payload: TPlatform_Player_Fragment["kyc"]) => ({
  type: "@KYC/KYC_RECEIVED",
  payload,
});

const playerKycDocumentsReceivedAction = (data: Record<string, TImplicitAny>) => ({
  type: "@KYC/KYC_DOCUMENTS_RECEIVED",
  payload: { data },
});

export {
  playerKycUploadFilesAction,
  playerKycReceivedAction,
  playerKycDocumentsReceivedAction,
  playerKycUpdateUploadingStatusActionPending,
  playerKycUpdateUploadingStatusActionSuccessful,
  playerKycUpdateUploadingStatusActionFailed,
};
