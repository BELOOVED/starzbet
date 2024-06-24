import { getNotNil, isNotNil, Money } from "@sb/utils";
import {
  metadataForFoldAndSystemBetSelector,
  metadataForSingleBetSelector,
} from "../../../../platformui/Store/Bonuses/Selectors/BetSlip/BonusBetMetadataSelector";
import { partition } from "../../../Utils/Partition";
import { betStrategySelector } from "../../BetStrategy/Selectors/BetStrategySelectors";
import { type TAppState } from "../../InitialState";
import { selectBoostIdForPicks } from "../../OddsBoost/OddsBoostSelectors";
import { getDevice } from "../../Device/Model/EDevice";
import { extractBanker, isAccumulatorHash, isBanker, parseHash, toAccumulatorHash } from "../Model/BetHash";
import { computeCountOfParlay } from "../Model/ComputeCountOfParlay";
import { BasePick, type VirtualGamePick } from "../Model/BetPick";
import { type TBetSlipBet } from "../Model/TBetSlip";
import { isMultiOrSystemBonusActiveSelector } from "./BetSlipSelectors";

const resetPickBankerForRpc = (pick: BasePick | VirtualGamePick) => {
  if (pick instanceof BasePick) {
    return pick.copyWith({
      outcomeId: undefined,
      disable: undefined,
      banker: false,
      eventId: undefined,
      marketId: undefined,
      coefficient: undefined,
      outrightId: undefined,
      updatedAt: undefined,
    });
  }

  return pick;
};
const createPickDtos = (picks: (BasePick | VirtualGamePick)[]) => {
  const [outrightPicks, eventPicks] = partition((pick: BasePick | VirtualGamePick) => Boolean(pick.outrightId), picks);

  return {
    eventPicks: eventPicks.map((pick) => pick.toDto()),
    outrightPicks: outrightPicks.map((pick) => pick.toDto()),
  };
};

const placeSingleBetSelector =
    (state: TAppState, bet: Record<string, TBetSlipBet>, picks: (BasePick | VirtualGamePick)[], hash: string) => {
      const outcomeIds = Object.keys(bet);
      const outcomeIdsInPickOutcomeIds = outcomeIds.filter((outcomeId) => picks.find((pick) => pick.outcomeId === outcomeId));

      return outcomeIdsInPickOutcomeIds
        .filter((outcomeId) => isNotNil(bet[outcomeId])).map((outcomeId) => {
          const strategy = betStrategySelector(state);
          const device = getDevice();
          const outcome = getNotNil(bet[outcomeId], ["outcomeIdsInPickOutcomeIds"], "bet[outcomeId]");

          const totalStake = outcome.money;
          const metadata = metadataForSingleBetSelector(state, outcomeId, totalStake);

          const boostId = outcome.applyBoost && !metadata
            ? selectBoostIdForPicks(
              state,
              picks.map(({ outcomeId }) => outcomeId),
              totalStake,
              hash,
            )
            : null;
          const pick = getNotNil(
            picks.find((pick) => pick.outcomeId === outcomeId),
            ["outcomeIdsInPickOutcomeIds"],
            "pick.outcomeId",
          );

          const resetPick = resetPickBankerForRpc(pick);
          const pickDtos = createPickDtos([resetPick]);

          return {
            ...pickDtos,
            coefficientChangeStrategy: strategy,
            totalStake,
            boostId,
            hash,
            device,
            metadata,
          };
        });
    };

const placeFoldAndSystemBetSelector = (state: TAppState, bet: TBetSlipBet, picks: (BasePick | VirtualGamePick)[], hash: string) => {
  const strategy = betStrategySelector(state);
  const device = getDevice();
  const isActiveBonus = isMultiOrSystemBonusActiveSelector(state);
  const boostId = bet.applyBoost && !isActiveBonus
    ? selectBoostIdForPicks(
      state,
      picks.map(({ outcomeId }) => outcomeId),
      bet.money,
      hash,
    )
    : null;

  let pickDtos = createPickDtos(picks.map(resetPickBankerForRpc));

  if (isBanker(hash)) {
    const [simpleHash, bankersCount] = extractBanker(hash);

    const { list, total } = parseHash(simpleHash);

    if (isAccumulatorHash(simpleHash)) {
      const accHash = toAccumulatorHash(total + bankersCount);

      const totalStake = Money.multiply(
        bet.money,
        computeCountOfParlay(accHash, picks),
      );

      const metadata = metadataForFoldAndSystemBetSelector(state, totalStake);

      return ({
        ...pickDtos,
        coefficientChangeStrategy: strategy,
        totalStake,
        boostId,
        hash: accHash,
        device,
        metadata,
      });
    }

    if (list[0] === 1) {
      const [withBanker, notBankers] = partition((c: BasePick | VirtualGamePick) => c.banker, picks);

      const totalStake = bet.money;

      const metadata = metadataForFoldAndSystemBetSelector(state, totalStake);

      return isNotNil(notBankers)
        ? notBankers.map((notBanker) => {
          const picks = isNotNil(withBanker) ? [notBanker, ...withBanker] : [notBanker];

          return ({
            ...createPickDtos(picks.map(resetPickBankerForRpc)),
            coefficientChangeStrategy: strategy,
            totalStake,
            boostId,
            hash: toAccumulatorHash(picks.length),
            device,
            metadata,
          });
        })
        : [];
    }

    pickDtos = createPickDtos(picks);
  }
  const totalStake = Money.multiply(
    bet.money,
    computeCountOfParlay(hash, picks),
  );

  const metadata = metadataForFoldAndSystemBetSelector(state, totalStake);

  return ({
    ...pickDtos,
    coefficientChangeStrategy: strategy,
    totalStake,
    boostId,
    hash,
    device,
    metadata,
  });
};

export { placeFoldAndSystemBetSelector, placeSingleBetSelector };
