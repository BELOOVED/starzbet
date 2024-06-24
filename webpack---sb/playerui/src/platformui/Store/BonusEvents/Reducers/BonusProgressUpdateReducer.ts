import { getNotNil, type TReducer } from "@sb/utils";
import { type playerBonusProgressHasBeenUpdatedAction } from "../../Bonuses/BonusesActions";
import { type IWithBonusEvents } from "../BonusEventsInitialState";

const bonusProgressUpdateReducer: TReducer<IWithBonusEvents, typeof playerBonusProgressHasBeenUpdatedAction> = (
  state,
  { payload: { eventPayload } },
) => {
  if (!state.bonusEvent.wageringProgress) {
    return state;
  }

  return ({
    ...state,
    bonusEvent: {
      ...state.bonusEvent,
      wageringProgress: {
        current: eventPayload.currentWager.sum,
        total: getNotNil(state.bonusEvent.wageringProgress.total, ["playerBonusProgressHasBeenUpdatedReducer"], "total"),
      },
    },
  });
};

export { bonusProgressUpdateReducer };
