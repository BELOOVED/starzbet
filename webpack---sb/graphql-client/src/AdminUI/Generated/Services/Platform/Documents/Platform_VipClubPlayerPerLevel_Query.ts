/* Generated by HandleQuery */
/* Internal */
import { createDocument } from "../../../../../Core/Generated/Helpers/CreateDocument";
import type { TDocument } from "@sb/graphql-core";
import type { TPlatform_VipClubPlayerPerLevel_QueryOptionalFields } from "../../Platform/Types/TPlatform_VipClubPlayerPerLevel_QueryOptionalFields";
import { Platform_VipClubPlayerOnLevel_Fragment } from "../../Platform/Documents/Platform_VipClubPlayerOnLevel_Fragment";

export const Platform_VipClubPlayerPerLevel_Query: TDocument<TPlatform_VipClubPlayerPerLevel_QueryOptionalFields> = process.env.GRAPHQL_PERSISTED === "strict"
        ? () => () => ""
        : createDocument<TPlatform_VipClubPlayerPerLevel_QueryOptionalFields>("query Platform_VipClubPlayerPerLevel { platform @normalize { VipClubPlayerPerLevel { ...Platform_VipClubPlayerOnLevel } } }", {
    Platform_VipClubPlayerOnLevel_Fragment,
  });