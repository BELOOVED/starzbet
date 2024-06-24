import { type TReducer } from "@sb/utils";
import { type IWithTransactionRequestsState, transactionRequestsInitialState } from "../TransactionRequestsInitialState";
import { type platformResetTransactionRequestsAction } from "../TransactionRequestsActions";

const platformTransactionRequestsResetReducer: TReducer<
  IWithTransactionRequestsState,
  typeof platformResetTransactionRequestsAction
> = (state) => ({
  ...state,
  transactionRequests: {
    ...transactionRequestsInitialState.transactionRequests,
  },
});

export { platformTransactionRequestsResetReducer };
