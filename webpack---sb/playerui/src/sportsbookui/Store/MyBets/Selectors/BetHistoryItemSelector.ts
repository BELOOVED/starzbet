import { isEmpty, sort } from "@sb/utils";
import { type TAppState } from "../../InitialState";
import { type TBetHistoryState, type TBetHistoryStateListItem, type TGetBetStatesResponse } from "../Model/TBet";
import { betByIdSelector, cashOutHistoryByContractSelector } from "./MyBetsSelectors";

function betHistoryItemSelector(betId: string, betState: TGetBetStatesResponse, state: TAppState): TBetHistoryState {
  const bet = betByIdSelector(betId)(state);

  if (!bet) {
    return { cashoutHistory: [], list: [] };
  }

  const {
    createdAt,
    hash,
    live,
    picks,
    totalStake,
    contract,
    totalPotentialPayout,
  } = bet;

  const currentBet = {
    hash,
    live,
    createdAt,
    totalStake,
    totalPotentialPayout,
    picks,
  };

  const cashoutHistory = cashOutHistoryByContractSelector(contract);

  const sorted = sort(
    (a, b) => a.createdAt - b.createdAt,
    betState,
  );

  const tail = sorted.at(-1);

  const lastTime = tail
    ? tail.createdAt
    : undefined;

  // move current time to neighbour
  let prevTime: number;

  sorted.forEach((item) => {
    if (!prevTime) {
      prevTime = item.createdAt;

      return;
    }

    const current = item.createdAt;

    item.createdAt = prevTime;

    prevTime = current;
  });

  const [first, ...rest] = sorted;

  const list: TBetHistoryStateListItem[] = isEmpty(sorted)
    ? [{ ...currentBet, original: true }]
    : [
      { ...first, original: true, createdAt },
      ...rest,
      { ...currentBet, createdAt: lastTime },
    ];

  return { list: addChangedFlag(list), cashoutHistory };
}

function addChangedFlag(list: TBetHistoryStateListItem[]) {
  return list.map((item, index, arr) => {
    const prevItem = arr[index - 1];

    if (prevItem) {
      return {
        ...item,
        picks: item.picks?.map((pick) => ({
          ...pick,
          changed: !prevItem.picks?.find(({ outcome }) => outcome.id === pick.outcome.id),
        })),
      };
    }

    return item;
  });
}

export { betHistoryItemSelector };
