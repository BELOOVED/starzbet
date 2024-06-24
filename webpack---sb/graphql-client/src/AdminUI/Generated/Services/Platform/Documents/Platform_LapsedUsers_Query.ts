/* Generated by HandleQuery */
/* Internal */
import { createDocument } from "../../../../../Core/Generated/Helpers/CreateDocument";
import type { TDocument } from "@sb/graphql-core";
import type { TPlatform_LapsedUsers_QueryOptionalFields } from "../../Platform/Types/TPlatform_LapsedUsers_QueryOptionalFields";
import { Platform_LapsedUsersPage_Fragment } from "../../Platform/Documents/Platform_LapsedUsersPage_Fragment";

export const Platform_LapsedUsers_Query: TDocument<TPlatform_LapsedUsers_QueryOptionalFields> = process.env.GRAPHQL_PERSISTED === "strict"
        ? () => () => ""
        : createDocument<TPlatform_LapsedUsers_QueryOptionalFields>("query Platform_LapsedUsers($cursor: Cursor, $where: Platform_LapsedUsersWhereInput) { platform @normalize { LapsedUsers(cursor: $cursor, where: $where) { ...Platform_LapsedUsersPage } } }", {
    Platform_LapsedUsersPage_Fragment,
  });

Platform_LapsedUsers_Query.extra = createDocument<TPlatform_LapsedUsers_QueryOptionalFields>(
  process.env.GRAPHQL_PERSISTED === "strict" ? "" : "query Platform_LapsedUsers($cursor: Cursor, $where: Platform_LapsedUsersWhereInput) { platform @normalize { LapsedUsers(cursor: $cursor, where: $where) { __typename pageInfo { __typename total } } } }",
  {},
);
