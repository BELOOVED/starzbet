// @ts-nocheck
import { getNotNil, type TReducer } from "@sb/utils";
import { type TAppState } from "../../InitialState";
import { type betSlipSetFreeBetAction, type betSlipSetUseBonusBalanceAction } from "../BetSlipActions";
import { changeBet } from "../Utils/ChangeBet";

const betSlipSetFreeBetReducer: TReducer<TAppState, typeof betSlipSetFreeBetAction> = (
  state,
  {
    payload: {
      outcomeId,
      isFreeBetChecked,
      hash,
    },
  },
) => {
  const baseBetSlip = {
    ...state.betSlip,
    useFreeBetCheckedMap: {
      ...state.betSlip.useFreeBetCheckedMap,
      [outcomeId]: isFreeBetChecked,
    },
  };

  if (!hash) {
    return { ...state, betSlip: baseBetSlip };
  }

  const notNilBet = getNotNil(state.betSlip.bets[hash], ["betSlipSetFreeBetReducer"], `Bet by hash ${hash}`);

  return ({
    ...state,
    betSlip: {
      ...baseBetSlip,
      bets: {
        ...state.betSlip.bets,
        [hash]: changeBet(hash, notNilBet, outcomeId, false),
      },
      betsPerGroup: {
        ...state.betSlip.betsPerGroup,
        [state.betSlip.group]: changeBet(hash, notNilBet, outcomeId, false),
      },
    },
  });
};

const betSlipSetFreeBetParlayReducer = (state, { payload: { isFreeBetChecked } }) => ({
  ...state,
  betSlip: {
    ...state.betSlip,
    useFreeBetForParlayChecked: isFreeBetChecked,
    useBonusBalanceForParlayChecked: false,
  },
});

const betSlipSetUseBonusBalanceReducer: TReducer<TAppState, typeof betSlipSetUseBonusBalanceAction> = (
  state,
  {
    payload: {
      useBonusBalance,
      outcomeId,
      hash,
    },
  },
) => {
  const baseBetSlip = {
    ...state.betSlip,
    useBonusBalanceCheckedMap: {
      ...state.betSlip.useBonusBalanceCheckedMap,
      [outcomeId]: useBonusBalance,
    },
  };

  if (!hash) {
    return { ...state, betSlip: baseBetSlip };
  }

  const notNilBet = getNotNil(state.betSlip.bets[hash], ["betSlipSetUseBonusBalanceReducer"], `Bet by hash ${hash}`);

  return {
    ...state,
    betSlip: {
      ...baseBetSlip,
      bets: {
        ...state.betSlip.bets,
        [hash]: changeBet(hash, notNilBet, outcomeId, false),
      },
      betsPerGroup: {
        ...state.betSlip.betsPerGroup,
        [state.betSlip.group]: changeBet(hash, notNilBet, outcomeId, false),
      },
    },

  };
};

const betSlipSetUseBonusBalanceParlayReducer = (state, { payload: { useBonusBalance } }) => ({
  ...state,
  betSlip: {
    ...state.betSlip,
    useBonusBalanceForParlayChecked: useBonusBalance,
    useFreeBetForParlayChecked: false,
  },
});

export {
  betSlipSetFreeBetReducer,
  betSlipSetFreeBetParlayReducer,
  betSlipSetUseBonusBalanceReducer,
  betSlipSetUseBonusBalanceParlayReducer,
};
