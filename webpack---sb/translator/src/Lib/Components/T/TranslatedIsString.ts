import { Logger } from "../../Utils/Logger";

const translatedIsString = (translated: string | undefined, translateKey: string): translated is string => {
  if (!translated) {
    Logger.warn.translate("Translator Error: translateKey was not translated. Most likely there is no translation for it", translateKey);

    return false;
  }

  return true;
};

export { translatedIsString };
