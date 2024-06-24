import { type IMoney, Money } from "@sb/utils";
import { isLive } from "@sb/betting-core/EEventStatusUtils";
import { EOutcomeResult } from "@sb/betting-core/EOutcomeResult";
import { type IBetHistoryDto } from "@sb/sdk/sportsbook/sportsbookread/api/domain/bet/dto/BetHistoryDto";
import { Numeric } from "../../Utils/Numeric";
import { computeTotalCoefficient } from "../BetSlip/Model/ComputeTotalCoefficient";
import { eventByIdSelector, outcomeByIdNotNilSelector, outcomeByIdSelector } from "../Feed/Selectors/FeedSelectors";
import { isOutrightPick } from "../Feed/Model/Outright";
import { type TAppState } from "../InitialState";

const cashOutMargin = 0.10;

const minPercentOfTotalPayout = 0.85;

const someLivePick = (bet: IBetHistoryDto, s: TAppState) => bet.picks.some((pick) => {
  if(isOutrightPick(pick)){
    return false;
  }

  if (!("event" in pick)) {
    throw new Error("Event Pick doesn't contain event info");
  }

  const event = eventByIdSelector(s, pick.event.id);

  return event && isLive(event.status);
});

const minTotalPayout = (cashOut: IMoney, bet: IBetHistoryDto) => Money.min(
  cashOut,
  Money.multiply(bet.totalPotentialPayout, minPercentOfTotalPayout),
);

const computeTotalCoefficientOnPlaceBetMoment = (bet: IBetHistoryDto) => {
  const coefficientContainers = bet.picks.map((pick) => {
    const { coefficient, banker, result } = pick;

    let coefficientOnPlaceBetMoment = coefficient;

    switch (result){
      case EOutcomeResult.loss: {
        coefficientOnPlaceBetMoment = 0;

        break;
      }

      case EOutcomeResult.half_win: {
        coefficientOnPlaceBetMoment = Numeric.div(Numeric.plus(coefficient, 1), 2);

        break;
      }

      case EOutcomeResult.half_loss: {
        coefficientOnPlaceBetMoment = 0.5;

        break;
      }

      case EOutcomeResult["_return"]: {
        coefficientOnPlaceBetMoment = 1;

        break;
      }
    }

    const idInfo = "outright" in pick
      ? { outrightId: pick.outright.id, eventId: undefined }
      : { eventId: pick.event.id, outrightId: undefined };

    return {
      coefficient: String("oddAfterDelay" in pick
        ? (pick.oddAfterDelay || coefficientOnPlaceBetMoment)
        : coefficientOnPlaceBetMoment),
      ...idInfo,
      banker,
    };
  });

  return computeTotalCoefficient(coefficientContainers, bet.hash);
};

const computeTotalCoefficientOnCurrentMoment = (bet: IBetHistoryDto, s: TAppState) => {
  if(bet.picks.some(({ outcome }) => !outcomeByIdSelector(s, outcome.id))){
    return void 0;
  }

  const coefficientContainers = bet.picks.map((pick) => {
    let coefficient = 1;

    const { banker, result, outcome } = pick;

    if(result === EOutcomeResult.no_result) {
      const currentOutcome = outcomeByIdNotNilSelector(s, outcome.id);

      coefficient = currentOutcome.coefficient;
    }

    const idInfo = "outright" in pick
      ? { outrightId: pick.outright.id, eventId: undefined }
      : { eventId: pick.event.id, outrightId: undefined };

    return {
      coefficient: String(coefficient),
      ...idInfo,
      banker,
    };
  });

  return computeTotalCoefficient(coefficientContainers, bet.hash);
};

const computeCashOutCoefficient = (totalCoefficientOnPlaceBetMoment: number, totalCoefficientOnCurrentMoment: number, inLive: boolean) => {
  const cashOutCoefficient = Numeric.div(totalCoefficientOnPlaceBetMoment, totalCoefficientOnCurrentMoment);

  if (!inLive && cashOutCoefficient > 1) {
    return 1;
  }

  return cashOutCoefficient;
};

const computeMaxCashOut = (bet: IBetHistoryDto, s: TAppState) => {
  const totalCoefficientOnPlaceBetMoment = computeTotalCoefficientOnPlaceBetMoment(bet);

  const totalCoefficientOnCurrentMoment = computeTotalCoefficientOnCurrentMoment(bet, s);

  if (!totalCoefficientOnPlaceBetMoment || !totalCoefficientOnCurrentMoment) {
    return void 0;
  }

  const inLive = someLivePick(bet, s);

  const cashOutCoefficient = computeCashOutCoefficient(
    totalCoefficientOnPlaceBetMoment,
    totalCoefficientOnCurrentMoment,
    inLive,
  );

  const cashOutCoefficientIncludingMargin = Numeric.mul(cashOutCoefficient, 1 - cashOutMargin);

  const cashOutWithMargin = Money.multiply(bet.totalStake, cashOutCoefficientIncludingMargin);

  return inLive
    ? minTotalPayout(cashOutWithMargin, bet)
    : cashOutWithMargin;
};

export { computeMaxCashOut };
