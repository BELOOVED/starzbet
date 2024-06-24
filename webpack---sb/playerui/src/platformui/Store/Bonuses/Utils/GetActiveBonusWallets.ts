import { isNotNil, type TNullable } from "@sb/utils";
import type { TPlatform_PlayerBonus_Fragment } from "@sb/graphql-client/PlayerUI";
import { EPlatform_BonusTypeEnum } from "@sb/graphql-client";
import { type IWallet } from "../../../../common/Store/Player/InitialState/DetailsInitialState";
import {
  isFreeBetBonusSizeHaveSportRule,
  isFreeBetBonusType,
  isMixedBonusType,
  isNotFreeBetBonusType,
  isPlayerBonusOnWageringStage,
} from "./CommonBonusUtils";

interface IBonusWalletsSelectorResult {
  bonusWallet: TNullable<IWallet>;
  freeBetWallet: TNullable<IWallet>;
}

/**
 * return wallet if it can be used with some bonus from list of activePlayerBonuses
 */
const getActiveBonusWallets = (
  bonusWallet: TNullable<IWallet>,
  freeBetWallet: TNullable<IWallet>,
  activePlayerBonuses: TPlatform_PlayerBonus_Fragment[],
): IBonusWalletsSelectorResult => {
  const activeNotFreeBetBonus = activePlayerBonuses.find(({ bonusType }) => isNotFreeBetBonusType(bonusType));
  const activeFreeBetBonus = activePlayerBonuses.find(({ bonusType }) => isFreeBetBonusType(bonusType));
  const activeMixed = activePlayerBonuses.find(({ bonusType }) => isMixedBonusType(bonusType));

  let showBonusWallet = false;
  let showFreeBetWallet = false;

  if (isNotNil(activeNotFreeBetBonus)) {
    showBonusWallet = true;
  }

  if (isNotNil(activeFreeBetBonus)) {
    if (activeFreeBetBonus.bonusType === EPlatform_BonusTypeEnum.internalFreeBet) {
      showFreeBetWallet = true;
    } else if (isFreeBetBonusSizeHaveSportRule(activeFreeBetBonus.bonusBonusSize)) { // externalFreeBet bonusType
      showFreeBetWallet = true;
    }
  }

  if (isNotNil(activeMixed)) {
    showBonusWallet = true;

    const isFreeBetStage = !isPlayerBonusOnWageringStage(activeMixed);

    if (isFreeBetStage) {
      if (activeMixed.bonusType === EPlatform_BonusTypeEnum.internalFreeSpinsWithWagering) {
        showFreeBetWallet = true;
      } else if (isFreeBetBonusSizeHaveSportRule(activeMixed.bonusBonusSize)) { // todo^EI check it
        showFreeBetWallet = true;
      }
    }
  }

  return ({
    bonusWallet: showBonusWallet ? bonusWallet : null,
    freeBetWallet: showFreeBetWallet ? freeBetWallet : null,
  });
};

/**
 * return wallet if it can be used with some bonus from list of activePlayerBonuses on external platform
 */
const getActiveBonusWalletsForExternalPlatform = (
  bonusWallet: TNullable<IWallet>,
  freeBetWallet: TNullable<IWallet>,
  activePlayerBonuses: TPlatform_PlayerBonus_Fragment[],
): IBonusWalletsSelectorResult => {
  // can be just 1 active bonus cause just 1 product available
  if (activePlayerBonuses.length > 1) {
    throw new Error("[getActiveBonusWalletsForExternalPlatform] activePlayerBonuses count more than 1");
  }

  const [activeBonus] = activePlayerBonuses;

  if (!activeBonus) {
    return { bonusWallet: null, freeBetWallet: null };
  }

  if (activeBonus.bonusType === EPlatform_BonusTypeEnum.custom) {
    return { bonusWallet, freeBetWallet: null };
  }

  if (activeBonus.bonusType === EPlatform_BonusTypeEnum.internalFreeBet) {
    return { freeBetWallet, bonusWallet: null };
  }

  throw new Error(`[getActiveBonusWalletsForExternalPlatform] bonus type: ${activeBonus.bonusType} not supported on external platform`);
};

/**
 * return wallet if it can be used with provided bonus that matched with game
 * no matter on 'sports' product
 */
const getActiveBonusWalletForGameHeader = (
  bonusWallet: TNullable<IWallet>,
  freeBetWallet: TNullable<IWallet>,
  activePlayerBonus: TPlatform_PlayerBonus_Fragment,
): IBonusWalletsSelectorResult => {
  switch (activePlayerBonus.bonusType) {
    case EPlatform_BonusTypeEnum.custom:
    case EPlatform_BonusTypeEnum.firstDeposit: {
      return { bonusWallet, freeBetWallet: null };
    }
    case EPlatform_BonusTypeEnum.internalFreeBet: {
      return { freeBetWallet, bonusWallet: null };
    }
    case EPlatform_BonusTypeEnum.internalFreeSpinsWithWagering: {
      if (isPlayerBonusOnWageringStage(activePlayerBonus)) {
        return { bonusWallet, freeBetWallet: null };
      } else {
        return { freeBetWallet, bonusWallet: null };
      }
    }
    case EPlatform_BonusTypeEnum.externalFreeSpinsWithWagering: {
      if (isPlayerBonusOnWageringStage(activePlayerBonus)) {
        return { bonusWallet, freeBetWallet: null };
      } else {
        throw new Error("[getActiveBonusWalletForGameHeader] 'externalFreeSpinsWithWagering' bonus on freeSpins stage should be controlled by provider");
      }
    }
    case EPlatform_BonusTypeEnum.externalFreeBet: {
      throw new Error("[getActiveBonusWalletForGameHeader] 'externalFreeBet' bonus should be controlled by provider");
    }
    case EPlatform_BonusTypeEnum.cashback: {
      throw new Error("[getActiveBonusWalletForGameHeader] 'cashback' bonus can't be matched with game");
    }
    default: {
      throw new Error(`[getActiveBonusWalletForGameHeader] unknown bonus type ${activePlayerBonus.bonusType}`);
    }
  }
};

export {
  getActiveBonusWallets,
  getActiveBonusWalletsForExternalPlatform,
  getActiveBonusWalletForGameHeader,
};
