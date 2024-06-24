import { createRootReducer, type TReducer } from "@sb/utils";
import { oddsBoostFetchedAction, playerActivatedBoostsFetchedAction } from "./OddsBoostActions";
import { type IWithOddsBoost } from "./OddsBoostState";

const oddsBoostFetchedReducer: TReducer<IWithOddsBoost, typeof oddsBoostFetchedAction> = (s, { payload: { boosts } }) => ({
  ...s,
  oddsBoost: {
    ...s.oddsBoost,
    boosts,
  },
});

const playerActivatedBoostsFetchedReducer: TReducer<IWithOddsBoost, typeof playerActivatedBoostsFetchedAction> =
  (s, { payload: { playerActivatedBoosts } }) => ({
    ...s,
    oddsBoost: {
      ...s.oddsBoost,
      playerActivatedBoosts,
    },
  });

const oddsBoostRootReducer = createRootReducer([
  [oddsBoostFetchedReducer, oddsBoostFetchedAction],
  [playerActivatedBoostsFetchedReducer, playerActivatedBoostsFetchedAction],
]);

export { oddsBoostRootReducer };
