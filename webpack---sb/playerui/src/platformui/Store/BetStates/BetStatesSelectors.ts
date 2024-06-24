import { callManagerStartedSelector, createCallManagerSymbol } from "@sb/call-manager";
import type { TSportsbook_BetState_Fragment } from "@sb/graphql-client/PlayerUI";
import { type IBetStatesStore } from "./BetStatesInitialState";

const EMPTY_BET_STATES: TSportsbook_BetState_Fragment[] = [];

const bonusBetStatesSelector = (state: IBetStatesStore, betId: string) => state.betStates[betId] ?? EMPTY_BET_STATES;

const BET_STATES_SYMBOL = createCallManagerSymbol("betStates");

const betStatesLoadingSelector = callManagerStartedSelector.with.symbol(BET_STATES_SYMBOL);

export { bonusBetStatesSelector, BET_STATES_SYMBOL, betStatesLoadingSelector };
