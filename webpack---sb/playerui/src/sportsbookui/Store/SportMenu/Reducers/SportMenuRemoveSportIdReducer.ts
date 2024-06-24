import { type TReducer } from "@sb/utils";
import { type IWithSportMenuState } from "../SportMenuState";
import { type sportMenuRemoveSportIdAction } from "../SportMenuActions";

const sportMenuRemoveSportIdReducer: TReducer<IWithSportMenuState, typeof sportMenuRemoveSportIdAction> = (
  state,
  { payload: { id } },
) => ({
  ...state,
  sportMenu: {
    ...state.sportMenu,
    active: {
      ...state.sportMenu.active,
      sportIds: state.sportMenu.active.sportIds.filter(
        (sportId) => sportId !== id,
      ),
    },
  },
});

export { sportMenuRemoveSportIdReducer };
