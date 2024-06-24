import { type TReducer, uuid4 } from "@sb/utils";
import { Logger } from "../../../../common/Utils/Logger";
import { betSlipRemoveAllPickReducer } from "../../BetSlip/Reducers/BetSlipRemoveAllPickReducer";
import { isOutrightPick } from "../../Feed/Model/Outright";
import { hasEditableBet } from "../Selectors/MyBetsSelectors";
import { canEditMyBet, getNotEditableReasons, selectMyBetById } from "../Model/Bet";
import { type startEditBetAction } from "../MyBetsActions";
import { type IWithMyBetsState } from "../MyBetsState";
import { type TBet, type TBetHistoryPick, type TBetPickEntry, type TEditableBet } from "../Model/TBet";

const createPickEntry = (pick: TBetHistoryPick): TBetPickEntry => {
  const defaultProperties = {
    translatesForManuallyCreated: pick.outcome.translatesForManuallyCreated,
    outcomeId: pick.outcome.id,
    coefficient: pick.coefficient,
    applied: true,
    removed: false,
    id: uuid4(),
  };

  if (isOutrightPick(pick) && "outright" in pick) {
    return {
      outrightId: pick.outright.id,
      ...defaultProperties,
    };
  } else if ("event" in pick) {
    return {
      marketId: pick.market.id,
      eventId: pick.event.id,
      updatedAt: pick.updatedAt,
      ...defaultProperties,
    };
  }

  return defaultProperties;
};
// create structure for bet sleep editing
const createEditBetSlip = (bet: TBet, adding = false): TEditableBet => ({
  id: bet.id,
  saving: false,
  adding,
  changed: false,
  lastSaveError: undefined,
  picks: bet.picks.map(createPickEntry),
  additionalStakeAmount: bet.totalStake,
  hash: bet.hash,
  committedPicks: [],
});

// 1 it's allowed edit given bet
// 2 no more bet not edit now
const startEditBetReducer: TReducer<IWithMyBetsState, typeof startEditBetAction> = (
  state,
  {
    payload: {
      betId,
      adding,
    },
  },
) => {
  if (hasEditableBet(state)) {
    Logger.warn.reducer(
      "[MyBet]",
      "Start edit bet failed, already have editable bet.",
    );

    return state;
  }

  const bet = selectMyBetById(state, betId);

  if (!bet) {
    Logger.warn.reducer("[MyBet]", `Bet with id "${betId}" not founded.`);

    return state;
  }

  if (!canEditMyBet(state, betId)) {
    const reason = getNotEditableReasons(bet, state);

    Logger.warn.reducer(
      "[MyBet]",
      `Bet with id "${betId}" cannot be edited. Reason: ${reason.join(", ")}`,
    );

    return state;
  }
  const editableBet = createEditBetSlip(bet, adding);

  return betSlipRemoveAllPickReducer({
    ...state,
    myBets: {
      ...state.myBets,
      editableBet,
    },
  });
};

export { startEditBetReducer };
