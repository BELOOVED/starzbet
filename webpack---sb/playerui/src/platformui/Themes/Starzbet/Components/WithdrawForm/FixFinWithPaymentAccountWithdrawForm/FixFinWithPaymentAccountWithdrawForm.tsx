import { memo } from "react";
import classes from "../WithdrawForm.module.css";
import { PlayerPaymentAccountField } from "../PlayerPaymentAccountField/PlayerPaymentAccountField";
import { AccountInfo } from "../AccountInfo/AccountInfo";
import { AmountField } from "../AmountField/AmountField";

const FixFinWithPaymentAccountWithdrawForm = memo(() => (
  <>
    <AccountInfo />

    <PlayerPaymentAccountField />

    <div className={classes.form}>
      <AmountField />
    </div>
  </>
));
FixFinWithPaymentAccountWithdrawForm.displayName = "FixFinWithPaymentAccountWithdrawForm";

export { FixFinWithPaymentAccountWithdrawForm };
