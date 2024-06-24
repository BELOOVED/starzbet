import { Logger } from "../../Utils/Logger";

const translateKeyIsString = (translateKey: unknown): translateKey is string => {
  if (typeof translateKey !== "string") {
    Logger.warn.translate("Translator Error: translateKey should be string.", translateKey);

    return false;
  }

  return true;
};

export { translateKeyIsString };
