import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { type IFlatCategory, type IFlatSport, type IFlatTournament, type TVersionedRecord } from "@sb/betting-core/Feed/Types";
import { ascend, createMemoSelector, createSimpleSelector, descend, getNotNil, isNil, sortBy, type TExplicitAny } from "@sb/utils";
import { type ESportCode } from "@sb/betting-core/ESportCode";
import { baseSortWith } from "../../../Utils/SortWith";
import { matchAllTournamentSelection } from "../../../Utils/MatchAllTournamentSelection";
import { preLiveNotEsportEventsSelector } from "../../Feed/Selectors/PreLiveEventsSelector";
import { categoriesSelector, outrightsSelector, sportsSelector, tournamentsSelector } from "../../Feed/Selectors/FeedSelectors";
import { isVirtual, sortByAlphabet, sortByPriority } from "../../Feed/Model/Sport";
import { type EVirtualCategorySlug, virtualCategorySlugOrderedList } from "../../Virtual/Common/Model/CategorySlugWithLeague";
import { type TAppState } from "../../InitialState";
import { maybeFakeOutrightTournamentIdBySlug, unfakeOutrightTournamentSlug } from "../Model/SportMenu";
import { type IWithSportMenuState } from "../SportMenuState";

const sportMenuSelector = ({ sportMenu }: IWithSportMenuState) => sportMenu;

const eventPeriodSelector = (state: IWithSportMenuState) => sportMenuSelector(state).eventPeriod;

const sortingByABCSelector = (state: IWithSportMenuState) => sportMenuSelector(state).sortingByABC;

const sportMenuActiveCategoryIdsSelector = ({ sportMenu }: IWithSportMenuState) => (
  sportMenu.active.categoryIds
);

const sportMenuActiveSportIdsSelector = ({ sportMenu }: IWithSportMenuState) => sportMenu.active.sportIds;

const sportMenuActiveSelector = (state: TAppState) => sportMenuSelector(state).active;

const sportMenuDisabledSelector = (state: TAppState) => sportMenuSelector(state).disabled;

const sortedPreLiveSportIdListSelector = createMemoSelector(
  [
    preLiveNotEsportEventsSelector,
    outrightsSelector,
    sportsSelector,
    sortingByABCSelector,
  ],
  (events, outrights, sports, sortingByABC) => {
    const map: Record<string, null> = {};

    [...Object.values(events), ...Object.values(outrights)].forEach(({ sportId }) => {
      map[sportId] = null;
    });

    const sortFn = sortingByABC ? sortByAlphabet : sortByPriority;

    return sortFn(sports, Object.keys(map));
  },
);

const getNotNilCategory = (category: IFlatCategory | undefined) => getNotNil(category, ["sortedPreLiveCategoryIdListBySportIdSelector"], "tournament");

const sortedPreLiveCategoryIdListBySportIdSelector = createMemoSelector(
  [
    categoriesSelector,
    preLiveNotEsportEventsSelector,
    outrightsSelector,
    sortingByABCSelector,
    (_, sportId: string) => sportId,
  ],
  (categories, events, outrights, sortingByABC, sportId) => {
    const map: Record<string, null> = {}; // ????

    Object.values(events).forEach((it) => {
      if (it.sportId !== sportId) {
        return;
      }

      map[it.categoryId] = null;
    });

    Object.values(outrights).forEach((it) => {
      if (it.sportId !== sportId) {
        return;
      }

      map[it.categoryId] = null;
    });

    const sortByName = [ascend((categoryId: string) => getNotNilCategory(categories[categoryId]).name)];

    const sortFns = sortingByABC
      ? sortByName
      : [descend((categoryId: string) => getNotNilCategory(categories[categoryId]).priority), ...sortByName];

    return baseSortWith(sortFns, Object.keys(map));
  },
);

const getNotNilTournament = (tournament: IFlatTournament | undefined, context: string) => getNotNil(tournament, [context], "tournament");

const sortedPreLiveTournamentIdListByCategoryIdSelector = createMemoSelector(
  [
    tournamentsSelector,
    preLiveNotEsportEventsSelector,
    sortingByABCSelector,
    (_, categoryId: string) => categoryId,
  ],
  (tournaments, events, sortingByABC, categoryId) => {
    const map: Record<string, null> = {};

    Object.values(events).forEach((it) => {
      if (it.categoryId !== categoryId) {
        return;
      }

      map[it.tournamentId] = null;
    });

    const sortByName = [
      ascend(
        (tournamentId: string) =>
          getNotNilTournament(tournaments[tournamentId], "sortedPreLiveTournamentIdListByCategoryIdSelector").name,
      ),
    ];

    const sortFns = sortingByABC
      ? sortByName
      : [
        descend(
          (tournamentId: string) =>
            getNotNilTournament(tournaments[tournamentId], "sortedPreLiveTournamentIdListByCategoryIdSelector").priority,
        ), ...sortByName];

    return baseSortWith(sortFns, Object.keys(map));
  },
);

const sortedPreLiveOutrightIdListByCategoryIdSelector = createMemoSelector(
  [
    tournamentsSelector,
    outrightsSelector,
    sortingByABCSelector,
    (_, categoryId: string) => categoryId,
  ],
  (tournaments, outrights, sortingByABC, categoryId) => {
    const map: Record<string, null> = {};

    Object.values(outrights).forEach((it) => {
      if (it.categoryId !== categoryId) {
        return;
      }

      map[it.tournamentId] = null;
    });

    const sortByName = [
      ascend(
        (tournamentId: string) =>
          getNotNilTournament(tournaments[tournamentId], "sortedPreLiveOutrightIdListByCategoryIdSelector").name,
      )];

    const sortFns = sortingByABC
      ? sortByName
      : [
        descend(
          (tournamentId: string) =>
            getNotNilTournament(tournaments[tournamentId], "sortedPreLiveOutrightIdListByCategoryIdSelector").priority,
        ), ...sortByName];

    return baseSortWith(sortFns, Object.keys(map));
  },
);

const sortedVirtualSportIdListSelector = createMemoSelector(
  [
    sportsSelector,
    sortingByABCSelector,
  ],
  (sports, sortingByABC) => {
    const sortFn = sortingByABC ? sortByAlphabet : sortByPriority;
    const virtualSports = Object.keys(sports).filter((sportId) => isVirtual(sportId));

    return sortFn(sports, virtualSports);
  },
);

const getCategoryNotNil = <V extends TExplicitAny>(value: V) => getNotNil(value, ["sortedVirtualCategoryIdListBySportIdSelector"], "category");

const virtualFirstCategoryBySportIdSelector = createSimpleSelector(
  [
    categoriesSelector,
    (_, sportId: string) => sportId,
  ],
  (categories, sportId) => {
    const sportCategories = Object.keys(categories)
      .filter((categoryId) => getCategoryNotNil(categories[categoryId]).sportId === sportId);

    return sortBy(
      (categoryId) => virtualCategorySlugOrderedList
        .indexOf(getCategoryNotNil(categories[categoryId]).slug as EVirtualCategorySlug),
      sportCategories,
    )[0];
  },
);

type  TIdsToSetActive = {
  sportIds: string[];
  categoryIds: string[];
  tournamentIds: string[];
}

const sportMenuIdsToSetActiveSelector = (state: TAppState, pathname: string) => {
  const matches = matchAllTournamentSelection(pathname);
  const sportsMap: TVersionedRecord<IFlatSport> = sportsSelector(state);
  const sports = Object.values(sportsMap);
  const categoriesMap = categoriesSelector(state);
  const categories = Object.values(categoriesMap);
  const tournamentsMap: TVersionedRecord<IFlatTournament> = tournamentsSelector(state);
  const tournaments = Object.values(tournamentsMap);

  return matches.reduce<TIdsToSetActive>(
    (acc, { sportSlug, categorySlug, tournamentSlugs }) => {
      const sport = sports.find(({ id }) => id === sportCodeToIdMap[getNotNil(sportSlug as ESportCode, ["SportMenuSelector"], "sportSlug")]);

      if (isNil(sport)) {
        return acc;
      }

      const category = categories.find(
        ({ slug, sportId }) => slug === categorySlug && sportId === sport.id,
      );

      if (isNil(category)) {
        return acc;
      }

      tournaments.forEach(({ slug, categoryId, id }) => {
        if (categoryId !== category.id) {
          return;
        }

        const tournamentSlug = getNotNil(tournamentSlugs, ["SportMenuSelector"], "tournamentSlugs")
          .split(",");

        if (!tournamentSlug.find((it) => unfakeOutrightTournamentSlug(it) === slug)) {
          return;
        }

        tournamentSlug.forEach((it) => {
          const tournamentId: string = maybeFakeOutrightTournamentIdBySlug(it, id);
          acc.tournamentIds.push(tournamentId);
        });
      });

      acc.sportIds.push(sport.id);

      acc.categoryIds.push(category.id);

      return acc;
    },
    { sportIds: [], categoryIds: [], tournamentIds: [] },
  );
};

export {
  eventPeriodSelector,
  sortingByABCSelector,
  sortedPreLiveSportIdListSelector,
  sortedPreLiveCategoryIdListBySportIdSelector,
  sortedPreLiveTournamentIdListByCategoryIdSelector,
  sortedPreLiveOutrightIdListByCategoryIdSelector,
  sortedVirtualSportIdListSelector,
  virtualFirstCategoryBySportIdSelector,
  sportMenuActiveSelector,
  sportMenuIdsToSetActiveSelector,
  sportMenuActiveCategoryIdsSelector,
  sportMenuActiveSportIdsSelector,
  sportMenuDisabledSelector,
};
