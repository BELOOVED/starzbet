import { getNotNil, type TReducer } from "@sb/utils";
import { type playerBonusesFetchedAction } from "../../Bonuses/BonusesActions";
import { isPlayerBonusOnWageringStage } from "../../Bonuses/Utils/CommonBonusUtils";
import { type IWithBonusEvents } from "../BonusEventsInitialState";

const bonusReceivedReducer: TReducer<IWithBonusEvents, typeof playerBonusesFetchedAction> = (
  state,
  { payload: { playerBonuses } },
) => {
  const bonusOnWageringStage = playerBonuses.find(isPlayerBonusOnWageringStage);

  return ({
    ...state,
    bonusEvent: {
      ...state.bonusEvent,
      wageringProgress: bonusOnWageringStage
        ? {
          current: getNotNil(bonusOnWageringStage.currentWagering?.system, ["playGamePlayerBonusesReceivedReducer"], "currentWagering"),
          total: getNotNil(bonusOnWageringStage.totalWagering?.system, ["playGamePlayerBonusesReceivedReducer"], "totalWagering"),
        }
        : null,
    },
  });
};

export { bonusReceivedReducer };
