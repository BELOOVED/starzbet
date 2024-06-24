// @ts-nocheck
import {enhanceReducer} from "./EnhanceReducer";
import {mergeReducer} from "./MergeReducer";

export const rootSymbol = "@root";

const mapEnchanceReducer = ([part, reducer]) => enhanceReducer(part, reducer);

const reduceRemap = (merged, map) =>
  map.hasOwnProperty(rootSymbol)
    ? [...merged, map[rootSymbol]]
    : [...merged, ...Object.entries(map).map(mapEnchanceReducer)];

export const combineMaps = maps => {
  const mapReducers = key => ({ [key]: maps[key] });

  const array = Object.keys(maps).map(mapReducers);

  const remap = array.reduce(reduceRemap, []);

  return mergeReducer(...remap as any);
};
