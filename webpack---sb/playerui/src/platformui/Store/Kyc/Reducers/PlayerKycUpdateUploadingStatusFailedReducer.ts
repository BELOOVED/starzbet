import { assocPath } from "@sb/utils/AssocPath";
import { type TReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type playerKycUpdateUploadingStatusActionFailed } from "../KycActions";

const playerKycUpdateUploadingStatusFailedReducer: TReducer<
  TPlatformAppState, typeof playerKycUpdateUploadingStatusActionFailed
> = (state, { payload: { failedUploads } }) => assocPath<TPlatformAppState>(
  ["player", "details", "kycLoader", "failedUploads"],
  failedUploads,
  state,
);

export { playerKycUpdateUploadingStatusFailedReducer };
