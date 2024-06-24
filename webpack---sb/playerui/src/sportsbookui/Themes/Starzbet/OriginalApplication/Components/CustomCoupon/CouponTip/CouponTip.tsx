// @ts-nocheck
import { memo, useCallback, useEffect } from "react";
import {
  sportsbookui_starzbet_coupon_create_button,
  sportsbookui_starzbet_coupon_create_text,
  sportsbookui_starzbet_coupon_create_title,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { useAction } from "@sb/utils";
import classes from "./CouponTip.module.css";
import { couponChangeSkipCreateTipAction } from "../../../../../../Store/Coupon/CouponActions";
import { ModalButton } from "../../../Desktop/Components/ModalButton/ModalButton";
import { ModalCheckbox } from "../../../Desktop/Components/ModalCheckbox/ModalCheckbox";
import { TextBulletListIcon } from "../../Icons/TextBulletListIcon/TextBulletListIcon";

const CouponTip = memo(({ tip, startCreate }) => {
  const [t] = useTranslation();

  const changeSkipCreateCouponTip = useAction(couponChangeSkipCreateTipAction);

  const toggleHandler = useCallback(
    () => {
      changeSkipCreateCouponTip(!tip);
    },
    [tip],
  );

  useEffect(() => changeSkipCreateCouponTip(true), []);

  return (
    <div className={classes.tip}>
      <TextBulletListIcon height={80} width={100} />

      <div className={classes.content}>
        <div className={classes.title}>
          {t(sportsbookui_starzbet_coupon_create_title)}
        </div>

        <div className={classes.text}>
          {t(sportsbookui_starzbet_coupon_create_text)}
        </div>
      </div>

      <ModalButton onClick={startCreate} className={classes.button}>
        {t(sportsbookui_starzbet_coupon_create_button)}
      </ModalButton>

      <ModalCheckbox
        checked={tip}
        toggleHandler={toggleHandler}
      />
    </div>
  );
});
CouponTip.displayName = "CouponTip";

export { CouponTip };
