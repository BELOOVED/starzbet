import { type TReducer } from "@sb/utils";
import { assocPath } from "@sb/utils/AssocPath";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type playerKycUpdateUploadingStatusActionSuccessful } from "../KycActions";

const playerKycUpdateUploadingStatusSuccessfulReducer: TReducer<
  TPlatformAppState,
  typeof playerKycUpdateUploadingStatusActionSuccessful
> = (state, { payload: { successfulUploads } }) => assocPath<TPlatformAppState>(
  ["player", "details", "kycLoader", "successfulUploads"],
  successfulUploads,
  state,
);

export { playerKycUpdateUploadingStatusSuccessfulReducer };
