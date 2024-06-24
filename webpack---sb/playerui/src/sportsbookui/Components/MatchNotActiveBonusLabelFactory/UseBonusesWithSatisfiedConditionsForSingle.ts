import { useParamSelector } from "@sb/utils";
import {
  bonusesWithSatisfiedConditionsForSingleSelector,
} from "../../../platformui/Store/Bonuses/Selectors/BetSlip/FreeBetLabelSelectors";
import { useDateForBonusClaimTimeLimitation } from "./UseDateForBonusClaimTimeLimitation";

const useBonusesWithSatisfiedConditionsForSingle = (outcomeId: string) => {
  const [hours, minutes] = useDateForBonusClaimTimeLimitation();

  return useParamSelector(bonusesWithSatisfiedConditionsForSingleSelector, [outcomeId, hours, minutes]);
};

export { useBonusesWithSatisfiedConditionsForSingle };
