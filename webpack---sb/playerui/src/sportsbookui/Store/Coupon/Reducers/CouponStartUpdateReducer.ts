import { getNotNil, type TReducer } from "@sb/utils";
import { sportMenuRemoveAllActiveIdHandler } from "../../SportMenu/Reducers/Handlers/SportMenuRemoveAllActiveIdHandler";
import { type TAppState } from "../../InitialState";
import { couponsByPlayerIdSelector } from "../Selectors/CouponsSelector";
import { type couponUpdateAction } from "../CouponActions";

const couponStartUpdateReducer: TReducer<TAppState, typeof couponUpdateAction> = (
  state,
  { payload: { couponId } },
) => sportMenuRemoveAllActiveIdHandler({
  ...state,
  coupon: {
    ...state.coupon,
    player: {
      ...state.coupon.player,
      startEdit: true,
      readyToSave: true,
      newCoupon: {
        ...getNotNil(couponsByPlayerIdSelector(state).find(({ id }) => id === couponId), ["couponStartUpdateReducer"], "newCoupon"),
      },
    },
  },
});

export { couponStartUpdateReducer };
