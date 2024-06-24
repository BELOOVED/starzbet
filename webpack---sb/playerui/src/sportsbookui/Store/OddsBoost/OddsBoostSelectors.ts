import { getNotNil, type IMoney, isNil, Money, not, sort, Time } from "@sb/utils";
import { isLive } from "@sb/betting-core/EEventStatusUtils";
import { type IOddsBoostEntryV2 } from "@sb/sdk/sportsbook/placebet/api/domain/oddsboost/dto/OddsBoostEntryV2";
import { type IOddsBoostDto } from "@sb/sdk/sportsbook/sportsbookread/api/domain/oddsboost/dto/OddsBoostDto";
import { type IOddsBoostMatcherV2 } from "@sb/sdk/sportsbook/placebet/api/domain/oddsboost/dto/OddsBoostMatcherV2";
import { type EEventStatus } from "@sb/betting-core/EEventStatus";
import { type TBettingType } from "@sb/sdk/sportsbook/placebet/api/domain/oddsboost/dto/BettingType";
import type { IBoostedBetCountRule } from "@sb/sdk/sportsbook/placebet/api/domain/oddsboost/matchrule/BoostedBetCountRule";
import type { IPerPlayerCountRule } from "@sb/sdk/sportsbook/placebet/api/domain/oddsboost/matchrule/PerPlayerCountRule";
import { type ITimeRangeRule } from "@sb/sdk/sportsbook/placebet/api/domain/oddsboost/matchrule/TimeRangeRule";
import { type IPlayerRegisteredAgoRule } from "@sb/sdk/sportsbook/placebet/api/domain/oddsboost/matchrule/PlayerRegisteredAgoRule";
import { playerCurrencySelector } from "../../../common/Store/Player/Selectors/PlayerCurrencySelector";
import { localClientTimeZoneOffsetSelector } from "../../../common/Store/Player/Selectors/LocalClientTimeZoneOffsetSelector";
import { playerDetailsSelectors } from "../../../common/Store/Player/Selectors/PlayerSelectors";
import {
  coefficientByOutcomeIdSelector,
  notNilSelectEventById,
  selectFeedIdTreeByOutcomeId,
  selectMarketByOutcome,
} from "../Feed/Selectors/FeedSelectors";
import { isAccumulatorHash, isSingleHash } from "../BetSlip/Model/BetHash";
import {
  betGroupSelector,
  betSlipBetsSelector,
  betSlipIsFreeBetParlayCheckedSelector,
  betSlipIsUseFreeBetCheckedSelector,
  moneyBetByGroupSelector,
  outcomeIdListByDisablePicksSelector,
} from "../BetSlip/Selectors/BetSlipSelectors";
import { computeTotalCoefficient } from "../BetSlip/Model/ComputeTotalCoefficient";
import { betByIdSelector, editableBetNotNilSelector } from "../MyBets/Selectors/MyBetsSelectors";
import { coefficientContainersSelector } from "../BetSlip/Selectors/CoefficientContainersSelector";
import { invalidPickCountViewSelector, validPicksViewSelector } from "../BetSlip/Selectors/ViewSelectors/ValidPicksViewSelector";
import { EBetGroup } from "../BetSlip/Model/BetGroup";
import { betHashForMultiViewSelector } from "../BetSlip/Selectors/ViewSelectors/BetSlipViewSelectors";
import { type TAppState } from "../InitialState";
import { type IFeedTree } from "../Feed/Model/IFeedTree";
import { getOddsBoostSize } from "./Model/OddsBoost";
import { type IWithOddsBoost } from "./OddsBoostState";

const selectAllOddsBoosts = (s: IWithOddsBoost) => s.oddsBoost.boosts;
const selectPlayerActivatedBoosts = (s: IWithOddsBoost) => s.oddsBoost.playerActivatedBoosts;

const expiryBoostCount = ({ boostedBetsCount }: IBoostedBetCountRule) => boostedBetsCount <= 0;

const expiryPerPlayer = ({ countPerPlayer }: IPerPlayerCountRule, boostId: string, state: TAppState) => {
  const playerActivatedBoosts = selectPlayerActivatedBoosts(state);
  const current = playerActivatedBoosts[boostId];

  return !!current && current >= countPerPlayer;
};

const expiryTimeRange = ({ timeRange: { from, to } }: ITimeRangeRule) => {
  const offset = localClientTimeZoneOffsetSelector();

  return !Time.isWithinInterval(Date.now(), { start: from, end: to }, { offset });
};

const expiryRegistrationDate = ({ maxSecondsSincePlayerRegistration }: IPlayerRegisteredAgoRule, boostId: string, state: TAppState) => {
  const offset = localClientTimeZoneOffsetSelector();

  const diff = Time.differenceInSeconds(Date.now(), Number(playerDetailsSelectors.createdAt(state)), { offset });

  return diff > maxSecondsSincePlayerRegistration;
};

const isUnresolvedHash = (hash: string) => !(isAccumulatorHash(hash) || isSingleHash(hash));

const isEnabled = ({ enabled }: IOddsBoostDto) => enabled;

const notRemoved = (boost: IOddsBoostDto) => "removedAt" in boost ? isNil(boost.removedAt) : true;

const inPlayerGroup = (state: TAppState) => ({ playerGroupIds }: IOddsBoostDto) => {
  if (playerGroupIds.length === 0) {
    return true;
  }

  const groupId = playerDetailsSelectors.groupId(state); //TODO why trigger on logged out?

  if (isNil(groupId)) {
    return false;
  }

  return playerGroupIds.includes(groupId);
};

const oddsBoostSizes = ["money", "maxBoostWinLimit", "minBoostWinLimit"] as const;

const onlyEntryWithPlayerCurrency = (state: TAppState, entries: IOddsBoostEntryV2[]) => entries.filter(({ bonusSize }) => (
  oddsBoostSizes.every((prop) => (
    prop in bonusSize
      ? Money.hasCurrency(bonusSize[prop], playerCurrencySelector(state))
      : true
  ))
));

type TResolver<T, B = string, S = TAppState> = (rule: T, boostId: B, state: S) => boolean;

interface IExpiryMathRules {
  boosted_bet_count: TResolver<IBoostedBetCountRule>;
  per_player_count: TResolver<IPerPlayerCountRule>;
  player_registered_ago: TResolver<IPlayerRegisteredAgoRule>;
  time_range: TResolver<ITimeRangeRule>;
}

const expiryMathRules: IExpiryMathRules = {
  ["boosted_bet_count"]: expiryBoostCount,
  ["per_player_count"]: expiryPerPlayer,
  ["player_registered_ago"]: expiryRegistrationDate,
  ["time_range"]: expiryTimeRange,
};

const isExpiredBoost = (state: TAppState) => (boost: IOddsBoostDto) => boost.matchRules
  .some(
    (rule) =>
      getNotNil(expiryMathRules[rule.type], ["OddsBoostSelectors", "isExpiredBoost"], "expiryMathRule")(
        rule as IBoostedBetCountRule & IPerPlayerCountRule & IPlayerRegisteredAgoRule & ITimeRangeRule, // Cast - incorrect generated types
        boost.id,
        state,
      ),
  );

const matchMatcherByTree = (pickInfoTree: IFeedTree, matcher: IOddsBoostMatcherV2) => {
  if (matcher.eventIds) {
    return matcher.eventIds.includes(pickInfoTree.eventId);
  }

  const matchingTree = [
    [pickInfoTree.tournamentId, matcher.tournamentId],
    [pickInfoTree.categoryId, matcher.categoryId],
    [pickInfoTree.sportId, matcher.sportId],
  ];

  return matchingTree
    .filter(([_, matcherObjectId]) => matcherObjectId)
    .every(([testObjectId, matcherObjectId]) => testObjectId === matcherObjectId);
};

const matchByBettingStatus = (bettingStatus: TBettingType, eventStatus: EEventStatus) => {
  switch (bettingStatus) {
    case "live":
      return isLive(eventStatus);
    case "pre_live":
      return !isLive(eventStatus);
    default:
      return true;
  }
};

const matchByMarketTypes = (matcher: IOddsBoostMatcherV2, state: TAppState, outcomeId: string) => {
  if (matcher.marketTypes.length === 0) {
    return true;
  }

  return matcher.marketTypes.includes(
    selectMarketByOutcome(state, outcomeId).type,
  );
};

const matchAllPicksByMatcher = (state: TAppState, matcher: IOddsBoostMatcherV2, picksInfoTree: Record<string, IFeedTree>): string[] =>
  Object.entries(picksInfoTree)
    .filter(([_, pickInfoTree]) => matchMatcherByTree(pickInfoTree, matcher))
    .filter(([outcomeId]) => matchByMarketTypes(matcher, state, outcomeId))
    .filter(([_, { eventId }]) => matchByBettingStatus(
      matcher.bettingType,
      notNilSelectEventById(state, eventId).status,
    ))
    .map(([outcomeId]) => outcomeId);

const addAll = (set: Set<unknown>, items: string[]) => items.reduce((s, i) => s.add(i), set);

const boostMatched = (state: TAppState, boost: IOddsBoostDto, picksInfoTree: Record<string, IFeedTree>) => {
  let coveredPicks = new Set();

  let match = false;

  boost.matchers.forEach((matcher) => {
    if (match) {
      return;
    }

    coveredPicks = addAll(
      coveredPicks,
      matchAllPicksByMatcher(state, matcher, picksInfoTree),
    );

    if (coveredPicks.size === Object.keys(picksInfoTree).length) {
      match = true;
    }
  });

  return match;
};

const matchEntryByStake = (entry: IOddsBoostEntryV2, stake: IMoney) => {
  const minStake = entry.minStake;
  const maxStake = entry.maxStake;

  if (!!minStake && Money.lessThan(stake, minStake)) {
    return false;
  }

  if (!maxStake) {
    return true;
  }

  return Money.lessThanOrEqual(stake, maxStake);
};

const matchEntryByCoefficient = (entry: IOddsBoostEntryV2, coefficient: number | undefined) => {
  const minCoefficient = entry.minCoefficient;

  if (isNil(minCoefficient)) {
    return true;
  }

  if (isNil(coefficient)) {
    return false;
  }

  return (
    coefficient > minCoefficient
  );
};

const matchEntryByPickRange = (entry: IOddsBoostEntryV2, countPicks: number) => {
  const pickRange = entry.pickRange;
  const from = pickRange.from;
  const to = pickRange.to;

  return (
    countPicks >= from && countPicks <= to
  );
};

const matchEntryByMinCoefficientPerPick = (entry: IOddsBoostEntryV2, outcomeIdList: string[], state: TAppState) => {
  const minCoefficientPerPick = entry.minCoefficientPerPick;

  if (isNil(minCoefficientPerPick)) {
    return true;
  }

  return !outcomeIdList.some((outcomeId) => coefficientByOutcomeIdSelector(state, outcomeId) < minCoefficientPerPick);
};

const matchEntry = (state: TAppState, entries: IOddsBoostEntryV2[], outcomeIdList: string[], stake: IMoney) => {
  const countPicks = Object.keys(outcomeIdList).length;

  let match: IOddsBoostEntryV2 | undefined;

  entries.forEach((entry) => {
    if (match || !matchEntryByPickRange(entry, countPicks)) {
      return;
    }

    if (!matchEntryByStake(entry, stake)) {
      return;
    }

    const hash = `${countPicks}/${countPicks}`;

    if (
      !matchEntryByCoefficient(
        entry,
        computeTotalCoefficient(coefficientContainersSelector(state, outcomeIdList), hash),
      )
    ) {
      return;
    }

    if (!matchEntryByMinCoefficientPerPick(entry, outcomeIdList, state)) {
      return;
    }

    match = entry;
  });

  return match;
};

const createPicksInfoTree = (outcomeIdList: string[], state: TAppState) => outcomeIdList.reduce<Record<string, IFeedTree>>(
  (map, outcomeId) => {
    const tree = selectFeedIdTreeByOutcomeId(state, outcomeId);

    if (!tree) {
      return map;
    }

    return {
      ...map,
      [outcomeId]: tree,
    };
  },
  {},
);

const selectEntry = (outcomeIdList: string[], stake: IMoney, state: TAppState) => {
  const picksInfoTree = createPicksInfoTree(outcomeIdList, state);

  const notExpiredBoosts = sort(
    (a, b) => a.priority - b.priority,
    selectAllOddsBoosts(state)
      .filter(isEnabled)
      .filter(notRemoved)
      .filter(inPlayerGroup(state))
      .filter(not(isExpiredBoost(state)))
      .filter((boost) => boostMatched(state, boost, picksInfoTree)),
  );

  let result: IOddsBoostEntryV2 | undefined;

  notExpiredBoosts.forEach((boost) => {
    if (result) {
      return;
    }

    const entry = matchEntry(
      state,
      onlyEntryWithPlayerCurrency(state, boost.entries),
      outcomeIdList,
      stake,
    );

    if (entry) {
      result = entry;
    }
  });

  return result;
};

const selectEntryForPicks = (outcomeIdList: string[], stake: IMoney, state: TAppState) => {
  if (Money.lessThanOrEqual(stake, Money.getZero(stake.currency))) {
    return undefined;
  }

  return selectEntry(outcomeIdList, stake, state);
};

const selectOddBoostByBetId = (state: TAppState, betId: string) => {
  const bet = betByIdSelector(betId)(state);

  if (!bet) {
    return undefined;
  }

  const { boost, totalPotentialPayout, totalStake } = bet;

  if (!boost) {
    return undefined;
  }

  return getOddsBoostSize(Money.subtract(totalPotentialPayout, totalStake), boost.size);
};

const hasFreebet = (outcomeIdList: string[], state: TAppState) => {
  const group = betGroupSelector(state);

  if (group === EBetGroup.single) {
    return outcomeIdList.some((id) => betSlipIsUseFreeBetCheckedSelector(state, id));
  }

  if (group === EBetGroup.multi) {
    return betSlipIsFreeBetParlayCheckedSelector(state);
  }

  return false;
};

const selectOddBoostForPicks = (state: TAppState, outcomeIdList: string[], stake: IMoney, hash: string) => {
  if (isUnresolvedHash(hash)) {
    return undefined;
  }

  if (hasFreebet(outcomeIdList, state)) {
    return undefined;
  }

  const entry = selectEntryForPicks(outcomeIdList, stake, state);

  if (!entry) {
    return undefined;
  }

  const coefficientContainers = coefficientContainersSelector(state, outcomeIdList);

  if (coefficientContainers.length === 0) {
    return undefined;
  }

  return getOddsBoostSize(
    Money.subtract(Money.multiply(stake, getNotNil(computeTotalCoefficient(coefficientContainers, hash), ["OddsBoostSelectors", "selectOddBoostForPicks"], "Total Coefficient")), stake),
    entry.bonusSize,
  );
};

const selectTotalOddsBoostForSingle = (state: TAppState) => {
  const disabled = outcomeIdListByDisablePicksSelector(state);

  const boostList = Object.entries(betSlipBetsSelector(state))
    .filter(([hash]) => isSingleHash(hash))
    .flatMap(([hash, value]) => Object
      .entries(value)
      .filter(([id, { applyBoost }]) => applyBoost && !disabled.includes(id))
      .map(([id, stake]) => selectOddBoostForPicks(state, [id], stake.money, hash)))
    .filter(Boolean);

  return boostList.length === 0
    ? void 0
    : Money.sum(...boostList);
};

const selectBoostIdForPicks = (state: TAppState, outcomeIdList: string[], stake: IMoney, hash: string) => {
  if (isUnresolvedHash(hash)) {
    return null;
  }

  if (hasFreebet(outcomeIdList, state)) {
    return undefined;
  }

  const entry = selectEntryForPicks(outcomeIdList, stake, state);

  if (!entry) {
    return null;
  }

  return selectAllOddsBoosts(state)
    .find(({ entries }) => entries.some(({ id }) => id === entry.id))?.id ?? null;
};

const totalOddBoostForMultiViewSelector = (state: TAppState) => (
  invalidPickCountViewSelector(state)
    ? 0
    : selectOddBoostForPicks(
      state,
      validPicksViewSelector(state).map(({ outcomeId }) => outcomeId),
      moneyBetByGroupSelector(EBetGroup.multi)(state),
      betHashForMultiViewSelector(state),
    )
);

const oddBoostByEditBetPicksSelector = (state: TAppState) => {
  const editBet = editableBetNotNilSelector(state);

  return selectOddBoostForPicks(
    state,
    editBet.picks.filter(({ removed }) => !removed).map(({ outcomeId }) => outcomeId),
    editBet.additionalStakeAmount,
    editBet.hash,
  );
};

export {
  selectOddBoostByBetId,
  selectOddBoostForPicks,
  selectTotalOddsBoostForSingle,
  selectBoostIdForPicks,
  totalOddBoostForMultiViewSelector,
  oddBoostByEditBetPicksSelector,
};
