import { getNotNil, isNil } from "@sb/utils";
import { Logger } from "../../../../../common/Utils/Logger";
import { generateHash } from "../../../../Utils/GenerateHash";
import { editableBetPicksAreEqual, picksAreEqual } from "../../../../Utils/PicksAreEqual";
import { betByIdSelector, editableBetSelector } from "../../Selectors/MyBetsSelectors";
import { type IWithMyBetsState } from "../../MyBetsState";
import { type TBetPickEntry } from "../../Model/TBet";

const doRemovePick = <T extends keyof TBetPickEntry>(forKey: T, value: TBetPickEntry[T], state: IWithMyBetsState): IWithMyBetsState => {
  const editableBet = editableBetSelector(state);
  if (isNil(editableBet)) {
    Logger.warn.reducer("[MyBet]", "remove pick failed hasEditableBet return false");

    return state;
  }

  const picks = editableBet.picks.reduce<TBetPickEntry[]>(
    (acc, pick) => {
      if (pick[forKey] !== value) {
        return [...acc, pick];
      }

      if (!pick.applied) {
        return acc;
      }

      return [...acc, { ...pick, removed: !pick.removed }];
    },
    [],
  );

  const bet = getNotNil(betByIdSelector(editableBet.id)(state), ["doRemovePick"], "betByIdSelector");

  return {
    ...state,
    myBets: {
      ...state.myBets,
      editableBet: {
        ...editableBet,
        changed: !picksAreEqual(bet.picks, picks.filter(({ removed }) => !removed)),
        changedSinceLastCommit: editableBet.committing && !editableBetPicksAreEqual(
          editableBet.committedPicks,
          picks.filter(({ applied }) => !applied),
        ),
        picks,
        hash: generateHash(bet, picks),
      },
    },
  };
};

export { doRemovePick };
