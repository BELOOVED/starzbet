import { memo } from "react";
import classes from "../DepositForm.module.css";
import { MuchBetterForm } from "../../MuchBetterForm/MuchBetterForm";

const MuchBetterDepositForm = memo(() => (
  <div className={classes.formGroup}>
    <div className={classes.formGroupItem}>
      <MuchBetterForm />
    </div>
  </div>
));
MuchBetterDepositForm.displayName = "MuchBetterDepositForm";

export { MuchBetterDepositForm };
