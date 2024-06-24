import { createRootReducer } from "@sb/utils";
import type { TSportsbook_BetState_Fragment } from "@sb/graphql-client/PlayerUI";
import { platformBetStatesFetchedAction } from "./BetStatesActions";
import { type IBetStatesStore } from "./BetStatesInitialState";

interface IPayload {
  payload: {
    betId: string;
    betStates: TSportsbook_BetState_Fragment[];
  };
}

const platformBetStatesFetchedReducer = (state: IBetStatesStore, { payload: { betId, betStates } }: IPayload) => ({
  ...state,
  betStates: {
    ...state.betStates,
    [betId]: {
      betStates,
    },
  },
});

const platformBetStatesRootReducer = createRootReducer([
  [platformBetStatesFetchedReducer, platformBetStatesFetchedAction],
]);

export { platformBetStatesRootReducer };
