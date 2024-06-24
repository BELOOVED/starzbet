/* Generated by HandleHelpers */
import type { TCreateDocument } from "@sb/graphql-core";
import { createDocumentFactory } from "@sb/graphql-core";
import { deprecatedGetNotNil } from "@sb/utils";

let createDocument: TCreateDocument = () =>
  () =>
    () => "";

if (process.env.GRAPHQL_PERSISTED !== "strict") {
  createDocument = createDocumentFactory({
    getFragment: (fragments, name) => deprecatedGetNotNil(fragments[`${name}_Fragment`], "[createDocument]")
  });
}

export { createDocument };
