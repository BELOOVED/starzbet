import { memo } from "react";
import { platformui_starzbet_withdraw_withdrawTo } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "../WithdrawForm.module.css";
import { AstroPayForm } from "../../AstroPayForm/AstroPayForm";
import { AccountInfo } from "../AccountInfo/AccountInfo";
import { AmountField } from "../AmountField/AmountField";

const AstroPayWithdrawForm = memo(() => (
  <>
    <AccountInfo />

    <div className={classes.form}>
      <AstroPayForm bankAccountTitle={platformui_starzbet_withdraw_withdrawTo} />

      <AmountField />
    </div>
  </>
));
AstroPayWithdrawForm.displayName = "AstroPayWithdrawForm";

export { AstroPayWithdrawForm };
