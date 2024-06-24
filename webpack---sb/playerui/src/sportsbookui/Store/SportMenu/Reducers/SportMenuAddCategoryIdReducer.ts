import { type TReducer } from "@sb/utils";
import { type IWithSportMenuState } from "../SportMenuState";
import { type sportMenuAddCategoryIdAction } from "../SportMenuActions";

const sportMenuAddCategoryIdReducer: TReducer<IWithSportMenuState, typeof sportMenuAddCategoryIdAction> = (
  state,
  { payload: { id } },
) => ({
  ...state,
  sportMenu: {
    ...state.sportMenu,
    active: {
      ...state.sportMenu.active,
      categoryIds: [...state.sportMenu.active.categoryIds, id],
    },
  },
});

export { sportMenuAddCategoryIdReducer };
