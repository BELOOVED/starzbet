import { memo } from "react";
import { useSelector } from "react-redux";
import {
  platformui_starzbet_paymentAccount_title_accountKind,
  platformui_starzbet_paymentAccount_title_cryptoWalletDetails,
  platformui_starzbet_paymentAccount_title_walletAddress,
  platformui_starzbet_placeholder_enterText,
  platformui_starzbet_placeholder_selectCryptoWalletAccount,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { isNotNil } from "@sb/utils";
import { type EPlatform_FixFinCryptoCurrency } from "@sb/graphql-client";
import classes from "../PaymentAccountCreateForm.module.css";
import { TextField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { SelectField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/SelectField";
import { PAYMENT_ACCOUNT_CRYPTO_WALLET_OPTIONS } from "../../../../../Store/PaymentAccount/Models/PaymentAccountTypeModel";
import { CRYPTO_WALLET_FORM_FIELD_PATHS } from "../../../../../Store/PaymentAccount/Form/CryptoWallet/CryptoWalletForm";
import { PAYMENT_ACCOUNT_KIND_FORM_FIELD_PATHS } from "../../../../../Store/PaymentAccount/Form/PaymentAccountBaseFormModel";
import { paymentAccountCreateKindFieldValueSelector } from "../../../../../Store/PaymentAccount/Form/PaymentAccountFormSelectors";

const CryptoWalletForm = memo(() => {
  const [t] = useTranslation();

  return (
    <TextField
      fieldPath={CRYPTO_WALLET_FORM_FIELD_PATHS.walletAddress}
      label={t(platformui_starzbet_paymentAccount_title_walletAddress)}
      placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
    />
  );
});
CryptoWalletForm.displayName = "CryptoWalletForm";

const PaymentAccountCryptoWalletForm = memo(() => {
  const [t] = useTranslation();
  const current = useSelector(paymentAccountCreateKindFieldValueSelector<EPlatform_FixFinCryptoCurrency>);

  return (
    <div className={classes.formGroup}>
      <div className={classes.header}>
        {t(platformui_starzbet_paymentAccount_title_cryptoWalletDetails)}
      </div>

      <SelectField<EPlatform_FixFinCryptoCurrency>
        fieldPath={PAYMENT_ACCOUNT_KIND_FORM_FIELD_PATHS.accountKind}
        options={PAYMENT_ACCOUNT_CRYPTO_WALLET_OPTIONS}
        placeholder={t.plain(platformui_starzbet_placeholder_selectCryptoWalletAccount)}
        label={t(platformui_starzbet_paymentAccount_title_accountKind)}
      />

      {isNotNil(current) ? <CryptoWalletForm /> : null}
    </div>
  );
});
PaymentAccountCryptoWalletForm.displayName = "PaymentAccountCryptoWalletForm";

export { PaymentAccountCryptoWalletForm, CryptoWalletForm };
