import { getNotNil, entries, isNil } from "@sb/utils";
import { type IPredefinedContext } from "../../@types/IPredefinedContext";
import { type TLocaleResource } from "../../@types/TLocaleResource";
import { contextDelimiter } from "../Model/Context/Context";
import { mergeTranslatesTo } from "../Utils/TranslateMapUtils";

const collectTranslatesByContext = (
  predefinedContext: IPredefinedContext,
  translates: TLocaleResource,
): TLocaleResource => {
  const contextTranslates: TLocaleResource = {};

  entries(translates).forEach((entry) => {
    if (isNil(entry)) {
      return;
    }

    const [locale, translate] = entry;

    if (isNil(translate)) {
      return;
    }

    if (!contextTranslates.hasOwnProperty(locale)) {
      contextTranslates[locale] = {};
    }

    Object.entries(predefinedContext).forEach(([translateKey, context]) => {
      const translateByKey = translate[translateKey];
      if (isNil(translateByKey)) {
        return;
      }

      context.forEach((contextKey) => {
        const newKey = `${translateKey}${contextDelimiter}${contextKey}`;

        // todo what? translateKey is string
        // if (translateKey[newKey]) {
        //   return;
        // }

        getNotNil(
          contextTranslates[locale],
          ["collectTranslatesByContext"],
          `contextTranslates[${locale}]`,
        )[newKey] = translateByKey;
      });
    });
  });

  return mergeTranslatesTo(contextTranslates, translates);
};

export { collectTranslatesByContext };
