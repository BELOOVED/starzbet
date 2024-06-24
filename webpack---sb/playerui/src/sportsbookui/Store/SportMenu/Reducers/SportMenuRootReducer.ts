import { createRootReducer, simpleReducer } from "@sb/utils";
import {
  setDisabledSportMenuAction,
  sportMenuAddCategoryIdAction,
  sportMenuAddOneSportIdAction,
  sportMenuAddSportIdAction,
  sportMenuAddTournamentIdAction,
  sportMenuEventPeriodAction,
  sportMenuRemoveAllActiveIdAction,
  sportMenuRemoveAllCategoryAction,
  sportMenuRemoveAllTournamentAction,
  sportMenuRemoveAllTournamentIdAction,
  sportMenuRemoveCategoryIdAction,
  sportMenuRemoveSportIdAction,
  sportMenuRemoveTournamentIdAction,
  sportMenuReplaceTournamentIdsAction,
  sportMenuSetActiveIdsAction,
  toggleSortingByABCSportMenuAction,
} from "../SportMenuActions";
import { sportMenuEventPeriodReducer } from "./SportMenuEventPeriodReducer";
import { sportMenuRemoveAllActiveIdReducer } from "./SportMenuRemoveAllActiveIdReducer";
import { sportMenuAddSportIdReducer } from "./SportMenuAddSportIdReducer";
import { sportMenuRemoveSportIdReducer } from "./SportMenuRemoveSportIdReducer";
import { sportMenuAddCategoryIdReducer } from "./SportMenuAddCategoryIdReducer";
import { sportMenuRemoveCategoryIdReducer } from "./SportMenuRemoveCategoryIdReducer";
import { sportMenuAddTournamentIdReducer, sportMenuReplaceTournamentIdsReducer } from "./SportMenuAddTournamentIdReducer";
import { sportMenuRemoveTournamentIdReducer } from "./SportMenuRemoveTournamentIdReducer";
import { sportMenuSetActiveIdsReducer } from "./SportMenuSetActiveIdsReducer";
import { sportMenuRemoveAllTournamentIdReducer } from "./sportMenuRemoveAllTournamentIdReducer";
import { toggleSortingByABCSportMenuReducer } from "./ToggleSortingByABCSportMenuReducer";
import { sportMenuAddOneSportIdReducer } from "./SportMenuAddOneSportIdReducer";
import { sportMenuRemoveAllCategoryReducer } from "./SportMenuRemoveAllCategoryReducer";
import { sportMenuRemoveAllTournamentReducer } from "./SpotrMenuRemoveAllTournamentReducer";

const setDisabledSportMenuReducer = simpleReducer(["disabled"], ["sportMenu", "disabled"]);

const sportMenuRootReducer = createRootReducer([
  [sportMenuEventPeriodReducer, sportMenuEventPeriodAction],
  [sportMenuRemoveAllActiveIdReducer, sportMenuRemoveAllActiveIdAction],
  [sportMenuAddSportIdReducer, sportMenuAddSportIdAction],
  [sportMenuAddOneSportIdReducer, sportMenuAddOneSportIdAction],
  [sportMenuRemoveSportIdReducer, sportMenuRemoveSportIdAction],
  [sportMenuAddCategoryIdReducer, sportMenuAddCategoryIdAction],
  [sportMenuRemoveCategoryIdReducer, sportMenuRemoveCategoryIdAction],
  [sportMenuRemoveAllCategoryReducer, sportMenuRemoveAllCategoryAction],
  [sportMenuAddTournamentIdReducer, sportMenuAddTournamentIdAction],
  [sportMenuReplaceTournamentIdsReducer, sportMenuReplaceTournamentIdsAction],
  [sportMenuRemoveTournamentIdReducer, sportMenuRemoveTournamentIdAction],
  [sportMenuRemoveAllTournamentReducer, sportMenuRemoveAllTournamentAction],
  [sportMenuSetActiveIdsReducer, sportMenuSetActiveIdsAction],
  [sportMenuRemoveAllTournamentIdReducer, sportMenuRemoveAllTournamentIdAction],
  [toggleSortingByABCSportMenuReducer, toggleSortingByABCSportMenuAction],
  [setDisabledSportMenuReducer, setDisabledSportMenuAction],
]);

export { sportMenuRootReducer };
