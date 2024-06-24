import { type ComponentType, createElement, memo } from "react";
import { useSelector } from "react-redux";
import {
  platformui_starzbet_placeholder_enterEmail,
  platformui_starzbet_placeholder_enterMobileNumber,
  platformui_starzbet_placeholder_enterText,
  platformui_starzbet_placeholder_selectType,
  platformui_starzbet_title_accountNumber,
  platformui_starzbet_title_bank,
  platformui_starzbet_title_email,
  platformui_starzbet_title_fullNameBeneficiary,
  platformui_starzbet_title_ifscBeneficiary,
  platformui_starzbet_title_mobileNumber,
  platformui_starzbet_title_type,
  platformui_starzbet_title_upiId,
  type TTKeys,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { EPlatform_PayPortPaymentSystemType } from "@sb/graphql-client";
import { selectFieldValue, useFormSelector } from "@sb/form-new";
import classes from "../WithdrawForm.module.css";
import { TextField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { SelectField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/SelectField";
import { type ISelectOption } from "../../../../../../common/Components/Field/SelectModel";
import { payportActiveMethodTypeNonNullableSelector } from "../../../../../Store/Banking/Form/Payport/PayportFormSelectors";
import {
  PAYPORT_BANK_DETAILS_FORM_FIELD_PATHS,
  PAYPORT_CASH_FORM_FIELD_PATHS,
  PAYPORT_PAYTM_FORM_FIELD_PATHS,
  PAYPORT_UPI_FORM_FIELD_PATHS,
} from "../../../../../Store/Banking/Form/Payport/PayportForm";
import { EPayportPaytmFormType, PAYPORT_PAYTM_SELECT_OPTIONS } from "../../../../../Store/Banking/Form/Payport/PayportFormModel";
import { AccountInfo } from "../AccountInfo/AccountInfo";

const PayportUPIForm = memo(() => {
  const [t] = useTranslation();

  return (
    <TextField
      fieldPath={PAYPORT_UPI_FORM_FIELD_PATHS.accountInfo}
      label={t(platformui_starzbet_title_upiId)}
      placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
    />
  );
});
PayportUPIForm.displayName = "PayportUPIForm";

const PayportBankDetailsForm = memo(() => {
  const [t] = useTranslation();

  return (
    <>
      <TextField
        fieldPath={PAYPORT_BANK_DETAILS_FORM_FIELD_PATHS.accountNumber}
        label={t(platformui_starzbet_title_accountNumber)}
        placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
      />

      <TextField
        fieldPath={PAYPORT_BANK_DETAILS_FORM_FIELD_PATHS.beneficiaryName}
        label={t(platformui_starzbet_title_fullNameBeneficiary)}
        placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
      />

      <TextField
        fieldPath={PAYPORT_BANK_DETAILS_FORM_FIELD_PATHS.branchName}
        label={t(platformui_starzbet_title_bank)}
        placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
      />

      <TextField
        fieldPath={PAYPORT_BANK_DETAILS_FORM_FIELD_PATHS.ifscCode}
        label={t(platformui_starzbet_title_ifscBeneficiary)}
        placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
      />
    </>
  );
});
PayportBankDetailsForm.displayName = "PayportBankDetailsForm";

const PayportCashDetailsForm = memo(() => {
  const [t] = useTranslation();

  return (
    <>
      <TextField
        fieldPath={PAYPORT_CASH_FORM_FIELD_PATHS.customerName}
        label={t(platformui_starzbet_title_fullNameBeneficiary)}
        placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
      />

      <TextField
        fieldPath={PAYPORT_CASH_FORM_FIELD_PATHS.email}
        label={t(platformui_starzbet_title_email)}
        placeholder={t.plain(platformui_starzbet_placeholder_enterEmail)}
      />

      <TextField
        fieldPath={PAYPORT_CASH_FORM_FIELD_PATHS.phone}
        label={t(platformui_starzbet_title_mobileNumber)}
        placeholder={t.plain(platformui_starzbet_placeholder_enterMobileNumber)}
      />
    </>
  );
});
PayportCashDetailsForm.displayName = "PayportCashDetailsForm";

const PAYPORT_PAYTM_ACCOUNT_INFO_MAP: Record<EPayportPaytmFormType, TTKeys> = {
  [EPayportPaytmFormType.upi]: platformui_starzbet_title_upiId,
  [EPayportPaytmFormType.phone]: platformui_starzbet_title_mobileNumber,
};

const PAYPORT_PAYTM_ACCOUNT_INFO_PLACEHOLDER_MAP: Record<EPayportPaytmFormType, TTKeys> = {
  [EPayportPaytmFormType.upi]: platformui_starzbet_placeholder_enterText,
  [EPayportPaytmFormType.phone]: platformui_starzbet_placeholder_enterMobileNumber,
};

const PAYPORT_PAYTM_TYPE: Record<EPayportPaytmFormType, string> = {
  [EPayportPaytmFormType.phone]: platformui_starzbet_title_mobileNumber,
  [EPayportPaytmFormType.upi]: platformui_starzbet_title_upiId,
};

const PayportPaytmOption = memo<ISelectOption<EPayportPaytmFormType>>(({
  value,
}) => {
  const [t] = useTranslation();

  return t(PAYPORT_PAYTM_TYPE[value]);
});
PayportPaytmOption.displayName = "PayportPaytmOption";

const PayportPaytmForm = memo(() => {
  const [t] = useTranslation();
  const type = useFormSelector(selectFieldValue<EPayportPaytmFormType>, [PAYPORT_PAYTM_FORM_FIELD_PATHS.type]);

  return (
    <>
      <SelectField<EPayportPaytmFormType>
        fieldPath={PAYPORT_PAYTM_FORM_FIELD_PATHS.type}
        options={PAYPORT_PAYTM_SELECT_OPTIONS}
        label={t(platformui_starzbet_title_type)}
        placeholder={t.plain(platformui_starzbet_placeholder_selectType)}
        optionComponent={PayportPaytmOption}
      />

      {
        type
          ? (
            <TextField
              fieldPath={PAYPORT_PAYTM_FORM_FIELD_PATHS.accountInfo}
              label={t(PAYPORT_PAYTM_ACCOUNT_INFO_MAP[type])}
              placeholder={t.plain(PAYPORT_PAYTM_ACCOUNT_INFO_PLACEHOLDER_MAP[type])}
            />
          )
          : null
      }
    </>
  );
});
PayportPaytmForm.displayName = "PayportPaytmForm";

const PAYPORT_FORM_MODEL: Partial<Record<EPlatform_PayPortPaymentSystemType, ComponentType>> = {
  [EPlatform_PayPortPaymentSystemType.upi]: PayportUPIForm,
  [EPlatform_PayPortPaymentSystemType.phonepe]: PayportUPIForm,
  [EPlatform_PayPortPaymentSystemType.imps]: PayportBankDetailsForm,
  [EPlatform_PayPortPaymentSystemType.neft]: PayportBankDetailsForm,
  [EPlatform_PayPortPaymentSystemType.rtgs]: PayportBankDetailsForm,
  [EPlatform_PayPortPaymentSystemType.cash]: PayportCashDetailsForm,
  [EPlatform_PayPortPaymentSystemType.paytm]: PayportPaytmForm,
};

const PayportWithdrawForm = memo(() => {
  const selectedMethodType = useSelector(payportActiveMethodTypeNonNullableSelector);
  const formContent = PAYPORT_FORM_MODEL[selectedMethodType];

  return (
    <>
      <AccountInfo />

      <div className={classes.form}>
        {formContent ? createElement(formContent) : null}
      </div>
    </>
  );
});
PayportWithdrawForm.displayName = "PayportWithdrawForm";

export { PayportWithdrawForm };
