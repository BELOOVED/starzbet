/* Generated by HandleQuery */
/* Internal */
import { createDocument } from "../../../../../Core/Generated/Helpers/CreateDocument";
import type { TDocument } from "@sb/graphql-core";
import type { TPlatform_IntegrationPaymentLogs_QueryOptionalFields } from "../../Platform/Types/TPlatform_IntegrationPaymentLogs_QueryOptionalFields";
import { Platform_IntegrationPaymentLog_Fragment } from "../../Platform/Documents/Platform_IntegrationPaymentLog_Fragment";

export const Platform_IntegrationPaymentLogs_Query: TDocument<TPlatform_IntegrationPaymentLogs_QueryOptionalFields> = process.env.GRAPHQL_PERSISTED === "strict"
        ? () => () => ""
        : createDocument<TPlatform_IntegrationPaymentLogs_QueryOptionalFields>("query Platform_IntegrationPaymentLogs($txRequestId: Uuid!) { platform @normalize { IntegrationPaymentLogs(txRequestId: $txRequestId) { ...Platform_IntegrationPaymentLog } } }", {
    Platform_IntegrationPaymentLog_Fragment,
  });