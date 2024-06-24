import { type IWithSportMenuState } from "../SportMenuState";

const sportMenuRemoveAllTournamentReducer = (state: IWithSportMenuState) => ({
  ...state,
  sportMenu: {
    ...state.sportMenu,
    active: {
      ...state.sportMenu.active,
      tournamentIds: [],
    },
  },
});

export { sportMenuRemoveAllTournamentReducer };
