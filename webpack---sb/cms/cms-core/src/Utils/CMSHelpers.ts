import { ELocale, isNotNil, type TNullable } from "@sb/utils";
import { _HIDDEN_FIELD_, type TFieldPath } from "@sb/form-new";
import type { TKey } from "@sb/translates/cmsui/Keys";
import { translates } from "@sb/translates/cmsui/Translates";
import { type TGeneralGroupBlock, type TMultiLangValue } from "../Types";
import {
  MEDIA_TYPE,
  BLOCK_TYPE,
  DISABLED_FIELD,
  LIST_ELEMENT_NAME,
  PRIORITY,
  SHOW_CHILDREN_BY_DEFAULT,
  STATE_WAS_CHANGED,
} from "../Constants";
import { isGroupBlock, isListBlock, isSimpleBlock } from "./CMSTypeGuards";

const getBlockNameHelper = (index: number, name = "block") => name.concat("_", index.toString(10));

const getSubStrAfterLastUnderScore = (blockName: string) => blockName.substring(blockName.lastIndexOf("_") + 1);

const getBlockName = (block: TGeneralGroupBlock, index: number) => {
  if (isSimpleBlock(block)) {
    const blockTitle = block.customExtensions.simpleConfig?.blockTitle;

    const blockId = block.block.id;

    return isNotNil(blockTitle) ? getSubStrAfterLastUnderScore(blockTitle) : blockId;
  }

  if (isGroupBlock(block)) {
    const blockName = block.blockName;

    return getSubStrAfterLastUnderScore(blockName);
  }

  if (isListBlock(block)) {
    const blockName = block.title;

    return getSubStrAfterLastUnderScore(blockName);
  }

  return getBlockNameHelper(index, block.type);
};

const getUrlFromString = (str?: string) => isNotNil(str) ? `/${str.split(" ").join("-")}`.toLowerCase() : "/";

const getMultiLangInputWithNewValue = (value: TNullable<TMultiLangValue>, newTitle: string, systemLocale: ELocale) => {
  if (isNotNil(value)) {
    return value.map(({ locale, translate }) => {
      if (locale === systemLocale) {
        return ({
          locale,
          translate: newTitle,
        });
      } else {
        return ({
          locale,
          translate,
        });
      }
    });
  }

  return ([{
    locale: systemLocale,
    translate: newTitle,
  }]);
};

const getNewTranslateToPageTitle = (value: TNullable<TMultiLangValue>, newTitle: string, systemLocale: ELocale) => {
  if (isNotNil(value)) {
    return ([{
      locale: value.find((it) => it.locale)?.locale ?? systemLocale,
      translate: newTitle,
    }]);
  }

  return ([{
    locale: systemLocale,
    translate: newTitle,
  }]);
};

const getIdByPath = (path: TFieldPath) => path.join(".");

class CMSTypeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CMS TYPE ERROR";
  }
}

const isChildPagePath = (path: TFieldPath) => path[0] !== BLOCK_TYPE && path.length > 1;

const isRootPagePath = (path: TFieldPath) => path[0] !== BLOCK_TYPE && path.length === 1;

const isAnyPagePath = (path: TFieldPath) => path[0] !== BLOCK_TYPE;

const isBlockPath = (path: TFieldPath) => path[0] == BLOCK_TYPE && path.length > 1;

const SYSTEM_FIELDS = [
  PRIORITY,
  LIST_ELEMENT_NAME,
  SHOW_CHILDREN_BY_DEFAULT,
  MEDIA_TYPE,
  STATE_WAS_CHANGED,
  DISABLED_FIELD,
  _HIDDEN_FIELD_,
];

const notSystemFieldsCount = (fields: string[]) => fields.reduce(
  (acc, field) => {
    if (SYSTEM_FIELDS.includes(field)) {
      return acc;
    }

    return acc + 1;
  },
  0,
);

const isCmsTKeyApp = (title: string): title is TKey =>
  Object.hasOwn(translates[ELocale.en_US], title);

const getParentPath = (path: TFieldPath) => path.slice(0, -1);

export {
  getParentPath,
  isCmsTKeyApp,
  notSystemFieldsCount,
  isAnyPagePath,
  isChildPagePath,
  isRootPagePath,
  getNewTranslateToPageTitle,
  isBlockPath,
  getIdByPath,
  CMSTypeError,
  getUrlFromString,
  getBlockName,
  getMultiLangInputWithNewValue,
};
