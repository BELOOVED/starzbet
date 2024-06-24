import { getNotNil, isNil, type TReducer, uuid4 } from "@sb/utils";
import { isFlatEventOutcome } from "@sb/betting-core/Feed/Utils";
import { editableBetPicksAreEqual, picksAreEqual } from "../../../Utils/PicksAreEqual";
import { generateHash } from "../../../Utils/GenerateHash";
import { marketByIdSelector } from "../../Feed/Selectors/FeedSelectors";
import { addSubscriberHandler } from "../../Feed/Reducers/Handlers/AddSubscriberHandler";
import { eventSubscriberEnum } from "../../Feed/Model/EventSubscriberEnum";
import { type betSlipCreatePickAction } from "../../BetSlip/BetSlipActions";
import { type TAppState } from "../../InitialState";
import { canAddPickOnEditBetSelector } from "../Selectors/CanAddPickOnEditBetSelector";
import { betByIdSelector, outcomeBetOrCurrentByIdSelector } from "../Selectors/MyBetsSelectors";
import { type TBetPickEntry } from "../Model/TBet";

const addPickReducer: TReducer<TAppState, typeof betSlipCreatePickAction> = (state, { payload: { kind, id } }) => {
  if (!canAddPickOnEditBetSelector(kind, id)(state)) {
    return state;
  }

  const outcome = getNotNil(outcomeBetOrCurrentByIdSelector(state, id), ["addPickReducer"], "eventOutcome");

  if (!isFlatEventOutcome(outcome)) {
    return state;
  }

  const { eventId } = marketByIdSelector(state, outcome.marketId);

  // todo assert that not event collision

  const editableBet = state.myBets.editableBet;
  if (isNil(editableBet)) {
    return state;
  }

  const newPick: TBetPickEntry = {
    outcomeId: id,
    marketId: outcome.marketId,
    coefficient: outcome.coefficient,
    applied: false,
    removed: false,
    eventId,
    updatedAt: outcome.updatedAt,
    id: uuid4(),
  };

  const picks = [...editableBet.picks, newPick];

  const bet = getNotNil(betByIdSelector(editableBet.id)(state), ["addPickReducer"], "betByIdSelector");

  const nextState = {
    ...state,
    myBets: {
      ...state.myBets,
      editableBet: {
        ...state.myBets.editableBet,
        changed: !picksAreEqual(bet.picks, picks),
        changedSinceLastCommit: editableBet.committing && !editableBetPicksAreEqual(
          editableBet.committedPicks,
          picks.filter(({ applied }) => !applied),
        ),
        picks,
        hash: generateHash(bet, picks),
      },
    },
  };

  return addSubscriberHandler(nextState, eventId, eventSubscriberEnum.myBets);
};

export { addPickReducer };
