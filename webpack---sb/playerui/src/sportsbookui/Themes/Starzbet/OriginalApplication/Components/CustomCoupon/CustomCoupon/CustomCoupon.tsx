// @ts-nocheck
import { memo, useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import {
  sportsbookui_starzbet_coupon_complete_title,
  sportsbookui_starzbet_editBet_addSelectionTip_gotIt,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { useAction } from "@sb/utils";
import classes from "./CustomCoupon.module.css";
import { TickIcon } from "../../../../../../../common/Themes/Starzbet/Components/Icons/TickIcon/TickIcon";
import { EModal } from "../../../../../../../common/Store/Modal/Model/EModal";
import { modalSelector } from "../../../../../../../common/Store/Modal/Selectors/ModalSelectors";
import { useModalCloseAction } from "../../../../../../../common/Store/Modal/Hooks/UseModalCloseAction";
import { couponPlayerSelector, couponSkipCouponCreateTipSelector } from "../../../../../../Store/Coupon/Selectors/CouponsSelector";
import { usePrevious } from "../../../../../../Hooks/UsePrevious";
import { couponCancelCreateAction, couponStartSaveAction } from "../../../../../../Store/Coupon/CouponActions";
import { CouponModal } from "../CouponModal/CouponModal";
import { CouponTip } from "../CouponTip/CouponTip";
import { CreateCoupon } from "../CreateCoupon/CreateCoupon";

const Complete = memo(() => {
  const [t] = useTranslation();

  const closeHandler = useModalCloseAction(EModal.coupon);

  return (
    <div className={classes.complete}>
      <TickIcon
        height={60}
        width={60}
        color={"validation"}
        className={classes.completeIcon}
      />

      <p className={classes.title}>
        {t(sportsbookui_starzbet_coupon_complete_title)}
      </p>

      <div className={classes.gotItButton} onClick={closeHandler}>
        {t(sportsbookui_starzbet_editBet_addSelectionTip_gotIt)}
      </div>
    </div>
  );
});
Complete.displayName = "Complete";

const CustomCoupon = memo(() => {
  const skipCouponCreateTip = useSelector(couponSkipCouponCreateTipSelector);

  const modal = useSelector(modalSelector);

  const [creating, startCreate] = useReducer(() => true, skipCouponCreateTip);

  const [complete, setComplete] = useState(false);

  const { saving } = useSelector(couponPlayerSelector);

  const prevSaving = usePrevious(saving);

  const startSave = useAction(couponStartSaveAction);

  const cancelCreate = useAction(couponCancelCreateAction);

  useEffect(
    () => {
      startSave();

      return () => cancelCreate();
    },
    [],
  );

  useEffect(
    () => {
      if (prevSaving && !saving) {
        setComplete(true);
      }
    },
    [saving],
  );

  const couponId = modal[EModal.coupon]?.couponId;

  if (complete) {
    return (
      <CouponModal complete={complete}>
        <Complete />
      </CouponModal>
    );
  }

  return (
    <CouponModal>
      {
        creating || couponId
          ? <CreateCoupon couponId={couponId} />
          : <CouponTip tip={skipCouponCreateTip} startCreate={startCreate} />
      }
    </CouponModal>
  );
});
CustomCoupon.displayName = "CustomCoupon";

export { CustomCoupon };
