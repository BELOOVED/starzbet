// @ts-nocheck
import { createSelector } from "reselect";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { isNil } from "@sb/utils";
import { matchAllTournamentSelection } from "../../../Utils/MatchAllTournamentSelection";
import { preLiveFavouritesSelector } from "../../PreLive/Selectors/PreLiveSelectors";
import { maybeFakeOutrightTournamentIdBySlug, unfakeOutrightTournamentSlug } from "../../SportMenu/Model/SportMenu";
import { liveFavoritesSelector } from "../../Live/Selectors/LiveSelectors";
import { combineTournamentEntries } from "../CombineTournamentEntries";
import { sortedTournamentEntriesSelectorFactory } from "./SortedTournamentEntriesSelectorFactory";
import { preLiveEventsSelector } from "./PreLiveEventsSelector";
import {
  categoriesSelector,
  outrightsSelector,
  tournamentsSelector,
  tournamentToEventMapSelector,
  tournamentToOutrightMapSelector,
} from "./FeedSelectors";
import { combineTournamentEntriesWithOutrights } from "./CombineTournamentEntriesWithOutrights";
import { liveEventsSelector } from "./LiveEventsSelector";

const tournamentIdListByMatchUrlSelectorFactory = (matchUrl) => createSelector(
  categoriesSelector,
  tournamentsSelector,
  (categories, tournaments) => {
    const list = [];

    const matches = matchAllTournamentSelection(matchUrl);

    const categoryIds = Object.keys(categories);

    const tournamentIds = Object.keys(tournaments);

    matches.forEach(({ sportSlug, categorySlug, tournamentSlugs }) => {
      const sportId = sportCodeToIdMap[sportSlug];

      const categoryId = categoryIds.find(
        (id) => categories[id].sportId === sportId && categories[id].slug === categorySlug,
      );

      tournamentSlugs.split(",").forEach((tournamentSlug) => {
        const tournamentId = tournamentIds.find(
          (id) => tournaments[id].categoryId === categoryId && tournaments[id].slug === unfakeOutrightTournamentSlug(tournamentSlug),
        );

        if (isNil(tournamentId)) {
          return;
        }

        list.push(maybeFakeOutrightTournamentIdBySlug(tournamentSlug, tournamentId));
      });
    });

    return list;
  },
);

const preLiveTournamentEntriesSelector = (matchUrl, rest) => createSelector(
  tournamentIdListByMatchUrlSelectorFactory(matchUrl),
  preLiveEventsSelector,
  tournamentToEventMapSelector,
  tournamentToOutrightMapSelector,
  outrightsSelector,
  combineTournamentEntriesWithOutrights(combineTournamentEntries(rest)),
);

const liveTournamentEntriesSelector = (matchUrl, rest) => createSelector(
  tournamentIdListByMatchUrlSelectorFactory(matchUrl),
  liveEventsSelector,
  tournamentToEventMapSelector,
  combineTournamentEntries(rest),
);

const tournamentEntriesByMatchUrlSelectorFactory = ([matchUrl, ...rest]) => sortedTournamentEntriesSelectorFactory(
  preLiveFavouritesSelector,
  preLiveTournamentEntriesSelector(matchUrl, rest),
  "tournamentEntriesByMatchUrlSelectorFactory",
);

const liveTournamentEntriesByMatchUrlSelectorFactory = ([matchUrl, ...rest]) => sortedTournamentEntriesSelectorFactory(
  liveFavoritesSelector,
  liveTournamentEntriesSelector(matchUrl, rest),
  "liveTournamentEntriesByMatchUrlSelectorFactory",
);

export { tournamentEntriesByMatchUrlSelectorFactory, liveTournamentEntriesByMatchUrlSelectorFactory };
