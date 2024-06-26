/* Generated by HandleQuery */
/* Internal */
import { createDocument } from "../../../../../Core/Generated/Helpers/CreateDocument";
import type { TDocument } from "@sb/graphql-core";
import type { TPlatform_VipClubSelfState_QueryOptionalFields } from "../../Platform/Types/TPlatform_VipClubSelfState_QueryOptionalFields";
import { Platform_VipClubPlayerState_Fragment } from "../../Platform/Documents/Platform_VipClubPlayerState_Fragment";

export const Platform_VipClubSelfState_Query: TDocument<TPlatform_VipClubSelfState_QueryOptionalFields> = process.env.GRAPHQL_PERSISTED === "strict"
        ? () => () => ""
        : createDocument<TPlatform_VipClubSelfState_QueryOptionalFields>("query Platform_VipClubSelfState { platform { VipClubSelfState { ...Platform_VipClubPlayerState } } }", {
    Platform_VipClubPlayerState_Fragment,
  });