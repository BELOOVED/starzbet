// @ts-nocheck
import { Money } from "@sb/utils";
import { playerCurrencySelector } from "../../../../common/Store/Player/Selectors/PlayerCurrencySelector";
import { singleHash } from "../Model/BetHash";
import { EBetGroup } from "../Model/BetGroup";
import { betSlipRemoveAllPickHandler } from "./Handlers/BetSlipRemoveAllPickHandler";

const betSlipCompletePlaceBetReducer = (state, { payload: { keep } }) => {
  const nextState = {
    ...state,
    betSlip: {
      ...state.betSlip,
      placing: false,
      complete: true,
      limit: null,
    },
  };

  const bet = nextState.betSlip.bets[singleHash] && Object.keys(nextState.betSlip.bets[singleHash]).reduce(
    (acc, id) => ({
      ...acc,
      [id]: {
        money: Money.getZero(playerCurrencySelector(nextState)),
        input: null,
        applyBoost: true,
      },
    }),
    {},
  );

  return keep && bet
    ? {
      ...nextState,
      betSlip: {
        ...nextState.betSlip,
        bets: {
          [singleHash]: bet,
        },
        betsPerGroup: {
          ...state.betSlip.betsPerGroup,
          [EBetGroup.single]: bet,
        },
        multipleSingle: {
          stake: {
            money: null,
            input: null,
          },
        },
      },
    }
    : betSlipRemoveAllPickHandler(nextState);
};

export { betSlipCompletePlaceBetReducer };
