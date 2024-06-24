import { type TReducer } from "@sb/utils";
import { type betSlipRemovePickAction } from "../../BetSlip/BetSlipActions";
import { type IWithMyBetsState } from "../MyBetsState";
import { doRemovePick } from "./Handlers/DoRemovePick";

const removePickReducer: TReducer<IWithMyBetsState, typeof betSlipRemovePickAction> = (
  state,
  { payload: { id } },
) =>
  doRemovePick("id", id, state);

export { removePickReducer };
