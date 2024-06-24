import { ESelfProtectionInterval, NO_LIMIT, type TNoLimit } from "./SelfProtectionInterval";

type TSelfProtectionBaseModel = {
  period: ESelfProtectionInterval;
  password: string;
}

type TSelfProtectionWithAmountModel = TSelfProtectionBaseModel & {
  amount: number | TNoLimit;
}

const SELF_PROTECTION_BASE_INITIAL_VALUE: Partial<TSelfProtectionWithAmountModel> = {
  period: ESelfProtectionInterval.HOURS_24,
  amount: NO_LIMIT,
};

export type { TSelfProtectionBaseModel, TSelfProtectionWithAmountModel };
export { SELF_PROTECTION_BASE_INITIAL_VALUE };
