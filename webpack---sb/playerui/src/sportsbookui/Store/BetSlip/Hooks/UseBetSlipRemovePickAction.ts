// @ts-nocheck
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { betSlipRemovePickAction } from "../BetSlipActions";

const useBetSlipRemovePickAction = (id) => {
  const dispatch = useDispatch();

  return useCallback(
    () => dispatch(betSlipRemovePickAction(id)),
    [id],
  );
};

export { useBetSlipRemovePickAction };
