import { createSimpleSelector } from "@sb/utils";
import {  outrightsSelector } from "./FeedSelectors";

const sportIdListByOutrightsSelector = createSimpleSelector(
  [outrightsSelector],
  (outrights) => {
    const map = {} as Record<string, null>;

    Object.values(outrights).forEach((it) => {
      map[it.sportId] = null;
    });

    return Object.keys(map);
  },
);

export { sportIdListByOutrightsSelector };
