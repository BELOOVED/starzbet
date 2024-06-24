// @ts-nocheck
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { betSlipDisablePickAction } from "../BetSlipActions";

const useBetSlipDisablePickAction = (outcomeId, disable) => {
  const dispatch = useDispatch();

  return useCallback(() => dispatch(betSlipDisablePickAction(outcomeId, disable)), [outcomeId, disable]);
};

export { useBetSlipDisablePickAction };
