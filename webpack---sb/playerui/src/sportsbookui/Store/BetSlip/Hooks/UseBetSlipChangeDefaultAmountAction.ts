// @ts-nocheck
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { betSlipChangeDefaultAmountAction } from "../BetSlipActions";

const useBetSlipChangeDefaultAmountAction = () => {
  const dispatch = useDispatch();

  return useCallback((changeAmount: any) => dispatch(betSlipChangeDefaultAmountAction(changeAmount)), []);
};

export { useBetSlipChangeDefaultAmountAction };
