import type { TPlatform_TransactionRequest_Fragment } from "@sb/graphql-client/PlayerUI";
import { type EPlatform_TransactionType, type TPageInfo_Fragment } from "@sb/graphql-client";
import { type IWithCursor } from "../Paginator/IWithCursor";

interface IWithTransactionRequestsState {
  transactionRequests: {
    nodes: TPlatform_TransactionRequest_Fragment[];
    pageInfo: TPageInfo_Fragment | null;
    transactionTypeList: EPlatform_TransactionType[];
    variables: IWithCursor | null;
    pending: boolean;
  };
}

const transactionRequestsInitialState: IWithTransactionRequestsState = {
  transactionRequests: {
    nodes: [],
    pageInfo: null,
    transactionTypeList: [],
    variables: null,
    pending: false,
  },
};

export type { IWithTransactionRequestsState };
export { transactionRequestsInitialState };
