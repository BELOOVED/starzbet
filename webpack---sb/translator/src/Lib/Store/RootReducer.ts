import { deepEqual } from "fast-equals";
import { type ActionCreator, type AnyAction, type Reducer } from "redux";
import { createRootReducer, type ELocale, entries, isNil, mergeReducer } from "@sb/utils";
import { deduplicate } from "@sb/utils/Deduplicate";
import { adminPanelReducers } from "@sb/adminui-panel";
import { deleteKeys, deleteKeysByLocale, mergeTranslates, selectKeys, selectKeysByLocale } from "../Utils/TranslateMapUtils";
import {
  addToUncommittedAction,
  changeEditWindowIdAction,
  changeEditWindowPanelIdAction,
  changeFiltersAction,
  changeFirstLocaleAction,
  changeGroupAction,
  changeHighlightedAction,
  changeLocaleAction,
  changeSearchAction,
  changeSecondLocaleAction,
  changeTranslateModeAction,
  commitByLocaleSuccessfulAction,
  commitSuccessfulAction,
  removeFromUncommittedAction,
  setMarketAction,
  updateActiveKeysAction,
  updateTranslatesAction,
} from "./Actions";
import { type IState } from "./CreateInitialState";
import { collectTranslatesByContext } from "./CollectTranslatesByContext";
import { createTranslateKeyMap } from "./CreateTranslateKeyMap";

const updateTranslatesReducer = (
  state: IState,
  { translates: { snapshot, updates } }: ReturnType<typeof updateTranslatesAction>,
): IState => {
  const merged = entries(updates || {}).reduce(
    (acc, entry) => {
      if (isNil(entry)) {
        return acc;
      }

      const [locale, list = []] = entry;

      let nextTranslate = { ...acc[locale] };

      list.forEach(({ created, updated, removed }) => {
        nextTranslate = { ...nextTranslate, ...created, ...updated };

        removed.forEach((translateKey) => {
          delete nextTranslate[translateKey];
        });
      });

      return {
        ...acc,
        [locale]: nextTranslate,
      };
    },
    mergeTranslates(state.translates, snapshot || {}),
  );

  const translates = collectTranslatesByContext(state.predefinedContext, merged);

  return {
    ...state,
    /**
     * If merged translates are equal translates from store we should save reference to `state.translates`.
     * This is necessary for the correct operation of shallowEquals.
     */
    translates: deepEqual(translates, state.translates) ? state.translates : translates,
    translateKeyMap: createTranslateKeyMap(translates),
    loadedLocales: deduplicate([...state.loadedLocales, ...Object.keys(translates) as ELocale[]]),
  };
};

const changeHighlightedReducer = (
  state: IState,
  { highlighted }: ReturnType<typeof changeHighlightedAction>,
): IState => ({ ...state, highlighted });

const changeEditWindowIdReducer = (
  state: IState,
  { id }: ReturnType<typeof changeEditWindowIdAction>,
): IState => ({
  ...state,
  // allow change from id1 -> undefined -> id2. not id1 -> id2
  editWindowId: (state.editWindowId === undefined || id === undefined) ? id : state.editWindowId,
});

const changeTranslateModeReducer = (
  state: IState,
  { translateMode }: ReturnType<typeof changeTranslateModeAction>,
): IState => ({
  ...state,
  translateMode,
  editWindowId: undefined,
});

const commitSuccessfulReducer = (
  state: IState,
  { translateKeys }: ReturnType<typeof commitSuccessfulAction>,
): IState => {
  if (translateKeys.length === 0) {
    // all

    return {
      ...state,
      translates: mergeTranslates(state.translates, state.uncommitted),
      uncommitted: {},
    };
  }

  const committed = selectKeys(state.uncommitted, translateKeys);

  return {
    ...state,
    translates: mergeTranslates(state.translates, committed),
    uncommitted: deleteKeys(state.uncommitted, translateKeys),
  };
};

const commitByLocaleSuccessfulReducer = (
  state: IState,
  { translateKeys, locale }: ReturnType<typeof commitByLocaleSuccessfulAction>,
): IState => {
  const committed = selectKeysByLocale(state.uncommitted, translateKeys, locale);

  return {
    ...state,
    translates: mergeTranslates(state.translates, committed),
    uncommitted: deleteKeysByLocale(state.uncommitted, translateKeys, locale),
  };
};

const addToUncommittedReducer = (
  state: IState,
  { translates }: ReturnType<typeof addToUncommittedAction>,
): IState => ({
  ...state,
  uncommitted: mergeTranslates(state.uncommitted, translates),
});

const removeFromUncommittedReducer = (
  state: IState,
  { translateKeys, locale }: ReturnType<typeof removeFromUncommittedAction>,
): IState => ({
  ...state,
  uncommitted: deleteKeysByLocale(state.uncommitted, translateKeys, locale),
});

const changeLocaleReducer = (
  state: IState,
  { locale }: ReturnType<typeof changeLocaleAction>,
): IState => ({
  ...state,
  currentLocale: locale,
});

const changeFiltersReducer = (
  state: IState,
  { filter }: ReturnType<typeof changeFiltersAction>,
): IState => ({
  ...state,
  filters: {
    ...state.filters,
    ...filter,
  },
});

const changeFirstLocaleReducer = (
  state: IState,
  { locale }: ReturnType<typeof changeFirstLocaleAction>,
): IState => ({
  ...state,
  firstLocale: locale,
});

const changeSecondLocaleReducer = (
  state: IState,
  { locale }: ReturnType<typeof changeSecondLocaleAction>,
): IState => ({
  ...state,
  secondLocale: locale,
});

const updateActiveKeysReducer = (
  state: IState,
  { tKeys }: ReturnType<typeof updateActiveKeysAction>,
): IState => ({
  ...state,
  activeKeys: tKeys,
});

const changeSearchReducer = (
  state: IState,
  { searchStr }: ReturnType<typeof changeSearchAction>,
): IState => ({
  ...state,
  searchStr,
});

const setMarketReducer = (
  state: IState,
  { market }: ReturnType<typeof setMarketAction>,
): IState => ({
  ...state,
  market: {
    ...state.market,
    ...market,
  },
});

const changeEditWindowPanelIdReducer = (
  state: IState,
  { id }: ReturnType<typeof changeEditWindowPanelIdAction>,
): IState => ({
  ...state,
  editWindowPanelId: id,
});

const changeGroupReducer = (
  state: IState,
  { group }: ReturnType<typeof changeGroupAction>,
): IState => ({
  ...state,
  group,
});

const rootReducer = mergeReducer<ActionCreator<AnyAction>, IState>(
  createRootReducer([
    [updateTranslatesReducer, updateTranslatesAction],
    [changeHighlightedReducer, changeHighlightedAction],
    [changeEditWindowIdReducer, changeEditWindowIdAction],
    [changeTranslateModeReducer, changeTranslateModeAction],
    [commitSuccessfulReducer, commitSuccessfulAction],
    [commitByLocaleSuccessfulReducer, commitByLocaleSuccessfulAction],
    [addToUncommittedReducer, addToUncommittedAction],
    [removeFromUncommittedReducer, removeFromUncommittedAction],
    [changeLocaleReducer, changeLocaleAction],
    [changeFiltersReducer, changeFiltersAction],
    [changeFirstLocaleReducer, changeFirstLocaleAction],
    [changeSecondLocaleReducer, changeSecondLocaleAction],
    [updateActiveKeysReducer, updateActiveKeysAction],
    [changeSearchReducer, changeSearchAction],
    [setMarketReducer, setMarketAction],
    [changeEditWindowPanelIdReducer, changeEditWindowPanelIdAction],
    [changeGroupReducer, changeGroupAction],
  ]),
  adminPanelReducers as Reducer<IState>,
);

export { rootReducer };
