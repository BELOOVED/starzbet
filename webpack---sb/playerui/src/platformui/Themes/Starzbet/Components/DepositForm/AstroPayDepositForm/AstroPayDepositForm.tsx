import { memo } from "react";
import { platformui_starzbet_deposit_depositFrom } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "../DepositForm.module.css";
import { AstroPayForm } from "../../AstroPayForm/AstroPayForm";

const AstroPayDepositForm = memo(() => (
  <div className={classes.formGroup}>
    <div className={classes.formGroupItem}>
      <AstroPayForm bankAccountTitle={platformui_starzbet_deposit_depositFrom} />
    </div>
  </div>
));
AstroPayDepositForm.displayName = "AstroPayDepositForm";

export { AstroPayDepositForm };
