// @ts-nocheck
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { betSlipToggleBankerAction } from "../BetSlipActions";

const useToggleBankerAction = (outcomeId) => {
  const dispatch = useDispatch();

  return useCallback(() => dispatch(betSlipToggleBankerAction(outcomeId)), [outcomeId]);
};

export { useToggleBankerAction };
