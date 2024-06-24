import {
  sportsbookui_bonus_claimBonus_error_bonusWithPromotionCodeNotFound,
  type TCommonTKeys,
} from "@sb/translates/sportsbookui/CommonTKeys";
import { type TErrorMap } from "@sb/translator";
import {
  EClaimBonusByPromotionCodeCommandErrorCode,
  type IClaimBonusByPromotionCodeErrorMapping,
} from "@sb/sdk/ErrorMapping/bonus/ClaimBonusByPromotionCodeErrorMapping";
import { CLAIM_BONUS_ERROR_MAP } from "./ClaimBonusErrorMap";

type TClaimBonusByPromoCodeErrorMap = TErrorMap<
  TCommonTKeys,
  EClaimBonusByPromotionCodeCommandErrorCode,
  IClaimBonusByPromotionCodeErrorMapping
>;

const CLAIM_BONUS_BY_PROMOCODE_ERROR_MAP: TClaimBonusByPromoCodeErrorMap = {
  ...CLAIM_BONUS_ERROR_MAP,
  [EClaimBonusByPromotionCodeCommandErrorCode.bonusBonusWithPromotionCodeNotFound]:
    ({ promotionCode }) => [sportsbookui_bonus_claimBonus_error_bonusWithPromotionCodeNotFound, { promotionCode }],
};

export { CLAIM_BONUS_BY_PROMOCODE_ERROR_MAP };
