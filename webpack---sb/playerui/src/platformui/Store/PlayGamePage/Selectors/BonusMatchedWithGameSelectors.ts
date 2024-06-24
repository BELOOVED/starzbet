import {
  createMemoSelector,
  createPropertySelector,
  createSimpleSelector,
  type ECurrencyCode,
  getNotNil,
  type IMoney,
  isNil,
  isNotNil,
  isNotVoid,
  type TNullable,
} from "@sb/utils";
import { type EBonusProductEnum, EPlatform_BonusTypeEnum, type TTranslateRecord_Fragment } from "@sb/graphql-client";
import { type EProviderCode } from "@sb/betting-core/EProviderCode";
import type {
  TPlatform_BonusFreeBetProductRule_Fragment,
  TPlatform_BonusWageringProductRule_Fragment,
  TPlatform_Game_Fragment,
} from "@sb/graphql-client/PlayerUI";
import { routerLocationPathnameSelector } from "@sb/router";
import { playerCurrencySelector } from "../../../../common/Store/Player/Selectors/PlayerCurrencySelector";
import { playerDetailsSelectors } from "../../../../common/Store/Player/Selectors/PlayerSelectors";
import { findPlayerMoneyInBag } from "../../../Utils/PlayerMoneyBag";
import { getActiveBonusWalletForGameHeader } from "../../Bonuses/Utils/GetActiveBonusWallets";
import { activePlayerBonusesSelector } from "../../Bonuses/Selectors/BonusesSelectors";
import { gamesSelector } from "../../Games/Selectors/GamesSelectors";
import { isFreeBetBonusSize } from "../../Bonuses/Utils/BonusTypeGuards";
import { GAME_PRODUCT_TO_BONUS_PRODUCT_MAP } from "../../Bonuses/Model/BonusProductMaps";
import { isPlayerBonusOnWageringStage } from "../../Bonuses/Utils/CommonBonusUtils";
import { getGame } from "../Utils/GetGame";

/**
 * if game not satisfied some given filter value - false
 * otherwise - true
 */
const checkGameSatisfiedFilterEntities = (
  game: TPlatform_Game_Fragment,
  providerCode: TNullable<EProviderCode>,
  gameTagIds: string[],
  gameIds: string[],
) => {
  if (isNotNil(providerCode) && providerCode !== game.provider) {
    return false;
  }

  if (isNotVoid(gameTagIds) && !gameTagIds.some((it) => game.gameTagIds.includes(it))) {
    return false;
  }

  // noinspection RedundantIfStatementJS
  if (isNotVoid(gameIds) && !gameIds.includes(game.id)) {
    return false;
  }

  return true;
};

interface ICommonCasinoFilter {
  providerCode: TNullable<EProviderCode>;
  gameTagIds?: string[];
  gameIds: TNullable<string[]>;
}

const getCasinoFilterChecker = <F extends ICommonCasinoFilter>(game: TPlatform_Game_Fragment) =>
  (filter: F) => checkGameSatisfiedFilterEntities(game, filter.providerCode, filter.gameTagIds ?? [], filter.gameIds ?? []);

const isAnyWageringProductRuleSatisfies = (
  game: TPlatform_Game_Fragment,
  wageringProductRules: TPlatform_BonusWageringProductRule_Fragment[],
  bonusProduct: EBonusProductEnum,
): boolean => {
  const satisfiedProductRule = wageringProductRules.find((it) => it.product === bonusProduct);

  if (isNil(satisfiedProductRule)) {
    return false;
  }

  const criteria = satisfiedProductRule.criteria;

  switch (criteria.__typename) {
    case "Platform_BonusWageringSportsbookCriteria": {
      return false;
    }
    case "Platform_BonusWageringCasinoCriteria":
    case "Platform_BonusWageringLiveCasinoCriteria":
    case "Platform_BonusWageringGamesCriteria": {
      const filterChecker = getCasinoFilterChecker(game);

      const isSomeExcludedSatisfied = criteria.excludeFilters.some(filterChecker);

      if (isSomeExcludedSatisfied) {
        return false;
      }

      return criteria.filters.some(filterChecker);
    }
    default: {
      throw new Error("[isAnyWageringProductRuleSatisfies] unknown satisfiedProductRule.criteria.filters 'filter.__typename'");
    }
  }
};

const isAnyInternalFreeBetProductRuleSatisfies = (
  game: TPlatform_Game_Fragment,
  freeBetSizeProductRules: TPlatform_BonusFreeBetProductRule_Fragment[],
  bonusProduct: EBonusProductEnum,
) => {
  const satisfiedProductRule = freeBetSizeProductRules.find((it) => it.product === bonusProduct);

  if (isNil(satisfiedProductRule)) {
    return false;
  }

  const criteria = satisfiedProductRule.criteria;

  switch (criteria.__typename) {
    case "Platform_BonusExternalFreeBetSportsbookCriteria":
    case "Platform_BonusExternalFreeBetCasinoCriteria": {
      throw new Error(`[isAnyInternalFreeBetProductRuleSatisfies] internalFreeBet bonus should not contain ${criteria.__typename} criteria.__typename`);
    }
    case "Platform_BonusInternalFreeBetSportsbookCriteria":
      return false;
    case "Platform_BonusInternalFreeBetCasinoCriteria":
    case "Platform_BonusInternalFreeBetLiveCasinoCriteria":
    case "Platform_BonusInternalFreeBetGamesCriteria": {
      const filterChecker = getCasinoFilterChecker(game);

      return criteria.filters.some(filterChecker);
    }
    default: {
      throw new Error(`[isAnyInternalFreeBetProductRuleSatisfies] unknown satisfiedProductRule.criteria.__typename: ${JSON.stringify(criteria)}`);
    }
  }
};

const isAnyExternalFreeBetProductRuleSatisfies = (
  game: TPlatform_Game_Fragment,
  freeBetSizeProductRules: TPlatform_BonusFreeBetProductRule_Fragment[],
  bonusProduct: EBonusProductEnum,
) => {
  const satisfiedProductRule = freeBetSizeProductRules.find((it) => it.product === bonusProduct);

  if (isNil(satisfiedProductRule)) {
    return false;
  }

  const criteria = satisfiedProductRule.criteria;

  switch (criteria.__typename) {
    case "Platform_BonusInternalFreeBetLiveCasinoCriteria":
    case "Platform_BonusInternalFreeBetCasinoCriteria":
    case "Platform_BonusInternalFreeBetGamesCriteria": {
      throw new Error(`[isAnyExternalFreeBetProductRuleSatisfies] externalFreeBet bonus should not contain ${criteria.__typename} criteria.__typename`);
    }
    case "Platform_BonusInternalFreeBetSportsbookCriteria":
    case "Platform_BonusExternalFreeBetSportsbookCriteria":
      return false;
    case "Platform_BonusExternalFreeBetCasinoCriteria": {
      const filterChecker = getCasinoFilterChecker(game);

      return criteria.externalFilters.some(filterChecker);
    }
    default: {
      throw new Error(`[isAnyExternalFreeBetProductRuleSatisfies] unknown satisfiedProductRule.criteria.__typename: ${JSON.stringify(criteria)}`);
    }
  }
};

/**
 * should be called just on play game routes after game is loaded
 */
const internalBonusMatchedWithGameNullableSelector = createSimpleSelector(
  [routerLocationPathnameSelector, activePlayerBonusesSelector, gamesSelector],
  (pathname, playerBonuses, games) => {
    const game = getGame(pathname, games);

    if (!game) {
      return undefined;
    }

    const bonusProduct = GAME_PRODUCT_TO_BONUS_PRODUCT_MAP[game.product];

    if (isNil(bonusProduct)) {
      throw new Error(`[internalBonusMatchedWithGameNullableSelector] game product: '${game.product}' not matches with bonus products`);
    }

    return playerBonuses.find((playerBonus) => {
      switch (playerBonus.bonusType) {
        case EPlatform_BonusTypeEnum.cashback: // cannot contain bonusProduct rules
        case EPlatform_BonusTypeEnum.externalFreeBet: // should be controlled by provider
          return false;
        // should be controlled by provider on 'freeSpins' stage
        case EPlatform_BonusTypeEnum.externalFreeSpinsWithWagering: {
          const isWageringStage = isPlayerBonusOnWageringStage(playerBonus);

          if (!isWageringStage) {
            return false;
          }

          const wagering = playerBonus.bonusWagering;

          if (isNil(wagering)) {
            throw new Error("[internalBonusMatchedWithGameNullableSelector] wagering should exist");
          }

          return isAnyWageringProductRuleSatisfies(game, wagering.productRules, bonusProduct);
        }
        case EPlatform_BonusTypeEnum.internalFreeSpinsWithWagering: {
          const isWageringStage = isPlayerBonusOnWageringStage(playerBonus);

          if (isWageringStage) {
            const wagering = playerBonus.bonusWagering;

            if (isNil(wagering)) {
              throw new Error("[internalBonusMatchedWithGameNullableSelector] wagering should exist, bonus type 'internalFreeSpinsWithWagering'");
            }

            return isAnyWageringProductRuleSatisfies(game, wagering.productRules, bonusProduct);
          }

          const bonusSize = playerBonus.bonusBonusSize;

          if (!isFreeBetBonusSize(bonusSize)) {
            throw new Error("[internalBonusMatchedWithGameNullableSelector] bonus with type 'internalFreeSpinsWithWagering' should contain 'FreeBet' bonusSize");
          }

          return isAnyInternalFreeBetProductRuleSatisfies(game, bonusSize.rule.productRules, bonusProduct);
        }
        case EPlatform_BonusTypeEnum.custom:
        case EPlatform_BonusTypeEnum.firstDeposit: {
          const wagering = playerBonus.bonusWagering;

          if (isNil(wagering)) {
            return false;
          }

          return isAnyWageringProductRuleSatisfies(game, wagering.productRules, bonusProduct);
        }
        case EPlatform_BonusTypeEnum.internalFreeBet: {
          const bonusSize = playerBonus.bonusBonusSize;
          if (!isFreeBetBonusSize(bonusSize)) {
            throw new Error("[internalBonusMatchedWithGameNullableSelector] bonus with type 'internalFreeBet' should contain 'FreeBet' bonusSize");
          }

          return isAnyInternalFreeBetProductRuleSatisfies(game, bonusSize.rule.productRules, bonusProduct);
        }
        default:
          return false;
      }
    });
  },
);

const externalBonusMatchedWithGameNullableSelector = createSimpleSelector(
  [routerLocationPathnameSelector, activePlayerBonusesSelector, gamesSelector],
  (pathname, playerBonuses, games) => {
    const game = getGame(pathname, games);

    if (!game) {
      return undefined;
    }

    const bonusProduct = GAME_PRODUCT_TO_BONUS_PRODUCT_MAP[game.product];

    if (isNil(bonusProduct)) {
      throw new Error(`[externalBonusMatchedWithGameNullableSelector] game product: '${game.product}' not matches with bonus products`);
    }

    return playerBonuses.find((playerBonus) => {
      switch (playerBonus.bonusType) {
        case EPlatform_BonusTypeEnum.cashback:
        case EPlatform_BonusTypeEnum.custom:
        case EPlatform_BonusTypeEnum.firstDeposit:
        case EPlatform_BonusTypeEnum.internalFreeBet:
        case EPlatform_BonusTypeEnum.internalFreeSpinsWithWagering:
          return false;
        case EPlatform_BonusTypeEnum.externalFreeBet: {
          const bonusSize = playerBonus.bonusBonusSize;

          if (!isFreeBetBonusSize(bonusSize)) {
            throw new Error("[externalBonusMatchedWithGameNullableSelector] bonus with type 'externalFreeBet' should contain 'FreeBet' bonusSize");
          }

          return isAnyExternalFreeBetProductRuleSatisfies(game, bonusSize.rule.productRules, bonusProduct);
        }
        case EPlatform_BonusTypeEnum.externalFreeSpinsWithWagering: {
          const isWageringStage = isPlayerBonusOnWageringStage(playerBonus);

          if (isWageringStage) {
            return false;
          }

          const bonusSize = playerBonus.bonusBonusSize;

          if (!isFreeBetBonusSize(bonusSize)) {
            throw new Error("[externalBonusMatchedWithGameNullableSelector] bonus with type 'externalFreeSpinsWithWagering' should contain 'FreeBet' bonusSize");
          }

          return isAnyExternalFreeBetProductRuleSatisfies(game, bonusSize.rule.productRules, bonusProduct);
        }
        default:
          return false;
      }
    });
  },
);

const isBonusHeaderVisibleSelector = createSimpleSelector([internalBonusMatchedWithGameNullableSelector], isNotNil);
const isRealMoneyHeaderVisibleSelector = createSimpleSelector(
  [internalBonusMatchedWithGameNullableSelector, externalBonusMatchedWithGameNullableSelector],
  (internalMatch, externalMatch) => isNil(internalMatch) && isNil(externalMatch),
);

const anyBonusMatchedSelector = createSimpleSelector(
  [internalBonusMatchedWithGameNullableSelector, externalBonusMatchedWithGameNullableSelector],
  (internalMatch, externalMatch) => internalMatch || externalMatch,
);

const bonusProductByPlayedGameProductSelector = createSimpleSelector(
  [gamesSelector, routerLocationPathnameSelector],
  (games, pathname) => {
    const game = getGame(pathname, games);

    if (!game) {
      throw new Error(`[bonusProductByPlayedGameProductSelector] game product: ${pathname} game not found!`);
    }

    const bonusProduct = GAME_PRODUCT_TO_BONUS_PRODUCT_MAP[game.product];

    if (isNil(bonusProduct)) {
      throw new Error(`[bonusProductByPlayedGameProductSelector] game product: '${game.product}' not matches with bonus products`);
    }

    return bonusProduct;
  },
);

const bonusMatchedWithGameSelector = createSimpleSelector(
  [internalBonusMatchedWithGameNullableSelector],
  (nullableBonus) => getNotNil(nullableBonus, ["bonusMatchedWithGameSelector"], "bonus"),
);

const activeBonusWalletForGameHeaderSelector = createSimpleSelector(
  [
    playerDetailsSelectors.bonusWallet,
    playerDetailsSelectors.freeBetWallet,
    bonusMatchedWithGameSelector,
  ],
  getActiveBonusWalletForGameHeader,
);

const activeBonusNameForGameHeaderSelector = createPropertySelector(bonusMatchedWithGameSelector, "bonusName");

interface IMatchedBonusData {
  note: TNullable<TTranslateRecord_Fragment[]>;
  minStakePerBet?: TNullable<IMoney>;
  maxStakePerBet?: TNullable<IMoney>;
  minNumberOfBets?: TNullable<number>;
  minValue?: TNullable<IMoney>;
  maxValue?: TNullable<IMoney>;
  maxWinAllowed?: TNullable<IMoney>;
  maxAmountOfBets?: TNullable<number>;
}

const getDataForWageringProductRules = (
  wageringProductRules: TPlatform_BonusWageringProductRule_Fragment[],
  bonusProduct: EBonusProductEnum,
  playerCurrency: ECurrencyCode,
) => {
  const satisfiedProductRule = getNotNil(wageringProductRules.find((it) => it.product === bonusProduct), ["matchedBonusDataSelector"], "satisfiedProductRule");

  return {
    note: satisfiedProductRule.note,
    minStakePerBet: findPlayerMoneyInBag(satisfiedProductRule.criteria.minStakePerBet, playerCurrency),
    maxStakePerBet: findPlayerMoneyInBag(satisfiedProductRule.criteria.maxStakePerBet, playerCurrency),
    minNumberOfBets: satisfiedProductRule.criteria.minNumberOfBets,
  };
};

const getDataForInternalFreeBetProductRules = (
  internalFreeBetProductRules: TPlatform_BonusFreeBetProductRule_Fragment[],
  bonusProduct: EBonusProductEnum,
  playerCurrency: ECurrencyCode,
) => {
  const satisfiedProductRule = getNotNil(internalFreeBetProductRules.find((it) => it.product === bonusProduct), ["matchedBonusDataSelector", "internalFreeBet", "getDataForInternalFreeBetProductRules"], "satisfiedProductRule");

  if (
    satisfiedProductRule.criteria.__typename === "Platform_BonusInternalFreeBetCasinoCriteria" ||
    satisfiedProductRule.criteria.__typename === "Platform_BonusInternalFreeBetLiveCasinoCriteria" ||
    satisfiedProductRule.criteria.__typename === "Platform_BonusInternalFreeBetGamesCriteria"
  ) {
    return {
      note: satisfiedProductRule.note,
      minValue: findPlayerMoneyInBag(satisfiedProductRule.criteria.minValue, playerCurrency),
      maxValue: findPlayerMoneyInBag(satisfiedProductRule.criteria.maxValue, playerCurrency),
      maxWinAllowed: findPlayerMoneyInBag(satisfiedProductRule.criteria.maxWinAllowed, playerCurrency),
      maxAmountOfBets: satisfiedProductRule.criteria.maxAmountOfBets,
    };
  }

  throw new Error(`[getDataForInternalFreeBetProductRules] satisfiedProductRule.criteria have unsupported type: '${satisfiedProductRule.criteria.__typename}'`);
};

/**
 * should be called just if isSomePlayerBonusMatchedWithGameSelector returns true
 */
const matchedBonusDataSelector = createMemoSelector(
  [
    bonusMatchedWithGameSelector,
    bonusProductByPlayedGameProductSelector,
    playerCurrencySelector,
  ],
  (playerBonus, bonusProduct, playerCurrency): IMatchedBonusData => {
    switch (playerBonus.bonusType) {
      case EPlatform_BonusTypeEnum.cashback:
      case EPlatform_BonusTypeEnum.externalFreeBet: {
        throw new Error(`[matchedBonusDataSelector] not supported at all for ${playerBonus.bonusType} bonus type`);
      }
      case EPlatform_BonusTypeEnum.externalFreeSpinsWithWagering: {
        const isWageringStage = isPlayerBonusOnWageringStage(playerBonus);

        if (!isWageringStage) {
          throw new Error("[matchedBonusDataSelector] not supported at all for externalFreeSpinsWithWagering not on wagering stage");
        }

        const wagering = getNotNil(playerBonus.bonusWagering, ["matchedBonusDataSelector", "externalFreeSpinsWithWagering"], "wagering");

        return getDataForWageringProductRules(wagering.productRules, bonusProduct, playerCurrency);
      }
      case EPlatform_BonusTypeEnum.internalFreeSpinsWithWagering: {
        const isWageringStage = isPlayerBonusOnWageringStage(playerBonus);

        if (!isWageringStage) {
          const bonusSize = playerBonus.bonusBonusSize;

          if (!isFreeBetBonusSize(bonusSize)) {
            throw new Error("[matchedBonusDataSelector] bonus with type 'internalFreeSpinsWithWagering' should contain 'FreeBet' bonusSize");
          }

          return getDataForInternalFreeBetProductRules(bonusSize.rule.productRules, bonusProduct, playerCurrency);
        }

        const wagering = getNotNil(playerBonus.bonusWagering, ["matchedBonusDataSelector", "externalFreeSpinsWithWagering"], "wagering");

        return getDataForWageringProductRules(wagering.productRules, bonusProduct, playerCurrency);
      }
      case EPlatform_BonusTypeEnum.firstDeposit:
      case EPlatform_BonusTypeEnum.custom: {
        const wagering = getNotNil(playerBonus.bonusWagering, ["matchedBonusDataSelector", "custom/firstDeposit"], "wagering");

        return getDataForWageringProductRules(wagering.productRules, bonusProduct, playerCurrency);
      }
      case EPlatform_BonusTypeEnum.internalFreeBet: {
        const bonusSize = playerBonus.bonusBonusSize;
        if (!isFreeBetBonusSize(bonusSize)) {
          throw new Error("[matchedBonusDataSelector] bonus with type 'internalFreeBet' should contain 'FreeBet' bonusSize");
        }

        return getDataForInternalFreeBetProductRules(bonusSize.rule.productRules, bonusProduct, playerCurrency);
      }
      default: {
        throw new Error("[matchedBonusDataSelector] unsupported bonus type");
      }
    }
  },
);

export {
  isBonusHeaderVisibleSelector,
  isRealMoneyHeaderVisibleSelector,
  internalBonusMatchedWithGameNullableSelector,
  activeBonusWalletForGameHeaderSelector,
  activeBonusNameForGameHeaderSelector,
  matchedBonusDataSelector,
  anyBonusMatchedSelector,
};
