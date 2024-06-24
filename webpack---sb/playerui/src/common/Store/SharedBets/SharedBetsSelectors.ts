import { createSimpleSelector, getNotNil } from "@sb/utils";
import {
  callManagerFailedSelector,
  callManagerStartedSelector,
  callManagerWasSucceededSelector,
} from "@sb/call-manager";
import { type IWithSharedBetsState } from "./SharedBetsState";
import { SHARED_BETS_BET_LOADING_SYMBOL } from "./SharedBetModel";

const sharedBetsSelector = ({ sharedBets }: IWithSharedBetsState) => sharedBets;

const sharedBetSelector = <S extends IWithSharedBetsState>(state: S, betId: string) => getNotNil(
  sharedBetsSelector(state).bets[betId],
  ["sharedBetSelector"],
  "bet",
);

const sharedBetLoadingSelector = callManagerStartedSelector.with.symbol(SHARED_BETS_BET_LOADING_SYMBOL);
const sharedBetWasSucceededSelector = callManagerWasSucceededSelector.with.symbol(SHARED_BETS_BET_LOADING_SYMBOL);
const sharedBetFailedSelector = callManagerFailedSelector.with.symbol(SHARED_BETS_BET_LOADING_SYMBOL);

const shouldLoadSharedBetOnDetailsClickedSelector = createSimpleSelector(
  [sharedBetLoadingSelector, sharedBetWasSucceededSelector],
  (loading, wasSucceeded) => !loading && !wasSucceeded,
);

export {
  sharedBetSelector,
  sharedBetLoadingSelector,
  sharedBetFailedSelector,
  shouldLoadSharedBetOnDetailsClickedSelector,
};
