/* Generated by HandleQuery */
/* Internal */
import { createDocument } from "../../../../../Core/Generated/Helpers/CreateDocument";
import type { TDocument } from "@sb/graphql-core";
import type { TPlatform_IntegrationPaymentLogsWithCursor_QueryOptionalFields } from "../../Platform/Types/TPlatform_IntegrationPaymentLogsWithCursor_QueryOptionalFields";
import { Platform_IntegrationPaymentLogsPage_Fragment } from "../../Platform/Documents/Platform_IntegrationPaymentLogsPage_Fragment";

export const Platform_IntegrationPaymentLogsWithCursor_Query: TDocument<TPlatform_IntegrationPaymentLogsWithCursor_QueryOptionalFields> = process.env.GRAPHQL_PERSISTED === "strict"
        ? () => () => ""
        : createDocument<TPlatform_IntegrationPaymentLogsWithCursor_QueryOptionalFields>("query Platform_IntegrationPaymentLogsWithCursor($cursor: Cursor, $where: Platform_IntegrationPaymentLogWhereInput, $orderBy: [Platform_IntegrationPaymentLogOrderBy!]) { platform @normalize { IntegrationPaymentLogsWithCursor( cursor: $cursor where: $where orderBy: $orderBy ) { ...Platform_IntegrationPaymentLogsPage } } }", {
    Platform_IntegrationPaymentLogsPage_Fragment,
  });

Platform_IntegrationPaymentLogsWithCursor_Query.extra = createDocument<TPlatform_IntegrationPaymentLogsWithCursor_QueryOptionalFields>(
  process.env.GRAPHQL_PERSISTED === "strict" ? "" : "query Platform_IntegrationPaymentLogsWithCursor($cursor: Cursor, $where: Platform_IntegrationPaymentLogWhereInput, $orderBy: [Platform_IntegrationPaymentLogOrderBy!]) { platform @normalize { IntegrationPaymentLogsWithCursor( cursor: $cursor where: $where orderBy: $orderBy ) { __typename pageInfo { __typename total } } } }",
  {},
);
