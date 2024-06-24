// @ts-nocheck
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { betSlipChangeBetAction } from "../BetSlipActions";

const useBetSlipChangeBetAction = (hash, id) => {
  const dispatch = useDispatch();

  return useCallback(
    (amount: any, input: any) => {
      dispatch(betSlipChangeBetAction(hash, id, amount, input));
    },
    [hash, id],
  );
};

export { useBetSlipChangeBetAction };
