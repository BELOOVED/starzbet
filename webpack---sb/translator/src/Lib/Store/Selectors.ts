import { createSimpleSelector, type ELocale, getNotNil, isNil, isNotNil } from "@sb/utils";
import { type TLocaleResource } from "../../@types/TLocaleResource";
import { mergeTranslates, selectKeys } from "../Utils/TranslateMapUtils";
import { getAffectedKeys } from "../Utils/GetTranslatesKeys";
import { filterTypes } from "../Utils/Constants";
import { parseContext } from "../Model/Context/ParseContext";
import { isAllTranslations } from "../Model/EGroup";
import { hasMarketNamespace, nameSpaceDelimiter } from "../Model/Namespace";
import { contextDelimiter } from "../Model/Context/Context";
import { type IMarket, type IState, type ITranslateKeyMap } from "./CreateInitialState";

const selectUnCommittedTranslatesOrAll = (keys: string[]) => ({ uncommitted }: IState): TLocaleResource => {
  if (keys.length === 0) {
    return uncommitted;
  }

  return selectKeys(uncommitted, keys);
};

const selectTranslateMode = ({ translateMode }: IState) => translateMode;

const selectTranslates = ({ translates }: IState) => translates;

const selectUncommitted = ({ uncommitted }: IState) => uncommitted;

const selectTranslateKeyMap = ({ translateKeyMap }: IState) => translateKeyMap;

const selectHighlighted = ({ highlighted }: IState) => highlighted;

const selectEditWindowId = ({ editWindowId }: IState) => editWindowId;

const selectLocales = ({ locales }: IState) => locales;

const selectCurrentLocale = ({ currentLocale }: IState) => currentLocale;

const selectFallbackLocale = ({ fallbackLocale }: IState) => fallbackLocale;

const selectKeyExpressions = ({ keyExpressions }: IState) => keyExpressions;

const selectIsHighlighted = (state: IState, translateKey: string) => selectHighlighted(state) === translateKey;

const selectIsEditBoxOpened = (state: IState, id: number) => selectEditWindowId(state) === id;

const selectFilters = ({ filters }: IState) => filters;

const selectFirstLocale = ({ firstLocale }: IState) => firstLocale;

const selectSecondLocale = ({ secondLocale }: IState) => secondLocale;

const selectActiveKeys = ({ activeKeys }: IState) => activeKeys;

const selectSearchStr = ({ searchStr }: IState) => searchStr;

const selectLoadedLocales = ({ loadedLocales }: IState) => loadedLocales;

const filterByInclude = (
  keys: string[],
  shouldInclude: boolean,
  locale: ELocale,
  allTranslates: TLocaleResource,
): string[] => {
  const allTranslateKeysByLocale = Object.keys(allTranslates[locale] || {});

  return keys.filter((key) => {
    const isContains = allTranslateKeysByLocale.includes(key);

    return shouldInclude ? isContains : !isContains;
  });
};

const filterBySearch = (
  keys: string[],
  searchStr: string,
  mergedTranslates: TLocaleResource,
  locales: ELocale[],
): string[] => {
  if (!searchStr) {
    return keys;
  }

  return keys.filter((key) => {
    // filter by key
    const [_, ...keyWithoutNameSpaces] = key.split(nameSpaceDelimiter);

    if (keyWithoutNameSpaces.join(".").toLowerCase().includes(searchStr.toLowerCase())) {
      return true;
    }

    // then filter by translates in all locales
    return locales.some((locale) => {
      const currentLocale = mergedTranslates[locale];

      if (!currentLocale) {
        return false;
      }

      const value = currentLocale[key];

      if (!value) {
        return false;
      }

      return value.toLowerCase().includes(searchStr.toLowerCase());
    });
  });
};

const allTranslateKeysSelector = createSimpleSelector(
  [
    selectTranslates,
    selectUncommitted,
    selectFilters,
    selectFirstLocale,
    selectSecondLocale,
    selectSearchStr,
  ],
  (
    translates,
    uncommitted,
    filters,
    firstLocale,
    secondLocale,
    searchStr,
  ) => {
    const locales = {
      [firstLocale]: filters.firstLocaleFilter,
      [secondLocale]: filters.secondLocaleFilter,
    };

    const currentLocales = Object.keys(locales).filter((locale) => locales[locale]) as ELocale[];

    const result = {} as Record<string, null>;

    currentLocales.forEach((locale) => {
      [translates, uncommitted].forEach((map: TLocaleResource) => {
        const translatesMap = map[locale];

        if (isNil(translatesMap)) {
          return;
        }

        Object.keys(translatesMap).forEach((key: string) => {
          if (isNotNil(searchStr)) {
            const value = translatesMap[key];

            if (isNil(value) || [key, value].every((str) => !str.toLowerCase().includes(searchStr.toLowerCase()))) {
              return;
            }
          }

          const translateKey = getNotNil(
            key.split(contextDelimiter)[0],
            ["allTranslateKeysSelector", "translateKey"],
            "key.split(contextDelimiter)[0]",
          );

          result[translateKey] = null;
        });
      });
    });

    return Object.keys(result);
  },
);

const translateKeysWithUncommitedFilterSelector = createSimpleSelector(
  [
    allTranslateKeysSelector,
    selectFilters,
    selectUncommitted,
  ],
  (keys, filters, uncommitted) => {
    if (filters[filterTypes.notSavedFilter]) {
      return keys.filter((key) => getAffectedKeys(uncommitted).includes(key));
    }

    return keys;
  },
);

//todo
const selectFilteredKeys = createSimpleSelector(
  [translateKeysWithUncommitedFilterSelector,
    selectFilters,
    selectActiveKeys,
  ],
  (keys, filters, activeKeys) => {
    if (filters[filterTypes.onPageFilter]) {
      return keys.filter((key) => activeKeys.includes(key));
    }

    return keys;
  },
);

const selectMarketKeys = ({
  translateKeyMap,
  translates,
  market,
  filters,
  uncommitted,
  firstLocale,
  secondLocale,
  searchStr,
  locales,
}: IState): string[] => {
  const marketKeys = Object.keys(translateKeyMap)
    .filter(hasMarketNamespace)
    .filter(
      (key) => getNotNil(
        translateKeyMap[key],
        ["selectMarketKeys"],
        `translateKeyMap[${key}]`,
      ).some(filterByMarket(market)),
    );

  const filteredKeysByFirstLocale = filterByInclude(
    marketKeys,
    Boolean(filters.firstLocaleFilter),
    firstLocale,
    translates,
  );

  const filteredKeysBySecondLocale = filterByInclude(
    marketKeys,
    Boolean(filters.secondLocaleFilter),
    secondLocale,
    translates,
  );

  const mergedFilteredKeys = [
    ...new Set([...filteredKeysByFirstLocale, ...filteredKeysBySecondLocale]),
  ];

  // filtered by search
  return filterBySearch(
    mergedFilteredKeys,
    searchStr,
    mergeTranslates(translates, uncommitted),
    locales,
  );
};

const selectIsUncommitted = (translateKey: string, locale: ELocale) => ({ uncommitted }: IState): boolean => {
  const targetLocale = uncommitted[locale];

  return !!targetLocale && targetLocale.hasOwnProperty(translateKey);
};

const selectUncommittedKeys = ({ uncommitted }: IState): string[] => getAffectedKeys(uncommitted);

const selectCountUncommittedKeys = (state: IState) => selectUncommittedKeys(state).length;

const selectUncommittedMarketKeys = ({ uncommitted }: IState): string[] => getAffectedKeys(uncommitted)
  .filter(hasMarketNamespace);

const selectCountUncommittedMarketKeys = (state: IState) => selectUncommittedMarketKeys(state).length;

const selectUncommittedByKey = (translateKey: string) =>
  ({ uncommitted }: IState): TLocaleResource => Object.keys(uncommitted)
    .reduce(
      (acc, locale) => {
        const currentLocale = uncommitted[locale as ELocale];

        if (currentLocale && currentLocale.hasOwnProperty(translateKey)) {
          return {
            ...acc,
            [locale]: {
              [translateKey]: currentLocale[translateKey],
            },
          };
        }

        return acc;
      },
      {},
    );

const selectEmptyUncommitted = (state: IState, translateKey: string) => (
  Object.keys(selectUncommittedByKey(translateKey)(state)).length === 0
);

const filterByMarket = (market: IMarket) => (key: string): boolean => {
  const context = parseContext(key);

  if (market.sport) {
    if (market.sport !== context.sportCode) {
      return false;
    }

    if (market.scope && isNotNil(context.scopeType) && isNotNil(context.scopeNumber)) {
      return market.scope === `${context.scopeType}--${context.scopeNumber}`;
    }

    return true;
  }

  return true;
};

const selectTranslateKeyMapByMarket = ({ translateKeyMap, market }: IState): ITranslateKeyMap => Object.fromEntries(
  Object.entries(translateKeyMap)
    .map(([key, values]) => (
      [
        key,
        values.filter(filterByMarket(market)),
      ]
    )),
);

const selectTranslateKeysHasContext = (translateKey: string) =>
  ({ translateKeyMap, market, group }: IState): string[] => {
    const list = (translateKeyMap[translateKey] || []);

    if (isAllTranslations(group)) {
      return list;
    }

    return list.filter(filterByMarket(market));
  };

const selectMarket = ({ market }: IState) => market;

const selectEditWindowPanelId = ({ editWindowPanelId }: IState) => editWindowPanelId;

const selectGroup = ({ group }: IState) => group;

export {
  selectUnCommittedTranslatesOrAll,
  selectTranslateMode,
  selectTranslates,
  selectUncommitted,
  selectTranslateKeyMap,
  selectHighlighted,
  selectEditWindowId,
  selectLocales,
  selectCurrentLocale,
  selectFallbackLocale,
  selectKeyExpressions,
  selectIsHighlighted,
  selectIsEditBoxOpened,
  selectFilters,
  selectFirstLocale,
  selectSecondLocale,
  selectActiveKeys,
  selectSearchStr,
  selectLoadedLocales,
  selectFilteredKeys,
  selectMarketKeys,
  selectIsUncommitted,
  selectUncommittedKeys,
  selectCountUncommittedKeys,
  selectUncommittedMarketKeys,
  selectCountUncommittedMarketKeys,
  selectUncommittedByKey,
  selectEmptyUncommitted,
  selectTranslateKeyMapByMarket,
  selectTranslateKeysHasContext,
  selectMarket,
  selectEditWindowPanelId,
  selectGroup,
};
