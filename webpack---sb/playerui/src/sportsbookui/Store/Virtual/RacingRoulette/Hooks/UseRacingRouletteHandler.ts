// @ts-nocheck
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { betSlipRemoveVirtualGamePickAction } from "../../../BetSlip/BetSlipActions";
import { useVirtualGameChangeFieldHandler } from "../../Common/Hooks/UseVirtualGameChangeFieldHandler";

const useRacingRouletteHandler = (key) => {
  const dispatch = useDispatch();

  const onChange = useVirtualGameChangeFieldHandler(sportCodeToIdMap[ESportCode.kiron_racing_roulette], key);

  const onRemove = useCallback(
    (e: any) => {
      e.stopPropagation();
      dispatch(betSlipRemoveVirtualGamePickAction(sportCodeToIdMap[ESportCode.kiron_racing_roulette], key));
    },
    [key],
  );

  return [onChange, onRemove];
};

export { useRacingRouletteHandler };
