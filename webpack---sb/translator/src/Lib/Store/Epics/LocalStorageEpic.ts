import { ignoreElements, type Observable, tap } from "rxjs";
import { type Action } from "redux";
import { isCreator } from "@sb/utils";
import { createLocalStorageEpic } from "@sb/utils/EpicUtils/CreateLocalStorageEpic";
import { type TLocaleResource } from "../../../@types/TLocaleResource";
import { initialFiltersState } from "../../Utils/Constants";
import { deleteKeys, deleteKeysByLocale, mergeTranslates } from "../../Utils/TranslateMapUtils";
import {
  addToUncommittedAction,
  changeFiltersAction,
  changeFirstLocaleAction,
  changeSecondLocaleAction,
  changeTranslateModeAction,
  commitByLocaleSuccessfulAction,
  commitSuccessfulAction,
  removeFromUncommittedAction,
  requestChangeLocaleAction,
  setMarketAction,
} from "../Actions";
import { ETranslatorLocaleStorageKey, type TAppLocalStorageData, translatorLocalStorage } from "../LocalStorageKeys";
import { type IFilters } from "../CreateInitialState";
import { type TTranslateEpic } from "./TTranslateEpic";

const prop = (key: string) => <T>(object: Record<string, T>) => object[key];

const update = <K extends ETranslatorLocaleStorageKey>(storageKey: K, value: TAppLocalStorageData[K]) => {
  if (value) {
    translatorLocalStorage.set(storageKey, value);
  } else {
    localStorage.removeItem(storageKey);
  }
};

const onMarketChange = (action$: Observable<Action>) => action$.pipe(
  isCreator(setMarketAction),
  tap(({ market }) => {
    update(ETranslatorLocaleStorageKey.marketSport, market.sport);
    update(ETranslatorLocaleStorageKey.marketScope, market.scope);
  }),
  ignoreElements(),
);

const addFiltersToLocalStorageExtractor = ({ filter }: ReturnType<typeof changeFiltersAction>): IFilters => {
  const current: IFilters = translatorLocalStorage.get(ETranslatorLocaleStorageKey.filters) || initialFiltersState;

  return { ...current, ...filter };
};

const addToLocalStorageExtractor = ({ translates }: ReturnType<typeof addToUncommittedAction>): TLocaleResource => {
  const current: TLocaleResource = translatorLocalStorage.get(ETranslatorLocaleStorageKey.uncommitted) || {};

  return mergeTranslates(current, translates);
};

const deleteFromLocalStorageExtractor = ({ translateKeys }: ReturnType<typeof commitSuccessfulAction>): TLocaleResource => {
  const current: TLocaleResource = translatorLocalStorage.get(ETranslatorLocaleStorageKey.uncommitted) || {};

  return deleteKeys(current, translateKeys);
};

const deleteFromLocalStorageByLocaleExtractor = (
  { translateKeys, locale }: ReturnType<typeof commitByLocaleSuccessfulAction | typeof removeFromUncommittedAction>,
): TLocaleResource => {
  const current: TLocaleResource = translatorLocalStorage.get(ETranslatorLocaleStorageKey.uncommitted) || {};

  return deleteKeysByLocale(current, translateKeys, locale);
};

const localStorageEpic: TTranslateEpic = createLocalStorageEpic<TAppLocalStorageData>(
  [
    [changeTranslateModeAction, prop("translateMode"), ETranslatorLocaleStorageKey.translateMode],
    [requestChangeLocaleAction, prop("locale"), ETranslatorLocaleStorageKey.currentLocale],
    [changeFirstLocaleAction, prop("locale"), ETranslatorLocaleStorageKey.firstLocale],
    [changeSecondLocaleAction, prop("locale"), ETranslatorLocaleStorageKey.secondLocale],
    [changeFiltersAction, addFiltersToLocalStorageExtractor, ETranslatorLocaleStorageKey.filters],
    [addToUncommittedAction, addToLocalStorageExtractor, ETranslatorLocaleStorageKey.uncommitted],
    [commitSuccessfulAction, deleteFromLocalStorageExtractor, ETranslatorLocaleStorageKey.uncommitted],
    [commitByLocaleSuccessfulAction, deleteFromLocalStorageByLocaleExtractor, ETranslatorLocaleStorageKey.uncommitted],
    [removeFromUncommittedAction, deleteFromLocalStorageByLocaleExtractor, ETranslatorLocaleStorageKey.uncommitted],
    onMarketChange,
  ],
  translatorLocalStorage,
);

export { localStorageEpic };
