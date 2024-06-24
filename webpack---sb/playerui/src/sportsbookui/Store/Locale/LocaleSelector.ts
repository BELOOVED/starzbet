import { type IWithLocaleState } from "./LocaleState";

const localeSelector = ({ locale }: IWithLocaleState) => locale;
const publicLocaleSelector = ({ publicLocale }: IWithLocaleState) => publicLocale;

export { localeSelector, publicLocaleSelector };
