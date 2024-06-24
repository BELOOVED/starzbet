// @ts-nocheck
import { memo } from "react";
import { objToComponent, useParamSelector } from "@sb/utils";
import classes from "./TopLeagues.module.css";
import { NativeHorizontalScroll } from "../../../../../../../common/Components/NativeHorizontalScroll/NativeHorizontalScroll";
import { couponsByViewSelector } from "../../../../../../Store/Coupon/Selectors/CouponsByViewSelector";
import { MenuItem } from "../../../Desktop/Components/CouponMenu/CouponMenu";

const TopLeagues = memo(({ viewType, esport }) => {
  const coupons = useParamSelector(couponsByViewSelector, [viewType]);

  if (coupons.length === 0) {
    return null;
  }

  return (
    <div className={classes.carouselContainer}>
      <NativeHorizontalScroll trackClassName={classes.track}>
        {coupons.map(objToComponent("id", { esport })(MenuItem))}

        <div className={classes.stub} />
      </NativeHorizontalScroll>
    </div>
  );
});
TopLeagues.displayName = "TopLeagues";

export { TopLeagues };
