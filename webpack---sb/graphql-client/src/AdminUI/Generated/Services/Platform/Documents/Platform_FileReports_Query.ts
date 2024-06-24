/* Generated by HandleQuery */
/* Internal */
import { createDocument } from "../../../../../Core/Generated/Helpers/CreateDocument";
import type { TDocument } from "@sb/graphql-core";
import type { TPlatform_FileReports_QueryOptionalFields } from "../../Platform/Types/TPlatform_FileReports_QueryOptionalFields";
import { Platform_FileReport_Fragment } from "../../Platform/Documents/Platform_FileReport_Fragment";

export const Platform_FileReports_Query: TDocument<TPlatform_FileReports_QueryOptionalFields> = process.env.GRAPHQL_PERSISTED === "strict"
        ? () => () => ""
        : createDocument<TPlatform_FileReports_QueryOptionalFields>("query Platform_FileReports { platform @normalize { FileReports { ...Platform_FileReport } } }", {
    Platform_FileReport_Fragment,
  });