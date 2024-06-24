import { type IWithCoupon } from "../CouponState";

const couponCancelSaveReducer = (state: IWithCoupon) => ({
  ...state,
  coupon: {
    ...state.coupon,
    player: {
      ...state.coupon.player,
      saving: false,
    },
  },
});

export { couponCancelSaveReducer };
