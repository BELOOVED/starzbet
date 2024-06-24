/* Generated by HandleQuery */
/* Internal */
import { createDocument } from "../../../../../Core/Generated/Helpers/CreateDocument";
import type { TDocument } from "@sb/graphql-core";
import type { TPlatform_PlayerChatBlacklistWords_QueryOptionalFields } from "../../Platform/Types/TPlatform_PlayerChatBlacklistWords_QueryOptionalFields";
import { Platform_PlayerChatBlacklistWord_Fragment } from "../../Platform/Documents/Platform_PlayerChatBlacklistWord_Fragment";

export const Platform_PlayerChatBlacklistWords_Query: TDocument<TPlatform_PlayerChatBlacklistWords_QueryOptionalFields> = process.env.GRAPHQL_PERSISTED === "strict"
        ? () => () => ""
        : createDocument<TPlatform_PlayerChatBlacklistWords_QueryOptionalFields>("query Platform_PlayerChatBlacklistWords { platform @normalize { PlayerChatBlacklistWords { ...Platform_PlayerChatBlacklistWord } } }", {
    Platform_PlayerChatBlacklistWord_Fragment,
  });