/* Generated by HandleQuery */
/* Internal */
import { createDocument } from "../../../../../Core/Generated/Helpers/CreateDocument";
import type { TDocument } from "@sb/graphql-core";
import type { TPlatform_AvailablePaymentMethods_QueryOptionalFields } from "../../Platform/Types/TPlatform_AvailablePaymentMethods_QueryOptionalFields";
import { Platform_AvailablePaymentMethod_Fragment } from "../../Platform/Documents/Platform_AvailablePaymentMethod_Fragment";

export const Platform_AvailablePaymentMethods_Query: TDocument<TPlatform_AvailablePaymentMethods_QueryOptionalFields> = process.env.GRAPHQL_PERSISTED === "strict"
        ? () => () => ""
        : createDocument<TPlatform_AvailablePaymentMethods_QueryOptionalFields>("query Platform_AvailablePaymentMethods($methodType: Platform_PaymentMethodType!) { platform { AvailablePaymentMethods(methodType: $methodType) { ...Platform_AvailablePaymentMethod } } }", {
    Platform_AvailablePaymentMethod_Fragment,
  });