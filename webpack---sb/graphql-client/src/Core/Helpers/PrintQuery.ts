import type { TDocument, TFields } from "@sb/graphql-core";
import { Logger } from "./Logger";

// @see https://github.com/Microsoft/TypeScript/issues/24587
const hashSumSymbol = Symbol("@hashSum") as unknown as string;

// kitName -> queryName -> optionalFieldHashCode -> RequestDocument
const cache: Record<string, Record<string, Record<string, string>>> = {};

const getDocument = <T extends TFields>(optionalFields: T, queryName: string, query: TDocument<T>) => {
  if (!optionalFields) {
    throw new Error(`No optional fields provided for "${queryName}" query`);
  }

  try {
    return query(optionalFields)();
  } catch (e) {
    Logger.error.gql(`Error occurred in query "${queryName}"`);

    throw e;
  }
};

const printQuery = <O extends TFields>(
  kitName: string,
  queryName: string,
  document: TDocument<O>,
  optionalFields: O,
): string => {
  if (!cache[kitName]) {
    cache[kitName] = {};
  }

  // @ts-ignore
  if (!cache[kitName][queryName]) {
    // @ts-ignore
    cache[kitName][queryName] = {};
  }

  // @ts-ignore
  if (!cache[kitName][queryName][optionalFields[hashSumSymbol]]) {
    // @ts-ignore
    cache[kitName][queryName][optionalFields[hashSumSymbol]] = getDocument(optionalFields, queryName, document);
  }

  // @ts-ignore
  return cache[kitName][queryName][optionalFields[hashSumSymbol]];
};

export { hashSumSymbol, printQuery };

