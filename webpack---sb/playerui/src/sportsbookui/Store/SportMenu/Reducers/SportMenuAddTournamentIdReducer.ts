import { type TReducer } from "@sb/utils";
import { type IWithSportMenuState } from "../SportMenuState";
import { type sportMenuAddTournamentIdAction, type sportMenuReplaceTournamentIdsAction } from "../SportMenuActions";

const sportMenuAddTournamentIdReducer: TReducer<IWithSportMenuState, typeof sportMenuAddTournamentIdAction> = (
  state,
  { payload: { id } },
) => ({
  ...state,
  sportMenu: {
    ...state.sportMenu,
    active: {
      ...state.sportMenu.active,
      tournamentIds: [...state.sportMenu.active.tournamentIds, id],
    },
  },
});

const sportMenuReplaceTournamentIdsReducer: TReducer<IWithSportMenuState, typeof sportMenuReplaceTournamentIdsAction> = (
  state,
  { payload: { tournamentIds } },
) => ({
  ...state,
  sportMenu: {
    ...state.sportMenu,
    active: {
      ...state.sportMenu.active,
      tournamentIds,
    },
  },
});

export { sportMenuAddTournamentIdReducer, sportMenuReplaceTournamentIdsReducer };
