import { type TReducer } from "@sb/utils";
import { type IWithSportMenuState } from "../SportMenuState";
import { type sportMenuRemoveCategoryIdAction } from "../SportMenuActions";

const sportMenuRemoveCategoryIdReducer: TReducer<IWithSportMenuState, typeof sportMenuRemoveCategoryIdAction> = (
  state,
  { payload: { id } },
) => ({
  ...state,
  sportMenu: {
    ...state.sportMenu,
    active: {
      ...state.sportMenu.active,
      categoryIds: state.sportMenu.active.categoryIds.filter(
        (categoryId) => categoryId !== id,
      ),
    },
  },
});

export { sportMenuRemoveCategoryIdReducer };
