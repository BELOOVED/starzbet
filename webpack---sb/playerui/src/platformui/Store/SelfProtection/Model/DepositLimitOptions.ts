import { getSelectOptions } from "../../../../common/Components/Field/SelectModel";
import { NO_LIMIT, type TNoLimit } from "./SelfProtectionInterval";

const DEPOSIT_LIMITS = [
  NO_LIMIT,
  20,
  50,
  100,
  200,
  250,
  500,
  1000,
  5000,
] satisfies (TNoLimit | number)[];

type TDepositLimitOption = (typeof DEPOSIT_LIMITS)[number]

const DEPOSIT_LIMIT_AMOUNT_OPTIONS = getSelectOptions(DEPOSIT_LIMITS);

export type { TDepositLimitOption };
export { DEPOSIT_LIMIT_AMOUNT_OPTIONS };
