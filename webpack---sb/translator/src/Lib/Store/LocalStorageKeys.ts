import { type ELocale } from "@sb/utils";
import { type ESportCode } from "@sb/betting-core/ESportCode";
import { LocalStorage } from "@sb/storage";
import { type ITranslateResource } from "../../@types/TLocaleResource";
import { type IFilters } from "./CreateInitialState";

const NS = "@@TRANSLATE:";

enum ETranslatorLocaleStorageKey {
  translateMode = `${NS}/translateMode`,
  uncommitted = `${NS}/uncommitted`,
  currentLocale = `${NS}/currentLocale`,
  filters = `${NS}/filters`,
  firstLocale = `${NS}/firstLocale`,
  secondLocale = `${NS}/secondLocale`,
  marketSport = `${NS}/marketSport`,
  marketScope = `${NS}/marketScope`,
}

type TAppLocalStorageData = {
  [ETranslatorLocaleStorageKey.translateMode]: boolean;
  [ETranslatorLocaleStorageKey.uncommitted]: Partial<Record<ELocale, ITranslateResource>>;
  [ETranslatorLocaleStorageKey.currentLocale]: ELocale;
  [ETranslatorLocaleStorageKey.filters]: IFilters;
  [ETranslatorLocaleStorageKey.firstLocale]: ELocale;
  [ETranslatorLocaleStorageKey.secondLocale]: ELocale;
  [ETranslatorLocaleStorageKey.marketSport]: ESportCode | null;
  [ETranslatorLocaleStorageKey.marketScope]: string | null;

}

const VERSIONS: Record<ETranslatorLocaleStorageKey, number> = {
  [ETranslatorLocaleStorageKey.translateMode]: 1,
  [ETranslatorLocaleStorageKey.uncommitted]: 1,
  [ETranslatorLocaleStorageKey.currentLocale]: 1,
  [ETranslatorLocaleStorageKey.filters]: 1,
  [ETranslatorLocaleStorageKey.firstLocale]: 1,
  [ETranslatorLocaleStorageKey.secondLocale]: 1,
  [ETranslatorLocaleStorageKey.marketSport]: 1,
  [ETranslatorLocaleStorageKey.marketScope]: 1,
};

const translatorLocalStorage = new LocalStorage<TAppLocalStorageData>(VERSIONS);

export { translatorLocalStorage, ETranslatorLocaleStorageKey, type TAppLocalStorageData };
