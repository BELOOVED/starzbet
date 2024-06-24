import clsx from "clsx";
import { type ComponentType, createElement, memo } from "react";
import { useTranslation } from "@sb/translator";
import { selectFieldNotNilValue, simpleValueExtractor, useFormSelector } from "@sb/form-new";
import { EPlatform_FixFinPayfutureMethodType } from "@sb/graphql-client";
import {
  platformui_starzbet_bankAccount_branchCode,
  platformui_starzbet_bankAccount_iban,
  platformui_starzbet_paymentAccount_title_bankName,
  platformui_starzbet_placeholder_enterEmail,
  platformui_starzbet_placeholder_enterMobileNumber,
  platformui_starzbet_placeholder_enterText,
  platformui_starzbet_title_accountHolderName,
  platformui_starzbet_title_accountNumber,
  platformui_starzbet_title_bankCode,
  platformui_starzbet_title_email,
  platformui_starzbet_title_mobileNumber,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "../WithdrawForm.module.css";
import { FieldCreator, type TFieldChildProps } from "../../../../../../common/Components/Field/FieldCreator";
import { Field } from "../../../../../../common/Themes/Starzbet/Components/Field/Field";
import { TextField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import {
  FIX_FIN_PAY_FUTURE_WITHDRAW_FORM_ACCOUNT_NUMBER_FIELD_PATH,
  FIX_FIN_PAY_FUTURE_WITHDRAW_FORM_BANK_BRANCH_FIELD_PATH,
  FIX_FIN_PAY_FUTURE_WITHDRAW_FORM_BANK_NAME_FIELD_PATH,
  FIX_FIN_PAY_FUTURE_WITHDRAW_FORM_FIELD_PATHS,
} from "../../../../../Store/Banking/Form/FixFin/FixFinPayFutureForm";
import {
  FIX_FIN_PAY_FUTURE_METHOD_TYPE_OPTIONS,
  FIX_FIN_PAY_FUTURE_METHOD_TYPE_TRANSLATE_MAP,
} from "../../../../../Store/Banking/Form/FixFin/FixFinPayFutureFormModel";
import { AmountField } from "../AmountField/AmountField";
import { AccountInfo } from "../AccountInfo/AccountInfo";

const FormTypeTabs = memo<TFieldChildProps<EPlatform_FixFinPayfutureMethodType>>(({ value, onChange }) => {
  const [t] = useTranslation();
  const onSelect = (value: EPlatform_FixFinPayfutureMethodType) => () => onChange(value);

  return (
    <div className={classes.tabs}>
      {
        FIX_FIN_PAY_FUTURE_METHOD_TYPE_OPTIONS.map((methodType) => (
          <div className={clsx(classes.tab, methodType === value && classes.active)} key={methodType} onClick={onSelect(methodType)}>
            {t(FIX_FIN_PAY_FUTURE_METHOD_TYPE_TRANSLATE_MAP[methodType])}
          </div>
        ))
      }
    </div>
  );
});
FormTypeTabs.displayName = "FormTypeTabs";

const BankTransferForm = memo(() => {
  const [t] = useTranslation();

  return (
    <TextField
      fieldPath={FIX_FIN_PAY_FUTURE_WITHDRAW_FORM_ACCOUNT_NUMBER_FIELD_PATH}
      label={t(platformui_starzbet_bankAccount_iban)}
      placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
    />
  );
});
BankTransferForm.displayName = "BankTransferForm";

const NetBankingForm = memo(() => {
  const [t] = useTranslation();

  return (
    <>
      <TextField
        fieldPath={FIX_FIN_PAY_FUTURE_WITHDRAW_FORM_ACCOUNT_NUMBER_FIELD_PATH}
        label={t(platformui_starzbet_title_accountNumber)}
        placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
      />

      <TextField
        fieldPath={FIX_FIN_PAY_FUTURE_WITHDRAW_FORM_BANK_BRANCH_FIELD_PATH}
        label={t(platformui_starzbet_bankAccount_branchCode)}
        placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
      />

      <TextField
        fieldPath={FIX_FIN_PAY_FUTURE_WITHDRAW_FORM_BANK_NAME_FIELD_PATH}
        label={t(platformui_starzbet_paymentAccount_title_bankName)}
        placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
      />
    </>
  );
});
NetBankingForm.displayName = "NetBankingForm";

const FORM_PER_METHOD_TYPE_MAP: Record<EPlatform_FixFinPayfutureMethodType, ComponentType> = {
  [EPlatform_FixFinPayfutureMethodType.banktransfer]: BankTransferForm,
  [EPlatform_FixFinPayfutureMethodType.netbanking]: NetBankingForm,
};

const FixFinPayFutureWithdrawForm = memo(() => {
  const [t] = useTranslation();
  const methodType = useFormSelector(
    selectFieldNotNilValue<EPlatform_FixFinPayfutureMethodType>,
    [FIX_FIN_PAY_FUTURE_WITHDRAW_FORM_FIELD_PATHS.methodType],
  );

  return (
    <>
      <FieldCreator<EPlatform_FixFinPayfutureMethodType>
        ThemedField={Field}
        fieldPath={FIX_FIN_PAY_FUTURE_WITHDRAW_FORM_FIELD_PATHS.methodType}
        valueExtractor={simpleValueExtractor}
        ghost
        hideError
      >
        {FormTypeTabs}
      </FieldCreator>

      <AccountInfo />

      <div className={classes.formGroup}>
        <div className={classes.form}>
          <TextField
            fieldPath={FIX_FIN_PAY_FUTURE_WITHDRAW_FORM_FIELD_PATHS.accountHolderName}
            label={t(platformui_starzbet_title_accountHolderName)}
            placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
          />

          <TextField
            fieldPath={FIX_FIN_PAY_FUTURE_WITHDRAW_FORM_FIELD_PATHS.email}
            label={t(platformui_starzbet_title_email)}
            placeholder={t.plain(platformui_starzbet_placeholder_enterEmail)}
          />

          <TextField
            fieldPath={FIX_FIN_PAY_FUTURE_WITHDRAW_FORM_FIELD_PATHS.phone}
            label={t(platformui_starzbet_title_mobileNumber)}
            placeholder={t.plain(platformui_starzbet_placeholder_enterMobileNumber)}
          />

          <TextField
            fieldPath={FIX_FIN_PAY_FUTURE_WITHDRAW_FORM_FIELD_PATHS.bankCode}
            label={t(platformui_starzbet_title_bankCode)}
            placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
          />
        </div>

        <div className={classes.form}>
          {createElement(FORM_PER_METHOD_TYPE_MAP[methodType])}
        </div>
      </div>

      <div className={classes.form}>
        <AmountField />
      </div>
    </>
  );
});
FixFinPayFutureWithdrawForm.displayName = "FixFinPayFutureWithdrawForm";

export { FixFinPayFutureWithdrawForm };
