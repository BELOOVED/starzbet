import { type TReducer } from "@sb/utils";
import { type IWithSportMenuState } from "../SportMenuState";
import { type sportMenuEventPeriodAction } from "../SportMenuActions";

const sportMenuEventPeriodReducer: TReducer<IWithSportMenuState, typeof sportMenuEventPeriodAction> = (
  state,
  { payload: { eventPeriod } },
) => ({ ...state, sportMenu: { ...state.sportMenu, eventPeriod } });

export { sportMenuEventPeriodReducer };
