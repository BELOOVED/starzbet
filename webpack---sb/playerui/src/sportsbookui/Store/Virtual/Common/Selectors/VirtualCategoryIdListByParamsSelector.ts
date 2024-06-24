// @ts-nocheck
import { createSelector } from "reselect";
import { matchPath } from "@sb/react-router-compat";
import { isNil } from "@sb/utils";
import { routerLocationPathnameSelector } from "@sb/router";
import { sortBy } from "../../../../Utils/SortBy";
import { routeMap } from "../../../../RouteMap/RouteMap";
import { categoriesSelector, eventsSelector } from "../../../Feed/Selectors/FeedSelectors";
import { type EVirtualCategorySlug, virtualCategorySlugOrderedList } from "../Model/CategorySlugWithLeague";

const virtualCategoryIdListByParamsSelector = createSelector(
  eventsSelector,
  categoriesSelector,
  routerLocationPathnameSelector,
  (_: unknown, orderedList: EVirtualCategorySlug[] = virtualCategorySlugOrderedList) => orderedList,
  (events, categories, pathname, orderedList) => {
    const match = matchPath<{ categoryId?: string; }>(
      pathname,
      [routeMap.virtual.category, routeMap.virtual.roulette],
    );
    const params = match?.params;

    if (isNil(params)) {
      return [];
    }

    if (!categories[params.categoryId]) {
      return [];
    }

    const sportId = categories[params.categoryId].sportId;

    return sortBy(
      (categoryId) => orderedList.indexOf(categories[categoryId].slug),
      Object.keys(categories).filter((categoryId) => categories[categoryId].sportId === sportId),
    );
  },
);

export { virtualCategoryIdListByParamsSelector };
