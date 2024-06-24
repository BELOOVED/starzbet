// @ts-nocheck
import { betSlipState } from "../../BetSlipState";
import { EBetGroup } from "../../Model/BetGroup";

const betSlipRemoveAllPickHandler = (state) => ({
  ...state,
  betSlip: {
    ...state.betSlip,
    group: EBetGroup.single,
    picks: betSlipState.betSlip.picks,
    bets: betSlipState.betSlip.bets,
    betsPerGroup: betSlipState.betSlip.betsPerGroup,
    multipleSingle: betSlipState.betSlip.multipleSingle,
    limit: betSlipState.betSlip.limit,
    raceCastPick: {},
    useFreeBetCheckedMap: {},
    useBonusBalanceCheckedMap: {},
    useFreeBetForParlayChecked: false,
    useBonusBalanceForParlayChecked: false,
  },
});

export { betSlipRemoveAllPickHandler };
