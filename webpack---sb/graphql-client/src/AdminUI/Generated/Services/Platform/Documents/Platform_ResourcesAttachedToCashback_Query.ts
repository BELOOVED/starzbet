/* Generated by HandleQuery */
/* Internal */
import { createDocument } from "../../../../../Core/Generated/Helpers/CreateDocument";
import type { TDocument } from "@sb/graphql-core";
import type { TPlatform_ResourcesAttachedToCashback_QueryOptionalFields } from "../../Platform/Types/TPlatform_ResourcesAttachedToCashback_QueryOptionalFields";
import { Platform_ResourcesAttachedToCashbackReadPage_Fragment } from "../../Platform/Documents/Platform_ResourcesAttachedToCashbackReadPage_Fragment";

export const Platform_ResourcesAttachedToCashback_Query: TDocument<TPlatform_ResourcesAttachedToCashback_QueryOptionalFields> = process.env.GRAPHQL_PERSISTED === "strict"
        ? () => () => ""
        : createDocument<TPlatform_ResourcesAttachedToCashback_QueryOptionalFields>("query Platform_ResourcesAttachedToCashback($cursor: Cursor, $where: Platform_ResourcesAttachedToCashbackWhere, $orderBy: [Platform_ResourceAttachedToCashbackOrderBy!]) { platform @normalize { ResourcesAttachedToCashback(cursor: $cursor, where: $where, orderBy: $orderBy) { ...Platform_ResourcesAttachedToCashbackReadPage } } }", {
    Platform_ResourcesAttachedToCashbackReadPage_Fragment,
  });

Platform_ResourcesAttachedToCashback_Query.extra = createDocument<TPlatform_ResourcesAttachedToCashback_QueryOptionalFields>(
  process.env.GRAPHQL_PERSISTED === "strict" ? "" : "query Platform_ResourcesAttachedToCashback($cursor: Cursor, $where: Platform_ResourcesAttachedToCashbackWhere, $orderBy: [Platform_ResourceAttachedToCashbackOrderBy!]) { platform @normalize { ResourcesAttachedToCashback(cursor: $cursor, where: $where, orderBy: $orderBy) { __typename pageInfo { __typename total } } } }",
  {},
);
