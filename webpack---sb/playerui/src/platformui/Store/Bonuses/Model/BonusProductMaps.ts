import { EProductCode } from "@sb/betting-core/EProductCode";
import { EBonusProductEnum } from "@sb/graphql-client";
import { EGamePage } from "@sb/betting-core/EGamePage";

const PRODUCT_TO_BONUS_PRODUCT_MAP: Partial<Record<EProductCode, EBonusProductEnum>> = {
  [EProductCode.SPORTS]: EBonusProductEnum.sports,
  [EProductCode.CASINO]: EBonusProductEnum.casino,
  [EProductCode.LIVE_CASINO]: EBonusProductEnum.liveCasino,
  [EProductCode.GAMES]: EBonusProductEnum.games,
  [EProductCode.VIRTUAL]: EBonusProductEnum.virtual,
};

const GAME_PRODUCT_TO_BONUS_PRODUCT_MAP: Partial<Record<EProductCode, EBonusProductEnum>> = {
  [EProductCode.GAMES]: EBonusProductEnum.games,
  [EProductCode.CASINO]: EBonusProductEnum.casino,
  [EProductCode.LIVE_CASINO]: EBonusProductEnum.liveCasino,
  [EProductCode.VIRTUAL]: EBonusProductEnum.virtual,
};

const GAME_PAGE_TO_BONUS_PRODUCT_MAP: Record<EGamePage, EBonusProductEnum> = {
  [EGamePage.CASINO]: EBonusProductEnum.casino,
  [EGamePage.LIVE_CASINO]: EBonusProductEnum.liveCasino,
  [EGamePage.GAMES]: EBonusProductEnum.games,
  [EGamePage.VIRTUAL]: EBonusProductEnum.virtual,
};

export {
  PRODUCT_TO_BONUS_PRODUCT_MAP,
  GAME_PRODUCT_TO_BONUS_PRODUCT_MAP,
  GAME_PAGE_TO_BONUS_PRODUCT_MAP,
};
