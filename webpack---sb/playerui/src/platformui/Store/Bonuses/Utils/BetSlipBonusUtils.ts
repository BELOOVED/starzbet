import type { TPlatform_PlayerBonus_Fragment } from "@sb/graphql-client/PlayerUI";
import { type ECurrencyCode, EMoneyFormat, type IMoney, Money } from "@sb/utils";
import { EBonusProductEnum, type TMoneyBag_Fragment } from "@sb/graphql-client";
import type { TTFuncParameters } from "@sb/translator";
import {
  sportsbookui_betSlip_error_maximumStakeYouCanPlace,
  sportsbookui_betSlip_error_minimumStakeYouCanPlace,
} from "@sb/translates/sportsbookui/CommonTKeys";
import { findSameMoneyInBag } from "../../../../common/Utils/FindSameMoneyInBag";
import { isFreeBetBonusSize, isSportsbookCriteria } from "./BonusTypeGuards";

// todo mb throw Errors
const getRange = (
  currency: ECurrencyCode,
  minBag: TMoneyBag_Fragment | null,
  maxBag: TMoneyBag_Fragment | null,
): [IMoney, IMoney | null] | undefined => {
  let min = Money.getZero(currency);
  let max = null; // no limit
  let error = false;

  if (minBag) {
    const minValue = findSameMoneyInBag(min, minBag);

    if (minValue) {
      if (Money.greaterThan(minValue, min)) {
        min = minValue;
      }
    } else {
      error = true;
    }
  }

  if (maxBag) {
    const maxValue = findSameMoneyInBag(min, maxBag);

    if (maxValue) {
      max = maxValue;
    } else {
      error = true;
    }
  }

  if (max && Money.lessThan(max, min)) {
    error = true;
  }

  if (error) {
    return undefined;
  }

  return [min, max];
};

const getAvailableFreeBetAmount = (
  activeFreeBetBonus: TPlatform_PlayerBonus_Fragment,
  currency: ECurrencyCode,
) => {
  const bonusSize = activeFreeBetBonus.bonusBonusSize;

  if (!isFreeBetBonusSize(bonusSize)) {
    throw new Error("[getAvailableFreeBetAmount] freeBetBonus should be provided");
  }

  const criteria = bonusSize.rule.productRules.find(
    ({ product }) => product === EBonusProductEnum.sports,
  )?.criteria;

  if (!criteria || !isSportsbookCriteria(criteria)) {
    throw new Error("[getAvailableFreeBetAmount] criteria should be for sport product");
  }

  return getRange(currency, criteria.minValue, criteria.maxValue);
};

const getAvailableBonusBetAmount = (
  activeBonusWithWagering: TPlatform_PlayerBonus_Fragment,
  currency: ECurrencyCode,
) => {
  const criteria = activeBonusWithWagering.bonusWagering?.productRules.find(
    ({ product }) => product === EBonusProductEnum.sports,
  )?.criteria;

  if (!criteria || !isSportsbookCriteria(criteria)) {
    throw new Error("[getAvailableBonusBetAmount] criteria for SPORT should exist");
  }

  return getRange(currency, criteria.minStakePerBet, criteria.maxStakePerBet);
};

/**
 * return void - limit not exceeded
 * number - exceeded
 */
const getAvailableFreeBetCountWhenExceedLimit = (
  activeFreeBetBonus: TPlatform_PlayerBonus_Fragment,
  notDisabledCheckedCount: number,
) => {
  const progress = activeFreeBetBonus.freeBetProductsProgress.find(
    (it) => it.product === EBonusProductEnum.sports,
  );

  if (!progress) {
    return void 0;
  }

  if (progress.maxCount === null) { // unlimited
    return void 0;
  }

  const availableFreeBetCount = progress.maxCount - progress.currentCount;

  return availableFreeBetCount < notDisabledCheckedCount
    ? availableFreeBetCount
    : undefined;
};

// max === null - unlimited (wallet balance is not checked)
const getErrorForRange = (stake: IMoney, min: IMoney, max: IMoney | null = null): TTFuncParameters | undefined => {
  // if (!min) { // throw Error ??
  //   return [sportsbookui_betSlip_error_doesNotMeetTheConditionsOfTheFreeBet];
  //   // return [sportsbookui_betSlip_error_doesNotMeetTheConditionsOfTheFreeBet];
  // }

  if (Money.lessThan(stake, min)) {
    return [
      sportsbookui_betSlip_error_minimumStakeYouCanPlace,
      { stake: Money.toFormat(min, EMoneyFormat.symbolLeft) },
    ];
  }

  if (max && Money.greaterThan(stake, max)) {
    return [
      sportsbookui_betSlip_error_maximumStakeYouCanPlace,
      { stake: Money.toFormat(max, EMoneyFormat.symbolLeft) },
    ];
  }

  return void 0;
};

export {
  getAvailableFreeBetAmount,
  getAvailableBonusBetAmount,
  getAvailableFreeBetCountWhenExceedLimit,
  getErrorForRange,
};
