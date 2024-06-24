import { type IWithCoupon } from "../CouponState";

const couponCancelCreateReducer = (state: IWithCoupon) => ({
  ...state,
  coupon: {
    ...state.coupon,
    player: {
      ...state.coupon.player,
      startEdit: false,
      startTooltip: false,
      finaliseTooltip: false,
      newCoupon: void 0,
    },
  },
});

export { couponCancelCreateReducer };
