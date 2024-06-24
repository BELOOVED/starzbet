import { createSimpleSelector } from "@sb/utils";
import { sportMenuActiveTournamentIdsSelector } from "./SportMenuActiveTournamentIdsSelector";

const sportMenuTournamentActiveSelector = createSimpleSelector(
  [
    sportMenuActiveTournamentIdsSelector,
    (_, id: string) => id,
  ],
  (tournamentIds, id) => tournamentIds.includes(id),
);

export { sportMenuTournamentActiveSelector };
