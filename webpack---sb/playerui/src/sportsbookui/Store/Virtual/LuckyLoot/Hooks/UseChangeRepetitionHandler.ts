import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { betSlipChangeRepetitionPickAction } from "../../../BetSlip/BetSlipActions";

const useChangeRepetitionHandler = (count) => {
  const dispatch = useDispatch();

  return useCallback(
    () => {
      dispatch(betSlipChangeRepetitionPickAction(count));
    },
    [count],
  );
};

export { useChangeRepetitionHandler };
