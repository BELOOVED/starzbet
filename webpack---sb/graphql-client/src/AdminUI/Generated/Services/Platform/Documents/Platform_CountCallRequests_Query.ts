/* Generated by HandleQuery */
/* Internal */
import { createDocument } from "../../../../../Core/Generated/Helpers/CreateDocument";
import type { TDocument } from "@sb/graphql-core";
import type { TPlatform_CountCallRequests_QueryOptionalFields } from "../../Platform/Types/TPlatform_CountCallRequests_QueryOptionalFields";
import { Platform_CountCallRequestsDto_Fragment } from "../../Platform/Documents/Platform_CountCallRequestsDto_Fragment";

export const Platform_CountCallRequests_Query: TDocument<TPlatform_CountCallRequests_QueryOptionalFields> = process.env.GRAPHQL_PERSISTED === "strict"
        ? () => () => ""
        : createDocument<TPlatform_CountCallRequests_QueryOptionalFields>("query Platform_CountCallRequests($countCallRequestsDtoList: [CountCallRequestsDtoInput!]!) { platform @normalize { CountCallRequests(countCallRequestsDtoList: $countCallRequestsDtoList) { ...Platform_CountCallRequestsDto } } }", {
    Platform_CountCallRequestsDto_Fragment,
  });