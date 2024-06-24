import { createRootReducer } from "@sb/utils";
import {
  playerKycDocumentsReceivedAction,
  playerKycReceivedAction,
  playerKycUpdateUploadingStatusActionFailed,
  playerKycUpdateUploadingStatusActionPending,
  playerKycUpdateUploadingStatusActionSuccessful,
} from "../KycActions";
import { playerKycReceivedReducer } from "./PlayerKycReceivedReducer";
import { playerKycDocumentsReceivedReducer } from "./PlayerKycDocumentsReceivedReducer";
import { playerKycUpdateUploadingStatusPendingReducer } from "./PlayerKycUpdateUploadingStatusPendingReducer";
import { playerKycUpdateUploadingStatusFailedReducer } from "./PlayerKycUpdateUploadingStatusFailedReducer";
import { playerKycUpdateUploadingStatusSuccessfulReducer } from "./PlayerKycUpdateUploadingStatusSuccessfulReducer";

const playerKycRootReducer = createRootReducer([
  [playerKycReceivedReducer, playerKycReceivedAction],
  [playerKycUpdateUploadingStatusPendingReducer, playerKycUpdateUploadingStatusActionPending],
  [playerKycUpdateUploadingStatusFailedReducer, playerKycUpdateUploadingStatusActionFailed],
  [playerKycUpdateUploadingStatusSuccessfulReducer, playerKycUpdateUploadingStatusActionSuccessful],
  [playerKycDocumentsReceivedReducer, playerKycDocumentsReceivedAction],
]);

export { playerKycRootReducer };
