// todo now allowed conversion from single to parlay and parlay to single
import { getNotNil, isEmpty } from "@sb/utils";
import { partition } from "../../../Utils/Partition";
import { type TAppState } from "../../InitialState";
import { betStrategySelector } from "../../BetStrategy/Selectors/BetStrategySelectors";
import { selectBoostIdForPicks } from "../../OddsBoost/OddsBoostSelectors";
import { getDevice } from "../../Device/Model/EDevice";
import { isNotDuplicate, isNotRemoved } from "../Model/Bet";
import { type TBetPickEntry } from "../Model/TBet";
import { editableBetSelector } from "./MyBetsSelectors";

function editBetCommandSelector(state: TAppState) {
  const editableBet = getNotNil(editableBetSelector(state), ["saveEditingBetEpic", "onSaveBet"], "editableBet");
  const coefficientChangeStrategy = betStrategySelector(state);
  const device = getDevice();

  const prevBet = state.myBets.bets.find((bet) => bet.id === editableBet.id);

  const picks = editableBet.picks.filter((pick, i, arr) => isNotRemoved(pick) && isNotDuplicate(pick, i, arr));

  if (isEmpty(picks)) {
    throw new Error("zero picks");
  }

  const totalStake = getNotNil(
    editableBet.additionalStakeAmount
      ? editableBet.additionalStakeAmount
      : prevBet?.totalStake,
    ["editBetCommandSelector"],
    "totalStake",
  );

  const boostId = selectBoostIdForPicks(state, picks.map(({ outcomeId }) => outcomeId), totalStake, editableBet.hash);

  const [outrightPicks, eventPicks] = partition((pick: TBetPickEntry) => Boolean(pick.outrightId), picks).map(remapPicks);

  return {
    betId: editableBet.id,
    coefficientChangeStrategy,
    totalStake,
    device,
    boostId,
    hash: editableBet.hash,
    outrightPicks,
    eventPicks,
  };
}

function remapPicks(picks: TBetPickEntry[]) {
  return picks.map(({ outcomeId, coefficient, updatedAt }) => ({
    outcomeId,
    coefficient,
    updatedAt,
    banker: false,
  }));
}

export { editBetCommandSelector };
