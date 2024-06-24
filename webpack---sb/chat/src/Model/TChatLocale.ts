import { type ELocale } from "@sb/utils";

const EMPTY_CHAT_LOCALE = "@CHAT/EMPTY_LOCALE";

type TChatLocale = ELocale | typeof EMPTY_CHAT_LOCALE;

export { type TChatLocale, EMPTY_CHAT_LOCALE };

