//@ts-nocheck
import { createElement, memo, useCallback, useReducer } from "react";
import { useSelector } from "react-redux";
import { not, type TComponent, type TVoidFn, useAction, useParamSelector } from "@sb/utils";
import { couponByIdSelector, startEditPlayerCouponSelector } from "../../Store/Coupon/Selectors/CouponsSelector";
import { couponRemoveAction, couponUpdateAction } from "../../Store/Coupon/CouponActions";

interface ICouponProps {
  couponId: string;
  removeCouponEntry: TVoidFn;
  name: string;
  startEdit: boolean;
  updateCouponEntry: TVoidFn;
  control: boolean;
  toggleControl: TVoidFn;
}

interface ICouponContainerProps {
  couponId: string;
  child: TComponent<ICouponProps>;
}

const CouponContainer = memo<ICouponContainerProps>(({ couponId, child }) => {
  const startEdit = useSelector(startEditPlayerCouponSelector);

  const rawRemoveCouponEntry = useAction(couponRemoveAction);

  const rawUpdateCouponEntry = useAction(couponUpdateAction);

  const [control, toggleControl] = useReducer(not<boolean>, false);

  const entry = useParamSelector(couponByIdSelector, [couponId]);

  const removeCouponEntry = useCallback(
    () => {
      rawRemoveCouponEntry(couponId);

      toggleControl();
    },
    [couponId, toggleControl],
  );

  const updateCouponEntry = useCallback(
    () => {
      rawUpdateCouponEntry(couponId);

      toggleControl();
    },
    [couponId],
  );

  return createElement(
    child,
    {
      couponId,
      startEdit,
      removeCouponEntry,
      updateCouponEntry,
      control,
      toggleControl,
      ...entry,
    },
  );
});
CouponContainer.displayName = "CouponContainer";

export { CouponContainer, type ICouponProps };
