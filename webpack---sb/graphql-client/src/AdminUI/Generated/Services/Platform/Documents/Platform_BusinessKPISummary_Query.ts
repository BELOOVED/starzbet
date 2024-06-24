/* Generated by HandleQuery */
/* Internal */
import { createDocument } from "../../../../../Core/Generated/Helpers/CreateDocument";
import type { TDocument } from "@sb/graphql-core";
import type { TPlatform_BusinessKPISummary_QueryOptionalFields } from "../../Platform/Types/TPlatform_BusinessKPISummary_QueryOptionalFields";
import { Platform_BusinessKPISummary_Fragment } from "../../Platform/Documents/Platform_BusinessKPISummary_Fragment";

export const Platform_BusinessKPISummary_Query: TDocument<TPlatform_BusinessKPISummary_QueryOptionalFields> = process.env.GRAPHQL_PERSISTED === "strict"
        ? () => () => ""
        : createDocument<TPlatform_BusinessKPISummary_QueryOptionalFields>("query Platform_BusinessKPISummary($where: Platform_BusinessKPIWhereInput, $orderBy: [Platform_BusinessKPIOrderBy!], $parameters: [QueryParameters!], $fields: String) { platform @normalize { BusinessKPISummary( where: $where orderBy: $orderBy parameters: $parameters fields: $fields ) { ...Platform_BusinessKPISummary } } }", {
    Platform_BusinessKPISummary_Fragment,
  });