import { type TBetHistoryPick, type TBetPickEntry } from "../Store/MyBets/Model/TBet";

const picksAreEqual = (betPicks: TBetHistoryPick[], nextPicks: TBetPickEntry[]) => {
  if (betPicks.length !== nextPicks.length) {
    return false;
  }

  return betPicks.every((pick) => nextPicks.some(
    ({ outcomeId, coefficient }) => pick.outcome.id === outcomeId && pick.coefficient === coefficient,
  ));
};

const editableBetPicksAreEqual = (editableBetPicks: TBetPickEntry[], nextEditableBetPick: TBetPickEntry[]) => {
  if (editableBetPicks.length !== nextEditableBetPick.length) {
    return false;
  }

  return editableBetPicks.every((pick) => nextEditableBetPick.some(
    ({ outcomeId, coefficient }) => pick.outcomeId === outcomeId && pick.coefficient === coefficient,
  ));
};

export { picksAreEqual, editableBetPicksAreEqual };
