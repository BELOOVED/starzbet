import { createMemoSelector } from "@sb/utils";
import { outrightsSelector } from "../../Feed/Selectors/FeedSelectors";

const outrightTournamentIdListByCategoryIdSelector = createMemoSelector(
  [
    outrightsSelector,
    (_, categoryId: string) => categoryId,
  ],
  (outrights, categoryId) => {
    const map: Record<string, null> = {};

    Object.values(outrights)
      .filter((outright) => outright.categoryId === categoryId)
      .forEach(({ tournamentId }) => map[tournamentId] = null);

    return Object.keys(map);
  },
);

export { outrightTournamentIdListByCategoryIdSelector };
