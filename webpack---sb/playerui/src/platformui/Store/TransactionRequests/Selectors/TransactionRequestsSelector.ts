import { createPropertySelector, createSimpleSelector, isNotEmpty } from "@sb/utils";
import { type IWithTransactionRequestsState } from "../TransactionRequestsInitialState";

const transactionRequestsSelector = ({ transactionRequests }: IWithTransactionRequestsState) => transactionRequests;

const nodesTransactionRequestsSelector = createPropertySelector(
  transactionRequestsSelector,
  "nodes",
);

const pageInfoTransactionRequestsSelector = createPropertySelector(
  transactionRequestsSelector,
  "pageInfo",
);

const loadingTransactionRequestsSelector = createPropertySelector(
  transactionRequestsSelector,
  "pending",
);

const hasTransactionRequestsSelector = createSimpleSelector(
  [nodesTransactionRequestsSelector],
  isNotEmpty,
);

export {
  transactionRequestsSelector,
  nodesTransactionRequestsSelector,
  pageInfoTransactionRequestsSelector,
  loadingTransactionRequestsSelector,
  hasTransactionRequestsSelector,
};

