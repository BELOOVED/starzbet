import { createSimpleSelector } from "@sb/utils";
import {  outrightsSelector } from "./FeedSelectors";

const outrightTournamentIdListByBySportIdSelector = createSimpleSelector(
  [
    outrightsSelector,
    (_, sportId: string) => sportId,
  ],
  (outrights, sportId) => {
    const map = {} as Record<string, null>;

    Object.values(outrights).forEach((it) => {
      if(it.sportId !== sportId){
        return;
      }

      map[it.tournamentId] = null;
    });

    return Object.keys(map);
  },
);

export { outrightTournamentIdListByBySportIdSelector };
