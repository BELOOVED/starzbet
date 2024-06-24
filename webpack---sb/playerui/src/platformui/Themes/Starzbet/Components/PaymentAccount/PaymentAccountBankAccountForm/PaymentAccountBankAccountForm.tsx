import { type ComponentType, createElement, memo } from "react";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_paymentAccount_title_bankName,
  platformui_starzbet_paymentAccount_title_iban,
  platformui_starzbet_placeholder_enterText,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { PlayerUIQaAttributes } from "@sb/qa-attributes";
import { withProps } from "@sb/utils";
import { type IWithFieldPath } from "@sb/form-new";
import { TextField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import {
  EPaymentAccountBankAccount,
  isPaymentAccountBankAccountBaseForm,
  type TPaymentAccountBankAccountExtraForm,
  type TWithPaymentAccountBankAccountProps,
  type TWithPaymentAccountBankAccountSelectProps,
} from "../../../../../Store/PaymentAccount/Models/PaymentAccountTypeModel";
import { BANK_ACCOUNT_BASE_DETAILS_FIELD_PATHS } from "../../../../../Store/PaymentAccount/Form/BankAccount/BankAccountForm";
import { PaymentAccountBankSelect } from "../PaymentAccountBankSelect/PaymentAccountBankSelect";
import { PaymentClipBankAccountForm } from "../PaymentClipBankAccountForm/PaymentClipBankAccountForm";

const IbanField = memo<IWithFieldPath>(({ fieldPath }) => {
  const [t] = useTranslation();

  return (
    <TextField
      fieldPath={fieldPath.concat(BANK_ACCOUNT_BASE_DETAILS_FIELD_PATHS.iban)}
      label={t(platformui_starzbet_paymentAccount_title_iban)}
      placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
      qaAttribute={PlayerUIQaAttributes.PaymentAccountsPage.IbanInput}
    />
  );
});
IbanField.displayName = "IbanField";

const PaymentAccountBank = memo<IWithFieldPath>(({ fieldPath }) => {
  const [t] = useTranslation();

  return (
    <>
      <TextField
        fieldPath={fieldPath.concat(BANK_ACCOUNT_BASE_DETAILS_FIELD_PATHS.bank)}
        label={t(platformui_starzbet_paymentAccount_title_bankName)}
        placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
      />

      <IbanField fieldPath={fieldPath} />
    </>
  );
});
PaymentAccountBank.displayName = "PaymentAccountBank";

const PaymentAccountBankAccountBaseForm = memo<TWithPaymentAccountBankAccountSelectProps & IWithFieldPath>(({ accountKind, fieldPath }) => (
  <>
    <PaymentAccountBankSelect accountKind={accountKind} fieldPath={fieldPath} />

    <IbanField fieldPath={fieldPath} />
  </>
));
PaymentAccountBankAccountBaseForm.displayName = "PaymentAccountBankAccountBaseForm";

const PAYMENT_ACCOUNT_FORM_PER_KIND: Record<TPaymentAccountBankAccountExtraForm, ComponentType<IWithFieldPath>> = {
  [EPaymentAccountBankAccount.one]: PaymentAccountBank,
  [EPaymentAccountBankAccount.paymentClip]: PaymentClipBankAccountForm,
};

const PaymentAccountBankAccountForm = memo<TWithPaymentAccountBankAccountProps & Partial<IWithFieldPath>>(({
  accountKind,
  fieldPath = [],
}) => {
  const formContent = isPaymentAccountBankAccountBaseForm(accountKind)
    ? PAYMENT_ACCOUNT_FORM_PER_KIND[accountKind]
    : withProps(PaymentAccountBankAccountBaseForm)({ accountKind });

  return createElement<IWithFieldPath>(formContent, { fieldPath });
});
PaymentAccountBankAccountForm.displayName = "PaymentAccountBankAccountForm";

export { PaymentAccountBankAccountForm };
