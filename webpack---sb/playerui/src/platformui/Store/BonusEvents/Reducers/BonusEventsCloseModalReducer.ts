import { type TReducer } from "@sb/utils";
import { type IWithBonusEvents } from "../BonusEventsInitialState";
import { type bonusEventsModalClosedAction } from "../BonusEventsActions";

const bonusEventsCloseModalReducer: TReducer<IWithBonusEvents, typeof bonusEventsModalClosedAction> = (
  state,
  { payload: { eventType } },
) => ({
  ...state,
  bonusEvent: {
    ...state.bonusEvent,
    [eventType]: null,
  },
});

export { bonusEventsCloseModalReducer };
