import { ascend, createMemoSelector, descend, getNotNil, useParamSelector } from "@sb/utils";
import { themeLineTournamentTranslateNs } from "../../../../common/Constants/LineTranslates";
import { baseSortWith } from "../../../Utils/SortWith";
import { includesString } from "../../../Utils/IncludesString";
import { translateSelector } from "../../Translate/TranslateSelectors";
import { preLiveEventsSelector } from "../Selectors/PreLiveEventsSelector";
import { tournamentsSelector } from "../Selectors/FeedSelectors";

const tournamentIdListByCategoryIdSelector = createMemoSelector(
  [
    preLiveEventsSelector,
    tournamentsSelector,
    (_, categoryId: string) => categoryId,
  ],
  (events, tournaments, categoryId) => {
    const map: Record<string, null> = {};

    Object.keys(events).forEach((eventId) => {
      const event = events[eventId];
      if (!event || event.categoryId !== categoryId) {
        return;
      }

      map[event.tournamentId] = null;
    });

    return baseSortWith(
      [
        descend((tournamentId) => getNotNil(tournaments[tournamentId], ["useTournamentIdListByTranslateSelector"], "Tournament").priority),
        ascend((tournamentId) => getNotNil(tournaments[tournamentId], ["useTournamentIdListByTranslateSelector"], "Tournament").name),
      ],
      Object.keys(map),
    );
  },
);

const tournamentTranslateSelector = createMemoSelector(
  [
    translateSelector,
    tournamentsSelector,
    (_, __, translate: string | null) => translate,
  ],
  (translates, tournaments, translate) => {
    if (!translate) {
      return [];
    }

    const map: Record<string, null> = {};

    Object.values(tournaments).forEach(({ name, id }) => {
      if (includesString(name, translate)) {
        map[id] = null;
      }
    });

    Object.entries(translates).forEach(([key, value]) => {
      if (!key.startsWith(`${themeLineTournamentTranslateNs}.`)) {
        return;
      }

      if (includesString(value, translate)) {
        const id = key.replace(`${themeLineTournamentTranslateNs}.`, "");

        if (!tournaments[id]) {
          return;
        }

        map[id] = null;
      }
    });

    return Object.keys(map);
  },
);

const tournamentIdListByTranslateSelectorFactory = createMemoSelector(
  [
    tournamentIdListByCategoryIdSelector,
    tournamentTranslateSelector,
    (_, __, translate: string | null) => translate,
  ],
  (allIdList, translatedIdList, translate) => {
    if (!translate) {
      return allIdList;
    }

    return allIdList.filter((it) => translatedIdList.includes(it));
  },
  {
    expensive: true,
  },
);

const useTournamentIdListByTranslateSelector = (categoryId: string, translate: string | null) => useParamSelector(
  tournamentIdListByTranslateSelectorFactory,
  [categoryId, translate],
);

export { tournamentTranslateSelector, useTournamentIdListByTranslateSelector };
