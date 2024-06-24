// @ts-nocheck
import { createMemoSelector, reverseMap, useParamSelector } from "@sb/utils";
import { sportCodeTKeys } from "@sb/betting-core/SharedTKeys/SportCodeTKeys";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { themeSbSportTranslateNs } from "../../../../common/Constants/LineTranslates";
import { includesString } from "../../../Utils/IncludesString";
import { translateSelector } from "../../Translate/TranslateSelectors";
import { type TSportId } from "../../MarketFilter/Model/MarketPreset";
import { preLiveEsportEventsSelector, preLiveEventsSelector, preLiveNotEsportEventsSelector } from "../Selectors/PreLiveEventsSelector";
import { liveEsportEventsSelector, liveNotEsportEventsSelector } from "../Selectors/LiveEventsSelector";
import { sortByPriority } from "../Model/Sport";
import { outrightsSelector, sportsSelector } from "../Selectors/FeedSelectors";

const allPreLiveSports = { eventSelector: preLiveEventsSelector };

const notEsportPreLiveSports = { eventSelector: preLiveNotEsportEventsSelector };

const notEsportLiveSports = { eventSelector: liveNotEsportEventsSelector };

const esportPreLiveSports = { eventSelector: preLiveEsportEventsSelector };

const esportLiveSports = { eventSelector: liveEsportEventsSelector };

const getSportMapSelector = createMemoSelector(
  [
    sportsSelector,
    (state, { eventSelector }) => eventSelector(state),
    (_, params) => params.eventFilter,
  ],
  (sports, events, eventFilter) => {
    const sportMap = {};

    const eventIdList = eventFilter
      ? Object.keys(events).filter(eventFilter(events, sports))
      : Object.keys(events);

    eventIdList.forEach((eventId) => {
      const { sportId } = events[eventId];

      sportMap[sportId] = null;
    });

    return sportMap;
  },
);

const sportIdListSelectorFactory = (sportMapSelector) => createMemoSelector(
  [
    sportMapSelector,
    sportsSelector,
    (_, params) => params.sortFn,
    (_, params) => params.sportFilter,
  ],
  (sportMap, sports, sortFn = sortByPriority, sportFilter) => sortFn(
    sports,
    sportFilter
      ? Object.keys(sportMap).filter(sportFilter)
      : Object.keys(sportMap),
  ),
);

const sportIdListSelector = sportIdListSelectorFactory(
  getSportMapSelector,
);

const getSportMapWithOutrightsSelector = createMemoSelector(
  [
    getSportMapSelector,
    outrightsSelector,
  ],
  (sportMap, outrights) => {
    const map = { ...sportMap };

    Object.values(outrights).forEach(({ sportId }) => {
      map[sportId] = null;
    });

    return map;
  },
);

const sportIdListWithOutrightsSelector = sportIdListSelectorFactory(
  getSportMapWithOutrightsSelector,
);

const usePreLiveSportIdListSelector = (sortFn?): string[] => useParamSelector(
  sportIdListWithOutrightsSelector,
  [{ ...allPreLiveSports, sortFn }],
);

const useNotEsportPreLiveSportIdListSelector = (sortFn) => useParamSelector(
  sportIdListSelector,
  [{ ...notEsportPreLiveSports, sortFn }],
);

const useNotEsportPreLiveSportIdListWithOutrightsSelector = (sortFn?, eventFilter?): TSportId[] => useParamSelector(
  sportIdListWithOutrightsSelector,
  [{ ...notEsportPreLiveSports, sortFn, eventFilter }],
);

const useNotEsportLiveSportIdListSelector = (sortFn?): TSportId[] => useParamSelector(
  sportIdListSelector,
  [{ ...notEsportLiveSports, sortFn }],
);

const useEsportPreLiveSportIdListSelector = (sortFn?): TSportId[] => useParamSelector(
  sportIdListSelector,
  [{ ...esportPreLiveSports, sortFn }],
);

const useEsportLiveSportIdListSelector = (sortFn?): TSportId[] => useParamSelector(
  sportIdListSelector,
  [{ ...esportLiveSports, sortFn }],
);

const sportTranslates = reverseMap(sportCodeTKeys);

const sportTranslateSelector = createMemoSelector(
  [
    translateSelector,
    (_, __, translate) => translate,
  ],
  (translates, translate) => {
    const keys = [];

    if (!translate) {
      return keys;
    }

    Object.entries(translates).forEach(([key, value]) => {
      if (!key.startsWith(themeSbSportTranslateNs)) {
        return;
      }

      const sharedKey = key.replace(process.env.THEME, "$theme$");

      if (includesString(value, translate)) {
        sportTranslates[sharedKey] && keys.push(sportCodeToIdMap[sportTranslates[sharedKey]]);
      }
    });

    return keys;
  },
);

const sportIdListSelectorByTranslate = createMemoSelector(
  [
    sportIdListWithOutrightsSelector,
    sportTranslateSelector,
    (_, __, translate) => translate,
  ],
  (sportIdList, keys, translate) => {
    if (!translate) {
      return sportIdList;
    }

    return sportIdList.filter((it) => keys.includes(it));
  },
  {
    expensive: true,
  },
);

const useNotEsportPreLiveSportIdListByTranslateSelector = (translate) => useParamSelector(
  sportIdListSelectorByTranslate,
  [{ ...notEsportPreLiveSports }, translate],
);

const useEsportPreLiveSportIdListByTranslateSelector = (translate) => useParamSelector(
  sportIdListSelectorByTranslate,
  [{ ...esportPreLiveSports }, translate],
);

export {
  usePreLiveSportIdListSelector,
  useNotEsportPreLiveSportIdListSelector,
  useNotEsportPreLiveSportIdListWithOutrightsSelector,
  useNotEsportLiveSportIdListSelector,
  useEsportPreLiveSportIdListSelector,
  useEsportLiveSportIdListSelector,
  sportTranslateSelector,
  useNotEsportPreLiveSportIdListByTranslateSelector,
  useEsportPreLiveSportIdListByTranslateSelector,
};
