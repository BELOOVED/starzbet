import type { TPlatform_TransactionRequest_Fragment } from "@sb/graphql-client/PlayerUI";
import { type EPlatform_TransactionType, type TPageInfo_Fragment } from "@sb/graphql-client";
import { type IWithCursor } from "../Paginator/IWithCursor";
import { type ETransactionRequestPaginatorModel } from "./Model/TransactionRequestPaginatorModel";

const platformTransactionRequestsReceivedAction = (
  nodes: TPlatform_TransactionRequest_Fragment[],
  pageInfo: TPageInfo_Fragment,
  transactionTypeList: EPlatform_TransactionType[],
  variables: IWithCursor,
) => ({
  type: "@PLATFORM/TRANSACTION_REQUESTS_RECEIVED",
  payload: {
    nodes,
    pageInfo,
    transactionTypeList,
    variables,
  },
});

const platformTransactionRequestsChangePaginationAction = (pagination: ETransactionRequestPaginatorModel) => ({
  type: "@PLATFORM/TRANSACTION_REQUESTS_CHANGE_PAGE",
  payload: {
    pagination,
  },
});

const platformResetTransactionRequestsAction = () => ({
  type: "@PLATFORM/RESET_TRANSACTION_REQUESTS",
  payload: {},
});

const platformTransactionRequestsPendingAction = (pending: boolean) => ({
  type: "@PLATFORM/TRANSACTION_REQUESTS_PENDING",
  payload: { pending },
});

export {
  platformTransactionRequestsReceivedAction,
  platformTransactionRequestsChangePaginationAction,
  platformResetTransactionRequestsAction,
  platformTransactionRequestsPendingAction,
};
