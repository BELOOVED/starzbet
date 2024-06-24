import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { betSlipChangeVirtualGamePickAction, betSlipRemoveAllVirtualGamePickAction } from "../../../BetSlip/BetSlipActions";
import { useVirtualGameChangeFieldHandler } from "../../Common/Hooks/UseVirtualGameChangeFieldHandler";
import { luckyLootKeys } from "../Model/LuckyLoot";

const sportId = sportCodeToIdMap[ESportCode.kiron_lucky_loot];

const useLuckyLootHandler = (id: string) => useVirtualGameChangeFieldHandler(sportId, id);

const randomInteger = (min: number, max: number) => Math.floor(min + (Math.random() * (max + 1 - min)));

const first = luckyLootKeys[0];

const last = luckyLootKeys.at(-1) as number;

const useLuckyLootRandomPickHandler = (count: number) => {
  const dispatch = useDispatch();

  return useCallback(
    () => {
      dispatch(betSlipRemoveAllVirtualGamePickAction(sportId));

      const randomList: number[] = [];

      // todo use array.shuffle() and slice(randomList.length)
      while (randomList.length !== count) {
        const candidate = randomInteger(first, last);

        if (!randomList.includes(candidate)) {
          randomList.push(candidate);

          dispatch(betSlipChangeVirtualGamePickAction(sportId, candidate));
        }
      }
    },
    [count],
  );
};

export { useLuckyLootHandler, useLuckyLootRandomPickHandler };
