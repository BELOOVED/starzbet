import {
  sportsbookui_bonus_cashback_error_balanceToHigh,
  sportsbookui_bonus_cashback_error_hasActiveBonuses,
  type TCommonTKeys,
} from "@sb/translates/sportsbookui/CommonTKeys";
import { ECashbackFrontValidationError } from "../Enums/ECashbackFrontValidationError";

const cashbackFrontValidationErrorMap: Record<ECashbackFrontValidationError, TCommonTKeys> = {
  [ECashbackFrontValidationError.balanceToHigh]: sportsbookui_bonus_cashback_error_balanceToHigh,
  [ECashbackFrontValidationError.hasActiveBonuses]: sportsbookui_bonus_cashback_error_hasActiveBonuses,
};

export { cashbackFrontValidationErrorMap };
