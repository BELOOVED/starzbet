// @ts-nocheck
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { betSlipChangeMultipleSingleAction } from "../BetSlipActions";

const useChangeMultipleSingleAction = () => {
  const dispatch = useDispatch();

  return useCallback(
    (stake: any, input: any) => dispatch(betSlipChangeMultipleSingleAction(stake, input)),
    [],
  );
};

export { useChangeMultipleSingleAction };
