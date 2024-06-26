/* Generated by HandleQuery */
/* Internal */
import { createDocument } from "../../../../../Core/Generated/Helpers/CreateDocument";
import type { TDocument } from "@sb/graphql-core";
import type { TPlatform_OnlinePlayers_QueryOptionalFields } from "../../Platform/Types/TPlatform_OnlinePlayers_QueryOptionalFields";
import { Platform_OnlinePlayers_Fragment } from "../../Platform/Documents/Platform_OnlinePlayers_Fragment";

export const Platform_OnlinePlayers_Query: TDocument<TPlatform_OnlinePlayers_QueryOptionalFields> = process.env.GRAPHQL_PERSISTED === "strict"
        ? () => () => ""
        : createDocument<TPlatform_OnlinePlayers_QueryOptionalFields>("query Platform_OnlinePlayers { platform @normalize { OnlinePlayers { ...Platform_OnlinePlayers } } }", {
    Platform_OnlinePlayers_Fragment,
  });