import { getNotNil, type TReducer } from "@sb/utils";
import { type IWithCoupon } from "../CouponState";
import { type couponRemoveTournamentAction } from "../CouponActions";

const couponRemoveTournamentReducer: TReducer<IWithCoupon, typeof couponRemoveTournamentAction> = (state, { payload: { id } }) => {
  if (!state.coupon.player.startEdit) {
    return state;
  }

  // NewCoupon should be not nil when we call action

  const newCoupon = getNotNil(state.coupon.player.newCoupon, ["CouponRemoveTournamentReducer"], "filters");

  const filters = newCoupon.filters.filter(({ tournamentId }) => tournamentId !== id);

  return {
    ...state,
    coupon: {
      ...state.coupon,
      player: {
        ...state.coupon.player,
        readyToSave: filters.length !== 0,
        finaliseTooltip: filters.length !== 0,
        newCoupon: {
          ...state.coupon.player.newCoupon,
          filters,
        },
      },
    },
  };
};

export { couponRemoveTournamentReducer };
