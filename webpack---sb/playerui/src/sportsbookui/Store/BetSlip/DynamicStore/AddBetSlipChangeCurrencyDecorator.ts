// @ts-nocheck
import { distinctUntilChanged, type DynamicStore } from "@sb/dynamic-store";
import { playerCurrencySelector } from "../../../../common/Store/Player/Selectors/PlayerCurrencySelector";
import { type IWithPlayerState } from "../../../../common/Store/Player/InitialState/PlayerInitialState";
import { type IWithBetSlipState } from "../BetSlipState";

const changeMultipleSingle = (multipleSingle, currency) => {
  if (!multipleSingle.stake.money) {
    return multipleSingle;
  }

  return {
    ...multipleSingle,
    stake: {
      ...multipleSingle.stake,
      money: {
        ...multipleSingle.stake.money,
        currency,
      },
    },
  };
};

const changeMoney = (money, currency) => {
  if (!money) {
    return money;
  }

  return { ...money, currency };
};

const changeOutcomes = (outcomes, currency) => Object.entries(outcomes).reduce(
  (acc, [hash, value]) => ({
    ...acc,
    [hash]: {
      ...value,
      money: changeMoney(value.money, currency),
    },
  }),
  outcomes,
);

const changeBets = (bets, currency) => {
  if (Object.keys(bets).length === 0) {
    return bets;
  }

  return Object.entries(bets).reduce(
    (acc, [hash, value]) => ({
      ...acc,
      [hash]: value.money
        ? { ...value, money: changeMoney(value.money, currency) }
        : changeOutcomes(value, currency),
    }),
    bets,
  );
};

const addBetSlipChangeCurrencyDecorator = (dynamicStore: DynamicStore<IWithPlayerState & IWithBetSlipState>) => {
  dynamicStore.addDecorator(
    dynamicStore.createDecorator(
      playerCurrencySelector,
      (state) => {
        const currency = playerCurrencySelector(state);

        return {
          ...state,
          betSlip: {
            ...state.betSlip,
            bets: changeBets(state.betSlip.bets, currency),
            betsPerGroup: changeBets(state.betSlip.betsPerGroup, currency),
            multipleSingle: changeMultipleSingle(state.betSlip.multipleSingle, currency),
          },
        };
      },
      distinctUntilChanged(),
    ),
  );
};

export { addBetSlipChangeCurrencyDecorator };
