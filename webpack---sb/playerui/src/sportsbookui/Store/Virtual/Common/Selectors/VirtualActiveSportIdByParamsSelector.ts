import { createSelector } from "reselect";
import { categoriesSelector, eventsSelector } from "../../../Feed/Selectors/FeedSelectors";

const virtualActiveSportIdByParamsSelector = (params) => createSelector(
  eventsSelector,
  categoriesSelector,
  (events, categories) => {
    if (params == null) {
      return null;
    }

    if (params.sportId) {
      return params.sportId;
    }

    if (params.categoryId) {
      const category = categories[params.categoryId];

      if (!category) {
        return null;
      }

      return category.sportId;
    }

    return null;
  },
);

export { virtualActiveSportIdByParamsSelector };
