// @ts-nocheck
import { useDispatch } from "react-redux";
import { useCallback, useState } from "react";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { betSlipChangeVirtualGamePickAction, betSlipRemoveAllVirtualGamePickAction } from "../../../BetSlip/BetSlipActions";
import { useVirtualGameChangeFieldHandler } from "../../Common/Hooks/UseVirtualGameChangeFieldHandler";
import { kenoKeys } from "../Model/Keno";

const sportId = sportCodeToIdMap[ESportCode.kiron_keno];

const useKenoHandler = (key) => useVirtualGameChangeFieldHandler(sportId, key);

// todo copy&paste
const randomInteger = (min, max) => Math.floor(min + (Math.random() * (max + 1 - min)));

const useLuckyLootRandomPickHandler = () => {
  const [countPick, setCountPick] = useState(0);

  const dispatch = useDispatch();

  const pickHandler = (count) => {
    dispatch(betSlipRemoveAllVirtualGamePickAction(sportId));

    const randomList = [];
    while (randomList.length !== count) {
      const candidate = randomInteger(kenoKeys[0], kenoKeys[kenoKeys.length - 1]);

      if (!randomList.includes(candidate)) {
        randomList.push(candidate);

        dispatch(betSlipChangeVirtualGamePickAction(sportId, candidate));
      }
    }
  };

  const quickPick = useCallback(() => pickHandler(countPick), [countPick]);

  const changeCount = useCallback(
    (count: any) => {
      setCountPick(count);
      pickHandler(count);
    },
    [],
  );

  return [countPick, changeCount, quickPick];
};

export { useKenoHandler, useLuckyLootRandomPickHandler };
