// @ts-nocheck
import { memo } from "react";
import classes from "./CouponMenu.module.css";
import { NavLinkToTop } from "../../../../../../../common/Components/LinkToTop/LinkToTop";
import { routeMap } from "../../../../../../RouteMap/RouteMap";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";

const MenuItem = memo(({
  name,
  id,
  image,
  esport,
}) => {
  const route = esport ? routeMap.esport.preLive.coupon : routeMap.preLive.coupon;
  const params = { couponId: id };

  return (
    <NavLinkToTop className={classes.item} to={route} params={params}>
      <div className={classes.imageContainer}>
        <img alt={"league"} src={image} />
      </div>

      <div className={classes.name}>
        <Ellipsis>
          {name}
        </Ellipsis>
      </div>
    </NavLinkToTop>
  );
});
MenuItem.displayName = "MenuItem";

export { MenuItem };
