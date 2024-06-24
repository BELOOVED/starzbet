/* Generated by HandleQuery */
/* Internal */
import { createDocument } from "../../../../../Core/Generated/Helpers/CreateDocument";
import type { TDocument } from "@sb/graphql-core";
import type { TPlatform_RandomGame_QueryOptionalFields } from "../../Platform/Types/TPlatform_RandomGame_QueryOptionalFields";
import { Platform_Game_Fragment } from "../../Platform/Documents/Platform_Game_Fragment";

export const Platform_RandomGame_Query: TDocument<TPlatform_RandomGame_QueryOptionalFields> = process.env.GRAPHQL_PERSISTED === "strict"
        ? () => () => ""
        : createDocument<TPlatform_RandomGame_QueryOptionalFields>("query Platform_RandomGame($product: EProductCode!) { platform { RandomGame(product: $product) { ...Platform_Game } } }", {
    Platform_Game_Fragment,
  });