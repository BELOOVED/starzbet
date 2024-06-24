import { type ELocale } from "@sb/utils/ELocale";
import { type ESportCode } from "@sb/betting-core/ESportCode";
import { type IWithAdminPanelState, withAdminPanelInitialState } from "@sb/adminui-panel";
import { IS_SERVER } from "@sb/utils";
import { type TLocaleResource } from "../../@types/TLocaleResource";
import { type IPredefinedContext } from "../../@types/IPredefinedContext";
import { initialFiltersState } from "../Utils/Constants";
import { EGroup } from "../Model/EGroup";
import { ETranslatorLocaleStorageKey, translatorLocalStorage } from "./LocalStorageKeys";
import { panelLocalStorage } from "./Epics/PanelLocalStorage";

type TCreateInitialState = (options: IInitStateOptions) => IState;

interface ITranslateKeyMap {
  [translateKey: string]: string[];
}

interface IInitStateOptions {
  translates: TLocaleResource;
  translateKeyMap: ITranslateKeyMap;
  currentLocale: ELocale;
  fallbackLocale: ELocale;
  locales: ELocale[];
  predefinedContext: IPredefinedContext;
  keyExpressions: Record<string, string>;
}

interface IMarket {
  sport: ESportCode | null;
  scope: string | null;
}

interface IFilters {
  [filter: string]: boolean;
}

interface IRestoreFromLocalStorage {
  translateMode: boolean;
  uncommitted: TLocaleResource;
  filters: IFilters;
  firstLocale: ELocale;
  secondLocale: ELocale;
  market: IMarket;
}

type THighlighted = string | undefined;

type TEditWindowId = number | undefined;

type TEditWindowPanelId = string | undefined;

interface IState extends IInitStateOptions, IRestoreFromLocalStorage, IWithAdminPanelState {
  highlighted: THighlighted;
  editWindowId: TEditWindowId;
  editWindowPanelId: TEditWindowPanelId;
  activeKeys: string[];
  searchStr: string;
  group: EGroup;
  currentLocale: ELocale;
  loadedLocales: ELocale[];
}

const restoreFromLocalStorage = (currentLocale: ELocale): IRestoreFromLocalStorage => ({
  translateMode: translatorLocalStorage.get(ETranslatorLocaleStorageKey.translateMode) || false,
  uncommitted: translatorLocalStorage.get(ETranslatorLocaleStorageKey.uncommitted) || {},
  filters: translatorLocalStorage.get(ETranslatorLocaleStorageKey.filters) || initialFiltersState,
  firstLocale: translatorLocalStorage.get(ETranslatorLocaleStorageKey.firstLocale) || currentLocale,
  secondLocale: translatorLocalStorage.get(ETranslatorLocaleStorageKey.secondLocale) || currentLocale,
  market: {
    sport: translatorLocalStorage.get(ETranslatorLocaleStorageKey.marketSport) || null,
    scope: translatorLocalStorage.get(ETranslatorLocaleStorageKey.marketScope) || null,
  },
});

const createInitialStateMin: TCreateInitialState = (options) => ({
  highlighted: undefined,
  editWindowId: undefined,
  editWindowPanelId: undefined,
  activeKeys: [],
  searchStr: "",
  group: EGroup.allTranslations,
  uncommitted: {},
  loadedLocales: [] as ELocale[],
  ...options,
  ...withAdminPanelInitialState(panelLocalStorage),
} as unknown as IState);

const createInitialState: TCreateInitialState = (options) => {
  if (IS_SERVER) {
    return createInitialStateMin(options);
  }

  return ({
    ...createInitialStateMin(options),
    ...restoreFromLocalStorage(options.currentLocale),
  });
};

export type {
  TCreateInitialState,
  ITranslateKeyMap,
  IInitStateOptions,
  IMarket,
  IFilters,
  IRestoreFromLocalStorage,
  THighlighted,
  TEditWindowId,
  TEditWindowPanelId,
  IState,
};

export { createInitialStateMin, createInitialState };
