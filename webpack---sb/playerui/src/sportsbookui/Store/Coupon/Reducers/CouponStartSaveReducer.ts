import { type IWithCoupon } from "../CouponState";

const couponStartSaveReducer = (state: IWithCoupon) => ({
  ...state,
  coupon: {
    ...state.coupon,
    player: {
      ...state.coupon.player,
      saving: true,
    },
  },
});

export { couponStartSaveReducer };
