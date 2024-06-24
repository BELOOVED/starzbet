import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { couponAddTournamentAction, couponRemoveTournamentAction } from "../CouponActions";

const useCouponToggleTournament = (id: string, active: boolean) => {
  const dispatch = useDispatch();

  const addId = useCallback(
    () => dispatch(couponAddTournamentAction(id)),
    [id],
  );

  const removeId = useCallback(
    () => dispatch(couponRemoveTournamentAction(id)),
    [id],
  );

  return active
    ? removeId
    : addId;
};

export { useCouponToggleTournament };
