import { memo } from "react";
import classes from "../WithdrawForm.module.css";
import { MuchBetterForm } from "../../MuchBetterForm/MuchBetterForm";
import { AccountInfo } from "../AccountInfo/AccountInfo";
import { AmountField } from "../AmountField/AmountField";

const MuchBetterWithdrawForm = memo(() => (
  <>
    <AccountInfo />

    <div className={classes.form}>
      <MuchBetterForm />

      <AmountField />
    </div>
  </>
));
MuchBetterWithdrawForm.displayName = "MuchBetterWithdrawForm";

export { MuchBetterWithdrawForm };
