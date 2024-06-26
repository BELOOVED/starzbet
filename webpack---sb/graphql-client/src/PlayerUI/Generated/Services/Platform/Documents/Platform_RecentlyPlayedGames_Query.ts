/* Generated by HandleQuery */
/* Internal */
import { createDocument } from "../../../../../Core/Generated/Helpers/CreateDocument";
import type { TDocument } from "@sb/graphql-core";
import type { TPlatform_RecentlyPlayedGames_QueryOptionalFields } from "../../Platform/Types/TPlatform_RecentlyPlayedGames_QueryOptionalFields";
import { Platform_Game_Fragment } from "../../Platform/Documents/Platform_Game_Fragment";

export const Platform_RecentlyPlayedGames_Query: TDocument<TPlatform_RecentlyPlayedGames_QueryOptionalFields> = process.env.GRAPHQL_PERSISTED === "strict"
        ? () => () => ""
        : createDocument<TPlatform_RecentlyPlayedGames_QueryOptionalFields>("query Platform_RecentlyPlayedGames($limit: Int!, $product: EProductCode!) { platform { RecentlyPlayedGames(limit: $limit, product: $product) { ...Platform_Game } } }", {
    Platform_Game_Fragment,
  });