import { useActionWithBind } from "@sb/utils";
import { platformTransactionRequestsChangePaginationAction } from "../TransactionRequestsActions";
import { ETransactionRequestPaginatorModel } from "../Model/TransactionRequestPaginatorModel";

const useTransactionRequestsNextPageAction = () => useActionWithBind(
  platformTransactionRequestsChangePaginationAction,
  ETransactionRequestPaginatorModel.nextPage,
);

export { useTransactionRequestsNextPageAction };
