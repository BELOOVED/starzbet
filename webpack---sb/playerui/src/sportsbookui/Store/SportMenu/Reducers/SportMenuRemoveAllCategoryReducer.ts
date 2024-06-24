import { type IWithSportMenuState } from "../SportMenuState";

const sportMenuRemoveAllCategoryReducer = (state: IWithSportMenuState) => ({
  ...state,
  sportMenu: {
    ...state.sportMenu,
    active: {
      ...state.sportMenu.active,
      categoryIds: [],
    },
  },
});

export { sportMenuRemoveAllCategoryReducer };
