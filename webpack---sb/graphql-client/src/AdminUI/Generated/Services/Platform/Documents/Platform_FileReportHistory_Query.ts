/* Generated by HandleQuery */
/* Internal */
import { createDocument } from "../../../../../Core/Generated/Helpers/CreateDocument";
import type { TDocument } from "@sb/graphql-core";
import type { TPlatform_FileReportHistory_QueryOptionalFields } from "../../Platform/Types/TPlatform_FileReportHistory_QueryOptionalFields";
import { Platform_FileReportSlicePage_Fragment } from "../../Platform/Documents/Platform_FileReportSlicePage_Fragment";

export const Platform_FileReportHistory_Query: TDocument<TPlatform_FileReportHistory_QueryOptionalFields> = process.env.GRAPHQL_PERSISTED === "strict"
        ? () => () => ""
        : createDocument<TPlatform_FileReportHistory_QueryOptionalFields>("query Platform_FileReportHistory($cursor: Cursor, $where: Platform_FileReportSliceWhereInput) { platform @normalize { FileReportHistory(cursor: $cursor, where: $where) { ...Platform_FileReportSlicePage } } }", {
    Platform_FileReportSlicePage_Fragment,
  });

Platform_FileReportHistory_Query.extra = createDocument<TPlatform_FileReportHistory_QueryOptionalFields>(
  process.env.GRAPHQL_PERSISTED === "strict" ? "" : "query Platform_FileReportHistory($cursor: Cursor, $where: Platform_FileReportSliceWhereInput) { platform @normalize { FileReportHistory(cursor: $cursor, where: $where) { __typename pageInfo { __typename total } } } }",
  {},
);
