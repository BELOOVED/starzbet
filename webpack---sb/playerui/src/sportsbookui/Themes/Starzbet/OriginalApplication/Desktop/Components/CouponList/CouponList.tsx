// @ts-nocheck
import clsx from "clsx";
import { memo, useCallback, useReducer, useState } from "react";
import {
  sportsbookui_starzbet_coupon_button_delete,
  sportsbookui_starzbet_coupon_button_edit,
  sportsbookui_starzbet_coupon_list,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { isEmpty, not } from "@sb/utils";
import classes from "./CouponList.module.css";
import { LinkLocalized } from "../../../../../../../common/Client/Core/Services/RouterService/Components/LinkLocalized/LinkLocalized";
import { CollapseIcon } from "../../../../../../../common/Themes/Starzbet/Components/Icons/CollapseIcon/CollapseIcon";
import { CloseIcon } from "../../../../../../../common/Themes/Starzbet/Components/Icons/CloseIcon/CloseIcon";
import { useModalOpenAction } from "../../../../../../../common/Store/Modal/Hooks/UseModaOpenAction";
import { EModal } from "../../../../../../../common/Store/Modal/Model/EModal";
import { CouponContainer } from "../../../../../../Containers/CouponContainer/CouponContainer";
import { routeMap } from "../../../../../../RouteMap/RouteMap";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";
import { SettingsIcon } from "../../../Components/Icons/SettingsIcon/SettingsIcon";

const Coupon = memo(({
  couponId,
  removeCouponEntry,
  name,
  startEdit,
}) => {
  const [t] = useTranslation();

  const [dropdown, setDropdown] = useState(false);

  const toggle = useCallback(
    (e: any) => {
      e.preventDefault();
      e.stopPropagation();

      setDropdown(not);
    },
    [],
  );

  const modalHandler = useModalOpenAction(EModal.coupon, { couponId });

  const updateHandler = useCallback(
    () => {
      setDropdown(false);

      modalHandler();
    },
    [],
  );

  if (!startEdit && dropdown) {
    return (
      <div className={classes.couponEdit}>
        <div className={clsx(classes.option, classes.delete)} onClick={removeCouponEntry}>
          <Ellipsis>
            {t(sportsbookui_starzbet_coupon_button_delete)}
          </Ellipsis>
        </div>

        <div className={clsx(classes.option, classes.edit)} onClick={updateHandler}>
          <Ellipsis>
            {t(sportsbookui_starzbet_coupon_button_edit)}
          </Ellipsis>
        </div>

        <button>
          <CloseIcon className={classes.closeIcon} onClick={toggle} size={"xs"} />
        </button>
      </div>
    );
  }
  const params = { couponId };

  return (
    <LinkLocalized to={routeMap.preLive.coupon} params={params} className={classes.coupon}>
      <div className={classes.info}>
        <Ellipsis className={classes.name}>
          {name}
        </Ellipsis>
      </div>

      <SettingsIcon className={classes.settingsIcon} onClick={toggle} color={"darkText"} />
    </LinkLocalized>
  );
});
Coupon.displayName = "Coupon";

interface IList {
  couponIdList: string[];
}

const CouponList = memo<IList>(({ couponIdList }) => {
  const [expanded, toggleExpanded] = useReducer(not<boolean>, true);

  const [t] = useTranslation();

  if (!couponIdList || isEmpty(couponIdList)) {
    return null;
  }

  const count = couponIdList.length;

  return (
    <div>
      <div onClick={toggleExpanded} className={clsx(classes.header)}>
        {t(sportsbookui_starzbet_coupon_list)}

        <div className={classes.headerRight}>
          <div className={classes.count}>
            {count}
          </div>

          <CollapseIcon className={classes.collapseIcon} expanded={expanded} />
        </div>
      </div>

      <div className={classes.list}>
        {
          expanded && couponIdList.map((couponId) => (
            <CouponContainer
              key={couponId}
              couponId={couponId}
              child={Coupon}
            />
          ))
        }
      </div>
    </div>
  );
});
CouponList.displayName = "CouponList";

export { CouponList };
