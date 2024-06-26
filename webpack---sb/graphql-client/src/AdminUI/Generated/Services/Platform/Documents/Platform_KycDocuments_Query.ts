/* Generated by HandleQuery */
/* Internal */
import { createDocument } from "../../../../../Core/Generated/Helpers/CreateDocument";
import type { TDocument } from "@sb/graphql-core";
import type { TPlatform_KycDocuments_QueryOptionalFields } from "../../Platform/Types/TPlatform_KycDocuments_QueryOptionalFields";
import { Platform_KycDocumentsPage_Fragment } from "../../Platform/Documents/Platform_KycDocumentsPage_Fragment";

export const Platform_KycDocuments_Query: TDocument<TPlatform_KycDocuments_QueryOptionalFields> = process.env.GRAPHQL_PERSISTED === "strict"
        ? () => () => ""
        : createDocument<TPlatform_KycDocuments_QueryOptionalFields>("query Platform_KycDocuments($cursor: Cursor, $where: Platform_KycDocumentWhereInput, $orderBy: [Platform_KycDocumentOrderBy!]) { platform @normalize { KycDocuments(cursor: $cursor, where: $where, orderBy: $orderBy) { ...Platform_KycDocumentsPage } } }", {
    Platform_KycDocumentsPage_Fragment,
  });

Platform_KycDocuments_Query.extra = createDocument<TPlatform_KycDocuments_QueryOptionalFields>(
  process.env.GRAPHQL_PERSISTED === "strict" ? "" : "query Platform_KycDocuments($cursor: Cursor, $where: Platform_KycDocumentWhereInput, $orderBy: [Platform_KycDocumentOrderBy!]) { platform @normalize { KycDocuments(cursor: $cursor, where: $where, orderBy: $orderBy) { __typename pageInfo { __typename total } } } }",
  {},
);
