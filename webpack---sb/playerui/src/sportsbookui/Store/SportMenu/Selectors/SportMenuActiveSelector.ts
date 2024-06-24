import { createSimpleSelector } from "@sb/utils";
import { sportMenuActiveSportIdsSelector } from "./SportMenuSelectors";

const sportMenuActiveSelector = createSimpleSelector(
  [
    sportMenuActiveSportIdsSelector,
    (_, id: string) => id,
  ],
  (sportIds, id) => sportIds.includes(id),
);

export { sportMenuActiveSelector };
