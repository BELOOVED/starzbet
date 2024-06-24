import { type ComponentType } from "react";
import { EBonusProductEnum } from "@sb/graphql-client";
import {
  platformui_starzbet_bonus_products_all,
  platformui_starzbet_bonus_products_casino,
  platformui_starzbet_bonus_products_casinoWithCount,
  platformui_starzbet_bonus_products_games,
  platformui_starzbet_bonus_products_gamesWithCount,
  platformui_starzbet_bonus_products_liveCasino,
  platformui_starzbet_bonus_products_liveCasinoWithCount,
  platformui_starzbet_bonus_products_sports,
  platformui_starzbet_bonus_products_sportsWithCount,
  platformui_starzbet_bonus_products_virtual,
  platformui_starzbet_bonus_products_virtualWithCount,
  platformui_starzbet_bonus_sortBy_bonusAmount,
  platformui_starzbet_bonus_sortBy_name,
  platformui_starzbet_bonus_sortBy_netWin,
  platformui_starzbet_bonus_sortBy_time,
  platformui_starzbet_bonus_status_days,
  platformui_starzbet_bonus_status_hours,
  platformui_starzbet_bonus_status_minutes,
  platformui_starzbet_bonus_status_oneDay,
  platformui_starzbet_bonus_status_oneHour,
  platformui_starzbet_bonus_status_oneMinute,
  type TTKeys,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { EBonusSortFilter } from "../../../../Store/Bonuses/Model/Enums/EBonusSortFilter";
import { type TProductCriteriaTypename } from "../../../../Store/Bonuses/Model/Types/BonusTypeShortcuts";
import { EExpireAtType } from "../../../../Store/Bonuses/Model/Enums/EExpireAtType";
import { SportsIcon } from "../../Components/Icons/SportsIcon";
import { CasinoIcon } from "../../Components/Icons/CasinoIcon";
import { LiveCasinoIcon } from "../../Components/Icons/LiveCasinoIcon";
import { AllProductsIcon } from "../../Components/Icons/AllProductsIcon";
import { GamesIcon } from "../../Components/Icons/GamesIcon";

type TWithAllTKey = {
  all: TTKeys;
}

const PRODUCT_TO_ICON_MAP: Record<EBonusProductEnum, ComponentType> & { "all": ComponentType; } = {
  [EBonusProductEnum.sports]: SportsIcon,
  [EBonusProductEnum.casino]: CasinoIcon,
  [EBonusProductEnum.liveCasino]: LiveCasinoIcon,
  [EBonusProductEnum.games]: GamesIcon,
  [EBonusProductEnum.virtual]: () => null,
  all: AllProductsIcon,
};

const CRITERIA_TYPE_TO_ICON_MAP: Record<TProductCriteriaTypename, ComponentType> = {
  Platform_BonusEligibilitySportsbookCriteria: PRODUCT_TO_ICON_MAP[EBonusProductEnum.sports],
  Platform_BonusWageringSportsbookCriteria: PRODUCT_TO_ICON_MAP[EBonusProductEnum.sports],
  Platform_BonusExternalFreeBetSportsbookCriteria: PRODUCT_TO_ICON_MAP[EBonusProductEnum.sports],
  Platform_BonusInternalFreeBetSportsbookCriteria: PRODUCT_TO_ICON_MAP[EBonusProductEnum.sports],
  Platform_BonusEligibilityCasinoCriteria: PRODUCT_TO_ICON_MAP[EBonusProductEnum.casino],
  Platform_BonusWageringCasinoCriteria: PRODUCT_TO_ICON_MAP[EBonusProductEnum.casino],
  Platform_BonusExternalFreeBetCasinoCriteria: PRODUCT_TO_ICON_MAP[EBonusProductEnum.casino],
  Platform_BonusInternalFreeBetCasinoCriteria: PRODUCT_TO_ICON_MAP[EBonusProductEnum.casino],
  Platform_BonusEligibilityLiveCasinoCriteria: PRODUCT_TO_ICON_MAP[EBonusProductEnum.liveCasino],
  Platform_BonusWageringLiveCasinoCriteria: PRODUCT_TO_ICON_MAP[EBonusProductEnum.liveCasino],
  Platform_BonusInternalFreeBetLiveCasinoCriteria: PRODUCT_TO_ICON_MAP[EBonusProductEnum.liveCasino],
  Platform_BonusWageringGamesCriteria: PRODUCT_TO_ICON_MAP[EBonusProductEnum.games],
  Platform_BonusInternalFreeBetGamesCriteria: PRODUCT_TO_ICON_MAP[EBonusProductEnum.games],
};

const PRODUCT_TRANSLATE_MAP: Record<EBonusProductEnum, TTKeys> & TWithAllTKey = {
  [EBonusProductEnum.sports]: platformui_starzbet_bonus_products_sports,
  [EBonusProductEnum.casino]: platformui_starzbet_bonus_products_casino,
  [EBonusProductEnum.liveCasino]: platformui_starzbet_bonus_products_liveCasino,
  [EBonusProductEnum.games]: platformui_starzbet_bonus_products_games,
  [EBonusProductEnum.virtual]: platformui_starzbet_bonus_products_virtual,
  all: platformui_starzbet_bonus_products_all,
};

const CRITERIA_TYPE_TO_PRODUCT_TRANSLATE_MAP: Record<TProductCriteriaTypename, TTKeys> = {
  Platform_BonusEligibilitySportsbookCriteria: PRODUCT_TRANSLATE_MAP[EBonusProductEnum.sports],
  Platform_BonusWageringSportsbookCriteria: PRODUCT_TRANSLATE_MAP[EBonusProductEnum.sports],
  Platform_BonusExternalFreeBetSportsbookCriteria: PRODUCT_TRANSLATE_MAP[EBonusProductEnum.sports],
  Platform_BonusInternalFreeBetSportsbookCriteria: PRODUCT_TRANSLATE_MAP[EBonusProductEnum.sports],
  Platform_BonusEligibilityCasinoCriteria: PRODUCT_TRANSLATE_MAP[EBonusProductEnum.casino],
  Platform_BonusWageringCasinoCriteria: PRODUCT_TRANSLATE_MAP[EBonusProductEnum.casino],
  Platform_BonusExternalFreeBetCasinoCriteria: PRODUCT_TRANSLATE_MAP[EBonusProductEnum.casino],
  Platform_BonusInternalFreeBetCasinoCriteria: PRODUCT_TRANSLATE_MAP[EBonusProductEnum.casino],
  Platform_BonusEligibilityLiveCasinoCriteria: PRODUCT_TRANSLATE_MAP[EBonusProductEnum.liveCasino],
  Platform_BonusWageringLiveCasinoCriteria: PRODUCT_TRANSLATE_MAP[EBonusProductEnum.liveCasino],
  Platform_BonusInternalFreeBetLiveCasinoCriteria: PRODUCT_TRANSLATE_MAP[EBonusProductEnum.liveCasino],
  Platform_BonusWageringGamesCriteria: PRODUCT_TRANSLATE_MAP[EBonusProductEnum.games],
  Platform_BonusInternalFreeBetGamesCriteria: PRODUCT_TRANSLATE_MAP[EBonusProductEnum.games],
};

const PRODUCT_TO_KEY_WITH_COUNT_MAP: Record<EBonusProductEnum, TTKeys> & TWithAllTKey = {
  [EBonusProductEnum.sports]: platformui_starzbet_bonus_products_sportsWithCount,
  [EBonusProductEnum.casino]: platformui_starzbet_bonus_products_casinoWithCount,
  [EBonusProductEnum.liveCasino]: platformui_starzbet_bonus_products_liveCasinoWithCount,
  [EBonusProductEnum.games]: platformui_starzbet_bonus_products_gamesWithCount,
  [EBonusProductEnum.virtual]: platformui_starzbet_bonus_products_virtualWithCount,
  all: platformui_starzbet_bonus_products_all,
};

const BONUS_SORT_FILTER_TRANSLATE_MAP: Record<EBonusSortFilter, TTKeys> & TWithAllTKey = {
  [EBonusSortFilter.time]: platformui_starzbet_bonus_sortBy_time,
  [EBonusSortFilter.name]: platformui_starzbet_bonus_sortBy_name,
  [EBonusSortFilter.bonusAmount]: platformui_starzbet_bonus_sortBy_bonusAmount,
  [EBonusSortFilter.netWin]: platformui_starzbet_bonus_sortBy_netWin,
  all: platformui_starzbet_bonus_products_all,
};

const EXPIRE_AT_TYPE_TO_TRANSLATE_MAP: Record<Exclude<EExpireAtType, "indefinite">, TTKeys> = {
  [EExpireAtType.day]: platformui_starzbet_bonus_status_oneDay,
  [EExpireAtType.days]: platformui_starzbet_bonus_status_days,
  [EExpireAtType.hour]: platformui_starzbet_bonus_status_oneHour,
  [EExpireAtType.hours]: platformui_starzbet_bonus_status_hours,
  [EExpireAtType.minute]: platformui_starzbet_bonus_status_oneMinute,
  [EExpireAtType.minutes]: platformui_starzbet_bonus_status_minutes,
};

export {
  CRITERIA_TYPE_TO_ICON_MAP,
  PRODUCT_TRANSLATE_MAP,
  CRITERIA_TYPE_TO_PRODUCT_TRANSLATE_MAP,
  PRODUCT_TO_KEY_WITH_COUNT_MAP,
  PRODUCT_TO_ICON_MAP,
  BONUS_SORT_FILTER_TRANSLATE_MAP,
  EXPIRE_AT_TYPE_TO_TRANSLATE_MAP,
};
