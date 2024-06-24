import {IFlatFeed, TVersionedRecord} from "./Types";
import { TExplicitAny } from "@sb/utils";

export const versionSymbol = Symbol("version");

export interface IVersioned {
  [versionSymbol]: number;
}

export type TVersionCache = Map<TVersionedRecord<TExplicitAny>, null>;

type TVersionMap = Record<typeof versionSymbol, unknown>;

export const initVersionedRecord = () => ({
  [versionSymbol]: 0,
});

export const setVersion = (value: Record<string, TExplicitAny>, version: number) => {
  (value as Record<string | typeof versionSymbol, any>)[versionSymbol] = version;
};

export const clone = (cache: TVersionCache, state: Record<string, TExplicitAny>, key: string) => {
  if (cache.has(state[key])) {
    return;
  }

  const currentVersion = state[key][versionSymbol];

  if (Array.isArray(state[key])) {
    state[key] = [...state[key]];
  } else {
    state[key] = {...state[key]};
  }

  state[key][versionSymbol] = currentVersion + 1;

  cache.set(state[key], null);
};


export const removeIdFromIndexMap = (
  cache: TVersionCache,
  state: IFlatFeed,
  byKey: string,
  forKey: string,
  id: string,
) => {
  clone(cache, state, byKey);
  clone(cache, state[byKey], forKey);

  const version = state[byKey][forKey][versionSymbol];

  state[byKey][forKey] = state[byKey][forKey].filter((it) => it !== id);

  setVersion(state[byKey][forKey], version);
};

export const removeIdsFromIndexMap = (
  cache: TVersionCache,
  state: IFlatFeed,
  byKey: string,
  forKey: string,
  ids: string[],
) => {
  clone(cache, state, byKey);
  clone(cache, state[byKey], forKey);

  const version = state[byKey][forKey][versionSymbol];

  state[byKey][forKey] = state[byKey][forKey].filter((it) => !ids.includes(it));

  setVersion(state[byKey][forKey], version);
};

const getVersion = (map: TVersionMap) => map[Object.getOwnPropertySymbols(map)[0]];

const isVersionMap = (value: unknown): value is TVersionMap => {
  return typeof value === "object" && getVersion(value as TVersionMap) !== void 0;
}

const traverse = (map: TVersionMap) => {
  const version = getVersion(map);

  if (Object.values(map).every(isVersionMap)){
    return [version, Object.values(map).map(traverse)];
  }

  return [version];
};

export const maxRootVersion = (state: IFlatFeed) => {
  const versionTree = Object.values(state).map(traverse);

  return Math.max(...versionTree.flat(Infinity));
};
