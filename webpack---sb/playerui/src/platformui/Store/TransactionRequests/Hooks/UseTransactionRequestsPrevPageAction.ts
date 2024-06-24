import { useActionWithBind } from "@sb/utils";
import { platformTransactionRequestsChangePaginationAction } from "../TransactionRequestsActions";
import { ETransactionRequestPaginatorModel } from "../Model/TransactionRequestPaginatorModel";

const useTransactionRequestsPrevPageAction = () => useActionWithBind(
  platformTransactionRequestsChangePaginationAction,
  ETransactionRequestPaginatorModel.prevPage,
);

export { useTransactionRequestsPrevPageAction };
