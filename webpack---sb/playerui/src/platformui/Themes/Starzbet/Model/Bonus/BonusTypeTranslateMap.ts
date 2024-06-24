import {
  platformui_starzbet_bonus_bonusType_bonus,
  platformui_starzbet_bonus_bonusType_cashback,
  platformui_starzbet_bonus_bonusType_freeBet,
  platformui_starzbet_bonus_bonusType_freeSpins,
  type TTKeys,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { ESimpleBonusType } from "../../../../Store/Bonuses/Model/Enums/ESimpleBonusType";

const SIMPLE_BONUS_TYPE_TRANSLATE_MAP: Record<ESimpleBonusType, TTKeys> = {
  [ESimpleBonusType.bonus]: platformui_starzbet_bonus_bonusType_bonus,
  [ESimpleBonusType.cashback]: platformui_starzbet_bonus_bonusType_cashback,
  [ESimpleBonusType.freeBet]: platformui_starzbet_bonus_bonusType_freeBet,
  [ESimpleBonusType.freeSpin]: platformui_starzbet_bonus_bonusType_freeSpins,
};

export { SIMPLE_BONUS_TYPE_TRANSLATE_MAP };
