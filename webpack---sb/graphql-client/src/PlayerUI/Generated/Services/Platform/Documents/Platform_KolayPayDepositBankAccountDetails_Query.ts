/* Generated by HandleQuery */
/* Internal */
import { createDocument } from "../../../../../Core/Generated/Helpers/CreateDocument";
import type { TDocument } from "@sb/graphql-core";
import type { TPlatform_KolayPayDepositBankAccountDetails_QueryOptionalFields } from "../../Platform/Types/TPlatform_KolayPayDepositBankAccountDetails_QueryOptionalFields";
import { Platform_KolayPayBankAccount_Fragment } from "../../Platform/Documents/Platform_KolayPayBankAccount_Fragment";

export const Platform_KolayPayDepositBankAccountDetails_Query: TDocument<TPlatform_KolayPayDepositBankAccountDetails_QueryOptionalFields> = process.env.GRAPHQL_PERSISTED === "strict"
        ? () => () => ""
        : createDocument<TPlatform_KolayPayDepositBankAccountDetails_QueryOptionalFields>("query Platform_KolayPayDepositBankAccountDetails { platform { KolayPayDepositBankAccountDetails { ...Platform_KolayPayBankAccount } } }", {
    Platform_KolayPayBankAccount_Fragment,
  });