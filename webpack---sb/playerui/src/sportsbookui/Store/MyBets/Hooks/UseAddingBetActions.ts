// @ts-nocheck
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { cancelAddingBetAction, completeAddingBetAction, startAddingBetAction } from "../MyBetsActions";

const useAddingBetActions = () => {
  const dispatch = useDispatch();

  const startAddingBet = useCallback(
    () => dispatch(startAddingBetAction()),
    [dispatch],
  );

  const startCancelBet = useCallback(
    () => dispatch(cancelAddingBetAction()),
    [dispatch],
  );

  const completeAddingBet = useCallback(
    () => dispatch(completeAddingBetAction()),
    [dispatch],
  );

  return [startAddingBet, startCancelBet, completeAddingBet] as const;
};

export { useAddingBetActions };
