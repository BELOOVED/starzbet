/* Generated by HandleQuery */
/* Internal */
import { createDocument } from "../../../../../Core/Generated/Helpers/CreateDocument";
import type { TDocument } from "@sb/graphql-core";
import type { TPlatform_ExxogateBanks_QueryOptionalFields } from "../../Platform/Types/TPlatform_ExxogateBanks_QueryOptionalFields";
import { Platform_ExxogateBank_Fragment } from "../../Platform/Documents/Platform_ExxogateBank_Fragment";

export const Platform_ExxogateBanks_Query: TDocument<TPlatform_ExxogateBanks_QueryOptionalFields> = process.env.GRAPHQL_PERSISTED === "strict"
        ? () => () => ""
        : createDocument<TPlatform_ExxogateBanks_QueryOptionalFields>("query Platform_ExxogateBanks { platform { ExxogateBanks { ...Platform_ExxogateBank } } }", {
    Platform_ExxogateBank_Fragment,
  });