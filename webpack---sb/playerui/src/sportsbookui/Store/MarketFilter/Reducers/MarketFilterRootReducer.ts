import { createRootReducer } from "@sb/utils";
import { marketFilterChangeAction, marketFilterChangePresetAction, marketFilterChangeTournamentMapAction } from "../MarketFilterActions";
import { marketFilterChangeReducer } from "./MarketFilterChangeReducer";
import { marketFilterChangePresetReducer } from "./MarketFilterChangePresetReducer";
import { marketFilterChangeTournamentMapReducer } from "./MarketFilterChangeTournamentMapReducer";

const marketFilterRootReducer = createRootReducer([
  [marketFilterChangeReducer, marketFilterChangeAction],
  [marketFilterChangePresetReducer, marketFilterChangePresetAction],
  [marketFilterChangeTournamentMapReducer, marketFilterChangeTournamentMapAction],
]);

export { marketFilterRootReducer };
