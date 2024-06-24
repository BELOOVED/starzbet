/* Generated by HandleQuery */
/* Internal */
import { createDocument } from "../../../../../Core/Generated/Helpers/CreateDocument";
import type { TDocument } from "@sb/graphql-core";
import type { TPlatform_GameManagerViewRules_QueryOptionalFields } from "../../Platform/Types/TPlatform_GameManagerViewRules_QueryOptionalFields";
import { Platform_ViewRulesPage_Fragment } from "../../Platform/Documents/Platform_ViewRulesPage_Fragment";

export const Platform_GameManagerViewRules_Query: TDocument<TPlatform_GameManagerViewRules_QueryOptionalFields> = process.env.GRAPHQL_PERSISTED === "strict"
        ? () => () => ""
        : createDocument<TPlatform_GameManagerViewRules_QueryOptionalFields>("query Platform_GameManagerViewRules($cursor: Cursor, $where: Platform_ViewRuleWhereInput) { platform @normalize { GameManagerViewRules(where: $where, cursor: $cursor) { ...Platform_ViewRulesPage } } }", {
    Platform_ViewRulesPage_Fragment,
  });

Platform_GameManagerViewRules_Query.extra = createDocument<TPlatform_GameManagerViewRules_QueryOptionalFields>(
  process.env.GRAPHQL_PERSISTED === "strict" ? "" : "query Platform_GameManagerViewRules($cursor: Cursor, $where: Platform_ViewRuleWhereInput) { platform @normalize { GameManagerViewRules(where: $where, cursor: $cursor) { __typename pageInfo { __typename total } } } }",
  {},
);
