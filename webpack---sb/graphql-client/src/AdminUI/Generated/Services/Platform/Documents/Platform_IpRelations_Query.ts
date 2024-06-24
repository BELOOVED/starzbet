/* Generated by HandleQuery */
/* Internal */
import { createDocument } from "../../../../../Core/Generated/Helpers/CreateDocument";
import type { TDocument } from "@sb/graphql-core";
import type { TPlatform_IpRelations_QueryOptionalFields } from "../../Platform/Types/TPlatform_IpRelations_QueryOptionalFields";
import { Platform_IpRelationsPage_Fragment } from "../../Platform/Documents/Platform_IpRelationsPage_Fragment";

export const Platform_IpRelations_Query: TDocument<TPlatform_IpRelations_QueryOptionalFields> = process.env.GRAPHQL_PERSISTED === "strict"
        ? () => () => ""
        : createDocument<TPlatform_IpRelations_QueryOptionalFields>("query Platform_IpRelations($where: Platform_IpRelationWhereInput, $cursor: Cursor) { platform @normalize { IpRelations(where: $where, cursor: $cursor) { ...Platform_IpRelationsPage } } }", {
    Platform_IpRelationsPage_Fragment,
  });

Platform_IpRelations_Query.extra = createDocument<TPlatform_IpRelations_QueryOptionalFields>(
  process.env.GRAPHQL_PERSISTED === "strict" ? "" : "query Platform_IpRelations($where: Platform_IpRelationWhereInput, $cursor: Cursor) { platform @normalize { IpRelations(where: $where, cursor: $cursor) { __typename pageInfo { __typename total } } } }",
  {},
);
