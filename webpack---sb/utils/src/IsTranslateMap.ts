import { isArray, isString } from "./IsTypeOf";
import { isAnyObject } from "./IsObject";

interface ITranslate {
  locale: string;
  translate: string;
}

const isTranslateMap = (candidate: unknown): candidate is ITranslate[] =>
  isArray(candidate) && candidate.every((it) => isAnyObject(it) && isString(it.locale) && isString(it.translate))

export {isTranslateMap}
export type {ITranslate}
