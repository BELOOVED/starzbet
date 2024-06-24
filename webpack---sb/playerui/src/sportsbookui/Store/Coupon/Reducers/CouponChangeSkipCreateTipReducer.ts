import { type TReducer } from "@sb/utils";
import { type IWithCoupon } from "../CouponState";
import { type couponChangeSkipCreateTipAction } from "../CouponActions";

const couponChangeSkipCreateTipReducer: TReducer<IWithCoupon, typeof couponChangeSkipCreateTipAction> = (
  state,
  { payload: { value } },
) => ({
  ...state,
  coupon: {
    ...state.coupon,
    player: {
      ...state.coupon.player,
      skipCouponCreateTip: value,
    },
  },
});

export { couponChangeSkipCreateTipReducer };
