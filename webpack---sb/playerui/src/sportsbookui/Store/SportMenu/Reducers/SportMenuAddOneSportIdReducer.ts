import { type TReducer } from "@sb/utils";
import { type IWithSportMenuState } from "../SportMenuState";
import { type sportMenuAddOneSportIdAction } from "../SportMenuActions";

const sportMenuAddOneSportIdReducer: TReducer<IWithSportMenuState, typeof sportMenuAddOneSportIdAction> = (state, { payload: { id } }) => ({
  ...state,
  sportMenu: {
    ...state.sportMenu,
    active: {
      ...state.sportMenu.active,
      sportIds: [id],
    },
  },
});

export { sportMenuAddOneSportIdReducer };
