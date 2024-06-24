import { type TReducer } from "@sb/utils";
import { betSlipCompleteSelector } from "../Selectors/BetSlipSelectors";
import { type IWithBetSlipState } from "../BetSlipState";
import { type betSlipChangeTabAction, type betSlipChangeTabWithResetAction } from "../BetSlipActions";
import { betSlipRemoveAllPickHandler } from "./Handlers/BetSlipRemoveAllPickHandler";

const changeBetSlipTab = (state: IWithBetSlipState, tab: ReturnType<typeof betSlipChangeTabAction>["payload"]["tab"]) => ({
  ...state,
  betSlip: {
    ...state.betSlip,
    tab,
    error: null,
    complete: false,
  },
});

const betSlipChangeTabReducer: TReducer<IWithBetSlipState, typeof betSlipChangeTabAction> = (state, { payload: { tab } }) =>
  changeBetSlipTab(state, tab);

const betSlipChangeTabWithResetReducer: TReducer<IWithBetSlipState, typeof betSlipChangeTabWithResetAction> = (state, action) => {
  const nextState = changeBetSlipTab(state, action.payload.tab);

  const isComplete = betSlipCompleteSelector(state);

  return isComplete ? betSlipRemoveAllPickHandler(nextState) : nextState;
};

export { betSlipChangeTabReducer, betSlipChangeTabWithResetReducer };
