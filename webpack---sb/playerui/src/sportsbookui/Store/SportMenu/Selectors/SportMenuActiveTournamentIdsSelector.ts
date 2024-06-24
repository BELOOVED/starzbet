import { deduplicate, isNil, isNotNil } from "@sb/utils";
import { sportIdToCodeMap } from "@sb/betting-core/SportsMapUtils";
import { type TAppState } from "../../InitialState";
import { categoriesSelector, tournamentsSelector } from "../../Feed/Selectors/FeedSelectors";
import { maybeFakeOutrightTournamentSlugById, unfakeOutrightTournamentId } from "../Model/SportMenu";
import { sportMenuActiveSelector } from "./SportMenuSelectors";

type TSlugMap = Record<string, Record<string, string[]>>

type TActiveTournamentIdsMatch = {
  categorySlug: string;
  sportSlug: string;
  tournamentSlugs: string;
}
const sportMenuActiveTournamentIdsSelector = (state: TAppState) => sportMenuActiveSelector(state).tournamentIds;

const sportMenuActiveTournamentIdsMatchesSelector = (state: TAppState, tournamentIds: string[]) => {
  const uniqAndUnfakeOutrightTournamentIds = deduplicate(tournamentIds);

  const slugMap: TSlugMap = uniqAndUnfakeOutrightTournamentIds.reduce<TSlugMap>(
    (acc, tournamentId) => {
      const tournament = tournamentsSelector(state)[unfakeOutrightTournamentId(tournamentId)];

      if (isNil(tournament)) {
        return acc;
      }
      const category = categoriesSelector(state)[tournament.categoryId];
      if (isNil(category)) {
        return acc;
      }

      const sportSlug = sportIdToCodeMap[tournament.sportId];
      if (isNil(sportSlug)) {
        return acc;
      }

      if (isNil(acc[sportSlug])) {
        acc[sportSlug] = {};
      }

      const sportMap = acc[sportSlug];
      const categorySlug: string = category.slug;

      if (isNotNil(sportMap) && isNil(sportMap[categorySlug])) {
        sportMap[categorySlug] = [];
      }

      if (isNotNil(sportMap)) {
        const categoryMap = sportMap[categorySlug];

        if (isNotNil(categoryMap)) {
          categoryMap.push(maybeFakeOutrightTournamentSlugById(tournamentId, tournament.slug as string));
        }
      }

      return acc;
    },
    {},
  );

  return Object.entries(slugMap).reduce<TActiveTournamentIdsMatch[]>(
    (acc, [sportSlug, categoryMap]) => {
      acc.push(...Object.entries(categoryMap).map(([categorySlug, tournamentSlugs]) => ({
        sportSlug,
        categorySlug,
        tournamentSlugs: tournamentSlugs.join(","),
      })));

      return acc;
    },
    [],
  );
};

export { sportMenuActiveTournamentIdsSelector, sportMenuActiveTournamentIdsMatchesSelector };
