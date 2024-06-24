import { createSimpleSelector } from "@sb/utils";
import { sportMenuActiveCategoryIdsSelector } from "./SportMenuSelectors";

const sportMenuCategoryActiveSelector = createSimpleSelector(
  [
    sportMenuActiveCategoryIdsSelector,
    (_, id: string) => id,
  ],
  (categoryIds, id) => categoryIds.includes(id),
);

export { sportMenuCategoryActiveSelector };
