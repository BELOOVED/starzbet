import { createMemoSelector, getNotNil, isNotNil, Money, useParamSelector } from "@sb/utils";
import { isFlatOutrightOutcome } from "@sb/betting-core/Feed/Utils";
import { computeTotalCoefficient, type TCoefficientContainer } from "../../BetSlip/Model/ComputeTotalCoefficient";
import { marketsSelector, outcomeByIdSelector } from "../../Feed/Selectors/FeedSelectors";
import { computeCountOfParlay } from "../../BetSlip/Model/ComputeCountOfParlay";
import { type IWithFeed } from "../../Feed/FeedState";
import { editableBetNotNilSelector } from "../Selectors/MyBetsSelectors";
import { type IWithMyBetsState } from "../MyBetsState";

const nextCoefficientContainerSelector = createMemoSelector(
  [
    outcomeByIdSelector,
    marketsSelector,
  ],
  (nullableOutcome, nullableMarkets): TCoefficientContainer => {
    // todo mb move this assertion in outcomeByIdSelector/marketsSelector selectors (need to view all cases)
    const outcome = getNotNil(nullableOutcome, ["nextCoefficientContainerSelector"], "outcome");

    if (isFlatOutrightOutcome(outcome)) {
      return ({
        coefficient: outcome.coefficient.toString(),
        banker: false,
        outrightId: outcome.outrightId,
        eventId: undefined,
      });
    }

    // todo mb move this assertion in outcomeByIdSelector/marketsSelector selectors (need to view all cases)
    const markets = getNotNil(nullableMarkets, ["nextCoefficientContainerSelector"], "markets");

    return ({
      coefficient: outcome.coefficient.toString(),
      banker: false,
      outrightId: undefined,
      eventId: getNotNil(markets[outcome.marketId], ["nextCoefficientContainerSelector"], "market").eventId,
    });
  },
);

const prevCoefficientContainersSelector = createMemoSelector(
  [
    editableBetNotNilSelector,
    (_, prevId: string) => prevId,
  ],
  (editBet, prevId): TCoefficientContainer[] => editBet.picks
    .filter(({ outcomeId }) => outcomeId !== prevId)
    .map<TCoefficientContainer>((pick) => {
      const isOutrightPick = isNotNil(pick.outrightId);

      if (isOutrightPick) {
        return ({
          coefficient: pick.coefficient.toString(),
          outrightId: getNotNil(pick.outrightId, ["prevCoefficientContainersSelector"], "outrightId"),
          eventId: undefined,
          banker: false,
        });
      }

      return {
        coefficient: pick.coefficient.toString(),
        outrightId: undefined,
        eventId: getNotNil(pick.eventId, ["prevCoefficientContainersSelector"], "eventId"),
        banker: false,
      };
    }),
);

const potentialPayoutAfterEditBetSelector = <S extends IWithFeed & IWithMyBetsState>(state: S, prevId: string, nextId: string) => {
  const prevCoefficientContainers = prevCoefficientContainersSelector(state, prevId);

  const nextCoefficientContainer = nextCoefficientContainerSelector(state, nextId);

  const editBet = editableBetNotNilSelector(state);

  const coefficientContainers = [...prevCoefficientContainers, nextCoefficientContainer];

  const totalCoefficient = getNotNil(
    computeTotalCoefficient(coefficientContainers, editBet.hash),
    ["potentialPayoutAfterEditBetSelector"],
    "totalCoefficient",
  );

  return Money.multiply(
    Money.divide(editBet.additionalStakeAmount, computeCountOfParlay(editBet.hash, coefficientContainers)),
    totalCoefficient,
  );
};

const usePotentialPayoutAfterEditBet = (prevId: string, nextId: string) =>
  useParamSelector(potentialPayoutAfterEditBetSelector, [prevId, nextId]);

export { usePotentialPayoutAfterEditBet };
