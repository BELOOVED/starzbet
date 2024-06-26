/* Generated by HandleQuery */
/* Internal */
import { createDocument } from "../../../../../Core/Generated/Helpers/CreateDocument";
import type { TDocument } from "@sb/graphql-core";
import type { TPlatform_GamesWithActiveFreeSpins_QueryOptionalFields } from "../../Platform/Types/TPlatform_GamesWithActiveFreeSpins_QueryOptionalFields";
import { Platform_Game_Fragment } from "../../Platform/Documents/Platform_Game_Fragment";

export const Platform_GamesWithActiveFreeSpins_Query: TDocument<TPlatform_GamesWithActiveFreeSpins_QueryOptionalFields> = process.env.GRAPHQL_PERSISTED === "strict"
        ? () => () => ""
        : createDocument<TPlatform_GamesWithActiveFreeSpins_QueryOptionalFields>("query Platform_GamesWithActiveFreeSpins { platform { GamesWithActiveFreeSpins { ...Platform_Game } } }", {
    Platform_Game_Fragment,
  });