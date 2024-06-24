import { type IWithCoupon } from "../CouponState";

const couponDisableStartTooltipReducer = (state: IWithCoupon) => ({
  ...state,
  coupon: {
    ...state.coupon,
    player: {
      ...state.coupon.player,
      startTooltip: false,
    },
  },
});

export { couponDisableStartTooltipReducer };
