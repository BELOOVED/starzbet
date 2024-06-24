import { createRootReducer } from "@sb/utils";
import { sharedBetLoadedAction } from "./SharedBetsActions";
import { type IWithSharedBetsState } from "./SharedBetsState";

const sharedBetLoadedReducer = (
  state: IWithSharedBetsState,
  { payload: { bet } }: ReturnType<typeof sharedBetLoadedAction>,
) => ({
  ...state,
  sharedBets: {
    ...state.sharedBets,
    bets: {
      ...state.sharedBets.bets,
      [bet.id]: bet,
    },
  },
});

const sharedBetRootReducer = createRootReducer([
  [sharedBetLoadedReducer, sharedBetLoadedAction],
]);

export { sharedBetRootReducer };
