import { isValidElement, useMemo } from "react";
import { shallowEqual } from "react-redux";
import { type ELocale } from "@sb/utils/ELocale";
import { keys } from "@sb/utils/Keys";
import { getNotNil, isNil, isNotNil, type TNullable } from "@sb/utils";
import { type TLocaleResource } from "../../@types/TLocaleResource";
import { withInterpolation } from "../Utils/WithInterpolation";
import { type IState } from "../Store/CreateInitialState";
import { contextDelimiter } from "../Model/Context/Context";
import { type IOptions } from "../Model/IOptions";
import { replaceKeyExpression } from "../Utils/ReplaceKeyExpression";
import { useSelector } from "./ReactRedux";

interface IOptionProps {
  translateKey: TNullable<string>;
  options: Record<string, string>;
}

const findTranslate = (
  key: string,
  translates: TLocaleResource,
  currentLocale: ELocale,
  fallbackLocale: ELocale,
): string | undefined => {
  const inCurrentLocale = (translates[currentLocale] || {})[key];

  if (inCurrentLocale || inCurrentLocale === "") {
    return inCurrentLocale;
  }

  const inFallbackLocale = (translates[fallbackLocale] || {})[key];
  if (inFallbackLocale || inFallbackLocale === "") {
    return inFallbackLocale;
  }

  return undefined;
};

const getTranslateFunc = (
  locale: ELocale,
  fallbackLocale: ELocale,
  translates: TLocaleResource,
  uncommitted: TLocaleResource,
  options?: IOptions,
) => (key: string): string | undefined => {
  const inUncommitted = findTranslate(key, uncommitted, locale, fallbackLocale);

  const doTranslate = () => {
    if (inUncommitted || inUncommitted === "") {
      return withInterpolation(inUncommitted, options);
    }

    return withInterpolation(findTranslate(key, translates, locale, fallbackLocale), options) || options?.fallback;
  };

  const translated = doTranslate();

  if (options?.transform && translated) {
    return options.transform(translated);
  }

  return translated;
};

const translatorSelector = (
  {
    translates,
    currentLocale,
    fallbackLocale,
    uncommitted,
    keyExpressions,
    locales,
  }: IState,
) => ({
  translates,
  currentLocale,
  fallbackLocale,
  uncommitted,
  keyExpressions,
  locales,
});

const getTranslator = (
  translates: TLocaleResource,
  currentLocale: ELocale,
  argFallbackLocale: ELocale,
  uncommitted: TLocaleResource,
  keyExpressions: Record<string, string>,
  locales: ELocale[],
) => ({
  translate: (
    key: string,
    options?: IOptions,
    locale: ELocale = currentLocale,
    fallbackLocale: ELocale = argFallbackLocale,
  ): string | undefined => {
    const replacedKey = replaceKeyExpression(key, keyExpressions);

    if (isNotNil(options)) {
      // preemptively translate internal react nodes that may be contained in options
      keys(options).forEach((field) => {
        const option = options[field];

        if (!isValidElement<IOptionProps>(option)) {
          return;
        }

        const props = option.props;

        if (isNil(props.translateKey)) {
          return;
        }

        options[field] = getTranslateFunc(
          locale,
          fallbackLocale,
          translates,
          uncommitted,
          props.options,
        )(replaceKeyExpression(props.translateKey, keyExpressions));
      });
    }

    const translate = getTranslateFunc(locale, fallbackLocale, translates, uncommitted, options);

    const translatedWithContext = translate(replacedKey);

    if (translatedWithContext || translatedWithContext === "") {
      return translatedWithContext;
    } else {
      return translate(
        getNotNil(
          replacedKey.split(contextDelimiter)[0],
          ["getTranslator"],
          "replacedKey.split(contextDelimiter)[0]",
        ),
      );
    }
  },
  fallbackLocale: argFallbackLocale,
  locales,
});

const useTranslator = () => {
  const {
    translates,
    currentLocale,
    fallbackLocale,
    uncommitted,
    keyExpressions,
    locales,
  } = useSelector(translatorSelector, shallowEqual);

  return useMemo(
    () => getTranslator(translates, currentLocale, fallbackLocale, uncommitted, keyExpressions, locales),
    [translates, currentLocale, fallbackLocale, uncommitted],
  );
};

export { useTranslator, getTranslator, translatorSelector };
