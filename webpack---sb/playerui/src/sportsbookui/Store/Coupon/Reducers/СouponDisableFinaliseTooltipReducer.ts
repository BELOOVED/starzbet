import { type IWithCoupon } from "../CouponState";

const couponDisableFinaliseTooltipReducer = (state: IWithCoupon) => ({
  ...state,
  coupon: {
    ...state.coupon,
    player: {
      ...state.coupon.player,
      finaliseTooltip: false,
    },
  },
});

export { couponDisableFinaliseTooltipReducer };
