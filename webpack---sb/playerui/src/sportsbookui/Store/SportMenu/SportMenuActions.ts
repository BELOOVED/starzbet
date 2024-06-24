import { type ESportPeriod } from "./Model/SportPeriod";

const sportMenuEventPeriodAction = (eventPeriod: ESportPeriod) => ({
  type: "@SPORT_MENU/CHANGE_EVENT_PERIOD",
  payload: { eventPeriod },
});

const sportMenuRemoveAllActiveIdAction = () => ({
  type: "@SPORT_MENU/REMOVE_ALL_ACTIVE_ID",
});

const sportMenuSetActiveIdsAction = (
  sportIds: string[],
  categoryIds: string[],
  tournamentIds: string[],
) => ({
  type: "@SPORT_MENU/SET_ACTIVE_IDS",
  payload: { sportIds, categoryIds, tournamentIds },
});

const sportMenuAddSportIdAction = (id: string) => ({
  type: "@SPORT_MENU/ADD_SPORT_ID",
  payload: { id },
});

const sportMenuAddOneSportIdAction = (id: string) => ({
  type: "@SPORT_MENU/ADD_ONE_SPORT_ID",
  payload: { id },
});

const sportMenuRemoveSportIdAction = (id: string) => ({
  type: "@SPORT_MENU/REMOVE_SPORT_ID",
  payload: { id },
});

const sportMenuAddCategoryIdAction = (id: string) => ({
  type: "@SPORT_MENU/ADD_CATEGORY_ID",
  payload: { id },
});

const sportMenuRemoveAllCategoryAction = () => ({
  type: "@SPORT_MENU/REMOVE_ALL_CATEGORY",
});

const sportMenuRemoveAllTournamentAction = () => ({
  type: "@SPORT_MENU/REMOVE_ALL_TOURNAMENT",
});

const sportMenuRemoveCategoryIdAction = (id: string) => ({
  type: "@SPORT_MENU/REMOVE_CATEGORY_ID",
  payload: { id },
});

const sportMenuAddTournamentIdAction = (id: string) => ({
  type: "@SPORT_MENU/ADD_TOURNAMENT_ID",
  payload: { id },
});

const sportMenuReplaceTournamentIdsAction = (tournamentIds: string[]) => ({
  type: "@SPORT_MENU/REPLACE_TOURNAMENT_IDS",
  payload: { tournamentIds },
});

const sportMenuRemoveTournamentIdAction = (id: string) => ({
  type: "@SPORT_MENU/REMOVE_TOURNAMENT_ID",
  payload: { id },
});

const sportMenuRemoveAllTournamentIdAction = () => ({
  type: "@SPORT_MENU/REMOVE_ALL_TOURNAMENT_ID",
});

const toggleSortingByABCSportMenuAction = () => ({
  type: "@SPORT_MENU/TOGGLE_SORTING_BY_ABC",
});

const setDisabledSportMenuAction = (disabled: boolean) => ({
  type: "@SPORT_MENU/SET_DISABLED",
  payload: { disabled },
});

export {
  sportMenuEventPeriodAction,
  sportMenuRemoveAllActiveIdAction,
  sportMenuSetActiveIdsAction,
  sportMenuAddSportIdAction,
  sportMenuAddOneSportIdAction,
  sportMenuRemoveSportIdAction,
  sportMenuAddCategoryIdAction,
  sportMenuRemoveCategoryIdAction,
  sportMenuAddTournamentIdAction,
  sportMenuReplaceTournamentIdsAction,
  sportMenuRemoveTournamentIdAction,
  sportMenuRemoveAllTournamentAction,
  sportMenuRemoveAllTournamentIdAction,
  toggleSortingByABCSportMenuAction,
  sportMenuRemoveAllCategoryAction,
  setDisabledSportMenuAction,
};
