/* Generated by HandleQuery */
/* Internal */
import { createDocument } from "../../../../../Core/Generated/Helpers/CreateDocument";
import type { TDocument } from "@sb/graphql-core";
import type { TPlatform_PendingInvoiceSummary_QueryOptionalFields } from "../../Platform/Types/TPlatform_PendingInvoiceSummary_QueryOptionalFields";
import { Platform_PendingInvoiceSummary_Fragment } from "../../Platform/Documents/Platform_PendingInvoiceSummary_Fragment";

export const Platform_PendingInvoiceSummary_Query: TDocument<TPlatform_PendingInvoiceSummary_QueryOptionalFields> = process.env.GRAPHQL_PERSISTED === "strict"
        ? () => () => ""
        : createDocument<TPlatform_PendingInvoiceSummary_QueryOptionalFields>("query Platform_PendingInvoiceSummary($where: Platform_InvoiceWhereInput) { platform @normalize { PendingInvoiceSummary(where: $where) { ...Platform_PendingInvoiceSummary } } }", {
    Platform_PendingInvoiceSummary_Fragment,
  });