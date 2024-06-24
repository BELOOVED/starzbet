/* Generated by HandleQuery */
/* Internal */
import { createDocument } from "../../../../../Core/Generated/Helpers/CreateDocument";
import type { TDocument } from "@sb/graphql-core";
import type { TPlatform_FindBonusesForPromotions_QueryOptionalFields } from "../../Platform/Types/TPlatform_FindBonusesForPromotions_QueryOptionalFields";
import { Platform_Bonus_Template_Fragment } from "../../Platform/Documents/Platform_Bonus_Template_Fragment";

export const Platform_FindBonusesForPromotions_Query: TDocument<TPlatform_FindBonusesForPromotions_QueryOptionalFields> = process.env.GRAPHQL_PERSISTED === "strict"
        ? () => () => ""
        : createDocument<TPlatform_FindBonusesForPromotions_QueryOptionalFields>("query Platform_FindBonusesForPromotions($bonusIds: [Uuid!]!) { platform { FindBonusesForPromotions(bonusIds: $bonusIds) { ...Platform_Bonus_Template } } }", {
    Platform_Bonus_Template_Fragment,
  });