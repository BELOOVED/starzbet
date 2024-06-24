import { isLive } from "@sb/betting-core/EEventStatusUtils";
import { getNotNil } from "@sb/utils";
import {
  eventByIdSelector,
  eventIdByOutcomeIdSelector,
  outcomeByIdSelector,
  sportIdByOutcomeIdSelector,
} from "../../Feed/Selectors/FeedSelectors";
import { pickKind, type TPickKind } from "../../BetSlip/Model/BetPick";
import { isVirtual } from "../../Feed/Model/Sport";
import { type IWithFeed } from "../../Feed/FeedState";
import { type TAppState } from "../../InitialState";
import { type IWithMyBetsState } from "../MyBetsState";
import {
  addingEditableBetSelector,
  editableBetPicksSelector,
  isIncreaseOddByOutcomeHistorySelector,
  outcomeBetOrCurrentByIdSelector,
} from "./MyBetsSelectors";

const notBaseKind = (kind: keyof typeof pickKind) => kind !== pickKind.base;

const isVirtualSport = (_, outcomeId: string, state: TAppState) => isVirtual(sportIdByOutcomeIdSelector(state, outcomeId));

const notAddingEditableBet = (_, __, state: IWithMyBetsState) => !addingEditableBetSelector(state);

const hasOutrightPick = (_, __, state: IWithMyBetsState) => editableBetPicksSelector(state)
  .some((pick) => pick.outrightId && !pick.removed);

const hasSameOutcome = (_, outcomeId: string, state: IWithMyBetsState) => editableBetPicksSelector(state)
  .some((pick) => pick.outcomeId === outcomeId && !pick.removed);

const isOutrightOutcome = (_, outcomeId: string, state: IWithMyBetsState) =>
  "outrightId" in getNotNil(outcomeBetOrCurrentByIdSelector(state, outcomeId), ["isOutrightOutcome"], "outcomeBetOrCurrentByIdSelector");

const isLiveOutcome = (_, outcomeId: string, state: TAppState) => {
  const eventId = eventIdByOutcomeIdSelector(state, outcomeId);
  if (!eventId) {
    return false;
  }
  const event = eventByIdSelector(state, eventId);

  return isLive(event.status);
};

const hasSameEvent = (_, outcomeId: string, state: TAppState) => {
  const eventId = eventIdByOutcomeIdSelector(state, outcomeId);

  return editableBetPicksSelector(state).some((pick) => pick.eventId === eventId);
};

const isIncreaseOdd = (_, outcomeId: string, state: IWithMyBetsState & IWithFeed) => {
  const outcome = outcomeByIdSelector(state, outcomeId);

  return isIncreaseOddByOutcomeHistorySelector(outcomeId, outcome.coefficient)(state);
};

const addPickRules = [
  notBaseKind,
  isVirtualSport,
  notAddingEditableBet,
  hasOutrightPick,
  hasSameOutcome,
  isOutrightOutcome,
  isLiveOutcome,
  hasSameEvent,
  isIncreaseOdd,
];

const canAddPickOnEditBetSelector = (kind: TPickKind, outcomeId: string) => (state: TAppState) => (
  !addPickRules.some((rule) => rule(kind, outcomeId, state))
);

export { canAddPickOnEditBetSelector };
