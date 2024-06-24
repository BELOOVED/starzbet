// @ts-nocheck
import { type TReducer } from "@sb/utils";
import { type TAppState } from "../../InitialState";
import { virtualRepeatPickSelector } from "../Selectors/VirtualSelectors";
import { type betSlipCreateBatchPickAction } from "../BetSlipActions";
import { betSlipCreatePickReducer } from "./BetSlipCreatePickReducer";

const betSlipCreateBatchPickReducer: TReducer<TAppState, typeof betSlipCreateBatchPickAction> = (state, { payload: { kind, ids } }) => {
  const repeatPick = virtualRepeatPickSelector(state);
  let repeated = 1;
  let outcomeIds = [...ids];

  while (repeated !== repeatPick) {
    outcomeIds = [...outcomeIds, ...ids];
    repeated++;
  }

  return outcomeIds.reduce<TAppState>((nextState, id) => betSlipCreatePickReducer(nextState, { payload: { kind, id } }), state);
};

export { betSlipCreateBatchPickReducer };
