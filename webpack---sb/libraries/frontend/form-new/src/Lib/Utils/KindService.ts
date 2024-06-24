import { last } from "ramda";
import { isNil, isNotNil, isNumber } from "@sb/utils";
import { type IOneOfDef, type TFieldDef, type TFieldPath } from "../Types";
import { ONE_OF_FIELD_SEPARATOR } from "../Model";
import { getPathWithNewLastElem } from "./Helpers";
import { ReducerError } from "./Asserts";

class KindService {
  static addKindToLast(path: TFieldPath, kindType: string): TFieldPath {
    const lastElem = last(path);

    if (isNil(lastElem)) {
      throw ReducerError.typeError(path, "Cannot set kind of definition to undefined");
    }

    return getPathWithNewLastElem(path, this.addKind(lastElem, kindType));
  }

  static getWithoutKind(pathElem: string | number) {
    if (isNumber(pathElem) || !isNaN(Number(pathElem))) {
      return pathElem;
    }

    const indexKindOneOf = pathElem.indexOf(ONE_OF_FIELD_SEPARATOR);

    const nextPathElem = indexKindOneOf !== -1 ? pathElem.slice(0, indexKindOneOf) : pathElem;

    return isNumber(parseInt(nextPathElem)) ? parseInt(nextPathElem) : nextPathElem;
  }

  static getKind(pathElem: string | number) {
    const indexKindOneOf = pathElem.toString()
      .indexOf(ONE_OF_FIELD_SEPARATOR);

    return indexKindOneOf !== -1
      ? pathElem.toString()
        .slice(indexKindOneOf + ONE_OF_FIELD_SEPARATOR.length)
      : undefined;
  }

  static addKind(pathElem: string | number, kindType: string) {
    return `${pathElem}${ONE_OF_FIELD_SEPARATOR}${kindType}`;
  }

  static getPathWithoutLastKind(path: TFieldPath): TFieldPath {
    const lastElem = last(path);

    if (isNil(lastElem)) {
      throw ReducerError.typeError(path, "Cannot delete kind of definition from undefined");
    }

    return getPathWithNewLastElem(path, this.getWithoutKind(lastElem));
  }

  static getPathWithoutKinds(path: TFieldPath): TFieldPath {
    const newPath: TFieldPath = [];

    path.forEach((elem) => {
      newPath.push(this.getWithoutKind(elem));
    });

    return newPath;
  }

  static getKindFromDef(oneOfDef: IOneOfDef, currentDef: TFieldDef) {
    const isMatch = Object.entries(oneOfDef.fields)
      .find(([_, def]) => JSON.stringify(def) === JSON.stringify(currentDef));

    return isNotNil(isMatch) ? isMatch[0] : undefined;
  }
}

export {
  KindService,
};
