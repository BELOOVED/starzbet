// @ts-nocheck
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { betSlipPlaceBetAction } from "../BetSlipActions";

const useBetSlipPlaceBetAction = (keep, byGroup) => {
  const dispatch = useDispatch();

  return useCallback(
    () => dispatch(betSlipPlaceBetAction(keep, byGroup)),
    [keep, byGroup],
  );
};

export { useBetSlipPlaceBetAction };
