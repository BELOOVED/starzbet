// @ts-nocheck
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { betSlipRemoveAllPickAction } from "../BetSlipActions";

const useRemoveAllPickAction = () => {
  const dispatch = useDispatch();

  return useCallback(
    () => dispatch(betSlipRemoveAllPickAction()),
    [],
  );
};

export { useRemoveAllPickAction };
