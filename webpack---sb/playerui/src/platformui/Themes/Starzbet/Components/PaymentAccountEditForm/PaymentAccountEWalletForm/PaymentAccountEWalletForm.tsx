import { memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import { platformui_starzbet_paymentAccount_title_eWalletDetails } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "../PaymentAccountEditForm.module.css";
import { paymentAccountEWalletEditKindSelector } from "../../../../../Store/PaymentAccount/Selectors/PaymentAccountSelectors";
import { PaymentAccountEWallet } from "../../PaymentAccountCreateForm/PaymentAccountEWalletForm/PaymentAccountEWalletForm";

const PaymentAccountEWalletForm = memo(() => {
  const [t] = useTranslation();
  const accountKind = useSelector(paymentAccountEWalletEditKindSelector);

  return (
    <div className={classes.formGroup}>
      <div className={classes.header}>
        {t(platformui_starzbet_paymentAccount_title_eWalletDetails)}
      </div>

      <PaymentAccountEWallet accountKind={accountKind} />
    </div>
  );
});
PaymentAccountEWalletForm.displayName = "PaymentAccountEWalletForm";

export { PaymentAccountEWalletForm };
