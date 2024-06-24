// @ts-nocheck
import { Money } from "@sb/utils";
import { betGroupSelector, betSlipLimitErrorSelector } from "../Selectors/BetSlipSelectors";
import { EBetGroup } from "../Model/BetGroup";
import { betLimitEnum } from "../Model/BetLimit";
import { currentBetHashViewSelector } from "../Selectors/ViewSelectors/BetSlipViewSelectors";
import { betSlipChangeMultipleSingleHandler } from "./Handlers/BetSlipChangeMultipleSingleHandler";
import { betSlipChangeBetHandler } from "./Handlers/BetSlipChangeBetHandler";

const moneyLimits = [
  betLimitEnum.MIN_PER_BET,
  betLimitEnum.MAX_PER_BET,
  betLimitEnum.MAX_BET_PER_EVENT,
  betLimitEnum.MAX_WIN_PER_BET,
  betLimitEnum.MAX_WIN_PER_EVENT,
  betLimitEnum.MAX_WIN_TOTAL,
];

const getStake = (error) => Money.toUnit(error.context.alert.validStake);

const isMoneyLimit = (error) => moneyLimits.includes(error.context.limit);

const recomputeForSingle = (state, error) => {
  if (isMoneyLimit(error)) {
    const stake = getStake(error);

    return betSlipChangeMultipleSingleHandler(stake, stake, state);
  }

  return state;
};

const recomputeForMulti = (state, error) => {
  if (isMoneyLimit(error)) {
    const stake = getStake(error);

    const hash = currentBetHashViewSelector(state);

    return betSlipChangeBetHandler(hash, stake, stake, void 0, state);
  }

  return state;
};

const fns = {
  [EBetGroup.single]: recomputeForSingle,
  [EBetGroup.multi]: recomputeForMulti,
  [EBetGroup.system]: recomputeForMulti,
};

const recomputeBets = (state, errors) => {
  const limitError = betSlipLimitErrorSelector(state);

  if (!limitError) {
    return state;
  }

  return fns[betGroupSelector(state)](state, errors[0]);
};

const betSlipRejectPlaceBetReducer = (state, { payload: { error } }) => recomputeBets(
  {
    ...state,
    betSlip: {
      ...state.betSlip,
      placing: false,
      complete: false,
      error,
    },
  },
  error,
);

export { betSlipRejectPlaceBetReducer };
