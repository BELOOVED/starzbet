import { memo } from "react";
import {
  platformui_starzbet_paymentAccount_title_bankName,
  platformui_starzbet_placeholder_enterText,
  platformui_starzbet_placeholder_selectBank,
  platformui_starzbet_placeholder_selectType,
  platformui_starzbet_title_abaSwift,
  platformui_starzbet_title_accountAgencyNumber,
  platformui_starzbet_title_accountNumber,
  platformui_starzbet_title_accountType,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "../WithdrawForm.module.css";
import { TextField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { SelectField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/SelectField";
import {
  payRetailersBankOption,
  payRetailersBankOptions,
  type TPayRetailersBank,
} from "../../../../../Store/Banking/Models/PayRetailersBankModel";
import {
  payRetailersAccountTypeOption,
  payRetailersAccountTypeOptions,
  type TPayRetailersAccountType,
} from "../../../../../Store/Banking/Models/PayRetailersAccountTypeModel";
import { PAY_RETAILERS_BANK_FORM_FIELD_PATHS } from "../../../../../Store/Banking/Form/PayRetailers/PayRetailersForm";
import { AccountInfo } from "../AccountInfo/AccountInfo";
import { AmountField } from "../AmountField/AmountField";

const BankSelect = memo(() => {
  const [t] = useTranslation();

  return (
    <SelectField<TPayRetailersBank>
      fieldPath={PAY_RETAILERS_BANK_FORM_FIELD_PATHS.bankCode}
      options={payRetailersBankOptions}
      label={t(platformui_starzbet_paymentAccount_title_bankName)}
      placeholder={t.plain(platformui_starzbet_placeholder_selectBank)}
      optionComponent={payRetailersBankOption}
    />
  );
});
BankSelect.displayName = "BankSelect";

const AccountType = memo(() => {
  const [t] = useTranslation();

  return (
    <SelectField<TPayRetailersAccountType>
      fieldPath={PAY_RETAILERS_BANK_FORM_FIELD_PATHS.payoutAccountTypeCode}
      options={payRetailersAccountTypeOptions}
      label={t(platformui_starzbet_title_accountType)}
      placeholder={t.plain(platformui_starzbet_placeholder_selectType)}
      optionComponent={payRetailersAccountTypeOption}
    />
  );
});
AccountType.displayName = "AccountType";

const PayRetailersBankWithdrawForm = memo(() => {
  const [t] = useTranslation();

  return (
    <>
      <AccountInfo />

      <div className={classes.form}>
        <TextField
          fieldPath={PAY_RETAILERS_BANK_FORM_FIELD_PATHS.accountNumber}
          label={t(platformui_starzbet_title_accountNumber)}
          placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
        />

        <TextField
          fieldPath={PAY_RETAILERS_BANK_FORM_FIELD_PATHS.accountAgencyNumber}
          label={t(platformui_starzbet_title_accountAgencyNumber)}
          placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
        />

        <BankSelect />

        <AccountType />

        <TextField
          fieldPath={PAY_RETAILERS_BANK_FORM_FIELD_PATHS.abaSwift}
          label={t(platformui_starzbet_title_abaSwift)}
          placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
          optional
        />

        <AmountField />
      </div>
    </>
  );
});
PayRetailersBankWithdrawForm.displayName = "PayRetailersBankWithdrawForm";

export { PayRetailersBankWithdrawForm };
