import { type Selector } from "react-redux";
import { type TSupportedInternalLocale } from "../../../../common/Store/Locale/Model/TSupportedLocale";
import { type ILocaleState } from "../LocaleState";

const localeSelector: Selector<ILocaleState, TSupportedInternalLocale> = ({ locale }) => locale;

export { localeSelector };
