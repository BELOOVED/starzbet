import { lazy, memo, Suspense, useCallback, useContext, useEffect, useRef } from "react";
import { deepEqual } from "fast-equals";
import { type ELocale, extractDefaultExport, IS_SERVER } from "@sb/utils";
import { ActiveKeysManager } from "../../Store/ActiveKeysManager";
import { type getTranslator, useTranslator } from "../../Hooks/UseTranslator";
import { TranslatableContext } from "../../Context/TranslatableContext";
import { selectCurrentLocale, selectKeyExpressions, selectTranslateMode } from "../../Store/Selectors";
import { useSelector } from "../../Hooks/ReactRedux";
import { type IOptions } from "../../Model/IOptions";
import { type IControl } from "../../Store/CreateControlFactory";
import { replaceKeyExpression } from "../../Utils/ReplaceKeyExpression";
import { renderToTemplate } from "../../Utils/RenderToTemplate";
import { translateToAllLangs } from "../../Utils/TranslateToAllLangs";
import { normalizeKeyByContext } from "./NormalizeKeyByContext";
import { translateKeyIsString } from "./TranslateKeyIsString";
import { translatedIsString } from "./TranslatedIsString";
import { getPlainTranslate } from "./GetPlainTranslate";
import { type TFuncWithPlain } from "./TFunc";

const LazyEditable = lazy(() => import("./Editable/Editable").then(extractDefaultExport("Editable")));

const createTFunc = (
  translateMode: boolean,
  keyExpressions: Record<string, string>,
  translator: ReturnType<typeof getTranslator>,
  onCall: (tKey: string) => void,
): TFuncWithPlain => {
  const t = (translateKey: string, options?: IOptions) => {
    if (!translateKeyIsString(translateKey)) {
      return translateKey;
    }

    const context = options?.context;

    const normalizedKey = context ? normalizeKeyByContext(translateKey, context) : translateKey;

    const replacedKeyExpression = replaceKeyExpression(normalizedKey, keyExpressions);

    onCall(replacedKeyExpression);

    if (!translateMode) {
      if (IS_SERVER && !options?.skipTemplateRendering) {
        return renderToTemplate(
          replacedKeyExpression,
          translateToAllLangs(
            translator.locales,
            (locale) => translator.translate(normalizedKey, options, locale),
          ),
          options,
        );
      }

      const translated = translator.translate(normalizedKey, options);

      if (!translatedIsString(translated, translateKey)) {
        return normalizedKey;
      }

      return translated;
    }

    return (
      <Suspense fallback={translator.translate(normalizedKey, options) || translateKey}>
        <LazyEditable translateKey={replacedKeyExpression} options={options} />
      </Suspense>
    );
  };

  t.plain = getPlainTranslate(translator, onCall, keyExpressions);

  return t;
};

const useTranslation = (): [TFuncWithPlain, IControl, ELocale] => {
  const control = useContext(TranslatableContext);
  const translator = useTranslator();
  const currentLocale = useSelector(selectCurrentLocale);

  const translateMode = useSelector(selectTranslateMode);
  const keyExpressions = useSelector(selectKeyExpressions, deepEqual);

  const keysRef = useRef<Set<string>>(new Set());

  const onCall = useCallback(
    (tKey: string) => {
      keysRef.current.add(tKey);

      ActiveKeysManager.add(tKey);
    },
    [],
  );

  useEffect(
    () => () => {
      if (keysRef.current.size > 0) {
        ActiveKeysManager.remove(keysRef.current);
      }
    },
    [],
  );

  const t = useCallback(
    // @react-compiler-warn
    createTFunc(translateMode, keyExpressions, translator, onCall),
    [translator, translateMode, keyExpressions],
  );

  return [t, control, currentLocale];
};

interface ITranslationProps<T extends string = string> {
  tKey: T;
  options?: IOptions;
}

const Translation = memo<ITranslationProps>(({ tKey, options }) => {
  const [t] = useTranslation();

  return <>{t(tKey, options)}</>;
});
Translation.displayName = "Translation";

const createTranslationComponent = <T extends string = string>(translateKey: T, options: IOptions = {}) => () => (
  <Translation tKey={translateKey} options={options} />
);

const createPlainTranslationHook = <T extends string = string>(translateKey: T, options: IOptions = {}) => (): string => {
  const [t] = useTranslation();

  return t.plain(translateKey, options);
};

export {
  useTranslation,
  createPlainTranslationHook,
  createTranslationComponent,
  Translation,
};
