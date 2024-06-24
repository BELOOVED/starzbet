import { createMemoSelector, createSimpleSelector, getNotNil, type IMoney, isNil, isNotEmpty, Money } from "@sb/utils";
import { EPlatform_BonusTypeEnum } from "@sb/graphql-client";
import { type IWithPlayerState } from "../../../../common/Store/Player/InitialState/PlayerInitialState";
import { playerWalletSelectors } from "../../../../common/Store/Player/Selectors/WalletSelectors";
import { findPlayerMoneyInBag } from "../../../Utils/PlayerMoneyBag";
import { type IWithPlatformBonusesState } from "../BonusesInitialState";
import { VIP_CLUB_BONUS_TAG_ID } from "../Model/BonusTags";
import { ECashbackFrontValidationError } from "../Model/Enums/ECashbackFrontValidationError";
import { assertCashbackBonusSize } from "../Utils/BonusTypeGuards";
import {
  activePlayerBonusesSelector,
  availableBonusesWithoutInvalidatedMatchResultsSelector,
  historyBonusByIdSelector,
  platformBonusesSelectors,
} from "./BonusesSelectors";

interface IWithNotVipClubBonus {
  notVipClubBonus?: boolean;
}

/**
 * priority:
 * 1. first available without vip club tag (if 'notVipClubBonus' provided)
 * 2. with set preferredCashbackBonusId in state
 * 3. first available
 */
const availableCashbackBonusSelector = createSimpleSelector(
  [
    availableBonusesWithoutInvalidatedMatchResultsSelector,
    platformBonusesSelectors.preferredCashbackBonusId,
    (_, notVipClubBonus?: boolean) => notVipClubBonus,
  ],
  (availableBonuses, preferredCashbackBonusId, notVipClubBonus = false) => {
    if (notVipClubBonus) {
      return availableBonuses
        .filter((it) => !it.bonusTagIds.includes(VIP_CLUB_BONUS_TAG_ID))
        .find((it) => it.bonusType === EPlatform_BonusTypeEnum.cashback);
    }

    if (preferredCashbackBonusId) {
      return availableBonuses.find(({ id }) => id === preferredCashbackBonusId);
    }

    return availableBonuses.find((it) => it.bonusType === EPlatform_BonusTypeEnum.cashback);
  },
);

const isCashbackBonusAvailableSelector = createSimpleSelector([availableCashbackBonusSelector], Boolean);

const historyBonusIsCashbackType = createSimpleSelector(
  [historyBonusByIdSelector],
  (historyBonus) => historyBonus?.bonusType === EPlatform_BonusTypeEnum.cashback,
);

/**
 * should be used just after 'isCashbackBonusAvailableSelector' returned 'true'
 */
const availableCashbackBonusIdSelector = (state: IWithPlatformBonusesState, notVipClubBonus = false) => {
  const bonus = availableCashbackBonusSelector(state, notVipClubBonus);

  return getNotNil(bonus, ["availableCashbackBonusIdSelector"], "bonus").id;
};

/**
 * validate cashbackSize on playerUI before call cashback calculation on backend
 * 1. mainBalance should be less than cashbackSize.maxPlayerBalance
 * 2. should be no active player bonuses
 */
const cashbackFrontValidationErrorSelector = (
  state: IWithPlatformBonusesState & IWithPlayerState,
  notVipClubBonus = false,
): { error: ECashbackFrontValidationError; options?: { money?: IMoney; }; } | null => {
  const bonus = getNotNil(availableCashbackBonusSelector(state, notVipClubBonus), ["cashbackFrontValidationErrorSelector"], "bonus");

  const cashbackSize = bonus.bonusSize;

  assertCashbackBonusSize(cashbackSize, "cashbackFrontValidationErrorSelector");

  const mainBalance = playerWalletSelectors.balance(state);

  const maxPlayerBalance = findPlayerMoneyInBag(cashbackSize.maxPlayerBalance, mainBalance.currency);

  if (isNil(maxPlayerBalance)) {
    throw new Error(`[cashbackFrontValidationErrorSelector] maxPlayerBalance should include player currency: '${mainBalance.currency}', maxPlayerBalance: ${JSON.stringify(maxPlayerBalance)}`);
  }

  if (Money.greaterThan(mainBalance, maxPlayerBalance)) {
    return ({ error: ECashbackFrontValidationError.balanceToHigh, options: { money: maxPlayerBalance } });
  }

  const activePlayerBonuses = activePlayerBonusesSelector(state);

  if (isNotEmpty(activePlayerBonuses)) {
    return ({ error: ECashbackFrontValidationError.hasActiveBonuses });
  }

  return null;
};

const availableBonusCashbackModalDataSelector = createMemoSelector(
  [availableCashbackBonusSelector],
  (availableBonus) => {
    const bonus = getNotNil(availableBonus, ["availableBonusCashbackModalDataSelector"], "availableBonus");

    return ({
      bonusId: bonus.id,
      descriptionTitle: bonus.descriptionTitle,
      bonusRules: bonus.descriptionBonusRules,
    });
  },
);

export {
  type IWithNotVipClubBonus,
  isCashbackBonusAvailableSelector,
  historyBonusIsCashbackType,
  availableCashbackBonusIdSelector,
  cashbackFrontValidationErrorSelector,
  availableBonusCashbackModalDataSelector,
};
