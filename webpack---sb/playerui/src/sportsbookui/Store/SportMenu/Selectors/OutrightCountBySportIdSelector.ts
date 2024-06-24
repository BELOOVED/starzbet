import { createSimpleSelector } from "@sb/utils";
import { outrightsSelector } from "../../Feed/Selectors/FeedSelectors";

const outrightCountBySportIdSelector = createSimpleSelector(
  [
    outrightsSelector,
    (_, sportId: string) => sportId,
  ],
  (outrights, sportId) => Object.values(outrights)
    .filter((outright) => outright.sportId === sportId).length,
);

export { outrightCountBySportIdSelector };
