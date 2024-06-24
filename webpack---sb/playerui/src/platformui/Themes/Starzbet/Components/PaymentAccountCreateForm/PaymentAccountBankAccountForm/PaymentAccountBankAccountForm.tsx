import { memo } from "react";
import { useSelector } from "react-redux";
import {
  platformui_starzbet_paymentAccount_title_accountDetails,
  platformui_starzbet_placeholder_selectMethod,
  platformui_starzbet_title_paymentMethod,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { PlayerUIQaAttributes } from "@sb/qa-attributes";
import classes from "../PaymentAccountCreateForm.module.css";
import { SelectField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/SelectField";
import {
  type EPaymentAccountBankAccount,
  paymentAccountBankAccountKindOptions,
} from "../../../../../Store/PaymentAccount/Models/PaymentAccountTypeModel";
import { PAYMENT_ACCOUNT_KIND_FORM_FIELD_PATHS } from "../../../../../Store/PaymentAccount/Form/PaymentAccountBaseFormModel";
import { BANK_ACCOUNT_FORM_FIELD_PATHS } from "../../../../../Store/PaymentAccount/Form/BankAccount/BankAccountForm";
import { paymentAccountCreateKindFieldValueSelector } from "../../../../../Store/PaymentAccount/Form/PaymentAccountFormSelectors";
import { PaymentAccountBankAccountOption } from "../../../../../Components/PaymentAccountBankAccountOption/PaymentAccountBankAccountOption";
import { PaymentAccountBankAccountForm } from "../../PaymentAccount/PaymentAccountBankAccountForm/PaymentAccountBankAccountForm";

const PaymentAccountBankAccountCreateForm = memo(() => {
  const [t] = useTranslation();
  const accountKind = useSelector(paymentAccountCreateKindFieldValueSelector<EPaymentAccountBankAccount>);

  return (
    <div className={classes.formGroup}>
      <div className={classes.header}>
        {t(platformui_starzbet_paymentAccount_title_accountDetails)}
      </div>

      <SelectField<EPaymentAccountBankAccount>
        fieldPath={PAYMENT_ACCOUNT_KIND_FORM_FIELD_PATHS.accountKind}
        options={paymentAccountBankAccountKindOptions}
        label={t(platformui_starzbet_title_paymentMethod)}
        placeholder={t.plain(platformui_starzbet_placeholder_selectMethod)}
        qaAttributeSelect={PlayerUIQaAttributes.PaymentAccountsPage.AccountTypeSelect}
        qaAttributeOption={PlayerUIQaAttributes.PaymentAccountsPage.AccountTypeOption}
        optionComponent={PaymentAccountBankAccountOption}
      />

      {accountKind ? <PaymentAccountBankAccountForm fieldPath={BANK_ACCOUNT_FORM_FIELD_PATHS.details} accountKind={accountKind} /> : null}
    </div>
  );
});
PaymentAccountBankAccountCreateForm.displayName = "PaymentAccountBankAccountCreateForm";

export { PaymentAccountBankAccountCreateForm };
