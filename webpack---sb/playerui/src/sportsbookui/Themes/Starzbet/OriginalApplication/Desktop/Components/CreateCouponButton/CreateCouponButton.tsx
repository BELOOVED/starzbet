// @ts-nocheck
import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { sportsbookui_starzbet_createCoupon_button_createCustomCoupon } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import classes from "./CreateCouponButton.module.css";
import { EModal } from "../../../../../../../common/Store/Modal/Model/EModal";
import { useModalOpenAction } from "../../../../../../../common/Store/Modal/Hooks/UseModaOpenAction";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";
import { CreateCouponIcon } from "../../../Components/Icons/EditNoteIcon/EditNoteIcon";

const CreateCouponButton = memo(() => {
  const [t] = useTranslation();

  const modalHandler = useModalOpenAction(EModal.coupon);

  return (
    <div
      className={classes.couponButton}
      onClick={modalHandler}
    >
      <div className={classes.icon}>
        <CreateCouponIcon />
      </div>

      <div className={classes.text}>
        <Ellipsis>
          {t(sportsbookui_starzbet_createCoupon_button_createCustomCoupon)}
        </Ellipsis>
      </div>
    </div>
  );
});
CreateCouponButton.displayName = "CreateCouponButton";

export { CreateCouponButton };
