/* Generated by HandleQuery */
/* Internal */
import { createDocument } from "../../../../../Core/Generated/Helpers/CreateDocument";
import type { TDocument } from "@sb/graphql-core";
import type { TPlatform_TicketMessage_QueryOptionalFields } from "../../Platform/Types/TPlatform_TicketMessage_QueryOptionalFields";
import { Platform_TicketMessage_Fragment } from "../../Platform/Documents/Platform_TicketMessage_Fragment";

export const Platform_TicketMessage_Query: TDocument<TPlatform_TicketMessage_QueryOptionalFields> = process.env.GRAPHQL_PERSISTED === "strict"
        ? () => () => ""
        : createDocument<TPlatform_TicketMessage_QueryOptionalFields>("query Platform_TicketMessage($ticketMessageId: Uuid!) { platform { TicketMessage(ticketMessageId: $ticketMessageId) { ...Platform_TicketMessage @relation_parent_child } } }", {
    Platform_TicketMessage_Fragment,
  });