import { ELocale, entries, isNil } from "@sb/utils";
import { type TBaseChatMessage } from "../Model/Message";

type TChatLocaleToTranslateMap = Partial<Record<ELocale, string>>;

const messageLocaleToELocaleMap: Record<string, ELocale> = {
  en: ELocale.en_US, // ENGLISH
  id: ELocale.id_ID, // INDONESIAN
  es: ELocale.es_ES, // SPANISH
  "pt": ELocale.pt_BR, // PORTUGUESE
  "tr": ELocale.tr_TR, // TURKISH
  "th": ELocale.th_TH, // THAI
  "ru": ELocale.ru_RU, // RUSSIAN
  "zh-TW": ELocale.zh_TW, // CHINESE (TRADITIONAL)
  "vi": ELocale.vi_VN, // VIETNAMESE
};

const chatMessageLocalesMapper = (message: Omit<TBaseChatMessage, "timestamp">) => entries(message.translates)
  .reduce<TChatLocaleToTranslateMap>(
    (acc, [chatLocale, message]) => {
      const mappedLocale = messageLocaleToELocaleMap[chatLocale];

      if (isNil(mappedLocale)) {
        return acc;
      }

      acc[mappedLocale] = message;

      return acc;
    },
    {},
  );

export {
  chatMessageLocalesMapper,
};
