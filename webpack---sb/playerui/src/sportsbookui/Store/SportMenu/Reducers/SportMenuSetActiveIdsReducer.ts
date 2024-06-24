import { type TReducer } from "@sb/utils";
import { type IWithSportMenuState } from "../SportMenuState";
import { type sportMenuSetActiveIdsAction } from "../SportMenuActions";

const sportMenuSetActiveIdsReducer: TReducer<IWithSportMenuState, typeof sportMenuSetActiveIdsAction> = (
  state,
  { payload: { sportIds, categoryIds, tournamentIds } },
) => ({
  ...state,
  sportMenu: {
    ...state.sportMenu,
    active: {
      sportIds,
      categoryIds,
      tournamentIds,
    },
  },
});

export { sportMenuSetActiveIdsReducer };
