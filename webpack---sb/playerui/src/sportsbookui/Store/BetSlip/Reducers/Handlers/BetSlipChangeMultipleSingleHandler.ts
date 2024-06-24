// @ts-nocheck
import { Money } from "@sb/utils";
import { playerCurrencySelector } from "../../../../../common/Store/Player/Selectors/PlayerCurrencySelector";
import { singleHash } from "../../Model/BetHash";
import { EBetGroup } from "../../Model/BetGroup";

const betSlipChangeMultipleSingleHandler = (stake, input, state) => {
  const currency = playerCurrencySelector(state);

  const money = Money.parseOrZero(stake, currency);

  const stakes = state.betSlip.picks.reduce(
    (acc, { outcomeId }) => ({
      ...acc,
      [outcomeId]: {
        money,
        input,
        applyBoost: state.betSlip.bets[singleHash][outcomeId]?.applyBoost ?? false,
      },
    }),
    {},
  );

  return {
    ...state,
    betSlip: {
      ...state.betSlip,
      bets: {
        ...state.betSlip.bets,
        [singleHash]: stakes,
      },
      betsPerGroup: {
        ...state.betSlip.betsPerGroup,
        [EBetGroup.single]: stakes,
      },
      multipleSingle: {
        ...state.betSlip.multipleSingle,
        stake: {
          money,
          input,
        },
      },
    },
  };
};

export { betSlipChangeMultipleSingleHandler };
