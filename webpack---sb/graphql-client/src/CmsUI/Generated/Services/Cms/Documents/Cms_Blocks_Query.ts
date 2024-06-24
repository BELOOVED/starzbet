/* Generated by HandleQuery */
/* Internal */
import { createDocument } from "../../../../../Core/Generated/Helpers/CreateDocument";
import type { TDocument } from "@sb/graphql-core";
import type { TCms_Blocks_QueryOptionalFields } from "../../Cms/Types/TCms_Blocks_QueryOptionalFields";
import { Cms_Block_Fragment } from "../../Cms/Documents/Cms_Block_Fragment";

export const Cms_Blocks_Query: TDocument<TCms_Blocks_QueryOptionalFields> = process.env.GRAPHQL_PERSISTED === "strict"
        ? () => () => ""
        : createDocument<TCms_Blocks_QueryOptionalFields>("query Cms_Blocks($where: Cms_BlockWhereInput, $theme: String) { cms { Blocks(where: $where, theme: $theme) { ...Cms_Block } } }", {
    Cms_Block_Fragment,
  });