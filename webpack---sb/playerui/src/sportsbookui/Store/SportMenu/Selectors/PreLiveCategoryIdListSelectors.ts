import { sportsMap } from "@sb/betting-core/SportsMap";
import { ascend, createMemoSelector, descend, getNotNil } from "@sb/utils";
import { type IFlatCategory, type IFlatEvent } from "@sb/betting-core/Feed/Types";
import { baseSortWith } from "../../../Utils/SortWith";
import { preLiveEventsSelector } from "../../Feed/Selectors/PreLiveEventsSelector";
import { categoriesSelector, outrightsSelector } from "../../Feed/Selectors/FeedSelectors";
import { isEsport } from "../../Feed/Model/Sport";
import { liveEventsSelector } from "../../Feed/Selectors/LiveEventsSelector";

const alwaysTrue = () => true;

const getNotNilEvent = (event: IFlatEvent | undefined, context: string) =>
  getNotNil(event, [context], "event");

const fnByEsports = (events: Record<string, IFlatEvent>) => (eventId: string) => {
  const notNilEvent = getNotNilEvent(events[eventId], "fnByEsports");

  return (
    Object.values(sportsMap).find(({ uuid }) => uuid === notNilEvent.sportId && isEsport(notNilEvent.sportId))
  );
};

const allEsportCategoryIdListBySportIdSelector = createMemoSelector(
  [preLiveEventsSelector],
  (events) => {
    const map: Record<string, null> = {};

    const eventIdList = Object.keys(events).filter(fnByEsports(events));

    eventIdList.forEach((eventId) => {
      const notNilEvent = getNotNilEvent(events[eventId], "allEsportCategoryIdListBySportIdSelector");

      map[notNilEvent.categoryId] = null;
    });

    return (
      Object.keys(map)
    );
  },
);

const preLiveCategoryIdListBySportIdSelector = createMemoSelector(
  [
    preLiveEventsSelector,
    (_, sportId: string) => sportId,
  ],
  (events, sportId) => {
    const map: Record<string, null> = {};

    const eventIdList = Object.keys(events).filter((eventId) => events[eventId]?.sportId === sportId);

    eventIdList.forEach((eventId) => {
      const notNilEvent = getNotNilEvent(events[eventId], "preLiveCategoryIdListBySportIdSelector");

      map[notNilEvent.categoryId] = null;
    });

    return (
      Object.keys(map)
    );
  },
);

const liveCategoryIdListBySportIdSelector = createMemoSelector(
  [
    liveEventsSelector,
    (_, sportId: string) => sportId,
  ],
  (events, sportId) => {
    const map: Record<string, null> = {};

    const eventIdList = Object.keys(events).filter((eventId) => events[eventId]?.sportId === sportId);

    eventIdList.forEach((eventId) => {
      const notNilEvent = getNotNilEvent(events[eventId], "preLiveCategoryIdListBySportIdSelector");

      map[notNilEvent.categoryId] = null;
    });

    return (
      Object.keys(map)
    );
  },
);

const preLiveCategoryIdListBySportIdWithOutrightsSelector = createMemoSelector(
  [
    preLiveEventsSelector,
    outrightsSelector,
    (_, sportId: string) => sportId,
    (_, __, eventFilterFn) => eventFilterFn,
  ],
  (events, outrights, sportId, eventFilterFn = alwaysTrue) => {
    const map: Record<string, null> = {};

    const eventIdList = Object.keys(events)
      .filter((eventId) => events[eventId]?.sportId === sportId && eventFilterFn(events[eventId]));
    const outrightIdList = Object.keys(outrights).filter((outrightId) => outrights[outrightId]?.sportId === sportId);

    eventIdList.forEach((eventId) => {
      const notNilEvent = getNotNilEvent(events[eventId], "preLiveCategoryIdListBySportIdWithOutrightsSelector");

      map[notNilEvent.categoryId] = null;
    });

    outrightIdList.forEach((outrightId) => {
      const notNilOutright = getNotNil(outrights[outrightId], ["preLiveCategoryIdListBySportIdWithOutrightsSelector"], "outright");

      map[notNilOutright.categoryId] = null;
    });

    return (
      Object.keys(map)
    );
  },
);

const getNotNilCategory = (category: IFlatCategory | undefined, context: string) =>
  getNotNil(category, ["PrelIveCategoryIdListSelectors", context], "category");

const combiner = (categoryIdList: string[], categories: Record<string, IFlatCategory>) => (
  baseSortWith(
    [
      descend((categoryId) => getNotNilCategory(categories[categoryId], "combiner").priority),
      ascend((categoryId) =>  getNotNilCategory(categories[categoryId], "combiner").name),
    ],
    categoryIdList,
  )
);

const combinerSortedByName = (categoryIdList: string[], categories: Record<string, IFlatCategory>) => (
  baseSortWith(
    [
      ascend((categoryId) =>  getNotNilCategory(categories[categoryId], "combinerSortedByName").name),
    ],
    categoryIdList,
  )
);

const preLiveCategoryIdListWithOutrightsSelector = createMemoSelector(
  [
    preLiveCategoryIdListBySportIdWithOutrightsSelector,
    categoriesSelector,
  ],
  combiner,
);

const preLiveCategoryIdListSelector = createMemoSelector(
  [
    preLiveCategoryIdListBySportIdSelector,
    categoriesSelector,
  ],
  combiner,
);

const liveCategoryIdListSelector = createMemoSelector(
  [
    liveCategoryIdListBySportIdSelector,
    categoriesSelector,
  ],
  combiner,
);

const preLiveCategoryIdListBySportIdSortedByABCSelector = createMemoSelector(
  [
    preLiveCategoryIdListBySportIdWithOutrightsSelector,
    categoriesSelector,
  ],
  combinerSortedByName,
);

const preLiveAllEsportCategoryIdListSortedByABCSelector = createMemoSelector(
  [
    allEsportCategoryIdListBySportIdSelector,
    categoriesSelector,
  ],
  combinerSortedByName,
);

export {
  preLiveAllEsportCategoryIdListSortedByABCSelector,
  preLiveCategoryIdListSelector,
  preLiveCategoryIdListWithOutrightsSelector,
  preLiveCategoryIdListBySportIdSortedByABCSelector,
  liveCategoryIdListSelector,
};
