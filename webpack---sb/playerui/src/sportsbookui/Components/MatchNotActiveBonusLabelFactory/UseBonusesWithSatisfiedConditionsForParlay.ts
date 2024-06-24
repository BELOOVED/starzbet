import { useParamSelector } from "@sb/utils";
import {
  bonusesWithSatisfiedConditionsForParlaySelector,
} from "../../../platformui/Store/Bonuses/Selectors/BetSlip/FreeBetLabelSelectors";
import { useDateForBonusClaimTimeLimitation } from "./UseDateForBonusClaimTimeLimitation";

const useBonusesWithSatisfiedConditionsForParlay = () => {
  const [hours, minutes] = useDateForBonusClaimTimeLimitation();

  return useParamSelector(bonusesWithSatisfiedConditionsForParlaySelector, [hours, minutes]);
};

export { useBonusesWithSatisfiedConditionsForParlay };
