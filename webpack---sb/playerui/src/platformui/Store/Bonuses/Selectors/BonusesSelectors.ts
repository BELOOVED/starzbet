import {
  createMemoSelector,
  createPropertySelectors,
  createSimpleSelector,
  getNotNil,
  type IMoney,
  isEmpty,
  isNil,
  isNotEmpty,
  isNotNil,
  Money,
  notNil,
  sort,
  sortBy,
  type TSelector,
  withParams,
} from "@sb/utils";
import { EBonusProductEnum, EPlatform_BonusTypeEnum, EPlatform_PlayerBonusStatusEnum } from "@sb/graphql-client";
import type { TPlatform_Bonus_Fragment, TPlatform_PlayerBonus_Fragment } from "@sb/graphql-client/PlayerUI";
import { always } from "@sb/utils/Always";
import { routerLocationPathnameSelector } from "@sb/router";
import { EGamePage } from "@sb/betting-core/EGamePage";
import { hasVirtualGamePickSelector } from "../../../../sportsbookui/Store/BetSlip/Selectors/BetSlipSelectors";
import { type TAppState } from "../../../../sportsbookui/Store/InitialState";
import { Logger } from "../../../../common/Utils/Logger";
import { platformConfigSystemLocaleSelector } from "../../../../common/Store/Config/Selectors/ConfigSelectors";
import { type IWithPlayerState } from "../../../../common/Store/Player/InitialState/PlayerInitialState";
import { playerCurrencySelector } from "../../../../common/Store/Player/Selectors/PlayerCurrencySelector";
import { playerDetailsSelectors } from "../../../../common/Store/Player/Selectors/PlayerSelectors";
import { extractId, findById } from "../../../../common/Utils/IDUtils";
import { type TMixAppState } from "../../../../sportsbookui/Store/CreateMixInitialState";
import { findPlayerMoneyInBag } from "../../../Utils/PlayerMoneyBag";
import { localeSelector } from "../../Locale/Selectors/localeSelector";
import { isFreeSpinsEnabledForPageSelector } from "../../Games/Selectors/GamesSelectors";
import { getActiveBonusWallets } from "../Utils/GetActiveBonusWallets";
import {
  filterAvailableBonusesForOffers,
  filterPlayerBonusesForOffers,
  getBonusTabFromPathname,
  isFreeBetBonusSizeHaveSportRule,
  isFreeBetBonusType,
  isMixedBonusType,
  isPlayerBonusOnWageringStage,
  playerBonusSorterByStatus,
} from "../Utils/CommonBonusUtils";
import {
  emptyProductFilterOptions,
  filterBonusesByUIFilter,
  getProductsFilterOptions,
  playerBonusSortByFilter,
} from "../Utils/BonusesUISortFilterUtils";
import { EBonusTabs } from "../Model/Enums/EBonusTabs";
import { type IWithPlatformBonusesState } from "../BonusesInitialState";
import {
  assertCashbackBonusSize,
  assertFreeBetBonusSize,
  isBonus,
  isDepositRuleProgress,
  isEligibilityAggregateCriteria,
  isEligibilityDepositRule,
  isEligibilityProductRule,
  isExternalFreeBetCasinoCriteria,
  isExternalFreeBetSportsbookCriteria,
  isFixedFreeSpinsAmountStrategy,
  isFreeBetBonusSize,
  isMonetaryBonusSize,
  isPercentageBonusSize,
  isProductsRuleProgress,
} from "../Utils/BonusTypeGuards";
import { getEligibilityHelperButtonReducer, getHelperButtonFor } from "../Utils/BonusHelperButtonUtils";
import { getIsSatisfiedReducer } from "../Utils/BonusEligibilityUtils";
import { ERewardType } from "../Model/Enums/ERewardType";
import { ESimpleBonusType } from "../Model/Enums/ESimpleBonusType";

const platformBonusesSelector = <S extends IWithPlatformBonusesState>({ platformBonuses }: S) => platformBonuses;

const platformBonusesSelectors = createPropertySelectors(platformBonusesSelector);

const availableBonusesWithoutInvalidatedMatchResultsSelector = createMemoSelector(
  [platformBonusesSelectors.availableBonuses],
  (bonuses) => sortBy(
    ({ updatedAt }) => -Number(updatedAt),
    bonuses.filter(({ invalidatedMatchResults }) => invalidatedMatchResults.length === 0),
  ),
);

const availableBonusesForOffersPageSelector = createMemoSelector(
  [availableBonusesWithoutInvalidatedMatchResultsSelector],
  ((bonuses) => bonuses.filter(filterAvailableBonusesForOffers)),
);

const countAvailableBonusesForOffersPageSelector = createSimpleSelector(
  [availableBonusesForOffersPageSelector],
  ((bonuses) => bonuses.length),
);

const playerBonusesForOffersPageSelector = createMemoSelector(
  [platformBonusesSelectors.playerBonuses],
  ((bonuses) => bonuses.filter(filterPlayerBonusesForOffers)),
);

const playerBonusesForOffersSortedSelector = createMemoSelector(
  [playerBonusesForOffersPageSelector],
  ((bonuses) => sort(playerBonusSorterByStatus, bonuses)),
);

const isBonusClaimedEventReceivedSelector = createSimpleSelector([platformBonusesSelectors.bonusClaimedEvent], isNotNil);
const isBonusActivatedEventReceivedSelector = createSimpleSelector([platformBonusesSelectors.playerBonusActivatedEvent], isNotNil);
const isBonusCanceledEventReceivedSelector = createSimpleSelector([platformBonusesSelectors.playerBonusCanceledEvent], isNotNil);
const isBonusLostEventReceivedSelector = createSimpleSelector([platformBonusesSelectors.playerBonusLostEvent], isNotNil);
const isBonusWonEventReceivedSelector = createSimpleSelector([platformBonusesSelectors.playerBonusWonEvent], isNotNil);
const isBonusCompletedEventReceivedSelector = createSimpleSelector([platformBonusesSelectors.playerBonusCompletedEvent], isNotNil);

const bonusClaimedEventNotNilSelector = createSimpleSelector(
  [platformBonusesSelectors.bonusClaimedEvent],
  (event) => getNotNil(event, ["bonusClaimedEventNotNilSelector"], "event"),
);

const bonusActivatedEventNotNilSelector = createSimpleSelector(
  [platformBonusesSelectors.playerBonusActivatedEvent],
  (event) => getNotNil(event, ["bonusActivatedEventNotNilSelector"], "event"),
);

const activePlayerBonusesSelector = createMemoSelector(
  [platformBonusesSelectors.playerBonuses],
  (bonuses) => bonuses.filter((bonus) => bonus.status === EPlatform_PlayerBonusStatusEnum.inProgress),
);

const bonusForCMSByIdSelector = createSimpleSelector(
  [platformBonusesSelectors.bonusesForCMS, (_, id: string) => id],
  findById,
);

const bonusForCMSByNilIdSelector = (state: TMixAppState, id: string | null) => {
  if (id) {
    return bonusForCMSByIdSelector(state, id);
  }

  return undefined;
};

const availableBonusIdsForOffersFilteredSelector = createMemoSelector(
  [
    availableBonusesForOffersPageSelector,
    platformBonusesSelectors.bonusTypeCommonFilter,
    platformBonusesSelectors.bonusProductFilter,
  ],
  (bonuses, filterType, productFilter) => filterBonusesByUIFilter(bonuses, filterType, productFilter).map(extractId),
);

const playerBonusIdsForOffersFilteredSelector = createMemoSelector(
  [
    playerBonusesForOffersSortedSelector,
    platformBonusesSelectors.bonusTypeCommonFilter,
    platformBonusesSelectors.bonusProductFilter,
  ],
  (bonuses, filterType, productFilter) => filterBonusesByUIFilter(bonuses, filterType, productFilter).map(extractId),
);

const localesSelector = createMemoSelector(
  [localeSelector, platformConfigSystemLocaleSelector],
  (locale, systemLocale) => ({ locale, systemLocale }),
);

const playerHistoryBonusIdsFilteredSelector = createMemoSelector(
  [
    platformBonusesSelectors.historyBonuses,
    platformBonusesSelectors.bonusTypeCommonFilter,
    platformBonusesSelectors.bonusProductFilter,
    platformBonusesSelectors.sortBy,
    platformBonusesSelectors.showOnlyCompleted,
    localesSelector,
  ],
  (bonuses, filterType, productFilter, sortBy, showOnlyCompleted, { locale, systemLocale }) =>
    playerBonusSortByFilter(sortBy, locale, systemLocale)(filterBonusesByUIFilter(bonuses, filterType, productFilter, showOnlyCompleted))
      .map(extractId),
);

const bonusCountSelector = createMemoSelector(
  [
    availableBonusesForOffersPageSelector,
    playerBonusesForOffersPageSelector,
    platformBonusesSelectors.historyBonuses,
  ],
  (availableBonuses, playerBonuses, playerHistoryBonuses) => ({
    available: availableBonuses.length,
    playerBonuses: playerBonuses.length,
    history: playerHistoryBonuses.length,
  }),
);

const bonusProductFilterOptionsSelector = createMemoSelector(
  [
    routerLocationPathnameSelector,
    availableBonusesForOffersPageSelector,
    playerBonusesForOffersPageSelector,
    platformBonusesSelectors.historyBonuses,
  ],
  (pathname, availableBonuses, playerBonuses, playerHistoryBonuses) => {
    const bonusTab = getBonusTabFromPathname(pathname);

    switch (bonusTab) {
      case EBonusTabs.available: {
        return getProductsFilterOptions(availableBonuses);
      }
      case EBonusTabs.myBonuses: {
        return getProductsFilterOptions(playerBonuses);
      }
      case EBonusTabs.history: {
        return getProductsFilterOptions(playerHistoryBonuses);
      }
      default: {
        // todo^EI investigate after router update
        Logger.warn.selector("[bonusFilterOptionsSelector] was called not on bonuses routes");

        return emptyProductFilterOptions;
      }
    }
  },
);

const availableBonusByIdSelector = createSimpleSelector(
  [platformBonusesSelectors.availableBonuses, (_, id: string) => id],
  findById,
);

const availableBonusByIdNotNilSelector = (state: IWithPlatformBonusesState, bonusId: string) => {
  const availableBonus = availableBonusByIdSelector(state, bonusId);

  return getNotNil(availableBonus, ["availableBonusByIdNotNilSelector", `bonusId: ${bonusId}`], "availableBonus");
};

const availableBonusByIdNotNilSelectors = createPropertySelectors(availableBonusByIdNotNilSelector);

const playerBonusByIdSelector = createSimpleSelector([platformBonusesSelectors.playerBonuses, (_, id: string) => id], findById);

const playerBonusByIdNotNilSelector = (state: IWithPlatformBonusesState, playerBonusId: string) => {
  const playerBonus = playerBonusByIdSelector(state, playerBonusId);

  return getNotNil(playerBonus, ["playerBonusByIdNotNilSelector", `playerBonusId: ${playerBonusId}`], "playerBonus");
};

const playerBonusByIdNotNilSelectors = createPropertySelectors(playerBonusByIdNotNilSelector);

const historyBonusByIdSelector = createSimpleSelector(
  [platformBonusesSelectors.historyBonuses, (_, id: string) => id],
  findById,
);

const historyBonusByIdNotNilSelector = (state: IWithPlatformBonusesState, historyBonusId: string) => {
  const historyBonus = historyBonusByIdSelector(state, historyBonusId);

  return getNotNil(historyBonus, ["historyBonusByIdNotNilSelector", `historyBonusId: ${historyBonusId}`], "historyBonus");
};

const historyBonusByIdNotNilSelectors = createPropertySelectors(historyBonusByIdNotNilSelector);

const availableOrPlayerBonusByIdNotNilSelector = (
  state: IWithPlatformBonusesState,
  bonusId: string,
  forAvailable: boolean,
) => {
  const bonus = forAvailable
    ? availableBonusByIdSelector(state, bonusId)
    : playerBonusByIdSelector(state, bonusId);

  return getNotNil(bonus, ["availableOrPlayerBonusByIdNotNilSelector", `bonusId: ${bonusId}`], "bonus");
};

const playerOrHistoryBonusByIdNotNilSelector = (state: IWithPlatformBonusesState, playerBonusId: string) => {
  const bonus = playerBonusByIdSelector(state, playerBonusId) || historyBonusByIdSelector(state, playerBonusId);

  return getNotNil(bonus, ["playerOrHistoryBonusByIdNotNilSelector", `playerBonusId: ${playerBonusId}`], "playerBonus");
};

const playerOrHistoryBonusByIdNotNilSelectors = createPropertySelectors(playerOrHistoryBonusByIdNotNilSelector);

const notNilBonusSelector = (
  state: IWithPlatformBonusesState,
  bonusId: string,
  forAvailable: boolean,
): TPlatform_Bonus_Fragment | TPlatform_PlayerBonus_Fragment => {
  if (forAvailable) {
    return getNotNil(availableBonusByIdSelector(state, bonusId), ["notNilBonusSelector", `bonusId: ${bonusId}`], "availableBonus");
  }

  const bonus = playerBonusByIdSelector(state, bonusId) || historyBonusByIdSelector(state, bonusId);

  return getNotNil(bonus, ["notNilBonusSelector", `bonusId: ${bonusId}`], "bonus");
};

const bonusNameNullableSelector = (state: IWithPlatformBonusesState, bonusId: string, forAvailable: boolean) => {
  if (forAvailable) {
    return availableBonusByIdSelector(state, bonusId)?.name;
  }

  return playerBonusByIdSelector(state, bonusId)?.bonusName || historyBonusByIdSelector(state, bonusId)?.bonusName;
};

const notNilBonusSelectors = createPropertySelectors(notNilBonusSelector);

const isAvailableBonusExistSelector = createSimpleSelector([availableBonusByIdSelector], isNotNil);

const playerOrHistoryBonusTypeSelector = (state: IWithPlatformBonusesState, bonusId: string) =>
  playerOrHistoryBonusByIdNotNilSelector(state, bonusId).bonusType;

const isNotCashbackPlayerOrHistoryBonusSelector = (state: IWithPlatformBonusesState, bonusId: string) =>
  playerOrHistoryBonusTypeSelector(state, bonusId) !== EPlatform_BonusTypeEnum.cashback;

const playerBonusBonusBalanceToReachSelector = createSimpleSelector(
  [
    playerBonusByIdNotNilSelector,
    playerCurrencySelector,
  ],
  ({ bonusWagering }, playerCurrency) => isNotNil(bonusWagering?.minBonusBalance)
    ? findPlayerMoneyInBag(bonusWagering.minBonusBalance, playerCurrency)
    : null,
);

// todo split by separate selectors
const availableBonusInfoCommonSelector = createMemoSelector(
  [availableBonusByIdNotNilSelector],
  (bonus) => {
    const { eligibility: { claimRules }, eligibilityClaimRulesCompletionInfo } = bonus;

    const isAvailableForClaim = isNotNil(eligibilityClaimRulesCompletionInfo)
      ? eligibilityClaimRulesCompletionInfo.reduce(getIsSatisfiedReducer(claimRules), true)
      : isEmpty(claimRules);

    // first not completed criteria (for claim)
    const helperButtonFor = isNotEmpty(claimRules) && isNotNil(eligibilityClaimRulesCompletionInfo)
      ? eligibilityClaimRulesCompletionInfo.reduce(getEligibilityHelperButtonReducer(claimRules), null)
      : null;

    return {
      bonus,
      isAvailableForClaim,
      helperButtonFor,
    };
  },
);

const isPlayerOrHistoryBonusCurrentAndTotalWageringExistSelector = createSimpleSelector(
  [
    playerOrHistoryBonusByIdNotNilSelectors.currentWagering,
    playerOrHistoryBonusByIdNotNilSelectors.totalWagering,
  ],
  (a, b) => isNotNil(a) && isNotNil(b),
);

const termsCommonSelector = createMemoSelector(
  [notNilBonusSelector],
  (bonus) => ({
    bonusRules: isBonus(bonus) ? bonus.descriptionBonusRules : bonus.bonusDescriptionBonusRules,
    terms: isBonus(bonus) ? bonus.fullTermsAndConditions : bonus.bonus.fullTermsAndConditions,
    status: bonus.status,
    bonusType: bonus.bonusType,
    bonusName: isBonus(bonus) ? bonus.name : bonus.bonusName,
    claimRules: isBonus(bonus) ? bonus.eligibility.claimRules : bonus.eligibilityClaimRules,
    activateRules: isBonus(bonus) ? bonus.eligibility.activateRules : bonus.eligibilityActivateRules,
    expiryIn: isBonus(bonus) ? bonus.activityTime?.to : bonus.expiredAt,
  }),
);

/**
 * on themes before betwiz FreeSpinsWithWageringBonusType not supported
 */
const productRulesCommonSelector = createMemoSelector(
  [notNilBonusSelector],
  (bonus) => {
    const wageringProductsProgress = !isBonus(bonus) ? bonus.wageringProductsProgress : undefined;
    const freeBetProductsProgress = !isBonus(bonus) ? bonus.freeBetProductsProgress : undefined;

    const bonusSize = isBonus(bonus) ? bonus.bonusSize : bonus.bonusBonusSize;

    if (isFreeBetBonusType(bonus.bonusType)) {
      assertFreeBetBonusSize(bonusSize, "productRulesCommonSelector -> isFreeBetBonusType");

      const freeBetProductRules = bonusSize.rule.productRules;

      return {
        freeBet: { productRules: freeBetProductRules, progress: freeBetProductsProgress },
        wagering: null,
      };
    }

    if (isMixedBonusType(bonus.bonusType)) {
      assertFreeBetBonusSize(bonusSize, "productRulesCommonSelector -> isMixedBonusType");

      const freeBetProductRules = bonusSize.rule.productRules;

      if (!isBonus(bonus) && !isPlayerBonusOnWageringStage(bonus)) {
        return {
          freeBet: { productRules: freeBetProductRules, progress: freeBetProductsProgress },
          wagering: null,
        };
      }

      const wagering = isBonus(bonus) ? bonus.wagering : bonus.bonusWagering;

      if (isNil(wagering)) {
        return { wagering: null, freeBet: null };
      }

      const wageringProductRules = wagering.productRules;

      return {
        wagering: { productRules: wageringProductRules, progress: wageringProductsProgress },
        freeBet: null,
      };
    }

    const wagering = isBonus(bonus) ? bonus.wagering : bonus.bonusWagering;

    if (isNil(wagering)) {
      return { wagering: null, freeBet: null };
    }

    const wageringProductRules = wagering.productRules;

    return {
      wagering: { productRules: wageringProductRules, progress: wageringProductsProgress },
      freeBet: null,
    };
  },
);

// !! do not remove it, temp disabled
const wageringProductRemainingAmountSelector: TSelector<TAppState, IMoney | null, [playerBonusId: string, product: EBonusProductEnum]> =
  always(null);
// const wageringProductRemainingAmountSelector = createMemoSelector(
//   [
//     playerBonusByIdSelector,
//     (_, playerBonusId: string, product: EBonusProductEnum) => product,
//   ],
//   (playerBonus, product) => {
//     const { currentWagering, totalWagering, bonusWagering: { productRules } } = playerBonus;
//
//     // for freeSpinsWithWagering they will be empty unless freeSpins phase not be succeeded
//     if (isNil(currentWagering) || isNil(totalWagering)) {
//       return null;
//     }
//
//     const remaining = Money.subtract(totalWagering.external, currentWagering.external);
//
//     if (Money.isZero(remaining) || !Money.isPositive(remaining)) {
//       return Money.getZero(remaining.currency);
//     }
//
//     const contribution = productRules.find((rule) => rule.product === product).criteria.filters[0].contribution / 100;
//
//     return Money.divide(remaining, contribution);
//   },
// );

const wageringProductProgressSelector = createSimpleSelector(
  [
    playerBonusByIdNotNilSelector,
    (_, playerBonusId: string, product: EBonusProductEnum) => product,
  ],
  (bonus, product) => bonus.wageringProductsProgress.find((it) => it.product === product),
);

const filterPlayerBonusesByStatus = (bonuses: TPlatform_PlayerBonus_Fragment[], status: EPlatform_PlayerBonusStatusEnum) =>
  bonuses.filter((bonus) => bonus.status === status);

const filterPlayerBonusesByInProgressStatus = withParams(filterPlayerBonusesByStatus, EPlatform_PlayerBonusStatusEnum.inProgress);

const freeBetBonusesByProductSelector = (bonuses: TPlatform_PlayerBonus_Fragment[], product: EBonusProductEnum) =>
  bonuses.filter((bonus) => {
    const bonusSize = bonus.bonusBonusSize;

    if (!isFreeBetBonusSize(bonusSize)) {
      throw new Error("[freeBetBonusesByProductSelector] selector should be called only on bonuses with Platform_BonusFreeBetSize bonusSize type ");
    }

    return bonusSize.rule.productRules.some((rule) => rule.product === product);
  });

const freeBetBonusesWithSportsSelector = withParams(freeBetBonusesByProductSelector, EBonusProductEnum.sports);

const bonusesWithWageringByProductSelector = (bonuses: TPlatform_PlayerBonus_Fragment[], product: EBonusProductEnum) =>
  bonuses.filter((bonus) => bonus.bonusWagering?.productRules.some((rule) => rule.product === product) ?? false);

const bonusesWithWageringWithSportsSelector = withParams(bonusesWithWageringByProductSelector, EBonusProductEnum.sports);

/**
 * used for useFreeBet checkbox visibility in BetSlip and betSlipCreatePickReducer
 * actual just for bonuses with sport rule in bonusSize
 * for freeSpinsWithWagering - just on FreeBet stage
 * if picks contains pick on virtual sport - not possible
 */
const platformIsFreeBetPossibleSelector = createSimpleSelector(
  [
    hasVirtualGamePickSelector,
    activePlayerBonusesSelector,
    playerDetailsSelectors.freeBetWallet,
  ],
  (hasVirtualGamePick, activePlayerBonuses, freeBetWallet) => {
    if (hasVirtualGamePick || activePlayerBonuses.length === 0 || !freeBetWallet || Money.isZero(freeBetWallet.balance)) {
      return false;
    }

    const freeBetBonus = activePlayerBonuses.find(({ bonusType }) => isFreeBetBonusType(bonusType));

    if (notNil(freeBetBonus) && isFreeBetBonusSizeHaveSportRule(freeBetBonus.bonusBonusSize)) {
      return true;
    }

    const freeSpinsWithWageringBonus = activePlayerBonuses.find(({ bonusType }) => isMixedBonusType(bonusType));

    return notNil(freeSpinsWithWageringBonus) &&
      !isPlayerBonusOnWageringStage(freeSpinsWithWageringBonus) &&
      isFreeBetBonusSizeHaveSportRule(freeSpinsWithWageringBonus.bonusBonusSize);
  },
);

interface IWageringProgress {
  wagering?: {
    progress: number;
    current: IMoney;
    total: IMoney;
  };
  freebetAmount?: {
    progress: number;
    current: IMoney;
    total: IMoney;
  };
  freebetCount?: {
    progress: number;
    current: number;
    total: number;
  };
}

/**
 * should be used for already activated player bonuses (status === 'inProgress')
 */
const wageringProgressSelector = createMemoSelector(
  [
    playerBonusByIdNotNilSelector,
    playerDetailsSelectors.freeBetWallet,
  ],
  (playerBonus, freeBetWallet): IWageringProgress | null => {
    if (playerBonus.status !== EPlatform_PlayerBonusStatusEnum.inProgress) {
      throw new Error("[wageringProgressSelector] this selector should be used just for playerBonuses with 'inProgress' status");
    }

    const currentWagering = playerBonus.currentWagering;
    const totalWagering = playerBonus.totalWagering;
    const bonusSize = playerBonus.bonusBonusSize;

    switch (playerBonus.bonusType) {
      case EPlatform_BonusTypeEnum.cashback: {
        throw new Error("[wageringProgressSelector] wageringProgress not available for CASHBACK bonus");
      }
      case EPlatform_BonusTypeEnum.custom:
      case EPlatform_BonusTypeEnum.firstDeposit: {
        if (isNil(currentWagering) || isNil(totalWagering)) {
          throw new Error("[wageringProgressSelector] currentWagering and totalWagering should exists in PlayerBonus for 'custom' and 'firstDeposit' bonus types after activate");
        }

        const current = currentWagering.external;
        const total = totalWagering.external;

        const wageringProgress = Math.floor(Number(current.amount) / Number(total.amount) * 100);

        const progress = wageringProgress > 100
          ? 100
          : wageringProgress;

        return { wagering: { progress, current, total } };
      }
      case EPlatform_BonusTypeEnum.internalFreeBet: {
        if (isNil(freeBetWallet)) {
          return null;
        }

        if (isNil(playerBonus.bonusGiven)) {
          throw new Error("[wageringProgressSelector] bonusGiven should exists in PlayerBonus for 'internalFreeBet' bonus type after activate");
        }

        const current = freeBetWallet.balance;
        const total = playerBonus.bonusGiven.external;

        const progress = Math.floor(Number(current.amount) / Number(total.amount) * 100);

        return { freebetAmount: { progress, current, total } };
      }
      case EPlatform_BonusTypeEnum.externalFreeBet: {
        if (!isFreeBetBonusSize(bonusSize)) {
          throw new Error("[wageringProgressSelector] bonusBonusSize should exists in PlayerBonus for 'externalFreeBet' bonus type");
        }

        return bonusSize.rule.productRules.reduce<IWageringProgress | null>(
          (acc, { criteria }) => {
            if (isExternalFreeBetSportsbookCriteria(criteria)) {
              if (isNil(freeBetWallet)) {
                return null;
              }

              if (isNil(playerBonus.bonusGiven)) {
                throw new Error("[wageringProgressSelector] bonusGiven should exists in PlayerBonus for 'externalFreeBet' bonus type with sportsbook free bet rule after activate");
              }

              const current = freeBetWallet.balance;
              const total = playerBonus.bonusGiven.external;

              const freeBetProgress = Math.floor(Number(current.amount) / Number(total.amount) * 100);

              const progress = freeBetProgress > 100
                ? 100
                : freeBetProgress;

              return { ...acc, freebetAmount: { progress, current, total } };
            }

            if (isExternalFreeBetCasinoCriteria(criteria)) {
              const freeBetCasinoProgress = playerBonus.freeBetProductsProgress.find(({ product }) => product === EBonusProductEnum.casino);

              if (isNil(freeBetCasinoProgress)) {
                throw new Error("[wageringProgressSelector] freeBetCasinoProgress node should exists in PlayerBonus for 'externalFreeBet' bonus type with casino free bet rule after activate");
              }

              const current = freeBetCasinoProgress.currentCount;
              const total = freeBetCasinoProgress.maxCount;

              if (isNil(total)) {
                throw new Error("[wageringProgressSelector] freeBetCasinoProgress.maxCount should exists for 'externalFreeBet' bonus type with casino free bet rule after activate");
              }

              const freeBetProgress = Math.floor(current / total * 100);

              const progress = freeBetProgress > 100
                ? 100
                : freeBetProgress;

              return { ...acc, freebetCount: { progress, current, total } };
            }

            throw new Error("[wageringProgressSelector] bonusSize.rule.productRules can be only for sportsbook or casino");
          },
          {},
        );
      }
      case EPlatform_BonusTypeEnum.internalFreeSpinsWithWagering: {
        if (isNil(freeBetWallet)) {
          return null;
        }

        if (isNil(playerBonus.bonusGiven)) {
          throw new Error("[wageringProgressSelector] bonusGiven should exists in PlayerBonus for 'internalFreeSpinsWithWagering' bonus type after activate");
        }

        // calc for freeBet stage
        const currentFreeBet = freeBetWallet.balance;
        const totalFreeBet = playerBonus.bonusGiven.external;

        const progressFreeBet = Math.floor(Number(currentFreeBet.amount) / Number(totalFreeBet.amount) * 100);

        const freebetAmount = { progress: progressFreeBet, current: currentFreeBet, total: totalFreeBet };

        // if totalWagering | currentWagering is Nil - wagering stage not started
        if (isNil(currentWagering) || isNil(totalWagering)) {
          return { freebetAmount };
        }

        // calc for wagering stage
        const current = currentWagering.external;
        const total = totalWagering.external;

        const wageringProgressRaw = Math.floor(Number(current.amount) / Number(total.amount) * 100);

        const progress = wageringProgressRaw > 100
          ? 100
          : wageringProgressRaw;

        const wagering = { progress, current, total };

        return { wagering, freebetAmount };
      }
      case EPlatform_BonusTypeEnum.externalFreeSpinsWithWagering: {
        if (!isFreeBetBonusSize(bonusSize)) {
          throw new Error("[wageringProgressSelector] bonusBonusSize should exists in PlayerBonus for 'externalFreeSpinsWithWagering' bonus type");
        }

        // calc for freeBet stage
        const freeBetProgresses = bonusSize.rule.productRules.reduce<IWageringProgress | null>(
          (acc, { criteria }) => {
            if (isExternalFreeBetSportsbookCriteria(criteria)) {
              if (isNil(freeBetWallet)) {
                return null;
              }

              if (isNil(playerBonus.bonusGiven)) {
                throw new Error("[wageringProgressSelector] bonusGiven should exists in PlayerBonus for 'externalFreeBet' bonus type with sportsbook free bet rule after activate");
              }

              const current = freeBetWallet.balance;
              const total = playerBonus.bonusGiven.external;

              const freeBetProgress = Math.floor(Number(current.amount) / Number(total.amount) * 100);

              const progress = freeBetProgress > 100
                ? 100
                : freeBetProgress;

              return { ...acc, freebetAmount: { progress, current, total } };
            }

            if (isExternalFreeBetCasinoCriteria(criteria)) {
              const freeBetCasinoProgress = playerBonus.freeBetProductsProgress.find(({ product }) => product === EBonusProductEnum.casino);

              if (isNil(freeBetCasinoProgress)) {
                throw new Error("[wageringProgressSelector] freeBetCasinoProgress node should exists in PlayerBonus for 'externalFreeBet' bonus type with casino free bet rule after activate");
              }

              const current = freeBetCasinoProgress.currentCount;
              const total = freeBetCasinoProgress.maxCount;

              if (isNil(total)) {
                throw new Error("[wageringProgressSelector] freeBetCasinoProgress.maxCount should exists for 'externalFreeBet' bonus type with casino free bet rule after activate");
              }

              const freeBetProgress = Math.floor(current / total * 100);

              const progress = freeBetProgress > 100
                ? 100
                : freeBetProgress;

              return { ...acc, freebetCount: { progress, current, total } };
            }

            throw new Error("[wageringProgressSelector] bonusSize.rule.productRules can be only for sportsbook or casino");
          },
          {},
        );

        // if totalWagering | currentWagering is Nil - wagering stage not started
        if (isNil(currentWagering) || isNil(totalWagering)) {
          return freeBetProgresses;
        }

        // calc for wagering stage
        const current = currentWagering.external;
        const total = totalWagering.external;

        const wageringProgressRaw = Math.floor(Number(current.amount) / Number(total.amount) * 100);

        const progress = wageringProgressRaw > 100
          ? 100
          : wageringProgressRaw;

        const wagering = { progress, current, total };

        return { wagering, ...freeBetProgresses };
      }
      default: {
        throw new Error(`[wageringProgressSelector] unknown bonusType: ${JSON.stringify(playerBonus.bonusType)}`);
      }
    }
  },
);

const simpleProgressSelector = (state: IWithPlayerState & IWithPlatformBonusesState, playerBonusId: string) => {
  const playerBonus = playerBonusByIdNotNilSelector(state, playerBonusId);

  if (playerBonus.status !== EPlatform_PlayerBonusStatusEnum.inProgress) {
    return 0;
  }

  const wageringProgress = wageringProgressSelector(state, playerBonusId);

  if (isNil(wageringProgress)) {
    // todo rare exception - investigate it
    Logger.warn.selector("[simpleProgressSelector] wageringProgress is Nil");

    return 0;
  }

  const { wagering, freebetAmount, freebetCount } = wageringProgress;

  return wagering?.progress ?? freebetAmount?.progress ?? freebetCount?.progress ?? 0;
};

const historyWageringProgressSelector = createMemoSelector(
  [historyBonusByIdNotNilSelector],
  (historyBonus) => {
    const { currentWagering, totalWagering } = historyBonus;

    if (isNil(currentWagering) || isNil(totalWagering)) {
      return null;
    }

    const current = currentWagering.external;
    const total = totalWagering.external;

    const wageringProgressRaw = Math.floor(Number(current.amount) / Number(total.amount) * 100);

    const progress = wageringProgressRaw > 100
      ? 100
      : wageringProgressRaw;

    return { progress, current, total };
  },
);

const playerBonusHelperButtonForSelector = createMemoSelector(
  [
    playerBonusByIdNotNilSelector,
    withParams(isFreeSpinsEnabledForPageSelector, EGamePage.CASINO),
  ],
  // todo fix types (memo selector with diff parts of state)
  (playerBonus, isFreeSpinsEnabledForCasino) => getHelperButtonFor(playerBonus, isFreeSpinsEnabledForCasino),
  { expensive: true },
);

const playerBonusIsAvailableForActivateSelector = createSimpleSelector(
  [playerBonusByIdNotNilSelector],
  (playerBonus) => playerBonus.canBeActivated &&
    playerBonus.eligibilityActivationRulesCompletionInfo.reduce(getIsSatisfiedReducer(playerBonus.eligibilityActivateRules), true),
);

const playerBonusInfoCommonSelector = createMemoSelector(
  [
    playerBonusByIdNotNilSelector,
    simpleProgressSelector,
    playerBonusHelperButtonForSelector,
    playerBonusIsAvailableForActivateSelector,
  ],
  (playerBonus, progress, helperButtonFor, isAvailableForActivate) => ({
    bonus: playerBonus,
    isAvailableForActivate,
    helperButtonFor,
    products: playerBonus.bonus.products,
    progress,
  }),
);

const depositRuleCommonSelector = createMemoSelector(
  [availableOrPlayerBonusByIdNotNilSelector],
  (bonus) => {
    const depositRule = isBonus(bonus)
      ? bonus.eligibility.claimRules.find(isEligibilityDepositRule)
      : bonus.eligibilityActivateRules.find(isEligibilityDepositRule);

    const progressNode = isBonus(bonus)
      ? bonus.eligibilityClaimRulesCompletionInfo?.find(isDepositRuleProgress)
      : bonus.eligibilityActivationRulesCompletionInfo.find(isDepositRuleProgress);

    return ({
      depositRule,
      progressNode,
    });
  },
);

const eligibilityProductRuleSelector = createSimpleSelector(
  [availableOrPlayerBonusByIdNotNilSelector],
  (bonus) => isBonus(bonus)
    ? bonus.eligibility.claimRules.find(isEligibilityProductRule)
    : bonus.eligibilityActivateRules.find(isEligibilityProductRule),
);

const eligibilityProductRuleProgressSelector = createSimpleSelector(
  [availableOrPlayerBonusByIdNotNilSelector],
  (bonus) => isBonus(bonus)
    ? bonus.eligibilityClaimRulesCompletionInfo?.find(isProductsRuleProgress)
    : bonus.eligibilityActivationRulesCompletionInfo.find(isProductsRuleProgress),
);

const eligibilityProductRulesAggregateRulesIdsSelector = createMemoSelector(
  [eligibilityProductRuleSelector],
  (productRule) => productRule?.flatRules
    .rules
    .filter(({ value }) => value && isEligibilityAggregateCriteria(value))
    .map(({ ruleId }) => ruleId) ?? [],
);

const aggregateRuleCommonSelector = createMemoSelector(
  [
    eligibilityProductRuleSelector,
    eligibilityProductRuleProgressSelector,
    (_, bonusId: string, forAvailable: boolean, ruleId: string) => ruleId,
  ],
  (productRule, progress, ruleId) => {
    const criteria = productRule?.flatRules.rules.find((it) => it.ruleId === ruleId)?.value;
    const progressNode = progress?.productRulesProgress?.find((node) => node.ruleId === ruleId);

    if (!criteria || !isEligibilityAggregateCriteria(criteria)) {
      throw new Error("[aggregateRuleCommonSelector] criteria is not aggregate criteria");
    }

    return { criteria, progressNode };
  },
);

const aggregateRuleDependentRuleCommonSelector = createMemoSelector(
  [
    eligibilityProductRuleSelector,
    eligibilityProductRuleProgressSelector,
    (_, bonusId: string, forAvailable: boolean, ruleId: string) => ruleId,
  ],
  (productRule, progress, ruleId) => {
    const criteria = productRule?.flatRules.rules.find((it) => it.ruleId === ruleId)?.value;
    const progressNode = progress?.productRulesProgress?.find((node) => node.ruleId === ruleId);

    if (!criteria || isEligibilityAggregateCriteria(criteria)) {
      throw new Error("[aggregateRuleDependentRuleCommonSelector] criteria is aggregate criteria");
    }

    return { criteria, progressNode };
  },
);

const bonusRulesSelector = createSimpleSelector(
  [notNilBonusSelector],
  (bonus) => isBonus(bonus) ? bonus.descriptionBonusRules : bonus.bonusDescriptionBonusRules,
);

const bonusTermsSelector = createSimpleSelector(
  [notNilBonusSelector],
  (bonus) => isBonus(bonus) ? bonus.fullTermsAndConditions : bonus.bonus.fullTermsAndConditions,
);

const depositRuleNoteFromClaimRulesSelector = createSimpleSelector(
  [notNilBonusSelector],
  (bonus) => {
    const claimRules = isBonus(bonus) ? bonus.eligibility.claimRules : bonus.eligibilityClaimRules;

    return claimRules.find(isEligibilityDepositRule)?.note;
  },
);

const depositRuleNoteFromActivateRulesSelector = createSimpleSelector(
  [notNilBonusSelector],
  (bonus) => {
    const activateRules = isBonus(bonus) ? bonus.eligibility.activateRules : bonus.eligibilityActivateRules;

    return activateRules.find(isEligibilityDepositRule)?.note;
  },
);

const productRuleNoteFromClaimRulesSelector = createSimpleSelector(
  [notNilBonusSelector],
  (bonus) => isBonus(bonus)
    ? bonus.eligibility.claimRules.find(isEligibilityProductRule)?.note
    : bonus.eligibilityClaimRules.find(isEligibilityProductRule)?.note,
);

const productRuleNoteFromActivateRulesSelector = createSimpleSelector(
  [notNilBonusSelector],
  (bonus) => isBonus(bonus)
    ? bonus.eligibility.activateRules.find(isEligibilityProductRule)?.note
    : bonus.eligibilityActivateRules.find(isEligibilityProductRule)?.note,
);

const bonusRewardSelector = createMemoSelector(
  [
    playerCurrencySelector,
    notNilBonusSelector,
  ],
  (playerCurrency, bonus) => {
    const winSize = isBonus(bonus) ? bonus.winSize : bonus.bonusWinSize;
    const bonusSize = isBonus(bonus) ? bonus.bonusSize : bonus.bonusBonusSize;

    switch (bonus.bonusType) {
      case EPlatform_BonusTypeEnum.cashback: {
        assertCashbackBonusSize(bonusSize, "bonusRewardSelector");

        const cashbackTypeRate = bonusSize.cashbackTypeRate;

        if (cashbackTypeRate.__typename === "Platform_BonusCashbackSingleTypeRate") {
          const percentage = cashbackTypeRate.percentage;

          return { type: ERewardType.cashbackSingle, options: { percentage } };
        }

        if (cashbackTypeRate.__typename === "Platform_BonusCashbackTieredTypeRate") {
          const percentage = cashbackTypeRate.cashbackTiers.map(({ percentage }) => percentage).join(" / ");

          return { type: ERewardType.cashbackTiered, options: { percentage } };
        }

        throw new Error("[bonusRewardSelector] unknown cashbackTypeRate");
      }
      case EPlatform_BonusTypeEnum.custom:
      case EPlatform_BonusTypeEnum.firstDeposit:
      case EPlatform_BonusTypeEnum.internalFreeSpinsWithWagering:
      case EPlatform_BonusTypeEnum.externalFreeSpinsWithWagering: {
        if (isNil(winSize)) {
          throw new Error("[bonusRewardSelector] winSize can't be Nil for custom/firstDeposit/internal(external)FreeSpinsWithWagering");
        }

        if (isMonetaryBonusSize(winSize)) {
          const money = findPlayerMoneyInBag(winSize.money, playerCurrency);

          return { type: ERewardType.monetary, options: { money } };
        }

        if (isPercentageBonusSize(winSize)) {
          const percentage = winSize.percentage;

          // todo should we draw min/max ??
          return { type: ERewardType.percentage, options: { percentage } };
        }

        throw new Error(`[bonusRewardSelector] winSize can be only percentage or monetary for '${bonus.bonusType}' bonusType`);
      }
      case EPlatform_BonusTypeEnum.internalFreeBet: {
        if (!isFreeBetBonusSize(bonusSize)) {
          throw new Error("[bonusRewardSelector] bonusSize type can't be not freeBet for 'internalFreeBet' bonusType");
        }

        if (isNil(bonusSize.amount)) {
          // todo check schema, mb should be fixed there
          throw new Error("[bonusRewardSelector] bonusSize.amount can't be Nil for internalFreeBet");
        }

        if (isMonetaryBonusSize(bonusSize.amount)) {
          const money = findPlayerMoneyInBag(bonusSize.amount.money, playerCurrency);

          return { type: ERewardType.freeBetMonetary, options: { money } };
        }

        if (isPercentageBonusSize(bonusSize.amount)) {
          const percentage = bonusSize.amount.percentage;

          // todo should we draw min/max ??
          return { type: ERewardType.freeBetPercentage, options: { percentage } };
        }

        throw new Error("[bonusRewardSelector] bonusSize.amount can be only percentage or monetary for 'internalFreeBet' bonusType");
      }
      case EPlatform_BonusTypeEnum.externalFreeBet: {
        if (!isFreeBetBonusSize(bonusSize)) {
          throw new Error("[bonusRewardSelector] bonusSize type can't be not freeBet for 'externalFreeBet' bonusType");
        }

        return bonusSize.rule.productRules.map(({ criteria }) => {
          if (isExternalFreeBetSportsbookCriteria(criteria)) {
            if (isNil(bonusSize.amount)) {
              // todo check schema, mb should be fixed there
              throw new Error("[bonusRewardSelector] bonusSize.amount can't be Nil for externalFreeBet");
            }

            if (isMonetaryBonusSize(bonusSize.amount)) {
              const money = findPlayerMoneyInBag(bonusSize.amount.money, playerCurrency);

              return { type: ERewardType.freeBetMonetaryOnSport, options: { money } };
            }

            if (isPercentageBonusSize(bonusSize.amount)) {
              const percentage = bonusSize.amount.percentage;

              // todo should we draw min/max ??
              return { type: ERewardType.freeBetPercentageOnSport, options: { percentage } };
            }

            throw new Error("[bonusRewardSelector] bonusSize.amount can be only percentage or monetary for 'externalFreeBet' bonusType with sport rule");
          }

          if (isExternalFreeBetCasinoCriteria(criteria)) {
            const withFixedStrategy = criteria.externalFilters.filter((it) => isFixedFreeSpinsAmountStrategy(it.freeSpinsAmountStrategy));

            if (withFixedStrategy.length === 0) {
              return { type: ERewardType.freeSpinsDependsOnDeposit, options: {} };
            }

            const count = withFixedStrategy.reduce(
              (acc, filter) => {
                const strategy = filter.freeSpinsAmountStrategy;

                if (strategy.__typename !== "Platform_BonusFixedFreeSpinsAmountStrategy") {
                  throw new Error("[bonusRewardSelector] should be filtered in reduce");
                }
                const amount = strategy.amount;

                return amount === -1 ? acc + 1 : acc + amount;
              },
              0,
            );

            if (withFixedStrategy.length === criteria.externalFilters.length) {
              return { type: ERewardType.freeBetSpinsCount, options: { count } };
            }

            return { type: ERewardType.freeSpinsCountWithDependsOnDeposit, options: { count } };
          }

          throw new Error("[bonusRewardSelector] bonusSize.rule.productRules can be only for sportsbook or casino");
        });
      }
      default: {
        throw new Error(`[bonusRewardSelector] unknown bonusType: ${JSON.stringify(bonus.bonusType)}`);
      }
    }
  },
);

const simpleBonusTypeSelector = createSimpleSelector(
  [notNilBonusSelector],
  (bonus) => {
    switch (bonus.bonusType) {
      case EPlatform_BonusTypeEnum.cashback: {
        return ESimpleBonusType.cashback;
      }
      case EPlatform_BonusTypeEnum.custom:
      case EPlatform_BonusTypeEnum.firstDeposit: {
        return ESimpleBonusType.bonus;
      }
      case EPlatform_BonusTypeEnum.externalFreeBet:
      case EPlatform_BonusTypeEnum.internalFreeBet:
      case EPlatform_BonusTypeEnum.internalFreeSpinsWithWagering:
      case EPlatform_BonusTypeEnum.externalFreeSpinsWithWagering: {
        const bonusSize = isBonus(bonus) ? bonus.bonusSize : bonus.bonusBonusSize;

        if (!isFreeBetBonusSize(bonusSize)) {
          throw new Error(`[simpleBonusTypeSelector] bonusSize type can't be not freeBet for ${bonus.bonusType} bonusType`);
        }

        const bonusSizeProducts = bonusSize.rule.productRules.map(({ product }) => product);

        return bonusSizeProducts.includes(EBonusProductEnum.sports) && bonusSizeProducts.length === 1
          ? ESimpleBonusType.freeBet
          : ESimpleBonusType.freeSpin;
      }
      default: {
        throw new Error(`[simpleBonusTypeSelector] unknown bonusType: ${JSON.stringify(bonus.bonusType)}`);
      }
    }
  },
);

const activeBonusWalletSelector = createMemoSelector(
  [
    playerDetailsSelectors.bonusWallet,
    playerDetailsSelectors.freeBetWallet,
    activePlayerBonusesSelector,
  ],
  getActiveBonusWallets,
);

const bonusBalanceOrNullSelector = (state: IWithPlatformBonusesState & IWithPlayerState) =>
  activeBonusWalletSelector(state).bonusWallet?.balance ?? null;

const freebetBalanceOrNullSelector = (state: IWithPlatformBonusesState & IWithPlayerState) =>
  activeBonusWalletSelector(state).freeBetWallet?.balance ?? null;

const hasBonusBalanceSelector = (state: IWithPlatformBonusesState & IWithPlayerState) => (
  !!bonusBalanceOrNullSelector(state));

const hasFreebetBalanceSelector = (state: IWithPlatformBonusesState & IWithPlayerState) => (
  !!freebetBalanceOrNullSelector(state));

export {
  type IWageringProgress,
  platformBonusesSelectors,
  availableBonusesWithoutInvalidatedMatchResultsSelector,
  notNilBonusSelector,
  notNilBonusSelectors,
  bonusNameNullableSelector,
  platformBonusesSelector,
  activePlayerBonusesSelector,
  availableBonusIdsForOffersFilteredSelector,
  availableBonusByIdSelector,
  availableBonusByIdNotNilSelector,
  availableBonusByIdNotNilSelectors,
  isAvailableBonusExistSelector,
  isNotCashbackPlayerOrHistoryBonusSelector,
  playerBonusIdsForOffersFilteredSelector,
  playerBonusByIdSelector,
  playerBonusByIdNotNilSelector,
  playerBonusByIdNotNilSelectors,
  playerBonusBonusBalanceToReachSelector,
  historyBonusByIdSelector,
  historyBonusByIdNotNilSelector,
  historyBonusByIdNotNilSelectors,
  availableOrPlayerBonusByIdNotNilSelector,
  playerOrHistoryBonusByIdNotNilSelector,
  playerOrHistoryBonusByIdNotNilSelectors,
  playerHistoryBonusIdsFilteredSelector,
  bonusCountSelector,
  countAvailableBonusesForOffersPageSelector,
  availableBonusInfoCommonSelector,
  wageringProgressSelector,
  historyWageringProgressSelector,
  playerBonusHelperButtonForSelector,
  playerBonusIsAvailableForActivateSelector,
  playerBonusInfoCommonSelector,
  isPlayerOrHistoryBonusCurrentAndTotalWageringExistSelector,
  bonusRulesSelector,
  bonusTermsSelector,
  termsCommonSelector,
  productRulesCommonSelector,
  wageringProductRemainingAmountSelector,
  wageringProductProgressSelector,
  filterPlayerBonusesByInProgressStatus,
  freeBetBonusesWithSportsSelector,
  bonusesWithWageringWithSportsSelector,
  platformIsFreeBetPossibleSelector,
  bonusProductFilterOptionsSelector,
  depositRuleCommonSelector,
  eligibilityProductRulesAggregateRulesIdsSelector,
  aggregateRuleCommonSelector,
  aggregateRuleDependentRuleCommonSelector,
  depositRuleNoteFromClaimRulesSelector,
  depositRuleNoteFromActivateRulesSelector,
  productRuleNoteFromClaimRulesSelector,
  productRuleNoteFromActivateRulesSelector,
  bonusRewardSelector,
  simpleBonusTypeSelector,
  bonusBalanceOrNullSelector,
  freebetBalanceOrNullSelector,
  hasBonusBalanceSelector,
  hasFreebetBalanceSelector,

  isBonusClaimedEventReceivedSelector,
  isBonusActivatedEventReceivedSelector,
  isBonusCanceledEventReceivedSelector,
  isBonusLostEventReceivedSelector,
  isBonusWonEventReceivedSelector,
  isBonusCompletedEventReceivedSelector,

  bonusClaimedEventNotNilSelector,
  bonusActivatedEventNotNilSelector,

  bonusForCMSByIdSelector,
  bonusForCMSByNilIdSelector,
};
