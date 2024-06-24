import { createRootReducer } from "@sb/utils";
import {
  platformResetTransactionRequestsAction,
  platformTransactionRequestsPendingAction,
  platformTransactionRequestsReceivedAction,
} from "../TransactionRequestsActions";
import { platformTransactionRequestsReceivedReducer } from "./PlatformTransactionRequestsReceivedReducer";
import { platformTransactionRequestsResetReducer } from "./PlatformTransactionRequestsResetReducer";
import { platformTransactionRequestsPendingReducer } from "./PlatformTransactionRequestsPendingReducer";

const platformTransactionRequestsRootReducer = createRootReducer([
  [platformTransactionRequestsResetReducer, platformResetTransactionRequestsAction],
  [platformTransactionRequestsReceivedReducer, platformTransactionRequestsReceivedAction],
  [platformTransactionRequestsPendingReducer, platformTransactionRequestsPendingAction],
]);

export { platformTransactionRequestsRootReducer };
