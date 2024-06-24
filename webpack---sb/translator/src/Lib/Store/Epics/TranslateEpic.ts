import { EMPTY, switchMap } from "rxjs";
import { deduplicate, isCreator, isNotNil } from "@sb/utils";
import { type ITranslateResource } from "../../../@types/TLocaleResource";
import { nameSpaceDelimiter } from "../../Model/Namespace";
import { replaceKeyExpression } from "../../Utils/ReplaceKeyExpression";
import { changeLocaleAction, updateTranslatesAction } from "../Actions";
import { selectCurrentLocale, selectFallbackLocale, selectKeyExpressions, selectTranslates } from "../Selectors";
import { type TTranslateEpic } from "./TTranslateEpic";

const extractTranslate = (keys: string[], translate: ITranslateResource, result: ITranslateResource) => {
  Object.entries(translate).forEach(([key, value]) => {
    if (keys.some((it) => key.startsWith(`${it}${nameSpaceDelimiter}`))) {
      result[key] = value;
    }
  });
};

const translateEpic: TTranslateEpic = (action$, state$, dependencies) => action$.pipe(
  isCreator(updateTranslatesAction, changeLocaleAction),
  switchMap(() => {
    const fallbackLocale = selectFallbackLocale(state$.value);
    const locale = selectCurrentLocale(state$.value);
    const translates = selectTranslates(state$.value);

    const keyExpressions = selectKeyExpressions(state$.value);

    dependencies.translateListeners.forEach(({ keys, callback }) => {
      const result = {} as ITranslateResource;

      const normalizeKeys = keys.map((key) => replaceKeyExpression(key, keyExpressions));

      deduplicate([fallbackLocale, locale]).forEach((currentLocale) => {
        const translatesByLocale = translates[currentLocale];

        if (isNotNil(translatesByLocale)) {
          extractTranslate(normalizeKeys, translatesByLocale, result);
        }
      });

      if (Object.keys(result).length !== 0) {
        callback(result);
      }
    });

    return EMPTY;
  }),
);

export { translateEpic };
