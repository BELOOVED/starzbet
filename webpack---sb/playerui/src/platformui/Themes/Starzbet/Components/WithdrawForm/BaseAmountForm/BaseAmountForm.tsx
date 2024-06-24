import { memo } from "react";
import classes from "../WithdrawForm.module.css";
import { AccountInfo } from "../AccountInfo/AccountInfo";
import { AmountField } from "../AmountField/AmountField";

const BaseAmountForm = memo(() => (
  <>
    <AccountInfo />

    <div className={classes.form}>
      <AmountField />
    </div>
  </>
));
BaseAmountForm.displayName = "BaseAmountForm";

export { BaseAmountForm };
