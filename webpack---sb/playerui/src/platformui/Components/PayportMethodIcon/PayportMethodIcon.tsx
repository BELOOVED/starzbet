import { memo } from "react";
import { EPlatform_PayPortPaymentSystemType } from "@sb/graphql-client";
import classes from "./PayportMethodIcon.module.css";

const PAYPORT_METHOD_ICON_MAP: Partial<Record<EPlatform_PayPortPaymentSystemType, string | undefined>> = {
  [EPlatform_PayPortPaymentSystemType.upi]: classes.payportUpi,
  [EPlatform_PayPortPaymentSystemType.rtgs]: classes.payportRtgs,
  [EPlatform_PayPortPaymentSystemType.phonepe]: classes.payportPhonepe,
  [EPlatform_PayPortPaymentSystemType.paytm]: classes.payportPaytim,
  [EPlatform_PayPortPaymentSystemType.neft]: classes.payportNeft,
  [EPlatform_PayPortPaymentSystemType.imps]: classes.payportImps,
  [EPlatform_PayPortPaymentSystemType.cash]: classes.payportCash,
};

interface IPayportMethodIconProps {
  method: EPlatform_PayPortPaymentSystemType;
}

const PayportMethodIcon = memo<IPayportMethodIconProps>(({ method }) => (
  <div className={classes.methodIcon}>
    <div className={PAYPORT_METHOD_ICON_MAP[method] ?? classes.fallback} />
  </div>
));
PayportMethodIcon.displayName = "PayportMethodIcon";

export { PayportMethodIcon };
