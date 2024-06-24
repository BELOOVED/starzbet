// @ts-nocheck
const betTypeFilter = {
  ALL: "ALL",
  OPENED: "OPENED",
  SETTLED: "SETTLED",
  AVAILABLE_FOR_CASH_OUT: "AVAILABLE_FOR_CASH_OUT",
  WON: "WON",
  LOST: "LOST",
  CASH_OUTED: "CASH_OUTED",
} as const;

const isAvailableForCashOutBetType = (type) => type === betTypeFilter.AVAILABLE_FOR_CASH_OUT;

type TBetTypeFilter = keyof typeof betTypeFilter

export { betTypeFilter, isAvailableForCashOutBetType, type TBetTypeFilter };
