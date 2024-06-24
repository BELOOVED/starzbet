import { memo } from "react";
import { useSelector } from "react-redux";
import classes from "./CouponsAndFavouriteMenu.module.css";
import { couponIdListByPlayerIdSelector } from "../../../../../../Store/Coupon/Selectors/CouponsSelector";
import { CouponList } from "../CouponList/CouponList";
import { CreateCouponButton } from "../CreateCouponButton/CreateCouponButton";

const CouponsMenu = memo(() => {
  const couponIdList = useSelector(couponIdListByPlayerIdSelector);

  return (
    <div className={classes.couponItems}>
      <CreateCouponButton />

      <CouponList couponIdList={couponIdList} />
    </div>
  );
});
CouponsMenu.displayName = "CouponsMenu";

export { CouponsMenu };
