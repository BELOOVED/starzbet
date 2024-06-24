enum EBetStrategy {
  ask = "ask",
  any = "any",
  higher = "higher",
}

const betStrategies = [EBetStrategy.any, EBetStrategy.ask, EBetStrategy.higher];

export { EBetStrategy, betStrategies };
