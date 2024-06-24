import { getNotNil, Money } from "@sb/utils";
import { cashOutStateByIdSelector, notNilCashOutForBetByIdSelector } from "../../CashOut/CashOutSelectors";
import { type TAppState } from "../../InitialState";
import type { IStatusState, IWithCashOutState } from "../../CashOut/CashOutState";
import { type IWithMyBetsState } from "../MyBetsState";
import { betByIdSelector } from "./MyBetsSelectors";

const minMoneyUnit = 0.01;

const minAutoCashOutReachesSelector = (state: TAppState, betId: string) => {
  const bet = betByIdSelector(betId)(state);

  if (bet?.autoCashOut?.limit) {
    return bet.autoCashOut.limit;
  }

  const cashOut = notNilCashOutForBetByIdSelector(state, betId);

  const totalStake = getNotNil(bet?.totalStake, ["minAutoCashOutReachesSelector"], "totalStake");

  return Money.add(Money.max(cashOut, totalStake), Money.parseAny(minMoneyUnit, totalStake.currency));
};

const maxAutoCashOutReachesSelector = (state: IWithMyBetsState, betId: string) => {
  const bet = betByIdSelector(betId)(state);

  const potentialPayout = getNotNil(bet?.totalPotentialPayout, ["maxAutoCashOutReachesSelector"], "potentialPayout");

  return Money.subtract(potentialPayout, Money.parseAny(minMoneyUnit, potentialPayout.currency));
};

const minPartialAutoCashOutSelector = (state: TAppState, betId: string) => {
  const bet = betByIdSelector(betId)(state);

  const autoCashOut = bet?.autoCashOut?.cashOut;

  if (autoCashOut) {
    return autoCashOut;
  }

  return Money.parseAny(minMoneyUnit, getNotNil(bet?.totalStake.currency, ["minPartialAutoCashOutSelector"], "Currency"));
};

const maxPartialAutoCashOutSelector = (state: IWithCashOutState, betId: string) => {
  const cashOut = notNilCashOutForBetByIdSelector(state, betId);

  return Money.subtract(cashOut, Money.parseAny(minMoneyUnit, cashOut.currency));
};

const getStateProp = (state: IStatusState | undefined, stateProp: keyof IStatusState) => state && state[stateProp];

const lastErrorCashOutSelector = (state: IWithCashOutState, betId: string) => getStateProp(
  cashOutStateByIdSelector(state, betId),
  "lastError",
);

const successCashOutSelector = (state: IWithCashOutState, betId: string) => !!getStateProp(
  cashOutStateByIdSelector(state, betId),
  "success",
);

const inProgressCashOutSelector = (state: IWithCashOutState, betId: string) => !!getStateProp(
  cashOutStateByIdSelector(state, betId),
  "inProgress",
);

const hiddenEditCashOutByBetIdSelector = (state: IWithCashOutState, betId: string) => {
  const cashOut = notNilCashOutForBetByIdSelector(state, betId);

  return inProgressCashOutSelector(state, betId) ||
    successCashOutSelector(state, betId) ||
    lastErrorCashOutSelector(state, betId) ||
    Money.lessThanOrEqual(cashOut, Money.parseAny(minMoneyUnit, cashOut.currency));
};

const partialCashOutByPercentSelector = (state: IWithCashOutState, betId: string, percent: number) => {
  const cashOut = notNilCashOutForBetByIdSelector(state, betId);

  return Money.multiply(cashOut, Math.max(minMoneyUnit / Money.toNumber(cashOut), percent / 100));
};

export {
  minAutoCashOutReachesSelector,
  maxAutoCashOutReachesSelector,
  minPartialAutoCashOutSelector,
  maxPartialAutoCashOutSelector,
  hiddenEditCashOutByBetIdSelector,
  inProgressCashOutSelector,
  successCashOutSelector,
  lastErrorCashOutSelector,
  partialCashOutByPercentSelector,
};
