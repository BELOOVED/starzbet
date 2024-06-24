import { type Duration } from "date-fns";
import { getSelectOptions } from "../../../../common/Components/Field/SelectModel";

const NO_LIMIT = "noLimit";

type TNoLimit = typeof NO_LIMIT;

const isNoLimit = (value: string | number): value is TNoLimit => value === NO_LIMIT;

/*in seconds*/
enum ESelfProtectionInterval {
  INDEFINITELY = 0,
  MINUTE_1 = 60,
  HOURS_24 = 86400,
  HOURS_48 = 172800,
  DAYS_7 = 604800,
  DAYS_14 = 1209600,
  DAYS_30 = 2592000,
  MONTH_6 = 15552000,
  YEARS_1 = 31104000,
  YEARS_2 = 62208000,
  YEARS_5 = 155520000,
}

type TSelfProtectionInterval = Exclude<ESelfProtectionInterval, ESelfProtectionInterval.INDEFINITELY>

const SELF_PROTECTION_INTERVAL_TO_DURATION_MAP: Record<TSelfProtectionInterval, Duration> = {
  [ESelfProtectionInterval.MINUTE_1]: { minutes: 1 },
  [ESelfProtectionInterval.HOURS_24]: { hours: 24 },
  [ESelfProtectionInterval.HOURS_48]: { hours: 48 },
  [ESelfProtectionInterval.DAYS_7]: { days: 7 },
  [ESelfProtectionInterval.DAYS_14]: { days: 14 },
  [ESelfProtectionInterval.DAYS_30]: { days: 30 },
  [ESelfProtectionInterval.MONTH_6]: { months: 6 },
  [ESelfProtectionInterval.YEARS_1]: { years: 1 },
  [ESelfProtectionInterval.YEARS_2]: { years: 2 },
  [ESelfProtectionInterval.YEARS_5]: { years: 5 },
};

const DEPOSIT_LIMIT_INTERVAL = getSelectOptions([
  ESelfProtectionInterval.HOURS_24,
  ESelfProtectionInterval.DAYS_7,
  ESelfProtectionInterval.DAYS_14,
  ESelfProtectionInterval.DAYS_30,
]);

const TIME_OUT_INTERVAL_OPTIONS = getSelectOptions([
  ESelfProtectionInterval.HOURS_24,
  ESelfProtectionInterval.HOURS_48,
  ESelfProtectionInterval.DAYS_7,
  ESelfProtectionInterval.DAYS_14,
  ESelfProtectionInterval.DAYS_30,
]);

const ACCOUNT_CLOSURE_PERIOD_OPTIONS = getSelectOptions([
  ESelfProtectionInterval.HOURS_24,
  ESelfProtectionInterval.HOURS_48,
  ESelfProtectionInterval.DAYS_7,
  ESelfProtectionInterval.DAYS_30,
]);

const REALITY_CHECK_PERIOD_OPTIONS = getSelectOptions([
  ESelfProtectionInterval.MINUTE_1,
  ESelfProtectionInterval.HOURS_24,
  ESelfProtectionInterval.HOURS_48,
  ESelfProtectionInterval.DAYS_7,
  ESelfProtectionInterval.DAYS_30,
  NO_LIMIT,
]);

const SELF_PROTECTION_INTERVAL_LIST = Object.values(ESelfProtectionInterval);

const isSelfProtectionInterval = (period: number): period is TSelfProtectionInterval =>
  SELF_PROTECTION_INTERVAL_LIST.some((it) => it === period);

const getSelfProtectionDuration = (period: undefined | number) => {
  if (period && isSelfProtectionInterval(period)) {
    return SELF_PROTECTION_INTERVAL_TO_DURATION_MAP[period];
  }

  return undefined;
};

export type { TNoLimit, TSelfProtectionInterval };
export {
  NO_LIMIT,
  isNoLimit,
  ESelfProtectionInterval,

  DEPOSIT_LIMIT_INTERVAL,
  TIME_OUT_INTERVAL_OPTIONS,
  ACCOUNT_CLOSURE_PERIOD_OPTIONS,
  REALITY_CHECK_PERIOD_OPTIONS,
  getSelfProtectionDuration,
};

