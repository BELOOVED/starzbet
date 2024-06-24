import { type TReducer } from "@sb/utils";
import { type platformTransactionRequestsReceivedAction } from "../TransactionRequestsActions";
import { type IWithTransactionRequestsState } from "../TransactionRequestsInitialState";

const platformTransactionRequestsReceivedReducer: TReducer<
  IWithTransactionRequestsState,
  typeof platformTransactionRequestsReceivedAction
> = (
  state,
  {
    payload: {
      nodes,
      pageInfo,
      transactionTypeList,
      variables,
    },
  },
) => ({
  ...state,
  transactionRequests: {
    ...state.transactionRequests,
    nodes,
    pageInfo,
    transactionTypeList,
    variables,
  },
});

export { platformTransactionRequestsReceivedReducer };
