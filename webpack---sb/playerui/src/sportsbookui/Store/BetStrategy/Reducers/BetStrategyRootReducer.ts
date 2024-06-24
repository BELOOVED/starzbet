import { createRootReducer } from "@sb/utils";
import { betStrategyChangeAction } from "../BetStrategyActions";
import { betStrategyChangeReducer } from "./BetStrategyChangeReducer";

const betStrategyRootReducer = createRootReducer([
  [betStrategyChangeReducer, betStrategyChangeAction],
]);

export { betStrategyRootReducer };
