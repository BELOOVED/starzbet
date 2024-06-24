import { type ELocale } from "@sb/utils";
import { type TLocaleResource } from "../../@types/TLocaleResource";

const mergeTranslatesTo = (result: TLocaleResource, translates: TLocaleResource): TLocaleResource => {
  Object.entries(translates).forEach(([locale, map]) => {
    const eLocale = locale as ELocale;

    result[eLocale] = {
      ...(result[eLocale] || {}),
      ...map,
    };
  });

  return result;
};

const mergeTranslates = (a: TLocaleResource, b: TLocaleResource): TLocaleResource => {
  const clone = mergeTranslatesTo({}, a);

  return mergeTranslatesTo(clone, b);
};

const selectKeysByLocale = (translates: TLocaleResource, keys: string[], locale: ELocale): TLocaleResource => {
  const translatesClone: TLocaleResource = structuredClone(translates);

  const translatesByLocale = translatesClone[locale];

  if (!translatesByLocale) {
    return {};
  }

  Object.keys(translatesByLocale).forEach((key) => {
    if (!keys.includes(key)) {
      delete translatesByLocale[key];
    }
  });

  if (Object.keys(translatesByLocale).length === 0) {
    return {};
  } else {
    return { [locale]: translatesByLocale };
  }
};

const selectKeys = (translates: TLocaleResource, keys: string[]): TLocaleResource => {
  const result: TLocaleResource = {};

  keys.forEach((key) => mergeTranslatesTo(result, selectKey(translates, key)));

  return result;
};

const selectKey = (translates: TLocaleResource, key: string): TLocaleResource => {
  const result: TLocaleResource = {};

  Object.entries(translates).forEach(([locale, keys]) => {
    if (!keys) {
      return;
    }

    const eLocale = locale as ELocale;

    const _key = keys[key];

    if (_key) {
      let resultForLocale = result[eLocale];

      if (!resultForLocale) {
        resultForLocale = result[eLocale] = {};
      }

      resultForLocale[key] = _key;
    }
  });

  return result;
};

const deleteKeys = (
  translates: TLocaleResource,
  removeKeys: string[],
): TLocaleResource => Object.entries(translates)
  .reduce(
    (acc, [locale, keys]) => {
      const clone: Record<string, string> = { ...keys };

      removeKeys.forEach((key) => {
        if (clone[key] || clone[key] === "") {
          delete clone[key];
        }
      });

      if (Object.keys(clone).length === 0) {
        return acc;
      }

      return { ...acc, [locale]: clone };
    },
    {},
  );

const deleteKeysByLocale = (
  translates: TLocaleResource,
  removeKeys: string[],
  locale: ELocale,
): TLocaleResource => {
  const cloneTranslates: TLocaleResource = { ...translates };

  const translatesByLocale: Record<string, string> = { ...cloneTranslates[locale] };

  removeKeys.forEach((removeKey) => {
    if (translatesByLocale && (translatesByLocale[removeKey] || translatesByLocale[removeKey] === "")) {
      delete translatesByLocale[removeKey];
    }
  });

  if (Object.keys(translatesByLocale).length === 0) {
    delete cloneTranslates[locale];
  } else {
    cloneTranslates[locale] = translatesByLocale;
  }

  return cloneTranslates;
};

export {
  mergeTranslatesTo,
  mergeTranslates,
  selectKeysByLocale,
  selectKeys,
  selectKey,
  deleteKeys,
  deleteKeysByLocale,
};
