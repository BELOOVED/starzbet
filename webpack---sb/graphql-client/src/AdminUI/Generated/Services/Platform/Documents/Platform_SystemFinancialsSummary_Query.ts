/* Generated by HandleQuery */
/* Internal */
import { createDocument } from "../../../../../Core/Generated/Helpers/CreateDocument";
import type { TDocument } from "@sb/graphql-core";
import type { TPlatform_SystemFinancialsSummary_QueryOptionalFields } from "../../Platform/Types/TPlatform_SystemFinancialsSummary_QueryOptionalFields";
import { Platform_SystemFinancialsSummary_Fragment } from "../../Platform/Documents/Platform_SystemFinancialsSummary_Fragment";

export const Platform_SystemFinancialsSummary_Query: TDocument<TPlatform_SystemFinancialsSummary_QueryOptionalFields> = process.env.GRAPHQL_PERSISTED === "strict"
        ? () => () => ""
        : createDocument<TPlatform_SystemFinancialsSummary_QueryOptionalFields>("query Platform_SystemFinancialsSummary($where: Platform_SystemFinancialTransactionWhereInput, $parameters: [QueryParameters!]) { platform @normalize { SystemFinancialsSummary(where: $where, parameters: $parameters) { ...Platform_SystemFinancialsSummary } } }", {
    Platform_SystemFinancialsSummary_Fragment,
  });