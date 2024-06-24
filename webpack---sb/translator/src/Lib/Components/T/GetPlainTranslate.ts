import { IS_SERVER, isNotNil } from "@sb/utils";
import { replaceKeyExpression } from "../../Utils/ReplaceKeyExpression";
import { type getTranslator } from "../../Hooks/UseTranslator";
import { renderToTemplate } from "../../Utils/RenderToTemplate";
import { translateToAllLangs } from "../../Utils/TranslateToAllLangs";
import { normalizeKeyByContext } from "./NormalizeKeyByContext";
import { type TFunc } from "./TFunc";
import { translateKeyIsString } from "./TranslateKeyIsString";
import { translatedIsString } from "./TranslatedIsString";

const getPlainTranslate = (
  translator: ReturnType<typeof getTranslator>,
  onCall?: (tKey: string) => void,
  keyExpressions?: Record<string, string>,
): TFunc<string> => (translateKey, options) => {
  if (!translateKeyIsString(translateKey)) {
    return translateKey;
  }

  const context = options?.context;

  const normalizedKey = context ? normalizeKeyByContext(translateKey, context) : translateKey;

  const replacedKeyExpression = keyExpressions !== undefined ? replaceKeyExpression(translateKey, keyExpressions) : normalizedKey;

  if (IS_SERVER && !options?.skipTemplateRendering) {
    return renderToTemplate(
      replacedKeyExpression,
      translateToAllLangs(
        translator.locales,
        (locale) => translator.translate(normalizedKey, options, locale),
      )
      , options,
    );
  }

  const translated = translator.translate(normalizedKey, options);

  if (isNotNil(onCall) && isNotNil(keyExpressions)) {
    onCall(replacedKeyExpression);
  }

  if (!translatedIsString(translated, translateKey)) {
    return normalizedKey;
  }

  return translated;
};

export { getPlainTranslate };
