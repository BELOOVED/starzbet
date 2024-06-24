import { type TReducer } from "@sb/utils";
import { type betSlipRemovePickAction } from "../../BetSlip/BetSlipActions";
import { editableBetPicksSelector } from "../Selectors/MyBetsSelectors";
import { type IWithMyBetsState } from "../MyBetsState";
import { doRemovePick } from "./Handlers/DoRemovePick";

const removeNotAppliedPickReducer: TReducer<IWithMyBetsState, typeof betSlipRemovePickAction> = (
  state,
  { payload: { id } },
) => {
  const notApplied = editableBetPicksSelector(state).find((pick) => pick.outcomeId === id && !pick.applied);

  return notApplied
    ? doRemovePick("id", notApplied.id, state)
    : state;
};

export { removeNotAppliedPickReducer };
