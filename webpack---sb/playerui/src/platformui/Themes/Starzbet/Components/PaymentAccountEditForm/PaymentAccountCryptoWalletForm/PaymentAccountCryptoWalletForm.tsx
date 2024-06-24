import { memo } from "react";
import { platformui_starzbet_paymentAccount_title_cryptoWalletDetails } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "../PaymentAccountEditForm.module.css";
import { CryptoWalletForm } from "../../PaymentAccountCreateForm/PaymentAccountCryptoWalletForm/PaymentAccountCryptoWalletForm";

const PaymentAccountCryptoWalletForm = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.formGroup}>
      <div className={classes.header}>
        {t(platformui_starzbet_paymentAccount_title_cryptoWalletDetails)}
      </div>

      <CryptoWalletForm />
    </div>
  );
});
PaymentAccountCryptoWalletForm.displayName = "PaymentAccountCryptoWalletForm";

export { PaymentAccountCryptoWalletForm };
