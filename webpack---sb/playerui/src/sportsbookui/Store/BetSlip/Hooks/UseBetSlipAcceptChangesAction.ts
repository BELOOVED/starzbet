// @ts-nocheck
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { betSlipAcceptChangesAction } from "../BetSlipActions";

const useBetSlipAcceptChangesAction = () => {
  const dispatch = useDispatch();

  return useCallback(() => dispatch(betSlipAcceptChangesAction()), []);
};

export { useBetSlipAcceptChangesAction };
