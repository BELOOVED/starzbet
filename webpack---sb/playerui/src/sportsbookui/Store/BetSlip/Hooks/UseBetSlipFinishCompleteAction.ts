// @ts-nocheck
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { betSlipFinishCompleteAction } from "../BetSlipActions";

const useBetSlipFinishCompleteAction = () => {
  const dispatch = useDispatch();

  return useCallback(() => dispatch(betSlipFinishCompleteAction()), []);
};

export { useBetSlipFinishCompleteAction };
