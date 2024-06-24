// @ts-nocheck
import { type TReducer } from "@sb/utils";
import { hasEditableBet } from "../../MyBets/Selectors/MyBetsSelectors";
import { type TAppState } from "../../InitialState";
import { betSlipPlacingSelector } from "../Selectors/BetSlipSelectors";
import { type betSlipRemovePickAction } from "../BetSlipActions";
import { betSlipRemovePickHandler } from "./Handlers/BetSlipRemovePickHandler";

const betSlipRemovePickReducer: TReducer<TAppState, typeof betSlipRemovePickAction> = (state, { payload: { id } }) => {
  if (betSlipPlacingSelector(state) || hasEditableBet(state)) {
    return state;
  }

  return betSlipRemovePickHandler(state, id);
};

export { betSlipRemovePickReducer };
