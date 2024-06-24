import { memo } from "react";
import { useSelector } from "react-redux";
import { ECurrencySymbol, withProps } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_button_ok,
  platformui_starzbet_message_failed,
  platformui_starzbet_message_success,
  platformui_starzbet_vipClub_commissionRefund_button,
  platformui_starzbet_vipClub_commissionRefund_button_minAmount,
  platformui_starzbet_vipClub_commissionRefund_failed_text,
  platformui_starzbet_vipClub_commissionRefund_success_text,
  platformui_starzbet_vipClub_commissionRefund_text,
  platformui_starzbet_vipClub_tabs_commissionRefund_title,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "./VipClubCommissionRefund.module.css";
import { Button } from "../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { TickIcon } from "../../../../../../common/Themes/Starzbet/Components/Icons/TickIcon/TickIcon";
import { Loader } from "../../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { vipClubRefundValueStringSelector } from "../../../../../Store/VipClub/Selectors/VipClubCommissionRefundSelectors";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import { VipClubCommissionRefundBase } from "../../../../../Components/VipClub/VipClubCommissionRefund/VipClubCommissionRefundBase";
import { VipClubCommissionRefundText } from "../../../../../Components/VipClub/VipClubCommissionRefund/VipClubCommissionRefundText";
import {
  VipClubCommissionRefundButtonBase,
} from "../../../../../Components/VipClub/VipClubCommissionRefund/VipClubCommissionRefundButtonBase";
import {
  VipClubCommissionRefundButtonText,
} from "../../../../../Components/VipClub/VipClubCommissionRefund/VipClubCommissionRefundButtonText";
import { ThemedModalIcon } from "../../ThemedModal/ThemedModalIcon/ThemedModalIcon";
import { VipClubCommissionRefundEmpty } from "../VipClubEmpty/VipClubEmpty";

const VipClubCommissionRefundButton = withProps(VipClubCommissionRefundButtonBase)({
  CommonButton: withProps(Button)({ className: classes.vipClubCommissionRefundButton, colorScheme: "orange-gradient" }),
  ButtonText: withProps(VipClubCommissionRefundButtonText)({
    doRefundTKey: platformui_starzbet_vipClub_commissionRefund_button,
    okTKey: platformui_starzbet_button_ok,
    disabledTKey: platformui_starzbet_vipClub_commissionRefund_button_minAmount,
  }),
});

const Success = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.vipClubCommissionRefundMessage}>
      <TickIcon color={"brand"} width={80} height={80} />

      <div className={classes.vipClubCommissionRefundMessageText}>
        <h3 className={classes.vipClubCommissionRefundTitle}>
          {t(platformui_starzbet_message_success)}
        </h3>

        <p className={classes.vipClubCommissionRefundDescription}>
          {t(platformui_starzbet_vipClub_commissionRefund_success_text)}
        </p>
      </div>
    </div>
  );
});
Success.displayName = "Success";

const Failed = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.vipClubCommissionRefundMessage}>
      <ThemedModalIcon variant={"error"} />

      <div className={classes.vipClubCommissionRefundMessageText}>
        <h3 className={classes.vipClubCommissionRefundTitle}>
          {t(platformui_starzbet_message_failed)}
        </h3>

        <p className={classes.vipClubCommissionRefundDescription}>
          {t(platformui_starzbet_vipClub_commissionRefund_failed_text)}
        </p>
      </div>
    </div>
  );
});
Failed.displayName = "Failed";

const Calculations = memo(() => {
  const {
    refundValue: {
      beforeDot,
      afterDotInPrecision,
      afterDotOverPrecision,
    },
    currency,
  } = useSelector(vipClubRefundValueStringSelector);

  return (
    <span className={classes.vipClubCommissionRefundDescriptionWrapper}>
      <span className={classes.vipClubCommissionRefundValue}>
        <span>{beforeDot}</span>

        {"."}

        <span>{afterDotInPrecision}</span>

        <span className={classes.vipClubCommissionRefundDigits}>{afterDotOverPrecision}</span>
        &nbsp;
        <span className={classes.vipClubCommissionRefundCurrency}>{ECurrencySymbol[currency]}</span>
      </span>
    </span>
  );
});
Calculations.displayName = "Calculations";

const VipClubCommissionRefundFull = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.vipClubCommissionRefund}>
      <div className={classes.vipClubCommissionRefundHead}>
        <Ellipsis className={classes.vipClubCommissionRefundTitle}>
          {t(platformui_starzbet_vipClub_tabs_commissionRefund_title)}
        </Ellipsis>
      </div>

      <div className={classes.vipClubCommissionRefundBody}>
        <VipClubCommissionRefundText
          Loading={Calculations}
          Success={Success}
          Failed={Failed}
          Calculations={Calculations}
        />

        <VipClubCommissionRefundButton />

        <div className={classes.vipClubCommissionRefundDescription}>
          {t(platformui_starzbet_vipClub_commissionRefund_text)}
        </div>
      </div>
    </div>
  );
});
VipClubCommissionRefundFull.displayName = "VipClubCommissionRefundFull";

const VipClubCommissionRefund = withProps(VipClubCommissionRefundBase)({
  Loader,
  Empty: VipClubCommissionRefundEmpty,
  Full: VipClubCommissionRefundFull,
});

export { VipClubCommissionRefund };
