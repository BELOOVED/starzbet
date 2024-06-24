import { type TReducer } from "@sb/utils";
import { type IWithCoupon } from "../CouponState";
import { type couponGroupsFetchedAction } from "../CouponActions";
import { couponGroupsFetchedHandler } from "./Handlers/CouponGroupsFetchedHandler";

const couponGroupsFetchedReducer: TReducer<IWithCoupon, typeof couponGroupsFetchedAction> = (state, { payload }) => ({
  ...state,
  coupon: couponGroupsFetchedHandler(state.coupon, payload),
});

export { couponGroupsFetchedReducer };
