//@ts-nocheck
import { createSelector } from "reselect";
import { createMemoSelector, createSimpleSelector, getNotNil, isEmpty, isNotNil, Money } from "@sb/utils";
import { type EWhere_Predicate } from "@sb/graphql-client";
import { outcomeByIdSelector, selectFeedIdTreeByOutcomeId } from "../../Feed/Selectors/FeedSelectors";
import { isConflictedPick } from "../../BetSlip/Model/ConlictedPick";
import { type TAppState } from "../../InitialState";
import { isPending } from "../Model/BetStatusEnum";
import { isCreatedAtWhereExtension } from "../Model/BetWhereExtension";
import { isAvailableForCashOutBetType } from "../Model/BetTypeFilter";
import { computePayoutByFreeBet } from "../BetUtils";
import { type TBetContract } from "../Model/TBet";
import { type IWithMyBetsState } from "../MyBetsState";

const myBetsSelector = (s: IWithMyBetsState) => s.myBets;

const betsMyBetsSelector = (s: IWithMyBetsState) => myBetsSelector(s).bets;

const pendingMyBetsSelector = (s: IWithMyBetsState) => myBetsSelector(s).pending;

const cursorMyBetsSelector = (s: IWithMyBetsState) => myBetsSelector(s).cursor;

const countPerPageMyBetsSelector = (s: IWithMyBetsState) => myBetsSelector(s).countPerPage;

const whereMyBetsSelector = (s: IWithMyBetsState) => myBetsSelector(s).where;

const orderByMyBetsSelector = (s: IWithMyBetsState) => myBetsSelector(s).orderBy;

const filterMyBetsSelector = (s: IWithMyBetsState) => myBetsSelector(s).filter;

const isAvailableForCashOutFilterSelector = (s: IWithMyBetsState) => isAvailableForCashOutBetType(filterMyBetsSelector(s));

const timeRangeMyBetsSelector = (s: IWithMyBetsState) => {
  const list = (whereMyBetsSelector(s)?.operands || []).filter(isCreatedAtWhereExtension);

  if (isEmpty(list)) {
    return null;
  }

  return list.reduce<{ [predicate in EWhere_Predicate]?: number }>(
    (acc, { value, predicate }) => ({
      ...acc,
      [predicate]: Number(value),
    }),
    {},
  );
};

const pageInfoMyBetsSelector = (s: IWithMyBetsState) => myBetsSelector(s).pageInfo;

const hasNextPageMyBetsSelector = (s: IWithMyBetsState) => pageInfoMyBetsSelector(s).hasNextPage;

const canShowLoadMoreButtonSelector = createSimpleSelector(
  [hasNextPageMyBetsSelector, betsMyBetsSelector],
  (hasNextPage, bets) => hasNextPage && bets.length > 0,
);

const hasPreviousPageMyBetsSelector = (s: IWithMyBetsState) => pageInfoMyBetsSelector(s).hasPreviousPage;

const selectAllBetsWhereCashOutAllowed = (s: IWithMyBetsState) => betsMyBetsSelector(s).filter(isPending);

const betByIdSelector = (id) => (s: IWithMyBetsState) => betsMyBetsSelector(s).find((bet) => bet.id === id);

const editableBetSelector = (s: IWithMyBetsState) => myBetsSelector(s).editableBet;
const editableBetNotNilSelector = createSimpleSelector(
  [editableBetSelector],
  (editableBet) => getNotNil(editableBet, ["editableBetNotNilSelector"], "editableBet"),
);

const editingByBetIdSelector = (betId) => (s: IWithMyBetsState) => editableBetSelector(s)?.id === betId;

const editingBetPickByOutcomeId = (outcomeId) => (s: IWithMyBetsState) => {
  const bet = betsMyBetsSelector(s).find(({ id }) => id === editableBetSelector(s).id);

  return bet.picks.find(({ outcome }) => outcome.id === outcomeId);
};

const hasEditableBet = (s: IWithMyBetsState) => isNotNil(editableBetSelector(s));

const betHistoryByBetIdSelector = (betId) => (s: IWithMyBetsState) => myBetsSelector(s).betHistory[betId]?.list || [];

const hasOpenedBetsSelector = (s: IWithMyBetsState) => myBetsSelector(s).openedBetsCount > 0;

const openedBetsCountSelector = (s: IWithMyBetsState) => myBetsSelector(s).openedBetsCount;

const cashoutHistoryByBetIdSelector = (betId) => (s: IWithMyBetsState) => myBetsSelector(s).betHistory[betId]?.cashoutHistory || [];

const addingEditableBetSelector = (s: IWithMyBetsState) => Boolean(editableBetSelector(s) && editableBetSelector(s).adding);

const changedEditableBetSelector = (s: IWithMyBetsState) => editableBetSelector(s) && editableBetSelector(s).changed;

const editableBetPicksSelector = (s: IWithMyBetsState) => editableBetSelector(s)?.picks ?? [];

const editableBetPickByIdSelector = (outcomeId: string) => (s: IWithMyBetsState) => editableBetPicksSelector(s)
  .find((pick) => pick.id === outcomeId);

const savingEditableBetSelector = (s: TAppState) => editableBetSelector(s)?.saving;

const cannotUpdateMyBetsSelector = (s: IWithMyBetsState) =>
  !whereMyBetsSelector(s) || pendingMyBetsSelector(s) || savingEditableBetSelector(s);

const skipEditBetTutorialSelector = (s: IWithMyBetsState) => myBetsSelector(s).skipEditBetTutorial;

const skipAddSelectionTipSelector = (s: IWithMyBetsState) => myBetsSelector(s).skipAddSelectionTip;

const pickHasConflictByIdSelector = (id: string) => (state: IWithMyBetsState) => {
  const picks = editableBetPicksSelector(state);

  const notRemoved = picks.filter(({ removed }) => !removed);

  const outcomeTree = selectFeedIdTreeByOutcomeId(state, id);

  if (outcomeTree && outcomeTree.eventId) {
    return notRemoved.some(({ eventId, outcomeId }) => outcomeId !== id && eventId === outcomeTree.eventId);
  }

  return notRemoved
    .filter((pick) => isConflictedPick(notRemoved, pick.outcomeId))
    .some(({ outcomeId }) => outcomeId === id);
};

const cashOutHistoryByContractSelector = (contract: TBetContract) => (
  contract.filter(({ type, metadata }) => type === "correction" && metadata.operation === "cashOut")
);

const isFreebetByBetIdSelector = (betId) => (state: IWithMyBetsState) => {
  const bet = betByIdSelector(betId)(state);

  if (!bet) {
    return false;
  }

  return bet.betBonus && !Money.isZero(bet.betBonus.freeBetAmount);
};

const payoutByBetIdSelector = (betId) => createSelector(
  betByIdSelector(betId),
  editableBetSelector,
  editingByBetIdSelector(betId),
  isFreebetByBetIdSelector(betId),
  (bet, editableBet, editing, freebet) => {
    if (editing) {
      const payout = editableBet.picks.reduce(
        (acc, { coefficient, removed, applied }) => (
          removed || !applied ? acc : Money.multiply(acc, coefficient)
        ),
        editableBet.additionalStakeAmount,
      );

      return computePayoutByFreeBet(payout, editableBet.additionalStakeAmount, freebet);
    }

    return bet.totalPotentialPayout;
  },
);

// todo mb return just IFlatEventOutcome | IFlatOutrightOutcome
const outcomeBetOrCurrentByIdSelector = (state: IWithMyBetsState, outcomeId: string) => {
  const pick = editingBetPickByOutcomeId(outcomeId)(state);

  if (pick) {
    return {
      id: pick.outcome.id,
      coefficient: pick.coefficient,
      updatedAt: Number(pick.outcome.result.updatedAt),
      parameters: pick.outcome.parameters,
      translatesForManuallyCreated: pick.outcome.translatesForManuallyCreated,
      eventId: pick.event?.id,
      marketId: pick.market?.id,
      outrightId: pick.outright?.id,
    };
  }

  return outcomeByIdSelector(state, outcomeId);
};

const outcomeHistoryMyBetsSelector = (state: IWithMyBetsState) => myBetsSelector(state).outcomeHistory;

const isIncreaseOddByOutcomeHistorySelector = (outcomeId, coefficient) => (state: IWithMyBetsState) => {
  const prevOutcome = Object.values(outcomeHistoryMyBetsSelector(state)).find((it) => it[outcomeId]);

  if (!prevOutcome) {
    return false;
  }

  return coefficient > prevOutcome[outcomeId];
};

const editableBetNotAppliedPicksSelector = createMemoSelector(
  [editableBetSelector],
  (editableBet) => {
    if (!editableBet) {
      return [];
    }

    return editableBet.picks.filter(({ applied }) => !applied);
  },
);

const editableBetAppliedPicksSelector = createMemoSelector(
  [editableBetSelector],
  (editableBet) => {
    if (!editableBet) {
      return [];
    }

    return editableBet.picks.filter(({ applied }) => applied);
  },
);

const editableBetChangedSinceLastCommitSelector = (state: IWithMyBetsState) => editableBetSelector(state)?.changedSinceLastCommit;

const editableBetHasErrorSelector = (state: IWithMyBetsState, id: string) => {
  const editing = editingByBetIdSelector(id)(state);
  if (!editing) {
    return false;
  }

  const editableBet = editableBetSelector(state);

  return !!editableBet?.lastSaveError;
};

export {
  betsMyBetsSelector,
  pendingMyBetsSelector,
  cursorMyBetsSelector,
  whereMyBetsSelector,
  orderByMyBetsSelector,
  filterMyBetsSelector,
  hasNextPageMyBetsSelector,
  selectAllBetsWhereCashOutAllowed,
  betByIdSelector,
  hasEditableBet,
  betHistoryByBetIdSelector,
  hasOpenedBetsSelector,
  openedBetsCountSelector,
  cashoutHistoryByBetIdSelector,
  addingEditableBetSelector,
  changedEditableBetSelector,
  editableBetSelector,
  editableBetNotNilSelector,
  editableBetPicksSelector,
  savingEditableBetSelector,
  skipEditBetTutorialSelector,
  skipAddSelectionTipSelector,
  pickHasConflictByIdSelector,
  cashOutHistoryByContractSelector,
  editingByBetIdSelector,
  editingBetPickByOutcomeId,
  cannotUpdateMyBetsSelector,
  countPerPageMyBetsSelector,
  timeRangeMyBetsSelector,
  hasPreviousPageMyBetsSelector,
  isAvailableForCashOutFilterSelector,
  payoutByBetIdSelector,
  outcomeBetOrCurrentByIdSelector,
  editableBetPickByIdSelector,
  isIncreaseOddByOutcomeHistorySelector,
  editableBetNotAppliedPicksSelector,
  editableBetAppliedPicksSelector,
  editableBetChangedSinceLastCommitSelector,
  editableBetHasErrorSelector,
  canShowLoadMoreButtonSelector,
};
