/* Generated by HandleQuery */
/* Internal */
import { createDocument } from "../../../../../Core/Generated/Helpers/CreateDocument";
import type { TDocument } from "@sb/graphql-core";
import type { TPlatform_PlayerBankAccountsWithCursor_QueryOptionalFields } from "../../Platform/Types/TPlatform_PlayerBankAccountsWithCursor_QueryOptionalFields";
import { Platform_PlayerBankAccountsPage_Fragment } from "../../Platform/Documents/Platform_PlayerBankAccountsPage_Fragment";

export const Platform_PlayerBankAccountsWithCursor_Query: TDocument<TPlatform_PlayerBankAccountsWithCursor_QueryOptionalFields> = process.env.GRAPHQL_PERSISTED === "strict"
        ? () => () => ""
        : createDocument<TPlatform_PlayerBankAccountsWithCursor_QueryOptionalFields>("query Platform_PlayerBankAccountsWithCursor($playerId: String, $cursor: Cursor) { platform { PlayerBankAccountsWithCursor( where: {predicate: eq, fieldPath: playerBankAccount__player__id, value: $playerId} cursor: $cursor ) { ...Platform_PlayerBankAccountsPage } } }", {
    Platform_PlayerBankAccountsPage_Fragment,
  });

Platform_PlayerBankAccountsWithCursor_Query.extra = createDocument<TPlatform_PlayerBankAccountsWithCursor_QueryOptionalFields>(
  process.env.GRAPHQL_PERSISTED === "strict" ? "" : "query Platform_PlayerBankAccountsWithCursor($playerId: String, $cursor: Cursor) { platform { PlayerBankAccountsWithCursor( where: {predicate: eq, fieldPath: playerBankAccount__player__id, value: $playerId} cursor: $cursor ) { __typename pageInfo { __typename total } } } }",
  {},
);
