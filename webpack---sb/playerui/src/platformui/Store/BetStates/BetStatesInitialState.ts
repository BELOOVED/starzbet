import type { TSportsbook_BetState_Fragment } from "@sb/graphql-client/PlayerUI";

interface IBetStatesStore {
  betStates: Record<string, { loading: boolean; betStates: TSportsbook_BetState_Fragment[]; }>;
}

const betStatesInitialState: IBetStatesStore = {
  betStates: {},
};

export { betStatesInitialState, type IBetStatesStore };
