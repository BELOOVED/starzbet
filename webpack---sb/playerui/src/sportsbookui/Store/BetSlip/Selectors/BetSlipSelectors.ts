// @ts-nocheck
import negate from "lodash/fp/negate";
import { createSelector } from "reselect";
import { createPropertySelector, createSimpleSelector, type IMoney, isNotNil, Money } from "@sb/utils";
import { playerCurrencySelector } from "../../../../common/Store/Player/Selectors/PlayerCurrencySelector";
import { always } from "../../../Utils/Always";
import { routeMap } from "../../../RouteMap/RouteMap";
import { eventsSelector, marketsSelector, sportIdByOutcomeIdSelector } from "../../Feed/Selectors/FeedSelectors";
import { isVirtual } from "../../Feed/Model/Sport";
import { getVirtualGameMarketIdByOutcomeId } from "../../Virtual/Common/Model/GetOutcomeId";
import { openedBetsCountSelector } from "../../MyBets/Selectors/MyBetsSelectors";
import { type TAppState } from "../../InitialState";
import { EPlaceBetError } from "../Model/EPlaceBetError";
import { singleHash } from "../Model/BetHash";
import { maxPicks } from "../Constants/MaxPicks";
import { EBetGroup } from "../Model/BetGroup";
import { type AbstractPick, BasePick, pickKind, VirtualGamePick } from "../Model/BetPick";
import { type IBetSlipState, type IWithBetSlipState } from "../BetSlipState";
import { isConflictedPick } from "../Model/ConlictedPick";
import { EBetSlipTab } from "../Model/BetSlipTab";
import type { TBetSlipBet } from "../Model/TBetSlip";

const betSlipSelector = (state: {
  betSlip: IBetSlipState;
}) => state.betSlip;

const multipleSingleSelector = createPropertySelector(betSlipSelector, "multipleSingle");
const multipleSingleStakeSelector = createPropertySelector(multipleSingleSelector, "stake");
const multipleSingleInputSelector = createPropertySelector(multipleSingleStakeSelector, "input");

const betGroupSelector = createPropertySelector(betSlipSelector, "group");

const isMultiGroupSelector = (state: IWithBetSlipState) => betGroupSelector(state) === EBetGroup.multi;

const betSlipPicksSelector = createPropertySelector(betSlipSelector, "picks");

const outcomeIdListByPicksSelector = (state) => betSlipPicksSelector(state).map(({ outcomeId }) => outcomeId);

const countPicksSelector = (state) => betSlipPicksSelector(state).length;

const hasBetSlipPicksSelector = (state) => countPicksSelector(state) > 0;

const countPerTabTypeSelector = (state: IWithBetSlipState, type: EBetSlipTab) => (
  type === EBetSlipTab.betConstructor ? countPicksSelector(state) : openedBetsCountSelector(state)
);

const betSlipPlacingSelector = createPropertySelector(betSlipSelector, "placing");

const betSlipCompleteSelector = createPropertySelector(betSlipSelector, "complete");

const betSlipErrorSelector = createPropertySelector(betSlipSelector, "error");

const betSlipLimitSelector = createPropertySelector(betSlipSelector, "limit");

const betSlipBetsSelector = createPropertySelector(betSlipSelector, "bets");

const betSlipMinimizeSelector = createPropertySelector(betSlipSelector, "minimize");

const betSlipPositionSelector = createPropertySelector(betSlipSelector, "position");

const betSlipBetsPerGroupSelector = createPropertySelector(betSlipSelector, "betsPerGroup");

const betSlipSystemHashSelector = createPropertySelector(betSlipSelector, "systemHash");

const betSlipUseFreeBetsCheckedMapSelector = createPropertySelector(betSlipSelector, "useFreeBetCheckedMap");

const betSlipIsUseFreeBetCheckedSelector = (
  state: IWithBetSlipState,
  outcomeId: string,
) => betSlipUseFreeBetsCheckedMapSelector(state)[outcomeId] ?? false;

const betSlipUseFreeBetsCheckedCountSelector = createSimpleSelector(
  [betSlipUseFreeBetsCheckedMapSelector],
  (map) => Object.values(map).filter(always).length,
);

const betSlipIsFreeBetParlayCheckedSelector = createPropertySelector(betSlipSelector, "useFreeBetForParlayChecked");

const betSlipUseBonusBalanceCheckedMapSelector = createPropertySelector(betSlipSelector, "useBonusBalanceCheckedMap");

const betSlipIsUseBonusBalanceCheckedSelector = (
  state: IWithBetSlipState,
  outcomeId: string,
) => betSlipUseBonusBalanceCheckedMapSelector(state)[outcomeId] ?? false;

const betSlipUseBonusBalanceCheckedCountSelector = createSimpleSelector(
  [betSlipUseBonusBalanceCheckedMapSelector],
  (map) => Object.values(map).filter(always).length,
);

const betSlipUseBonusBalanceForParlayCheckedSelector = createPropertySelector(betSlipSelector, "useBonusBalanceForParlayChecked");

const betSlipPromotionBonusIdSelector = createPropertySelector(betSlipSelector, "promotionBonusId");

const isMultiOrSystemBonusActiveSelector = createSimpleSelector(
  [
    betSlipIsFreeBetParlayCheckedSelector,
    betSlipUseBonusBalanceForParlayCheckedSelector,
    betSlipPromotionBonusIdSelector,
  ],
  (freebet, bonusBalance, promotion) => freebet || bonusBalance || isNotNil(promotion),
);

const moneyBetByGroupSelector = (group) => (state): IMoney => {
  if (group === EBetGroup.single) {
    throw new Error("cannot select stake for single bet by bet group.");
  }

  const currency = playerCurrencySelector(state);

  return betSlipBetsPerGroupSelector(state)?.[group]?.money ?? Money.getZero(currency);
};

const inputBetByGroupSelector = (group: EBetGroup) => (state: IWithBetSlipState): string | null => {
  if (group === EBetGroup.single) {
    throw new Error("cannot select input for single bet by bet group.");
  }

  // We assume that it will be record because EBetGroup won't be 'single'
  const groupBets = betSlipBetsPerGroupSelector(state) as Record<string, TBetSlipBet> | null;

  return groupBets?.[group]?.input ?? null;
};

const inputBetByActiveBetGroupSelector = (state: IWithBetSlipState) => {
  const activeGroup = betGroupSelector(state);

  return inputBetByGroupSelector(activeGroup)(state);
};

const betSlipPickByOutcomeIdSelector = (state: IWithBetSlipState, outcomeId: string) => betSlipPicksSelector(state)
  .find((pick) => pick.is(outcomeId));

const outcomeIdListByDisablePicksSelector = (state) => betSlipPicksSelector(state)
  .filter(({ disable }) => disable)
  .map(({ outcomeId }) => outcomeId);

const betSlipTabSelector = ({ betSlip: { tab } }: IWithBetSlipState) => tab;

const picksAreExceededSelector = ({ betSlip: { picks } }) => picks.length > maxPicks;

const changeStakeAmountSelector = ({ betSlip: { changeAmount } }: IWithBetSlipState) => changeAmount;

const notDisabledPicksSelector = (state) => (
  betSlipPicksSelector(state).filter(({ disable }) => !disable)
);

const countNotDisabledPicksSelector = (state) => notDisabledPicksSelector(state).length;

const betSlipPicksViewValidSelector = (picks: AbstractPick[]): AbstractPick[] => {
  const notDisabled = picks.filter(({ disable }) => !disable);

  const map = {};

  notDisabled.forEach((pick) => {
    if (pick.eventId) {
      map[pick.eventId] = pick;
    }

    if (pick.outrightId) {
      map[pick.outrightId] = pick;
    }
  });

  return Object.values(map);
};

const betSlipLimitErrorSelector = (state) => (
  (betSlipErrorSelector(state) || []).some(({ code }) => code === EPlaceBetError.betLimit)
);

const notDisabledSingleBetsSelector = createSelector(
  betSlipBetsSelector,
  betSlipPicksSelector,
  (bets, picks) => bets[singleHash]
    ? Object
      .entries(bets[singleHash])
      .filter(([outcomeId]) => picks.find((pick) => pick.is(outcomeId) && !pick.disable))
    : [],
);

const betSlipUseFreeBetsNotDisabledCheckedCountSelector = createSimpleSelector(
  [betSlipUseFreeBetsCheckedMapSelector, notDisabledSingleBetsSelector],
  (
    checkedMap,
    notDisabledSingleBets,
  ) => notDisabledSingleBets.filter(([outcomeId]) => checkedMap[outcomeId]).length,
);

const betSlipCoefficientByOutcomeIdSelector = (outcomeId) => createSelector(
  betSlipPicksSelector,
  (picks) => picks.find((pick) => pick.is(outcomeId)).coefficient,
);

const checkPickDifferentByKind = {
  [pickKind.base]: (pick) => pick instanceof VirtualGamePick,
  [pickKind.virtualGame]: (pick) => pick instanceof BasePick,
};

const hasDifferentTypeOfPicksSelector = (kind: keyof pickKind, outcomeId: string) => (state: TAppState) => {
  const picks = betSlipPicksSelector(state);

  const differentKind = picks.some(checkPickDifferentByKind[kind]);

  if (differentKind) {
    return true;
  }

  let sportId;
  if (kind === pickKind.virtualGame) {
    const markets = marketsSelector(state);
    const events = eventsSelector(state);
    const { marketId } = getVirtualGameMarketIdByOutcomeId(outcomeId);

    const eventId = markets[marketId].eventId;
    const event = events[eventId];
    sportId = event.sportId;
  } else {
    sportId = sportIdByOutcomeIdSelector(state, outcomeId);
  }

  const compareFn = isVirtual(sportId) ? negate(isVirtual) : isVirtual;

  return picks.some((pick) =>
    compareFn(
      pick instanceof BasePick
        ? sportIdByOutcomeIdSelector(state, pick.outcomeId)
        : pick.sportId,
    ));
};

const hasVirtualGamePickSelector = (state: TAppState) => {
  const picks = betSlipPicksSelector(state);

  const hasVirtualPick = picks.some((pick) => pick instanceof VirtualGamePick);

  if (hasVirtualPick) {
    return true;
  }

  return picks.some((pick: BasePick) => {
    const sportId = sportIdByOutcomeIdSelector(state, pick.outcomeId);

    return isVirtual(sportId);
  });
};

const hasOutrightPickSelector = (state: TAppState) => betSlipPicksSelector(state).some((pick) => pick.outrightId);

const conflictedPickByOutcomeIdSelector = createSelector(
  betSlipPicksSelector,
  (_, outcomeId: string) => outcomeId,
  isConflictedPick,
);

const selectESportPath = (live: boolean) => live
  ? routeMap.esport.live.event
  : routeMap.esport.preLive.event;
const selectCommonPath = (live: boolean) => live
  ? routeMap.live.event
  : routeMap.preLive.event;

export {
  selectCommonPath,
  selectESportPath,
  multipleSingleInputSelector,
  outcomeIdListByPicksSelector,
  countPicksSelector,
  hasBetSlipPicksSelector,
  countPerTabTypeSelector,
  betSlipPlacingSelector,
  betSlipCompleteSelector,
  betSlipErrorSelector,
  betSlipLimitSelector,
  betSlipBetsSelector,
  betSlipMinimizeSelector,
  betSlipPositionSelector,
  betSlipBetsPerGroupSelector,
  betSlipSystemHashSelector,
  betSlipUseFreeBetsCheckedMapSelector,
  betSlipUseFreeBetsNotDisabledCheckedCountSelector,
  betSlipIsUseFreeBetCheckedSelector,
  betSlipUseFreeBetsCheckedCountSelector,
  betSlipIsFreeBetParlayCheckedSelector,
  betSlipUseBonusBalanceCheckedMapSelector,
  betSlipIsUseBonusBalanceCheckedSelector,
  betSlipUseBonusBalanceCheckedCountSelector,
  betSlipUseBonusBalanceForParlayCheckedSelector,
  betSlipPromotionBonusIdSelector,
  moneyBetByGroupSelector,
  betSlipPickByOutcomeIdSelector,
  outcomeIdListByDisablePicksSelector,
  betSlipTabSelector,
  picksAreExceededSelector,
  betGroupSelector,
  changeStakeAmountSelector,
  countNotDisabledPicksSelector,
  betSlipPicksViewValidSelector,
  betSlipLimitErrorSelector,
  notDisabledSingleBetsSelector,
  betSlipCoefficientByOutcomeIdSelector,
  notDisabledPicksSelector,
  hasDifferentTypeOfPicksSelector,
  hasVirtualGamePickSelector,
  conflictedPickByOutcomeIdSelector,
  isMultiGroupSelector,
  hasOutrightPickSelector,
  inputBetByActiveBetGroupSelector,
  isMultiOrSystemBonusActiveSelector,
};
