import { createNotNilSelector, createSimpleSelector, getNotNil, isNotNil, Money } from "@sb/utils";
import { findPlayerMoneyInBag } from "../../../Utils/PlayerMoneyBag";
import { type TPlatformAppState } from "../../PlatformInitialState";
import {
  vipClubPlayerStateLifeTimeDepositOrZeroSelector,
  vipClubPlayerStatePointsFromLastLevelUpSelector,
} from "./VipClubPlayerStateSelectors";
import { vipClubPlayerLevelRuleLifeTimeDepositSelector, vipClubPlayerLevelRuleRequiredPointsSelector } from "./VipClubLevelRulesSelectors";

const calcPercent = (currentAmount: number, maxAmount: number) => Math.min(((currentAmount / maxAmount) * 100), 100);

const vipClubPointsProgressPercentSelector = (state: TPlatformAppState) => {
  const requiredPoints = vipClubPlayerLevelRuleRequiredPointsSelector(state);

  if (!requiredPoints) {
    return null;
  }

  const playerPoints = vipClubPlayerStatePointsFromLastLevelUpSelector(state);

  const playerPointsNum = playerPoints ? Number(playerPoints) : 0;

  const requiredPointsNum = Number(requiredPoints);

  return calcPercent(playerPointsNum, requiredPointsNum);
};

const vipClubPointsProgressPercentNotNilSelector = createNotNilSelector(
  vipClubPointsProgressPercentSelector,
  ["vipClubPointsProgressPercentSelector"],
  "progress",
);

const vipClubPointsProgressVisibleSelector = createSimpleSelector(
  [vipClubPlayerLevelRuleRequiredPointsSelector],
  isNotNil,
);

const vipClubPointsProgressSelector = (state: TPlatformAppState) => {
  const requiredPoints = getNotNil(
    vipClubPlayerLevelRuleRequiredPointsSelector(state),
    ["vipClubPointsProgressSelector"],
    "requiredPoints",
  );

  const playerPoints = vipClubPlayerStatePointsFromLastLevelUpSelector(state);

  const playerPointsNum = playerPoints ? Number(playerPoints) : 0;

  const requiredPointsNum = Number(requiredPoints);

  const progressPercent = calcPercent(playerPointsNum, requiredPointsNum);

  return {
    progressPercent,
    currentAmount: playerPointsNum,
    maxAmount: requiredPointsNum,
  };
};

const vipClubLifetimeDepositsProgressSelector = (state: TPlatformAppState) => {
  const requiredLifeTimeDeposit = vipClubPlayerLevelRuleLifeTimeDepositSelector(state);

  if (!requiredLifeTimeDeposit) {
    return null;
  }

  const playerLifeTimeDeposit = vipClubPlayerStateLifeTimeDepositOrZeroSelector(state);

  const requiredLifeTimeDepositMoney = findPlayerMoneyInBag(requiredLifeTimeDeposit, playerLifeTimeDeposit.currency);

  if (Money.lessThanOrEqual(requiredLifeTimeDepositMoney, Money.getZero(playerLifeTimeDeposit.currency))) {
    return null;
  }

  const progressPercent = Math.min(Money.percent(requiredLifeTimeDepositMoney, playerLifeTimeDeposit), 100);

  return {
    currentAmount: Number(Money.toUnit(playerLifeTimeDeposit)),
    progressPercent,
    maxAmount: Number(Money.toUnit(requiredLifeTimeDepositMoney)),
    currency: playerLifeTimeDeposit.currency,
  };
};

export {
  vipClubLifetimeDepositsProgressSelector,
  vipClubPointsProgressSelector,
  vipClubPointsProgressPercentSelector,
  vipClubPointsProgressVisibleSelector,
  vipClubPointsProgressPercentNotNilSelector,
};
