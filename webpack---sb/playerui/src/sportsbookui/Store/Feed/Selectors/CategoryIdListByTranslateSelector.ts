import { ascend, createMemoSelector, descend, getNotNil, reverseMap } from "@sb/utils";
import { categoryIconTKeys } from "@sb/betting-core/SharedTKeys/CategoryIconTKeys";
import { themeLineCategoryTranslateNs, themeSbCountryTranslateNs } from "../../../../common/Constants/LineTranslates";
import { baseSortWith } from "../../../Utils/SortWith";
import { includesString } from "../../../Utils/IncludesString";
import { partition } from "../../../Utils/Partition";
import { translateSelector } from "../../Translate/TranslateSelectors";
import { preLiveEventsSelector } from "./PreLiveEventsSelector";
import { categoriesSelector } from "./FeedSelectors";

const everyNotCategoryNs = (key: string) => [themeSbCountryTranslateNs, themeLineCategoryTranslateNs].every((ns) => !key.startsWith(`${ns}.`));

const countryTranslates = reverseMap(categoryIconTKeys);

const categoriesBySportIdSelectorFactory = createMemoSelector(
  [
    preLiveEventsSelector,
    categoriesSelector,
    (_, sportId: string) => sportId,
  ],
  (events, categories, sportId) => {
    const map: Record<string, null> = {};

    Object.keys(events).forEach((eventId) => {
      const event = events[eventId];
      if (!event || event.sportId !== sportId) {
        return;
      }

      map[event.categoryId] = null;
    });

    return baseSortWith(
      [
        descend((categoryId) => getNotNil(categories[categoryId], ["categoryIdListByTranslateSelectorFactory"], "Category").priority),
        ascend((categoryId) => getNotNil(categories[categoryId], ["categoryIdListByTranslateSelectorFactory"], "Category").name),
      ],
      Object.keys(map),
    );
  },
);

const translateSelectorFactory = createMemoSelector(
  [
    translateSelector,
    categoriesSelector,
    (_, __, translate: string | null) => translate,
  ],
  (translates, categories, translate) => {
    if (!translate) {
      return [];
    }

    const keys: string[] = [];

    const map: Record<string, null> = {};

    const valuesCategories = Object.values(categories);

    valuesCategories.forEach(({ name, id }) => {
      if (includesString(name, translate)) {
        map[id] = null;
      }
    });

    Object.entries(translates).forEach(([key, value]) => {
      if (everyNotCategoryNs(key)) {
        return;
      }

      if (includesString(value, translate)) {
        keys.push(key);
      }
    });

    const [sbKeys, lineKeys] = partition(((key) => key.startsWith(themeSbCountryTranslateNs)), keys);

    sbKeys.forEach((key) => {
      if (!countryTranslates) {
        return;
      }

      const category = valuesCategories.find(({ icon }) => icon === countryTranslates[key]);

      if (!category) {
        return;
      }

      map[category.id] = null;
    });

    lineKeys.forEach((key) => {
      const id = key.replace(`${themeLineCategoryTranslateNs}.`, "");

      if (!categories[id]) {
        return;
      }

      map[id] = null;
    });

    return Object.keys(map);
  },
);

const categoryIdListByTranslateSelector = createMemoSelector(
  [
    categoriesBySportIdSelectorFactory,
    translateSelectorFactory,
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

export { categoryIdListByTranslateSelector };
