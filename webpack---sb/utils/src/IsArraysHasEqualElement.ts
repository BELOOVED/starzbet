import { TExplicitAny } from "./TAny";

const isArraysHasEqualElement = <T extends TExplicitAny[]>(firstArray: T, secondArray: T) => {
  return firstArray.some((it) => secondArray.some((it2) => it === it2))
}

export {isArraysHasEqualElement}
