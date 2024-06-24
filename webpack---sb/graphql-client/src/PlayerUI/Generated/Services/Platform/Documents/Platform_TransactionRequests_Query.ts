/* Generated by HandleQuery */
/* Internal */
import { createDocument } from "../../../../../Core/Generated/Helpers/CreateDocument";
import type { TDocument } from "@sb/graphql-core";
import type { TPlatform_TransactionRequests_QueryOptionalFields } from "../../Platform/Types/TPlatform_TransactionRequests_QueryOptionalFields";
import { Platform_TransactionRequestsPage_Fragment } from "../../Platform/Documents/Platform_TransactionRequestsPage_Fragment";

export const Platform_TransactionRequests_Query: TDocument<TPlatform_TransactionRequests_QueryOptionalFields> = process.env.GRAPHQL_PERSISTED === "strict"
        ? () => () => ""
        : createDocument<TPlatform_TransactionRequests_QueryOptionalFields>("query Platform_TransactionRequests($cursor: Cursor, $where: Platform_TransactionRequestWhereInput, $orderBy: [Platform_TransactionRequestOrderBy!]) { platform { TransactionRequests(cursor: $cursor, orderBy: $orderBy, where: $where) { ...Platform_TransactionRequestsPage } } }", {
    Platform_TransactionRequestsPage_Fragment,
  });

Platform_TransactionRequests_Query.extra = createDocument<TPlatform_TransactionRequests_QueryOptionalFields>(
  process.env.GRAPHQL_PERSISTED === "strict" ? "" : "query Platform_TransactionRequests($cursor: Cursor, $where: Platform_TransactionRequestWhereInput, $orderBy: [Platform_TransactionRequestOrderBy!]) { platform { TransactionRequests(cursor: $cursor, orderBy: $orderBy, where: $where) { __typename pageInfo { __typename total } } } }",
  {},
);
