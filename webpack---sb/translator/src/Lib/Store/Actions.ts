import { type Action } from "redux";
import { type ELocale } from "@sb/utils";
import { type TLocaleResource } from "../../@types/TLocaleResource";
import { type EGroup } from "../Model/EGroup";
import { type IProviderTranslates } from "../Providers/IProviderTranslates";
import { type IFilters, type IMarket, type TEditWindowId, type TEditWindowPanelId, type THighlighted } from "./CreateInitialState";

const translatorAction = <T>(type: string, payload: T = {} as T): Action<string> & T => ({
  type: `@TRANSLATES/${type}`,
  ...payload,
});

const updateTranslatesAction = (translates: IProviderTranslates) => translatorAction("UPDATE_TRANSLATES", { translates });
const changeHighlightedAction = (highlighted: THighlighted) => translatorAction("CHANGE_HIGHLIGHTED", { highlighted });
const changeEditWindowIdAction = (id: TEditWindowId) => translatorAction("CHANGE_EDIT_WINDOW_OPENED", { id });
const changeTranslateModeAction = (translateMode: boolean) => translatorAction("CHANGE_TRANSLATE_MODE", { translateMode });

// when empty array commit all keys
const batchCommitAction = (translateKeys: string[] = []) => translatorAction("COMMIT", { translateKeys });

const commitByLocaleAction = (
  translateKey: string,
  locale: ELocale,
) => translatorAction("COMMIT_BY_LOCALE", { translateKey, locale });

const commitSuccessfulAction = (translateKeys: string[] = []) => translatorAction("COMMIT_SUCCESSFUL", { translateKeys });

const commitByLocaleSuccessfulAction = (
  translateKeys: string[],
  locale: ELocale,
) => translatorAction("COMMIT_BY_LOCALE_SUCCESSFUL", { translateKeys, locale });

const addToUncommittedAction = (translates: TLocaleResource) => translatorAction("ADD_TO_UNCOMMITTED", { translates });

const removeFromUncommittedAction = (
  translateKeys: string[],
  locale: ELocale,
) => translatorAction("REMOVE_FROM_UNCOMMITTED", { translateKeys, locale });

const requestChangeLocaleAction = (locale: ELocale) => translatorAction("REQUEST_CHANGE_LOCALE", { locale });

const updateRequestsAction = () => translatorAction("UPDATE_REQUESTS");

const changeLocaleAction = (locale: ELocale) => translatorAction("CHANGE_LOCALE", { locale });

const changeFiltersAction = (filter: IFilters) => translatorAction("CHANGE_FILTERS", { filter });

const changeFirstLocaleAction = (locale: ELocale) => translatorAction("CHANGE_FIRST_LOCALE", { locale });

const changeSecondLocaleAction = (locale: ELocale) => translatorAction("CHANGE_SECOND_LOCALE", { locale });

const updateActiveKeysAction = (tKeys: string[]) => translatorAction("UPDATE_ACTIVE_KEYS", { tKeys });

const changeSearchAction = (searchStr: string) => translatorAction("CHANGE_SEARCH", { searchStr });

const setMarketAction = (market: IMarket) => translatorAction("SET_MARKET", { market });

const changeEditWindowPanelIdAction = (id: TEditWindowPanelId) => translatorAction("CHANGE_EDIT_PANEL_WINDOW_ID", { id });

const changeGroupAction = (group: EGroup) => translatorAction("CHANGE_GROUP", { group });

const requestLoadLocaleAction = (locale: ELocale) => translatorAction("REQUEST_LOAD_LOCALE", { locale });

export {
  updateRequestsAction,
  updateTranslatesAction,
  changeHighlightedAction,
  changeEditWindowIdAction,
  changeTranslateModeAction,
  batchCommitAction,
  commitByLocaleAction,
  commitSuccessfulAction,
  commitByLocaleSuccessfulAction,
  addToUncommittedAction,
  removeFromUncommittedAction,
  requestChangeLocaleAction,
  changeLocaleAction,
  changeFiltersAction,
  changeFirstLocaleAction,
  changeSecondLocaleAction,
  updateActiveKeysAction,
  changeSearchAction,
  setMarketAction,
  changeEditWindowPanelIdAction,
  changeGroupAction,
  requestLoadLocaleAction,
};
