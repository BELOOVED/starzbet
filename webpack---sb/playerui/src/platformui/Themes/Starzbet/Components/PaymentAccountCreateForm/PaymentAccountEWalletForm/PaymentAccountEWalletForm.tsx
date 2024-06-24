import { type ComponentType, createElement, memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import { isNotNil } from "@sb/utils";
import {
  platformui_starzbet_paymentAccount_title_accountKind,
  platformui_starzbet_paymentAccount_title_accountNumber,
  platformui_starzbet_paymentAccount_title_eWalletDetails,
  platformui_starzbet_placeholder_enterText,
  platformui_starzbet_placeholder_selectEWalletAccount,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "../PaymentAccountCreateForm.module.css";
import { TextField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { SelectField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/SelectField";
import {
  EPaymentAccountEWallet,
  PAYMENT_ACCOUNT_E_WALLET_OPTIONS,
  type TWithPaymentAccountEWalletKindProps,
} from "../../../../../Store/PaymentAccount/Models/PaymentAccountTypeModel";
import { E_WALLET_FORM_FIELD_PATHS } from "../../../../../Store/PaymentAccount/Form/EWallet/EWalletForm";
import { PAYMENT_ACCOUNT_KIND_FORM_FIELD_PATHS } from "../../../../../Store/PaymentAccount/Form/PaymentAccountBaseFormModel";
import { paymentAccountCreateKindFieldValueSelector } from "../../../../../Store/PaymentAccount/Form/PaymentAccountFormSelectors";

const PaparaAccountForm = memo(() => {
  const [t] = useTranslation();

  return (
    <TextField
      fieldPath={E_WALLET_FORM_FIELD_PATHS.accountNumber}
      label={t(platformui_starzbet_paymentAccount_title_accountNumber)}
      placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
    />
  );
});
PaparaAccountForm.displayName = "PaparaAccountForm";

const formContent: Record<EPaymentAccountEWallet, ComponentType> = {
  [EPaymentAccountEWallet.papara]: PaparaAccountForm,
};

const PaymentAccountEWallet = memo<TWithPaymentAccountEWalletKindProps>(({ accountKind }) => {
  const content = formContent[accountKind];

  return createElement(content);
});
PaymentAccountEWallet.displayName = "PaymentAccountEWallet";

const PaymentAccountEWalletForm = memo(() => {
  const [t] = useTranslation();
  const current = useSelector(paymentAccountCreateKindFieldValueSelector<EPaymentAccountEWallet>);

  return (
    <div className={classes.formGroup}>
      <div className={classes.header}>
        {t(platformui_starzbet_paymentAccount_title_eWalletDetails)}
      </div>

      <SelectField<EPaymentAccountEWallet>
        fieldPath={PAYMENT_ACCOUNT_KIND_FORM_FIELD_PATHS.accountKind}
        options={PAYMENT_ACCOUNT_E_WALLET_OPTIONS}
        placeholder={t.plain(platformui_starzbet_placeholder_selectEWalletAccount)}
        label={t(platformui_starzbet_paymentAccount_title_accountKind)}
      />

      {isNotNil(current) ? <PaymentAccountEWallet accountKind={current} /> : null}
    </div>
  );
});
PaymentAccountEWalletForm.displayName = "PaymentAccountEWalletForm";

export { PaymentAccountEWalletForm, PaymentAccountEWallet };
