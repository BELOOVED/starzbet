import { type IWithCoupon } from "../CouponState";

const couponEnableFinaliseTooltipReducer = (state: IWithCoupon) => ({
  ...state,
  coupon: {
    ...state.coupon,
    player: {
      ...state.coupon.player,
      finaliseTooltip: true,
    },
  },
});

export { couponEnableFinaliseTooltipReducer };
