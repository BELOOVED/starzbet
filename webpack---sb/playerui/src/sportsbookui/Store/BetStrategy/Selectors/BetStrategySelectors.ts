import { type IWithBetStrategyState } from "../BetStrategyState";

const betStrategySelector = ({ betStrategy }: IWithBetStrategyState) => betStrategy;

export { betStrategySelector };
