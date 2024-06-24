import { type TReducer } from "@sb/utils";
import { type IWithSportMenuState } from "../SportMenuState";
import { type sportMenuAddSportIdAction } from "../SportMenuActions";

const sportMenuAddSportIdReducer: TReducer<IWithSportMenuState, typeof sportMenuAddSportIdAction> = (state, { payload: { id } }) => ({
  ...state,
  sportMenu: {
    ...state.sportMenu,
    active: {
      ...state.sportMenu.active,
      sportIds: [...state.sportMenu.active.sportIds, id],
    },
  },
});

export { sportMenuAddSportIdReducer };
