import { type TReducer } from "@sb/utils";
import { assocPath } from "@sb/utils/AssocPath";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type playerKycUpdateUploadingStatusActionPending } from "../KycActions";

const playerKycUpdateUploadingStatusPendingReducer: TReducer<
  TPlatformAppState, typeof playerKycUpdateUploadingStatusActionPending
> = (state, { payload: { pending } }) => assocPath<TPlatformAppState>(
  ["player", "details", "kycLoader", "pending"],
  pending,
  state,
);

export { playerKycUpdateUploadingStatusPendingReducer };
