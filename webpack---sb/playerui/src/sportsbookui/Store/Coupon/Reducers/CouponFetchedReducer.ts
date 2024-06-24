import { type TReducer } from "@sb/utils";
import { type IWithCoupon } from "../CouponState";
import { type couponFetchedAction } from "../CouponActions";

const couponFetchedReducer: TReducer<IWithCoupon, typeof couponFetchedAction> = (
  state,
  { payload },
) => ({
  ...state,
  coupon: {
    ...state.coupon,
    coupons: {
      ...state.coupon.coupons,
      [payload.id]: payload,
    },
  },
});

export { couponFetchedReducer };
