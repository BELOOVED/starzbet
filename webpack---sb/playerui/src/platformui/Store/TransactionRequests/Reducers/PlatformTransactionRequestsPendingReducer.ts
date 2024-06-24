import { type TReducer } from "@sb/utils";
import { type platformTransactionRequestsPendingAction } from "../TransactionRequestsActions";
import { type IWithTransactionRequestsState } from "../TransactionRequestsInitialState";

const platformTransactionRequestsPendingReducer: TReducer<
  IWithTransactionRequestsState,
  typeof platformTransactionRequestsPendingAction
> = (state, { payload: { pending } }) => ({
  ...state,
  transactionRequests: {
    ...state.transactionRequests,
    pending,
  },
});

export { platformTransactionRequestsPendingReducer };
