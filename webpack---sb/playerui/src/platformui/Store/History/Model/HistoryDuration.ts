enum EHistoryDuration {
  last24Hours = 1e3 * 60 * 60 * 24,
  last7Days = 1e3 * 60 * 60 * 168,
}

// Only numeric values, without keys `last24Hours`, `last7Days`
const HISTORY_DURATIONS = Object.values(EHistoryDuration)
  .filter((value) => !isNaN(Number(value))) as EHistoryDuration[];

export { EHistoryDuration, HISTORY_DURATIONS };
