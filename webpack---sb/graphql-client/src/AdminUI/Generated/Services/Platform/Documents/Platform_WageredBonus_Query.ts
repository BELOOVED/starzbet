/* Generated by HandleQuery */
/* Internal */
import { createDocument } from "../../../../../Core/Generated/Helpers/CreateDocument";
import type { TDocument } from "@sb/graphql-core";
import type { TPlatform_WageredBonus_QueryOptionalFields } from "../../Platform/Types/TPlatform_WageredBonus_QueryOptionalFields";
import { Platform_BonusWageredBonus_Fragment } from "../../Platform/Documents/Platform_BonusWageredBonus_Fragment";

export const Platform_WageredBonus_Query: TDocument<TPlatform_WageredBonus_QueryOptionalFields> = process.env.GRAPHQL_PERSISTED === "strict"
        ? () => () => ""
        : createDocument<TPlatform_WageredBonus_QueryOptionalFields>("query Platform_WageredBonus { platform @ignore_batching @normalize { WageredBonus { ...Platform_BonusWageredBonus } } }", {
    Platform_BonusWageredBonus_Fragment,
  });