// @ts-nocheck
import { isLive } from "@sb/betting-core/EEventStatusUtils";
import { isNotNil, Money } from "@sb/utils";
import { cashOutAvailableMarkets } from "@sb/betting-core/CashOutAvailableMarkets";
import { EOutcomeResult } from "@sb/betting-core/EOutcomeResult";
import { isSettled } from "../../../Utils/IsSettled";
import { Numeric } from "../../../Utils/Numeric";
import { isBanker, isSingleHash, isSystemHash } from "../../BetSlip/Model/BetHash";
import {
  eventByIdSelector,
  marketByIdSelector,
  outcomeByIdSelector,
  scopeByIdSelector,
  tournamentByIdSelector,
} from "../../Feed/Selectors/FeedSelectors";
import { cashOutMoneyMapSelector } from "../../CashOut/CashOutSelectors";
import { computeTotalCoefficient } from "../../BetSlip/Model/ComputeTotalCoefficient";
import { hasLocked, hasSomeLocked } from "../../Feed/Model/Outcome/HasLocked";
import { isOutrightKind, isOutrightPick } from "../../Feed/Model/Outright";
import { isVirtual } from "../../Feed/Model/Sport";
import { betByIdSelector } from "../Selectors/MyBetsSelectors";
import { type IWithMyBetsState } from "../MyBetsState";
import { isCanceled, isCashOuted } from "./BetStatusEnum";
import { type TBetHistoryOutrightPick, type TBetHistoryPick } from "./TBet";

const editBetProbability = 1.1;

const minPercentOfTotalStake = 0.25;

const allowableOutcomeChange = 0.5;

const equalZero = (bet, state) => {
  const cashOutMoneyMap = cashOutMoneyMapSelector(state);

  return !cashOutMoneyMap[bet.id] || Money.isZero(cashOutMoneyMap[bet.id]);
};

const getEditBetCoefficient = (bet) => {
  const coefficientContainers = bet.picks.map(({
    coefficient,
    banker,
    result,
    outright,
    event,
    "@kind": kind,
  }) => {
    let resultCoefficient = coefficient;

    switch (result) {
      case EOutcomeResult.loss: {
        resultCoefficient = 0;

        break;
      }

      case EOutcomeResult.half_win: {
        resultCoefficient = Numeric.div(Numeric.plus(coefficient, 1), 2);

        break;
      }

      case EOutcomeResult.half_loss: {
        resultCoefficient = 0.5;

        break;
      }

      case EOutcomeResult["_return"]: {
        resultCoefficient = 1;

        break;
      }
    }

    return {
      coefficient: resultCoefficient,
      outrightId: isOutrightKind(kind)
        ? outright.id
        : undefined,
      eventId: isOutrightKind(kind)
        ? undefined
        : event.id,
      banker,
    };
  });

  return computeTotalCoefficient(coefficientContainers, bet.hash);
};

const highProbability = (bet) => {
  const current = getEditBetCoefficient(bet);

  if (!current) {
    return true;
  }

  const editBetCoefficient = Numeric.div(bet.totalPotentialCoefficient, current);

  return editBetCoefficient > editBetProbability;
};

const isLiveBet = ({ live }) => live;

const hasSettledPick = (bet) => bet.picks.some((pick) => pick.result !== "no_result");

const hasOutrightPick = (bet) => bet.picks.some(isOutrightPick);

const hasLivePick = (bet, state) => bet.picks.some(
  (pick) => !isOutrightPick(pick) && isLive(eventByIdSelector(state, pick.event.id)?.status),
);

const notAvailableByTournament = (bet, state) => bet.picks.some((pick) => {
  const tournamentId = isOutrightPick(pick)
    ? pick.outright.tournament.id
    : pick.event.tournament.id;

  const tournament = tournamentByIdSelector(state, tournamentId);

  if (!tournament) {
    return true;
  }

  return !tournament.cashOutAvailable;
});

const notAvailableByMarket = (bet) => bet.picks.some((pick) => {
  if (isOutrightPick(pick)) {
    return true;
  }

  const bySport = cashOutAvailableMarkets[pick.event.sport.id];

  if (!bySport) {
    return true;
  }

  const byScope = bySport[pick.market.scope.type];

  if (!byScope) {
    return true;
  }

  return !byScope.includes(pick.market.type);
});

const hasLockedPick = (bet, state) => bet.picks.some((pick) => {
  const outcomeFromLine = outcomeByIdSelector(state, pick.outcome.id);

  if (!outcomeFromLine) {
    return false;
  }

  if (isOutrightPick(pick)) {
    return hasLocked(outcomeFromLine);
  }

  const marketFromLine = marketByIdSelector(state, pick.market.id);

  const scopeFromLine = scopeByIdSelector(state, pick.market.scope.id);

  const eventFromLine = eventByIdSelector(state, pick.event.id);

  return hasSomeLocked(eventFromLine, scopeFromLine, marketFromLine, outcomeFromLine);
});

const hasEdited = (bet) => bet.betStatesCount > 0;

const isSystem = (bet) => isSystemHash(bet.hash);

const isBankerBet = (bet) => isBanker(bet.hash);

const lessThanTotalStake = (bet, state) => {
  const cashOutMoneyMap = cashOutMoneyMapSelector(state);

  const cashOut = cashOutMoneyMap[bet.id];

  return cashOut && Money.lessThan(cashOut, Money.multiply(bet.totalStake, minPercentOfTotalStake));
};

const tooMuchOutcomeChange = (bet, state) => {
  if (isSingleHash(bet.hash)) {
    return false;
  }

  return bet.picks.some(({ outcome, coefficient }) => {
    const current = outcomeByIdSelector(state, outcome.id);

    if (!current) {
      return true;
    }

    const rate = Numeric.minus(1, Numeric.div(coefficient, current.coefficient));

    return rate >= allowableOutcomeChange;
  });
};

const isBonusBet = (bet) => {
  const betBonus = bet.betBonus;

  return betBonus && [betBonus.bonusBetAmount, betBonus.freeBetAmount].some((it) => !Money.isZero(it));
};

const isBetPlacedToClaimBonus = (bet) => bet.betPlacedToClaimBonus;

const isVirtualGameBet = (bet) => bet.picks.some((pick) => pick.event && isVirtual(pick.event.sport.id));

const hasOddsBoost = (bet) => isNotNil(bet.boost);

// if some of this rule is true edit bet not allowed
const editBetRules = {
  isLiveBet,
  isCanceled,
  isSystem,
  isSettled,
  isBankerBet,
  hasOutrightPick,
  hasSettledPick,
  hasLivePick,
  highProbability,
  hasLockedPick,
  isBonusBet,
  isBetPlacedToClaimBonus,
  isVirtualGameBet,
  hasOddsBoost,
};

const cashOutRules = {
  isSystem,
  isCanceled,
  isSettled,
  isCashOuted,
  hasSettledPick,
  hasOutrightPick,
  hasEdited,
  equalZero,
  notAvailableByTournament,
  notAvailableByMarket,
  hasLockedPick,
  lessThanTotalStake,
  tooMuchOutcomeChange,
  isBonusBet,
  isBetPlacedToClaimBonus,
  hasOddsBoost,
};

const getReasonsByRules = (rules) => (bet, state) => Object.entries(rules)
  .filter(([_, rule]) => rule(bet, state))
  .map(([reason]) => reason);

const getNotEditableReasons = getReasonsByRules(editBetRules);

const getCashOutReasons = getReasonsByRules(cashOutRules);

const canEditMyBet = (state, betId) => getNotEditableReasons(betByIdSelector(betId)(state), state).length === 0;

const canCashOutMyBet = (state, betId) => getCashOutReasons(betByIdSelector(betId)(state), state).length === 0;

const isNotRemoved = ({ removed }) => !removed;

const isNotDuplicate = ({ outcomeId }, _, arr) => arr.filter((pick) => pick.outcomeId === outcomeId).length === 1;

// find bet in bet history be id
const selectMyBetById = (s: IWithMyBetsState, id: string) => s.myBets.bets.find((bet) => bet.id === id);

const isOutrightBetPick = (pick: TBetHistoryPick | TBetHistoryPick): pick is TBetHistoryOutrightPick | TBetHistoryOutrightPick => "outright" in pick;

export {
  isSystem,
  getNotEditableReasons,
  canEditMyBet,
  canCashOutMyBet,
  isNotRemoved,
  isNotDuplicate,
  selectMyBetById,
  isOutrightBetPick,
};
