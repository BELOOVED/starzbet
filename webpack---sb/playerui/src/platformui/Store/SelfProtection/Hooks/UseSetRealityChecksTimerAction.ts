// @ts-nocheck
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setRealityChecksTimerAction } from "../SelfProtectionActions";

const useSetRealityChecksTimerAction = () => {
  const dispatch = useDispatch();

  return useCallback(() => dispatch(setRealityChecksTimerAction()), []);
};

export { useSetRealityChecksTimerAction };

