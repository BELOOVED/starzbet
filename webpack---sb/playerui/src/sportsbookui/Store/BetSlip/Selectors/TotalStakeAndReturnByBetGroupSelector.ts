import { type TAppState } from "../../InitialState";
import { selectTotalOddsBoostForSingle, totalOddBoostForMultiViewSelector } from "../../OddsBoost/OddsBoostSelectors";
import { EBetGroup } from "../Model/BetGroup";
import {
  totalStakeForMultiViewSelector,
  totalStakeForSingleViewSelector,
  totalStakeForSystemViewSelector,
} from "./ViewSelectors/TotalStakeViewSelector";
import {
  totalPayoutForMultiViewSelector,
  totalPayoutForSingleViewSelector,
  totalPayoutForSystemViewSelector,
} from "./ViewSelectors/TotalPayoutViewSelector";
import { betGroupSelector } from "./BetSlipSelectors";

type TMoneyType = "totalStake" | "totalPayout" | "totalOddBoost";

const GROUP_TO_SELECTORS = {
  [EBetGroup.single]: {
    totalStake: totalStakeForSingleViewSelector,
    totalPayout: totalPayoutForSingleViewSelector,
    totalOddBoost: selectTotalOddsBoostForSingle,
  },
  [EBetGroup.multi]: {
    totalStake: totalStakeForMultiViewSelector,
    totalPayout: totalPayoutForMultiViewSelector,
    totalOddBoost: totalOddBoostForMultiViewSelector,
  },
  [EBetGroup.system]: {
    totalStake: totalStakeForSystemViewSelector,
    totalPayout: totalPayoutForSystemViewSelector,
    totalOddBoost: () => null,
  },
} satisfies Record<EBetGroup, unknown>;

const moneySelectorFactory = <T extends TMoneyType>(moneyType: T) =>
  (state: TAppState) => {
    const betGroup = betGroupSelector(state);

    return GROUP_TO_SELECTORS[betGroup][moneyType](state) as ReturnType<typeof GROUP_TO_SELECTORS[EBetGroup][T]>;
  };

const totalStakeOfBetGroupSelector = moneySelectorFactory("totalStake");
const totalPayoutOfBetGroupSelector = moneySelectorFactory("totalPayout");
const totalOddBoostOfBetGroupSelector = moneySelectorFactory("totalOddBoost");

export { totalStakeOfBetGroupSelector, totalPayoutOfBetGroupSelector, totalOddBoostOfBetGroupSelector };
