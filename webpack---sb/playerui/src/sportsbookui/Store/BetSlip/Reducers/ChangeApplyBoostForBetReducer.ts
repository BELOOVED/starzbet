// @ts-nocheck
import { changeBet } from "../Utils/ChangeBet";

const changeApplyBoostForBetReducer = (state, { payload: { path: [hash, outcomeId] } }) => ({
  ...state,
  betSlip: {
    ...state.betSlip,
    bets: {
      ...state.betSlip.bets,
      [hash]: changeBet(hash, state.betSlip.bets[hash], outcomeId),
    },
    useBonusBalanceCheckedMap: {
      ...state.betSlip.useBonusBalanceCheckedMap,
      [outcomeId]: false,
    },
    useFreeBetCheckedMap: {
      ...state.betSlip.useFreeBetCheckedMap,
      [outcomeId]: false,
    },
    betsPerGroup: {
      ...state.betSlip.betsPerGroup,
      [state.betSlip.group]: changeBet(hash, state.betSlip.bets[hash], outcomeId),
    },
  },
});

export { changeApplyBoostForBetReducer };
