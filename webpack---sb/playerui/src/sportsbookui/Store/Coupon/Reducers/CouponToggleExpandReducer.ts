import { type IWithCoupon } from "../CouponState";

const couponToggleExpandReducer = (state: IWithCoupon) => ({
  ...state,
  coupon: {
    ...state.coupon,
    expanded: !state.coupon.expanded,
  },
});

export { couponToggleExpandReducer };
