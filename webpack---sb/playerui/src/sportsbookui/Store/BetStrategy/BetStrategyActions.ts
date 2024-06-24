import { type EBetStrategy } from "./Model/EBetStrategy";

const betStrategyChangeAction = (betStrategy: EBetStrategy) => ({
  type: "@BET_STRATEGY/CHANGE",
  payload: { betStrategy },
});

export { betStrategyChangeAction };
