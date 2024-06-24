import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { betSlipCreateBatchPickAction, betSlipRemovePickAction } from "../BetSlipActions";
import { pickKind } from "../Model/BetPick";

const useBetSlipCreateBatchHandler = (outcomeIds, active = false) => {
  const dispatch = useDispatch();

  const createHandler = useCallback(
    () => {
      dispatch(betSlipCreateBatchPickAction(pickKind.virtualGame, outcomeIds));
    },
    [outcomeIds],
  );

  const removeHandler = useCallback(
    () => {
      dispatch(betSlipRemovePickAction(outcomeIds[0]));
    },
    [outcomeIds],
  );

  return active ? removeHandler : createHandler;
};

export { useBetSlipCreateBatchHandler };
