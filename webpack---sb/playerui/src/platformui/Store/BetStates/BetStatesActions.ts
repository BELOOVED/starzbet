import type { TSportsbook_BetState_Fragment } from "@sb/graphql-client/PlayerUI";

const platformLoadBetStatesAction = (betId: string) => ({
  type: "@PLATFORM/LOAD_BET_STATES",
  payload: { betId },
});

const platformBetStatesFetchedAction = (betId: string, betStates: TSportsbook_BetState_Fragment[]) => ({
  type: "@PLATFORM/BET_STATES_FETCHED",
  payload: { betId, betStates },
});

export { platformLoadBetStatesAction, platformBetStatesFetchedAction };
