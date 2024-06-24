import { getNotNil, type TReducer } from "@sb/utils";
import { type IWithCoupon } from "../CouponState";
import { type couponSaveAction } from "../CouponActions";

const couponSaveReducer: TReducer<IWithCoupon, typeof couponSaveAction> = (state, { payload: { name } }) => ({
  ...state,
  coupon: {
    ...state.coupon,
    player: {
      ...state.coupon.player,
      startEdit: false,
      saving: false,
      readyToSave: false,
      newCoupon: {
        ...getNotNil(state.coupon.player.newCoupon, ["couponSaveReducer"], "newCoupon"),
        name,
      },
    },
  },
});

export { couponSaveReducer };
