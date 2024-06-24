// @ts-nocheck
import { Money } from "@sb/utils";
import { playerCurrencySelector } from "../../../../../common/Store/Player/Selectors/PlayerCurrencySelector";
import { isSingleHash } from "../../Model/BetHash";
import { betSlipState } from "../../BetSlipState";

const getApplyBoost = (prevBet, hash, outcomeId) => {
  if (!prevBet) {
    return true;
  }

  if (isSingleHash(hash)) {
    return !!prevBet[outcomeId]?.applyBoost;
  }

  return prevBet.applyBoost || true;
};

const createBet = (hash, prevBet, outcomeId, stake, input, state) => {
  const currency = playerCurrencySelector(state);

  const money = Money.parseOrZero(stake, currency);

  const bet = {
    money,
    input,
    applyBoost: getApplyBoost(prevBet, hash, outcomeId),
  };

  if (isSingleHash(hash)) {
    return {
      ...state.betSlip.bets[hash],
      [outcomeId]: bet,
    };
  }

  return bet;
};

const betSlipChangeBetHandler = (hash, stake, input, outcomeId, state) => ({
  ...state,
  betSlip: {
    ...state.betSlip,
    bets: {
      ...state.betSlip.bets,
      [hash]: createBet(hash, state.betSlip.bets[hash], outcomeId, stake, input, state),
    },
    betsPerGroup: {
      ...state.betSlip.betsPerGroup,
      [state.betSlip.group]: createBet(hash, state.betSlip.bets[hash], outcomeId, stake, input, state),
    },
    multipleSingle:
      isSingleHash(hash)
        ? betSlipState.betSlip.multipleSingle
        : state.betSlip.multipleSingle,
  },
});

export { betSlipChangeBetHandler };
