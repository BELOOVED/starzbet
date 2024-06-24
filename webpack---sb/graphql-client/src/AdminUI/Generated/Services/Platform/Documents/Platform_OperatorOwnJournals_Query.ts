/* Generated by HandleQuery */
/* Internal */
import { createDocument } from "../../../../../Core/Generated/Helpers/CreateDocument";
import type { TDocument } from "@sb/graphql-core";
import type { TPlatform_OperatorOwnJournals_QueryOptionalFields } from "../../Platform/Types/TPlatform_OperatorOwnJournals_QueryOptionalFields";
import { Platform_OperatorJournalsPage_Fragment } from "../../Platform/Documents/Platform_OperatorJournalsPage_Fragment";

export const Platform_OperatorOwnJournals_Query: TDocument<TPlatform_OperatorOwnJournals_QueryOptionalFields> = process.env.GRAPHQL_PERSISTED === "strict"
        ? () => () => ""
        : createDocument<TPlatform_OperatorOwnJournals_QueryOptionalFields>("query Platform_OperatorOwnJournals($cursor: Cursor, $where: Platform_OperatorJournalWhereInput, $orderBy: [Platform_OperatorJournalOrderBy!]) { platform @normalize { OperatorOwnJournals(cursor: $cursor, where: $where, orderBy: $orderBy) { ...Platform_OperatorJournalsPage } } }", {
    Platform_OperatorJournalsPage_Fragment,
  });

Platform_OperatorOwnJournals_Query.extra = createDocument<TPlatform_OperatorOwnJournals_QueryOptionalFields>(
  process.env.GRAPHQL_PERSISTED === "strict" ? "" : "query Platform_OperatorOwnJournals($cursor: Cursor, $where: Platform_OperatorJournalWhereInput, $orderBy: [Platform_OperatorJournalOrderBy!]) { platform @normalize { OperatorOwnJournals(cursor: $cursor, where: $where, orderBy: $orderBy) { __typename pageInfo { __typename total } } } }",
  {},
);