// @ts-nocheck
import { Money, type TReducer } from "@sb/utils";
import {
  availableBonusesWithoutInvalidatedMatchResultsSelector,
  platformBonusesSelector,
  platformIsFreeBetPossibleSelector,
} from "../../../../platformui/Store/Bonuses/Selectors/BonusesSelectors";
import { playerSelectors } from "../../../../common/Store/Player/Selectors/PlayerSelectors";
import { activeBonusWithWageringNullableSelector } from "../../../../platformui/Store/Bonuses/Selectors/BetSlip/SelectorsNeededToSplit";
import { playerCurrencySelector } from "../../../../common/Store/Player/Selectors/PlayerCurrencySelector";
import {
  eventsSelector,
  marketByIdSelector,
  marketsSelector,
  outcomeByIdSelector,
  participantsByEventIdSelector,
  scopeByMarketIdSelector,
} from "../../Feed/Selectors/FeedSelectors";
import { hasEditableBet } from "../../MyBets/Selectors/MyBetsSelectors";
import { getVirtualGameCoefficientMap } from "../../Virtual/Common/Model/GetCoefficient";
import { getVirtualGameOutcomeParametersMap } from "../../Virtual/Common/Model/GetOutcomeParameters";
import { getVirtualGameMarketIdByOutcomeId } from "../../Virtual/Common/Model/GetOutcomeId";
import { type TAppState } from "../../InitialState";
import { generateFoldAndSystemHashes, singleHash } from "../Model/BetHash";
import {
  betGroupSelector,
  betSlipPlacingSelector,
  hasDifferentTypeOfPicksSelector,
  hasVirtualGamePickSelector,
} from "../Selectors/BetSlipSelectors";
import { EBetGroup } from "../Model/BetGroup";
import { BasePick, pickKind, VirtualGamePick } from "../Model/BetPick";
import { type betSlipCreatePickAction } from "../BetSlipActions";

const getNextGroup = (picks, currentGroup) => {
  if (currentGroup !== EBetGroup.single || picks.length > 2) {
    return currentGroup;
  }

  if (picks.some((pick) => pick.outrightId)) {
    return currentGroup;
  }

  const hashes = generateFoldAndSystemHashes(picks);

  return hashes.length === 0
    ? currentGroup
    : EBetGroup.multi;
};

const noBonusesSelectors = [
  (s) => platformBonusesSelector(s) === void 0,
  (s) => availableBonusesWithoutInvalidatedMatchResultsSelector(s).length === 0,
  (s) => playerSelectors.details(s) === void 0,
];

const handleForBonuses = (id, state) => {
  if (noBonusesSelectors.some((selector) => selector(state))) {
    return state;
  }

  const hasVirtualGamePick = hasVirtualGamePickSelector(state);

  if (hasVirtualGamePick) {
    return state;
  }

  const isFreeBetPossible = platformIsFreeBetPossibleSelector(state);
  const activeBonusWithWagering = activeBonusWithWageringNullableSelector(state);

  const outcome = outcomeByIdSelector(state, id);

  const useFreeBetCheckedMap = isFreeBetPossible && !outcome?.outrightId
    ? { ...state.betSlip.useFreeBetCheckedMap, [id]: true }
    : state.betSlip.useFreeBetCheckedMap;

  const useBonusBalanceCheckedMap = activeBonusWithWagering && !outcome?.outrightId
    ? { ...state.betSlip.useBonusBalanceCheckedMap, [id]: true }
    : state.betSlip.useBonusBalanceCheckedMap;

  return {
    ...state,
    betSlip: {
      ...state.betSlip,
      useFreeBetCheckedMap,
      useBonusBalanceCheckedMap,
      useFreeBetForParlayChecked: Object.values(useFreeBetCheckedMap).filter(Boolean).length > 1,
      useBonusBalanceForParlayChecked: Object.values(useBonusBalanceCheckedMap).filter(Boolean).length > 1,
    },
  };
};

const createBasePick = (state, outcomeId) => {
  const {
    marketId,
    outrightId,
    coefficient,
    updatedAt,
  } = outcomeByIdSelector(state, outcomeId);

  let basePick = {};

  if (outrightId) {
    basePick = new BasePick({
      outcomeId,
      outrightId,
      coefficient,
      updatedAt,
    });
  } else {
    const { eventId } = marketByIdSelector(state, marketId);

    basePick = new BasePick({
      outcomeId,
      eventId,
      marketId,
      coefficient,
      updatedAt,
    });
  }

  return [...state.betSlip.picks, basePick];
};

const createVirtualGamePick = (state, outcomeId) => {
  const markets = marketsSelector(state);
  const events = eventsSelector(state);
  const timeNow = new Date().getTime();

  const { marketId, outcome } = getVirtualGameMarketIdByOutcomeId(outcomeId);

  const eventId = markets[marketId].eventId;
  const event = events[eventId];
  const sportId = event.sportId;
  const participants = participantsByEventIdSelector(state, eventId);
  const market = marketByIdSelector(state, marketId);
  const scope = scopeByMarketIdSelector(state, marketId);
  const outcomeParameters = getVirtualGameOutcomeParametersMap[sportId](market.type, outcome);
  const coefficient = getVirtualGameCoefficientMap[sportId](market.type, outcome, market.parameters);

  const virtualPick = new VirtualGamePick({
    outcomeId,
    eventId,
    marketId,
    sportId,
    coefficient,
    scope,
    market,
    event,
    participants,
    outcomeParameters,
    updatedAt: timeNow,
  });

  return [...state.betSlip.picks, virtualPick];
};

const getPickByKindMap = {
  [pickKind.base]: createBasePick,
  [pickKind.virtualGame]: createVirtualGamePick,
};

const betSlipCreatePickReducer: TReducer<TAppState, typeof betSlipCreatePickAction> = (
  state,
  {
    payload: {
      kind,
      id,
    },
  },
) => {
  if (betSlipPlacingSelector(state) || hasEditableBet(state) || hasDifferentTypeOfPicksSelector(kind, id)(state)) {
    return state;
  }
  const currency = playerCurrencySelector(state);

  const bet = {
    ...state.betSlip.bets[singleHash],
    [id]: {
      money: state.betSlip.multipleSingle.stake.money ?? Money.getZero(currency),
      input: state.betSlip.multipleSingle.stake.input ?? null,
      applyBoost: false,
    },
  };

  const picks = getPickByKindMap[kind](state, id);

  return handleForBonuses(
    id,
    {
      ...state,
      betSlip: {
        ...state.betSlip,
        group: getNextGroup(picks, betGroupSelector(state)),
        picks,
        bets: {
          [singleHash]: bet,
        },
        betsPerGroup: {
          ...state.betSlip.betsPerGroup,
          [EBetGroup.single]: bet,
        },
      },
    },
  );
};

export { betSlipCreatePickReducer };
