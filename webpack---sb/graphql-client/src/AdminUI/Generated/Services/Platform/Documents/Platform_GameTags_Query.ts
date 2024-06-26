/* Generated by HandleQuery */
/* Internal */
import { createDocument } from "../../../../../Core/Generated/Helpers/CreateDocument";
import type { TDocument } from "@sb/graphql-core";
import type { TPlatform_GameTags_QueryOptionalFields } from "../../Platform/Types/TPlatform_GameTags_QueryOptionalFields";
import { Platform_TagsPage_Fragment } from "../../Platform/Documents/Platform_TagsPage_Fragment";

export const Platform_GameTags_Query: TDocument<TPlatform_GameTags_QueryOptionalFields> = process.env.GRAPHQL_PERSISTED === "strict"
        ? () => () => ""
        : createDocument<TPlatform_GameTags_QueryOptionalFields>("query Platform_GameTags($cursor: Cursor, $where: Platform_TagWhereInput, $orderBy: [Platform_TagOrderBy!]) { platform @normalize { GameTags(cursor: $cursor, where: $where, orderBy: $orderBy) { ...Platform_TagsPage } } }", {
    Platform_TagsPage_Fragment,
  });

Platform_GameTags_Query.extra = createDocument<TPlatform_GameTags_QueryOptionalFields>(
  process.env.GRAPHQL_PERSISTED === "strict" ? "" : "query Platform_GameTags($cursor: Cursor, $where: Platform_TagWhereInput, $orderBy: [Platform_TagOrderBy!]) { platform @normalize { GameTags(cursor: $cursor, where: $where, orderBy: $orderBy) { __typename pageInfo { __typename total } } } }",
  {},
);
