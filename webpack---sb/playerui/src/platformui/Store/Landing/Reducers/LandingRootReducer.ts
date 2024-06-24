import { createRootReducer } from "@sb/utils";
import { popularGamesReceivedAction, starzGamesReceivedAction } from "../LandingActions";
import { popularGamesReceivedReducer } from "./PopularGamesReceivedReducer";
import { starzGamesReceivedReducer } from "./StarzGamesReceivedReducer";

const landingRootReducer = createRootReducer([
  [popularGamesReceivedReducer, popularGamesReceivedAction],
  [starzGamesReceivedReducer, starzGamesReceivedAction],
]);

export { landingRootReducer };
