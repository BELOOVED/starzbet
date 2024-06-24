import { type TReducer } from "@sb/utils";
import { type IWithSportMenuState } from "../SportMenuState";
import { type sportMenuRemoveTournamentIdAction } from "../SportMenuActions";

const sportMenuRemoveTournamentIdReducer: TReducer<IWithSportMenuState, typeof sportMenuRemoveTournamentIdAction> = (
  state,
  { payload: { id } },
) => ({
  ...state,
  sportMenu: {
    ...state.sportMenu,
    active: {
      ...state.sportMenu.active,
      tournamentIds: state.sportMenu.active.tournamentIds.filter(
        (tournamentId) => tournamentId !== id,
      ),
    },
  },
});

export { sportMenuRemoveTournamentIdReducer };
