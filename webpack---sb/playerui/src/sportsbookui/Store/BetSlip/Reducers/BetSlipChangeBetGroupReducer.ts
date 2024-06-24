import type { TReducer } from "@sb/utils";
import type { IWithBetSlipState } from "../BetSlipState";
import type { betSlipChangeBetGroupAction } from "../BetSlipActions";
import type { BasePick, VirtualGamePick } from "../Model/BetPick";

const resetBankers = (picks: (BasePick | VirtualGamePick)[]) => (
  picks.map(((pick) => {
    pick.banker = false;

    return pick;
  }))
);

const betSlipChangeBetGroupReducer: TReducer<IWithBetSlipState, typeof betSlipChangeBetGroupAction> = (state, { payload: { group } }) => {
  const picks = resetBankers(state.betSlip.picks);

  return ({
    ...state,
    betSlip: {
      ...state.betSlip,
      error: null,
      group,
      picks,
    },
  });
};

export { betSlipChangeBetGroupReducer };
