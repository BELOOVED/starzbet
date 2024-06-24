import { withProps } from "@sb/utils";
import classes from "./PaymentMethodIcon.module.css";
import { PaymentMethodIcon as PaymentMethodIconBase } from "../../../../Components/PaymentMethodIcon/PaymentMethodIcon";

const PaymentMethodIcon = withProps(PaymentMethodIconBase)({
  className: classes.icon,
});

export { PaymentMethodIcon };
