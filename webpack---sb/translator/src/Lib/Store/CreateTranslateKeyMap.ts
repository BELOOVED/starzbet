import { getNotNil } from "@sb/utils";
import { keys } from "@sb/utils/Keys";
import { type TLocaleResource } from "../../@types/TLocaleResource";
import { contextDelimiter, hasContext } from "../Model/Context/Context";
import { type ITranslateKeyMap } from "./CreateInitialState";

const createTranslateKeyMap = (translates: TLocaleResource): ITranslateKeyMap => {
  const map: ITranslateKeyMap = {};

  // todo add locale
  keys(translates).forEach((locale) => {
    const translatesByLocale = getNotNil(
      translates[locale],
      ["createTranslateKeyMap", "translatesByLocale"],
      `translates[${locale}]`,
    );

    Object.keys(translatesByLocale).forEach((key) => {
      if (!hasContext(key)) {
        if (!map.hasOwnProperty(key)) {
          map[key] = [];
        }

        return;
      }

      const keyWithoutContext = getNotNil(
        key.split(contextDelimiter)[0],
        ["createTranslateKeyMap", "keyWithoutContext"],
        "key.split(contextDelimiter)[0]",
      );

      let keys = map[keyWithoutContext];

      if (!keys) {
        keys = map[keyWithoutContext] = [];
      }

      if (keys.includes(key)) {
        return;
      }

      keys.push(key);
    });
  });

  return map;
};

export { createTranslateKeyMap };
