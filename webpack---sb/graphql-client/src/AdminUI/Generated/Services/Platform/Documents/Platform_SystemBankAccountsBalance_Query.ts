/* Generated by HandleQuery */
/* Internal */
import { createDocument } from "../../../../../Core/Generated/Helpers/CreateDocument";
import type { TDocument } from "@sb/graphql-core";
import type { TPlatform_SystemBankAccountsBalance_QueryOptionalFields } from "../../Platform/Types/TPlatform_SystemBankAccountsBalance_QueryOptionalFields";
import { Platform_SystemBankAccountBalance_Fragment } from "../../Platform/Documents/Platform_SystemBankAccountBalance_Fragment";

export const Platform_SystemBankAccountsBalance_Query: TDocument<TPlatform_SystemBankAccountsBalance_QueryOptionalFields> = process.env.GRAPHQL_PERSISTED === "strict"
        ? () => () => ""
        : createDocument<TPlatform_SystemBankAccountsBalance_QueryOptionalFields>("query Platform_SystemBankAccountsBalance { platform { SystemBankAccountsBalance { ...Platform_SystemBankAccountBalance } } }", {
    Platform_SystemBankAccountBalance_Fragment,
  });