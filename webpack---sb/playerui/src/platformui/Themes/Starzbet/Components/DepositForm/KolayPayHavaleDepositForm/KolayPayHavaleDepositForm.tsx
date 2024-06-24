import { memo } from "react";
import { useSelector } from "react-redux";
import {
  platformui_starzbet_bankAccount_accountHolder,
  platformui_starzbet_bankAccount_iban,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "../DepositForm.module.css";
import { kolayPayAccountActiveSelectors } from "../../../../../Store/Banking/Form/KolayPay/KolayPayAccountSelectors";
import { DepositFormItem } from "../DepositFormItem";

const KolayPayHavaleDepositForm = memo(() => {
  const bankName = useSelector(kolayPayAccountActiveSelectors.bank);
  const accountHolder = useSelector(kolayPayAccountActiveSelectors.walletName);
  const iban = useSelector(kolayPayAccountActiveSelectors.walletNo);

  return (
    <>
      <div className={classes.bankNameTitle}>
        {bankName}
      </div>

      <div className={classes.formGroupItem}>
        <DepositFormItem title={platformui_starzbet_bankAccount_accountHolder} value={accountHolder} />

        <DepositFormItem title={platformui_starzbet_bankAccount_iban} value={iban} withCopy />
      </div>
    </>
  );
});
KolayPayHavaleDepositForm.displayName = "KolayPayHavaleDepositForm";

export { KolayPayHavaleDepositForm };
