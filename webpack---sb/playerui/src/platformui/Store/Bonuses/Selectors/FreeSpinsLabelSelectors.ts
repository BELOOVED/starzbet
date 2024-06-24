import { type EGamePage } from "@sb/betting-core/EGamePage";
import { EPlatform_BonusTypeEnum } from "@sb/graphql-client";
import type { TPlatform_PlayerBonus_Fragment } from "@sb/graphql-client/PlayerUI";
import { isNil, isNotNil } from "@sb/utils";
import { type TMixAppState } from "../../../../sportsbookui/Store/CreateMixInitialState";
import { isFreeSpinsEnabledForPageSelector } from "../../Games/Selectors/GamesSelectors";
import { isFreeBetBonusSize } from "../Utils/BonusTypeGuards";
import { GAME_PAGE_TO_BONUS_PRODUCT_MAP } from "../Model/BonusProductMaps";
import { isPlayerBonusOnWageringStage } from "../Utils/CommonBonusUtils";
import { activePlayerBonusesSelector } from "./BonusesSelectors";

const isFreeSpinsForExternalBonusForPageAvailable = (playerBonus: TPlatform_PlayerBonus_Fragment, page: EGamePage) => {
  const requiredProduct = GAME_PAGE_TO_BONUS_PRODUCT_MAP[page];

  if (!requiredProduct) {
    throw new Error(`[isFreeSpinsForExternalBonusForPageAvailable] bonusSize for page "${page}" not supported`);
  }

  const bonusSize = playerBonus.bonusBonusSize;

  if (!isFreeBetBonusSize(bonusSize)) {
    throw new Error("[isFreeSpinsForExternalBonusForPageAvailable] bonusSize should be FreeBet type");
  }

  const productRule = bonusSize.rule.productRules.find((it) => it.product === requiredProduct);

  if (!productRule || productRule.criteria.__typename !== "Platform_BonusExternalFreeBetCasinoCriteria") {
    return false;
  }

  const productProgress = playerBonus.freeBetProductsProgress.find((it) => it.product === requiredProduct);

  if (!productProgress) {
    throw new Error("[isFreeSpinsForExternalBonusForPageAvailable] productProgress should exist");
  }

  const maxCount = productProgress.maxCount;

  if (isNil(maxCount)) {
    throw new Error("[isFreeSpinsForExternalBonusForPageAvailable] freeBetCasinoProgress.maxCount should exists for 'externalFreeBet' bonus type with casino free bet rule after activate");
  }

  return productProgress.currentCount < maxCount;
};

const activePlayerBonusIdWithAvailableFreeSpinsForPageSelector = (state: TMixAppState, page: EGamePage) => {
  const activePlayerBonuses = activePlayerBonusesSelector(state);

  return activePlayerBonuses.find((playerBonus) => {
    switch (playerBonus.bonusType) {
      case EPlatform_BonusTypeEnum.externalFreeBet: {
        return isFreeSpinsForExternalBonusForPageAvailable(playerBonus, page);
      }
      case EPlatform_BonusTypeEnum.externalFreeSpinsWithWagering: {
        const isWageringStage = isPlayerBonusOnWageringStage(playerBonus);
        if (isWageringStage) {
          return false;
        }

        return isFreeSpinsForExternalBonusForPageAvailable(playerBonus, page);
      }
      default: {
        return false;
      }
    }
  })?.id;
};

const isFreeSpinsLabelEnabledAndSomeBonusMatchedSelector = (state: TMixAppState, page: EGamePage) => {
  const isFreeSpinsLabelEnabled = isFreeSpinsEnabledForPageSelector(state, page);

  if (!isFreeSpinsLabelEnabled) {
    return false;
  }

  const playerBonusId = activePlayerBonusIdWithAvailableFreeSpinsForPageSelector(state, page);

  return isNotNil(playerBonusId);
};

export {
  activePlayerBonusIdWithAvailableFreeSpinsForPageSelector,
  isFreeSpinsLabelEnabledAndSomeBonusMatchedSelector,
};
