import { memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_paymentAccount_title_accountDetails,
  platformui_starzbet_title_paymentMethod,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "../PaymentAccountEditForm.module.css";
import { paymentAccountBankAccountTranslateMap } from "../../../../../Store/PaymentAccount/Models/PaymentAccountTypeModel";
import { paymentAccountBankAccountEditKindSelector } from "../../../../../Store/PaymentAccount/Selectors/PaymentAccountSelectors";
import { ReadOnly } from "../../ReadOnly/ReadOnly";
import { PaymentAccountBankAccountForm } from "../../PaymentAccount/PaymentAccountBankAccountForm/PaymentAccountBankAccountForm";

const PaymentAccountBankAccountEditForm = memo(() => {
  const [t] = useTranslation();
  const accountKind = useSelector(paymentAccountBankAccountEditKindSelector);

  return (
    <div className={classes.formGroup}>
      <div className={classes.header}>
        {t(platformui_starzbet_paymentAccount_title_accountDetails)}
      </div>

      <ReadOnly
        value={accountKind ? t.plain(paymentAccountBankAccountTranslateMap[accountKind]) : ""}
        placeholder={platformui_starzbet_title_paymentMethod}
        inputClassName={classes.inputTitle}
      />

      {accountKind ? <PaymentAccountBankAccountForm accountKind={accountKind} /> : null}
    </div>
  );
});
PaymentAccountBankAccountEditForm.displayName = "PaymentAccountBankAccountEditForm";

export { PaymentAccountBankAccountEditForm };
