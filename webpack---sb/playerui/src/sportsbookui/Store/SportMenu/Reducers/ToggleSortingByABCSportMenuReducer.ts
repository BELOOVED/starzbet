import { sortingByABCSelector } from "../Selectors/SportMenuSelectors";
import { type IWithSportMenuState } from "../SportMenuState";

const toggleSortingByABCSportMenuReducer = (state: IWithSportMenuState) => ({
  ...state,
  sportMenu: {
    ...state.sportMenu,
    sortingByABC: !sortingByABCSelector(state),
  },
});

export { toggleSortingByABCSportMenuReducer };
