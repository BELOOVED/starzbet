import { ESportPeriod } from "./Model/SportPeriod";

interface IWithSportMenuState {
  sportMenu: {
    eventPeriod: ESportPeriod;
    active: {
      sportIds: string[];
      categoryIds: string[];
      tournamentIds: string[];
    };
    sortingByABC: boolean;
    disabled: boolean;
  };
}

const sportMenuState: IWithSportMenuState = {
  sportMenu: {
    eventPeriod: ESportPeriod.ALL,
    active: {
      sportIds: [],
      categoryIds: [],
      tournamentIds: [],
    },
    sortingByABC: false,
    disabled: false,
  },
};

export { sportMenuState, type IWithSportMenuState };
