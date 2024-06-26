/* Generated by HandleQuery */
/* Internal */
import { createDocument } from "../../../../../Core/Generated/Helpers/CreateDocument";
import type { TDocument } from "@sb/graphql-core";
import type { TPlatform_GameLabels_QueryOptionalFields } from "../../Platform/Types/TPlatform_GameLabels_QueryOptionalFields";
import { Platform_GameLabelWithoutPagesAndGamesCount_Fragment } from "../../Platform/Documents/Platform_GameLabelWithoutPagesAndGamesCount_Fragment";

export const Platform_GameLabels_Query: TDocument<TPlatform_GameLabels_QueryOptionalFields> = process.env.GRAPHQL_PERSISTED === "strict"
        ? () => () => ""
        : createDocument<TPlatform_GameLabels_QueryOptionalFields>("query Platform_GameLabels($where: Platform_GameLabelWhereInput) { platform { GameLabels(where: $where) { ...Platform_GameLabelWithoutPagesAndGamesCount } } }", {
    Platform_GameLabelWithoutPagesAndGamesCount_Fragment,
  });