import flow from "lodash/fp/flow";
import { createMemoSelector, createSimpleSelector, getNotNil, Money, notNil, withParams } from "@sb/utils";
import { EBonusProductEnum, EPlatform_BonusTypeEnum } from "@sb/graphql-client";
import type { TPlatform_PlayerBonus_Fragment } from "@sb/graphql-client/PlayerUI";
import { notOutrightOutcomeSelector } from "../../../../../sportsbookui/Store/Feed/Selectors/FeedSelectors";
import {
  hasOutrightPickSelector,
  hasVirtualGamePickSelector,
} from "../../../../../sportsbookui/Store/BetSlip/Selectors/BetSlipSelectors";
import { playerCurrencySelector } from "../../../../../common/Store/Player/Selectors/PlayerCurrencySelector";
import { findSameMoneyInBag } from "../../../../../common/Utils/FindSameMoneyInBag";
import { isFreeBetBonusSize } from "../../Utils/BonusTypeGuards";
import { isPlayerBonusOnWageringStage } from "../../Utils/CommonBonusUtils";
import {
  bonusesWithWageringWithSportsSelector,
  filterPlayerBonusesByInProgressStatus,
  freeBetBonusesWithSportsSelector,
  platformBonusesSelectors,
  platformIsFreeBetPossibleSelector,
} from "../BonusesSelectors";

const and = (a: boolean, b: boolean) => a && b;

const filterPlayerBonusesByType = (bonuses: TPlatform_PlayerBonus_Fragment[], type: EPlatform_BonusTypeEnum) =>
  bonuses.filter((bonus) => bonus.bonusType === type);

const playerBonusesByTypeSelector = createMemoSelector(
  [platformBonusesSelectors.playerBonuses, <S>(_: S, type: EPlatform_BonusTypeEnum) => type],
  filterPlayerBonusesByType,
);

const firstDepositBonusesSelector = createMemoSelector(
  [withParams(playerBonusesByTypeSelector, EPlatform_BonusTypeEnum.firstDeposit)],
  flow(
    filterPlayerBonusesByInProgressStatus,
    bonusesWithWageringWithSportsSelector,
  ),
);

const customBonusesSelector = createMemoSelector(
  [withParams(playerBonusesByTypeSelector, EPlatform_BonusTypeEnum.custom)],
  flow(
    filterPlayerBonusesByInProgressStatus,
    bonusesWithWageringWithSportsSelector,
  ),
);

const internalFreeBetBonusesSelector = createMemoSelector(
  [withParams(playerBonusesByTypeSelector, EPlatform_BonusTypeEnum.internalFreeBet)],
  flow(
    filterPlayerBonusesByInProgressStatus,
    freeBetBonusesWithSportsSelector,
  ),
);

const externalFreeBetBonusesSelector = createMemoSelector(
  [withParams(playerBonusesByTypeSelector, EPlatform_BonusTypeEnum.externalFreeBet)],
  flow(
    filterPlayerBonusesByInProgressStatus,
    freeBetBonusesWithSportsSelector,
  ),
);

const internalFreeSpinsWithWageringBonusesForSpinsSelector = createMemoSelector(
  [withParams(playerBonusesByTypeSelector, EPlatform_BonusTypeEnum.internalFreeSpinsWithWagering)],
  flow(
    filterPlayerBonusesByInProgressStatus,
    freeBetBonusesWithSportsSelector,
  ),
);

const externalFreeSpinsWithWageringBonusesForSpinsSelector = createMemoSelector(
  [withParams(playerBonusesByTypeSelector, EPlatform_BonusTypeEnum.externalFreeSpinsWithWagering)],
  flow(
    filterPlayerBonusesByInProgressStatus,
    freeBetBonusesWithSportsSelector,
  ),
);

const internalFreeSpinsWithWageringBonusesForWagerSelector = createMemoSelector(
  [withParams(playerBonusesByTypeSelector, EPlatform_BonusTypeEnum.internalFreeSpinsWithWagering)],
  flow(
    filterPlayerBonusesByInProgressStatus,
    bonusesWithWageringWithSportsSelector,
  ),
);

const externalFreeSpinsWithWageringBonusesForWagerSelector = createMemoSelector(
  [withParams(playerBonusesByTypeSelector, EPlatform_BonusTypeEnum.externalFreeSpinsWithWagering)],
  flow(
    filterPlayerBonusesByInProgressStatus,
    bonusesWithWageringWithSportsSelector,
  ),
);

const activeFreeBetBonusNullableSelector = createSimpleSelector(
  [
    internalFreeBetBonusesSelector,
    externalFreeBetBonusesSelector,
    internalFreeSpinsWithWageringBonusesForSpinsSelector,
    externalFreeSpinsWithWageringBonusesForSpinsSelector,
  ],
  ([internalFreeBet], [externalFreeBet], [internalFreeSpinsWithWagering], [externalFreeSpinsWithWagering]) => {
    const freeBetBonus = internalFreeBet || externalFreeBet;

    if (notNil(freeBetBonus)) {
      return freeBetBonus;
    }

    const freeSpinsWithWageringBonus = internalFreeSpinsWithWagering || externalFreeSpinsWithWagering;

    if (notNil(freeSpinsWithWageringBonus) && !isPlayerBonusOnWageringStage(freeSpinsWithWageringBonus)) {
      return freeSpinsWithWageringBonus;
    }

    return null;
  },
);

const activeFreeBetBonusSelector = createSimpleSelector(
  [activeFreeBetBonusNullableSelector],
  (bonus) => getNotNil(bonus, ["activeFreeBetBonusSelector"], "bonus"),
);

const activeBonusWithWageringNullableSelector = createSimpleSelector(
  [
    customBonusesSelector,
    firstDepositBonusesSelector,
    internalFreeSpinsWithWageringBonusesForWagerSelector,
    externalFreeSpinsWithWageringBonusesForWagerSelector,
  ],
  ([customBonuses], [firstDepositBonuses], [internalFreeSpinsWithWagering], [externalFreeSpinsWithWagering]) => {
    const bonusWithWagering = customBonuses || firstDepositBonuses;

    if (notNil(bonusWithWagering)) {
      return bonusWithWagering;
    }

    const freeSpinsWithWageringBonus = internalFreeSpinsWithWagering || externalFreeSpinsWithWagering;

    if (notNil(freeSpinsWithWageringBonus) && isPlayerBonusOnWageringStage(freeSpinsWithWageringBonus)) {
      return freeSpinsWithWageringBonus;
    }

    return null;
  },
);

const activeBonusWithWageringSelector = createSimpleSelector(
  [activeBonusWithWageringNullableSelector],
  (bonus) => getNotNil(bonus, ["activeBonusWithWageringSelector"], "bonus"),
);

const isFreeBetCheckboxVisibleSelector = createSimpleSelector(
  [platformIsFreeBetPossibleSelector, notOutrightOutcomeSelector],
  and,
);

const isBonusCheckboxVisibleForParlaySelector = createSimpleSelector(
  [activeBonusWithWageringNullableSelector, hasVirtualGamePickSelector, hasOutrightPickSelector],
  (activeBonusWithWagering, hasVirtualGamePick, hasOutrightPick) => !!activeBonusWithWagering && !hasVirtualGamePick && !hasOutrightPick,
);

const isBonusCheckboxVisibleSelector = createSimpleSelector(
  [activeBonusWithWageringNullableSelector, hasVirtualGamePickSelector, notOutrightOutcomeSelector],
  (activeBonusWithWagering, hasVirtualGamePick, notOutright) => !!activeBonusWithWagering && !hasVirtualGamePick && notOutright,
);

// TODO implement in all themes (now only bahis & matador)
const activeFreeBetMaxWinAllowedSelector = createSimpleSelector(
  [
    activeFreeBetBonusNullableSelector,
    playerCurrencySelector,
  ],
  (activeBonus, playerCurrency) => {
    if (!activeBonus) {
      return undefined;
    }

    const bonusSize = activeBonus.bonusBonusSize;

    if (!isFreeBetBonusSize(bonusSize)) {
      throw new Error("[activeFreeBetMaxWinAllowedSelector] freeBetBonus should be provided");
    }

    const criteria = bonusSize.rule.productRules.find(({ product }) => product === EBonusProductEnum.sports)?.criteria;

    if (!criteria || !criteria.maxWinAllowed) {
      return undefined;
    }

    return findSameMoneyInBag(Money.getZero(playerCurrency), criteria.maxWinAllowed);
  },
);

export {
  activeBonusWithWageringSelector,
  activeBonusWithWageringNullableSelector,
  activeFreeBetBonusSelector,
  activeFreeBetBonusNullableSelector,
  isFreeBetCheckboxVisibleSelector,
  isBonusCheckboxVisibleSelector,
  isBonusCheckboxVisibleForParlaySelector,
  activeFreeBetMaxWinAllowedSelector,
};
