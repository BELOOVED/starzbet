import type {
  TPlatform_Bonus_Fragment,
  TPlatform_BonusSize_Fragment,
  TPlatform_PlayerBonus_Fragment,
} from "@sb/graphql-client/PlayerUI";
import { EBonusProductEnum, EPlatform_BonusTypeEnum, EPlatform_PlayerBonusStatusEnum } from "@sb/graphql-client";
import { notNil } from "@sb/utils";
import { matchPath } from "@sb/react-router-compat";
import type { EProductCode } from "@sb/betting-core/EProductCode";
import { routeMap } from "../../../RouteMap/RouteMap";
import { BET_SLIP_PROMOTION_BONUS_TAG_ID } from "../Model/BonusTags";
import { EBonusTabs } from "../Model/Enums/EBonusTabs";
import { PRODUCT_TO_BONUS_PRODUCT_MAP } from "../Model/BonusProductMaps";
import { isFreeBetBonusSize } from "./BonusTypeGuards";

/**
 * - not cashback
 * - not betSlip promotion
 * - isShownForPlayers
 */
const filterAvailableBonusesForOffers = ({ bonusType, bonusTagIds, isShownForPlayers }: TPlatform_Bonus_Fragment) =>
  bonusType !== EPlatform_BonusTypeEnum.cashback &&
  !bonusTagIds.includes(BET_SLIP_PROMOTION_BONUS_TAG_ID) &&
  isShownForPlayers;

/**
 * - not cashback
 */
const filterPlayerBonusesForOffers = ({ bonusType }: TPlatform_PlayerBonus_Fragment) =>
  bonusType !== EPlatform_BonusTypeEnum.cashback;

const isNotFreeBetBonusType = (bonusType: EPlatform_BonusTypeEnum) =>
  bonusType === EPlatform_BonusTypeEnum.custom ||
  bonusType === EPlatform_BonusTypeEnum.firstDeposit;

const isFreeBetBonusType = (bonusType: EPlatform_BonusTypeEnum) =>
  bonusType === EPlatform_BonusTypeEnum.internalFreeBet ||
  bonusType === EPlatform_BonusTypeEnum.externalFreeBet;

const isMixedBonusType = (bonusType: EPlatform_BonusTypeEnum) =>
  bonusType === EPlatform_BonusTypeEnum.internalFreeSpinsWithWagering ||
  bonusType === EPlatform_BonusTypeEnum.externalFreeSpinsWithWagering;

const isPlayerBonusOnWageringStage = (playerBonus: TPlatform_PlayerBonus_Fragment) =>
  notNil(playerBonus.currentWagering) && notNil(playerBonus.totalWagering);

/**
 * for external/internal FreeSpinsWithWagering/FreeBet bonuses
 */
const isFreeBetBonusSizeHaveSportRule = (bonusSize: TPlatform_BonusSize_Fragment) => {
  if (!isFreeBetBonusSize(bonusSize)) {
    throw new Error("[isFreeBetBonusSizeHaveSportRule] bonusSize should should be FreeBet type");
  }

  return bonusSize.rule.productRules.some((rule) => rule.product === EBonusProductEnum.sports);
};

/**
 * for external/internal FreeSpinsWithWagering/FreeBet bonuses
 */
const isFreeBetBonusSizeHaveCasinoRule = (bonusSize: TPlatform_BonusSize_Fragment) => {
  if (!isFreeBetBonusSize(bonusSize)) {
    throw new Error("[isFreeBetBonusSizeHaveCasinoRule] bonusSize should should be FreeBet type");
  }

  return bonusSize.rule.productRules.some((rule) => rule.product === EBonusProductEnum.casino);
};

const getBonusTabFromPathname = (pathname: string) => {
  if (matchPath(pathname, routeMap.historyBonusesRoute)) {
    return EBonusTabs.history;
  }

  if (matchPath(pathname, routeMap.myBonusesRoute)) {
    return EBonusTabs.myBonuses;
  }

  if (matchPath(pathname, [routeMap.availableBonusesRoute, routeMap.bonusesRoute])) {
    return EBonusTabs.available;
  }

  return null;
};

const playerBonusSorterByStatus = <Node extends { status: EPlatform_PlayerBonusStatusEnum; }>({ status }: Node) =>
  status === EPlatform_PlayerBonusStatusEnum.inProgress ? -1 : 1;

const getBonusProductByProductCode = (productCode: EProductCode): EBonusProductEnum => {
  const bonusProduct = PRODUCT_TO_BONUS_PRODUCT_MAP[productCode];

  if (!bonusProduct) {
    throw new Error(`[getBonusProductByProductCode] productCode: ${productCode} don't have analog in 'EBonusProductEnum'`);
  }

  return bonusProduct;
};

export {
  filterAvailableBonusesForOffers,
  filterPlayerBonusesForOffers,
  isFreeBetBonusSizeHaveCasinoRule,
  isFreeBetBonusSizeHaveSportRule,
  isPlayerBonusOnWageringStage,
  isMixedBonusType,
  isFreeBetBonusType,
  isNotFreeBetBonusType,
  getBonusTabFromPathname,
  playerBonusSorterByStatus,
  getBonusProductByProductCode,
};
