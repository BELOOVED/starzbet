import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { betSlipChangeVirtualGamePickAction } from "../../../BetSlip/BetSlipActions";

const useVirtualGameChangeFieldHandler = (sportId: string, key: string) => {
  const dispatch = useDispatch();

  return useCallback(
    () => {
      dispatch(betSlipChangeVirtualGamePickAction(sportId, key));
    },
    [sportId, key],
  );
};

export { useVirtualGameChangeFieldHandler };
