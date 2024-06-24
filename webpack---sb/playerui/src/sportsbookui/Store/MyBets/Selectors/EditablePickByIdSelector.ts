import { EMarketGroup } from "@sb/betting-core/EMarketGroup";
import { getNotNil, isNil } from "@sb/utils";
import {
  equalMarketGroupSelector,
  eventByIdSelector,
  marketByIdSelector,
  marketsSelector,
  marketToOutcomeMapSelector,
  outcomeByIdSelector,
  outcomesSelector,
  outrightByIdSelector,
  outrightToOutcomeMapSelector,
  scopeByMarketIdSelector,
} from "../../Feed/Selectors/FeedSelectors";
import { hasLocked, hasOutrightOutcomeLocked } from "../../Feed/Model/Outcome/HasLocked";
import { type TAppState } from "../../InitialState";
import {
  editableBetPickByIdSelector,
  editableBetPicksSelector,
  isIncreaseOddByOutcomeHistorySelector,
} from "./MyBetsSelectors";

const someLocked = (list: string[], outcomes) => (list || []).some((id) => hasLocked(outcomes[id]));

const isRemoved = (pickId: string) => (state: TAppState) => {
  const pick = editableBetPickByIdSelector(pickId)(state);

  return !pick || pick.removed;
};

const isOutrightLocked = (pickId: string) => (state: TAppState) => {
  const pick = getNotNil(editableBetPickByIdSelector(pickId)(state), ["isOutrightLocked"], "pick");

  const outrightId = pick.outrightId;

  if (outrightId) {
    const outcomes = outcomesSelector(state);

    const outrightToOutcomeMap = outrightToOutcomeMapSelector(state);

    const outcomeIdList = getNotNil(outrightToOutcomeMap[outrightId], ["isOutrightLocked"], "outright");

    return outcomeIdList.some((outcomeId) => (
      hasOutrightOutcomeLocked(outrightByIdSelector(state, outrightId), outcomes[outcomeId])
    ));
  }

  return false;
};

// todo this rule is scratch for outright - make own rules and selector for it
const isMarketNotExist = (pickId: string) => (state: TAppState) => {
  const pick = editableBetPickByIdSelector(pickId)(state);

  if (!pick?.marketId) {
    return true;
  }

  const markets = marketsSelector(state);

  return isNil(markets[pick.marketId]);
};

const isMarketLocked = (pickId: string) => (state: TAppState) => {
  const pick = editableBetPickByIdSelector(pickId)(state);

  const marketId = getNotNil(pick?.marketId, ["isMarketLocked"], "marketId");

  const market = marketByIdSelector(state, marketId);

  return market.locked;
};

const isScopeLocked = (pickId: string) => (state: TAppState) => {
  const pick = editableBetPickByIdSelector(pickId)(state);

  const marketId = getNotNil(pick?.marketId, ["isScopeLocked"], "marketId");

  const scope = scopeByMarketIdSelector(state, marketId);

  if (!scope) {
    return true;
  }

  if (equalMarketGroupSelector(state, EMarketGroup.custom, marketId)) {
    return false;
  }

  return scope.locked;
};

const isEventLocked = (pickId: string) => (state: TAppState) => {
  const pick = editableBetPickByIdSelector(pickId)(state);

  if (!pick) {
    return true;
  }

  const event = eventByIdSelector(state, getNotNil(pick.eventId, ["EditablePickByIdSelector"], "event in isEventLocked"));

  if (!event) {
    return true;
  }

  const marketId = getNotNil(pick.marketId, ["isEventLocked"], "marketId");

  if (equalMarketGroupSelector(state, EMarketGroup.custom, marketId)) {
    return false;
  }

  return event.locked;
};

const isRestOutcomeLocked = (pickId: string) => (state: TAppState) => {
  const pick = editableBetPickByIdSelector(pickId)(state);

  return someLocked(marketToOutcomeMapSelector(state)[pick.marketId], outcomesSelector(state));
};

const isIncreaseOdds = (pickId: string) => (state: TAppState) => {
  const pick = editableBetPickByIdSelector(pickId)(state);

  const outcomeList = pick?.marketId ? marketToOutcomeMapSelector(state)[pick.marketId] : [];

  const outcomes = outcomesSelector(state);

  return outcomeList
    .filter((id: string) => id !== pick?.outcomeId)
    .every((id: string) => isIncreaseOddByOutcomeHistorySelector(id, outcomes[id].coefficient)(state));
};

const notAvailablePick = (pickId: string) => (state: TAppState) => {
  const pick = editableBetPickByIdSelector(pickId)(state);

  if (!pick) {
    return true;
  }

  const outcome = outcomeByIdSelector(state, pick.outcomeId);

  return !outcome;
};

const editPickRules = [
  notAvailablePick,
  isRemoved,
  isOutrightLocked,
  isMarketNotExist,
  isMarketLocked,
  isScopeLocked,
  isEventLocked,
  isRestOutcomeLocked,
  isIncreaseOdds,
];

const canEditPickByIdSelector = (state: TAppState, pickId: string) => (
  !editPickRules.some((rule) => rule(pickId)(state))
);

const removePickRules = [
  notAvailablePick,
  isOutrightLocked,
  isMarketNotExist,
  isMarketLocked,
  isScopeLocked,
  isEventLocked,
  isRestOutcomeLocked,
  isIncreaseOdds,
];

const canRemovePickByIdSelector = (state, pickId: string) => {
  const canRemoveThisPick = !removePickRules.some((rule) => rule(pickId)(state));

  const picks = editableBetPicksSelector(state);

  const restPicksCanBeRemove = picks
    .filter((it) => it.id !== pickId)
    .filter(({ removed }) => !removed)
    .filter((it) => !removePickRules.some((rule) => rule(it.id)(state)));

  return canRemoveThisPick && restPicksCanBeRemove.length > 0;
};

export { canEditPickByIdSelector, canRemovePickByIdSelector };
