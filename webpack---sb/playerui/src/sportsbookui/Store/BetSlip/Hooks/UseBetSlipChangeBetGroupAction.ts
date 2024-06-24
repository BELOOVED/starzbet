// @ts-nocheck
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { betSlipChangeBetGroupAction } from "../BetSlipActions";

const useBetSlipChangeBetGroupAction = () => {
  const dispatch = useDispatch();

  return useCallback((group: any) => dispatch(betSlipChangeBetGroupAction(group)), []);
};

export { useBetSlipChangeBetGroupAction };
