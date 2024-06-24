import negate from "lodash/fp/negate";
import { type IWithOutcomeId } from "../../../../Model/Bet";
import { betSlipState, type IWithBetSlipState } from "../../BetSlipState";
import { generateFoldAndSystemHashes, isAccumulatorHash, singleHash } from "../../Model/BetHash";
import { EBetGroup } from "../../Model/BetGroup";
import type { BasePick, VirtualGamePick } from "../../Model/BetPick";

const isRemoved = (id: string) => ({ outcomeId }: IWithOutcomeId) => id !== outcomeId;

const getNextGroup = (picks: (BasePick | VirtualGamePick)[], currentGroup: EBetGroup) => {
  if (currentGroup === EBetGroup.system) {
    return generateFoldAndSystemHashes(picks).filter(negate(isAccumulatorHash)).length === 0 || picks.length < 3
      ? EBetGroup.multi
      : currentGroup;
  }

  if (currentGroup === EBetGroup.multi) {
    return generateFoldAndSystemHashes(picks).filter(isAccumulatorHash).length === 0
      ? EBetGroup.single
      : currentGroup;
  }

  return currentGroup;
};

const clearBankerFromPicks = (picks: (BasePick | VirtualGamePick)[], currentGroup: EBetGroup) => {
  if (picks.length >= 3 || currentGroup !== EBetGroup.system) {
    return picks;
  }

  return picks.map((pick) => pick.copyWith({ banker: false }));
};

const betSlipRemovePickHandler = (state: IWithBetSlipState, id: string) => {
  const picks = state.betSlip.picks.filter(isRemoved(id));

  if (picks.length === 0) {
    return {
      ...state,
      betSlip: {
        ...state.betSlip,
        group: EBetGroup.single,
        picks,
        bets: betSlipState.betSlip.bets,
        betsPerGroup: betSlipState.betSlip.betsPerGroup,
        multipleSingle: betSlipState.betSlip.multipleSingle,
        useFreeBetCheckedMap: {},
        useBonusBalanceCheckedMap: {},
        useFreeBetForParlayChecked: false,
        useBonusBalanceForParlayChecked: false,
      },
    };
  }

  const singleHashBet = state.betSlip.bets[singleHash];

  const bet = singleHashBet
    ? Object.entries(singleHashBet).reduce(
      (acc, [outcomeId, bet]) => (outcomeId === id
        ? acc
        : { ...acc, [outcomeId]: bet }),
      {},
    )
    : {};

  const useFreeBetCheckedMap = { ...state.betSlip.useFreeBetCheckedMap };

  const useBonusBalanceCheckedMap = { ...state.betSlip.useBonusBalanceCheckedMap };

  if (useFreeBetCheckedMap[id]) {
    delete useFreeBetCheckedMap[id];
  }
  if (useBonusBalanceCheckedMap[id]) {
    delete useBonusBalanceCheckedMap[id];
  }

  return {
    ...state,
    betSlip: {
      ...state.betSlip,
      group: getNextGroup(picks, state.betSlip.group),
      picks: clearBankerFromPicks(picks, state.betSlip.group),
      bets: {
        ...state.betSlip.bets,
        [singleHash]: bet,
      },
      betsPerGroup: {
        ...state.betSlip.betsPerGroup,
        [EBetGroup.single]: bet,
      },
      useFreeBetCheckedMap,
      useBonusBalanceCheckedMap,
      useFreeBetForParlayChecked: Object.values(useFreeBetCheckedMap).filter(Boolean).length > 1,
      useBonusBalanceForParlayChecked: Object.values(useBonusBalanceCheckedMap).filter(Boolean).length > 1,
    },
  };
};

export { betSlipRemovePickHandler };
