/* Generated by HandleQuery */
/* Internal */
import { createDocument } from "../../../../../Core/Generated/Helpers/CreateDocument";
import type { TDocument } from "@sb/graphql-core";
import type { TPlatform_PlayerBonuses_QueryOptionalFields } from "../../Platform/Types/TPlatform_PlayerBonuses_QueryOptionalFields";
import { Platform_PlayerBonusesPage_Fragment } from "../../Platform/Documents/Platform_PlayerBonusesPage_Fragment";

export const Platform_PlayerBonuses_Query: TDocument<TPlatform_PlayerBonuses_QueryOptionalFields> = process.env.GRAPHQL_PERSISTED === "strict"
        ? () => () => ""
        : createDocument<TPlatform_PlayerBonuses_QueryOptionalFields>("query Platform_PlayerBonuses($where: Platform_PlayerBonusWhereInput, $cursor: Cursor, $orderBy: [Platform_PlayerBonusOrderBy!]) { platform { PlayerBonuses(where: $where, cursor: $cursor, orderBy: $orderBy) { ...Platform_PlayerBonusesPage } } }", {
    Platform_PlayerBonusesPage_Fragment,
  });

Platform_PlayerBonuses_Query.extra = createDocument<TPlatform_PlayerBonuses_QueryOptionalFields>(
  process.env.GRAPHQL_PERSISTED === "strict" ? "" : "query Platform_PlayerBonuses($where: Platform_PlayerBonusWhereInput, $cursor: Cursor, $orderBy: [Platform_PlayerBonusOrderBy!]) { platform { PlayerBonuses(where: $where, cursor: $cursor, orderBy: $orderBy) { __typename pageInfo { __typename total } } } }",
  {},
);
