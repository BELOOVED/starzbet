import { memo } from "react";
import { useSelector } from "react-redux";
import classes from "../DepositForm.module.css";
import { fixFinBankAccountNameSelector } from "../../../../../Store/Banking/Form/FixFin/FixFinWithBankAccountSelectors";

const FixFinFastlineDepositForm = memo(() => {
  const bankAccount = useSelector(fixFinBankAccountNameSelector);

  return (
    <div className={classes.bankNameTitle}>
      {bankAccount}
    </div>
  );
});
FixFinFastlineDepositForm.displayName = "FixFinFastlineDepositForm";

export { FixFinFastlineDepositForm };
