// @ts-nocheck
import { createSelector } from "reselect";
import { categoriesSelector } from "../../../Feed/Selectors/FeedSelectors";

const virtualSportIdByParamsSelector = (params) => createSelector(
  categoriesSelector,
  (categories) => {
    if (params == null) {
      return null;
    }

    if (params.sportId) {
      return params.sportId;
    }

    if (params.categoryId) {
      return categories[params.categoryId]?.sportId;
    }

    return null;
  },
);

export { virtualSportIdByParamsSelector };
