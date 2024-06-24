import { KindService, type TFieldPath } from "@sb/form-new";
import {
  ascend,
  type ELocale,
  entries,
  isAnyObject,
  isArray,
  isNil,
  isNotNil,
  isNotVoid,
  isNumber,
  isPrimitive,
  type TAnyObject,
  type TExplicitAny,
} from "@sb/utils";
import { type TTranslateRecord_Fragment } from "@sb/graphql-client";
import { type TCms_MetaTags_Fragment } from "@sb/graphql-client/CmsUI";
import {
  getParentPath,
  type IMetaTag,
  type IMultilang,
  PRIORITY,
} from "@sb/cms-core";
import { sort } from "@sb/utils/Sort";
import { isTranslateMap } from "@sb/utils/IsTranslateMap";
import { EFileType } from "@sb/file-service";
import { type TFileInForm } from "@sb/file-service-extension";
import { getPayloadWithDataAttrSelector } from "@sb/adminui-components";
import { type TCmsAppState } from "../../Model/TCmsAppState";

const getDragType = (path: TFieldPath) => getParentPath(path).join(".") || "cmsDrag";

const getCorrectMultilang = (value: TTranslateRecord_Fragment[] | null) => isNil(value)
  ? []
  : value.reduce<IMultilang[]>(
    (acc, value) => [
      ...acc,
      {
        locale: value.locale,
        translate: value.translate,
      },
    ],
    [],
  );

const getCorrectMetaTags = (value: TCms_MetaTags_Fragment[] | null) => isNil(value)
  ? []
  : value.reduce<IMetaTag[]>(
    (acc, value) => [
      ...acc,
      {
        simpleBlock: value.id,
        description: {
          description: getCorrectMultilang(value.translates),
        },
      },
    ],
    [],
  );

const isFile = (candidate: unknown): candidate is TFileInForm =>
  isAnyObject(candidate) &&
  "id" in candidate &&
  "type" in candidate && (candidate.type === EFileType.permanent || candidate.type === EFileType.temporary);

const isFiles = (candidate: unknown): candidate is TFileInForm[] => isArray(candidate) && candidate.every(isFile);

const normalizedPushedContent = (state: TCmsAppState, value: TExplicitAny): TExplicitAny => {
  const fn = (value: TExplicitAny): TExplicitAny => {
    if (isArray(value)) {
      if (value.every(isAnyObject)) {
        return sort(
          ascend((it) => {
            const priority = PRIORITY in it ? it[PRIORITY] : null;

            return isNotNil(priority) && isNumber(priority) ? priority : 0;
          }),
          value,
        ).map(fn) as TAnyObject[];
      }
      if (value.every(isPrimitive)) {
        return value.filter(isNotNil);
      }

      return value;
    }

    if (isAnyObject(value)) {
      return entries<TAnyObject>(value).reduce<TAnyObject>(
        (acc, [key, value]) => {
          if (isTranslateMap(value)) {
            acc[key] = fn(getPayloadWithDataAttrSelector(state, value));
          } else if (key === "files" && isFiles(value)) {
            acc[key] = value.map(({ id }) => id);
          } else {
            acc[key] = fn(value);
          }

          return acc;
        },
        {},
      );
    }

    return value;
  };

  return fn(value);
};

const uniqueArray = <T>(arr: T[]):T[] => {
  const set = new Set(arr);

  return Array.from(set);
};

interface IWithPriority {
  priority: string;
}

const sortedByPriority = <T extends IWithPriority>(firstElement: T, secondElement: T) => {
  const firstPriority = Number(firstElement.priority);

  const secondPriority = Number(secondElement.priority);

  return firstPriority - secondPriority;
};

interface IPropWithPath {
  path?: TFieldPath;
}

const isPathPropsAreEqual = (prev: IPropWithPath, next: IPropWithPath) =>
  (isArray(prev.path) && isArray(next.path)) ? prev.path.join(".") === next.path.join(".") : false;

const isRootBlock = (path: TFieldPath, type: "block" | "list") => {
  if (type === "block") {
    return path.length === 4;
  }

  if (type === "list") {
    return path.length === 5;
  }

  return false;
};

const getCorrectTranslate = (arr: IMultilang[] | undefined, locale: ELocale) => {
  if (isNil(arr)) {
    return null;
  }

  let correctTranslate: string | null = null;

  let fallbackTranslate: string | null = null;

  for (const { translate, locale: translateLocale } of arr) {
    if (translateLocale === locale && isNotNil(translate)) {
      correctTranslate = translate;
      break;
    }

    if (isNotNil(translate)) {
      fallbackTranslate = translate;
    }
  }

  return correctTranslate ?? fallbackTranslate;
};

const isListElementByPath = (path: TFieldPath) => {
  const lastPathElement = path.at(-1);

  return isNotNil(lastPathElement) && isNumber(KindService.getWithoutKind(lastPathElement));
};

const isOneOfByPath = (path: TFieldPath) => {
  const lastPathElement = path.at(-1);

  return  isNotNil(lastPathElement) && isNotVoid(KindService.getKind(lastPathElement));
};

export {
  isOneOfByPath,
  isListElementByPath,
  getCorrectTranslate,
  isRootBlock,
  isPathPropsAreEqual,
  sortedByPriority,
  uniqueArray,
  normalizedPushedContent,
  getCorrectMetaTags,
  getCorrectMultilang,
  getDragType,
};

