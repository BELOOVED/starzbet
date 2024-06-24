import { type IWithSportMenuState } from "../SportMenuState";

const sportMenuRemoveAllTournamentIdReducer = (state: IWithSportMenuState) => ({
  ...state,
  sportMenu: {
    ...state.sportMenu,
    active: {
      ...state.sportMenu.active,
      tournamentIds: [],
    },
  },
});

export { sportMenuRemoveAllTournamentIdReducer };
