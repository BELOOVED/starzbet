import { type IWithCoupon } from "../CouponState";

const couponCompleteSaveReducer = (state: IWithCoupon) => ({
  ...state,
  coupon: {
    ...state.coupon,
    player: {
      ...state.coupon.player,
      startEdit: false,
      startTooltip: false,
      finaliseTooltip: false,
      readyToSave: false,
      saving: false,
      newCoupon: void 0,
    },
  },
});

export { couponCompleteSaveReducer };
