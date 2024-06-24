import { memo } from "react";
import {
  platformui_starzbet_headline_address,
  platformui_starzbet_placeholder_enterMobileNumber,
  platformui_starzbet_placeholder_enterText,
  platformui_starzbet_title_accountNumber,
  platformui_starzbet_title_ifscBeneficiary,
  platformui_starzbet_title_mobileNumber,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "../WithdrawForm.module.css";
import { TextField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { EXXOGATE_IMPS_29_WITHDRAWAL_FORM_FIELD_PATHS } from "../../../../../Store/Banking/Form/Exxogate/ExxogateForm";
import { AmountField } from "../AmountField/AmountField";
import { AccountInfo } from "../AccountInfo/AccountInfo";

const ExxogateImps29WithdrawForm = memo(() => {
  const [t] = useTranslation();

  return (
    <>
      <AccountInfo />

      <div className={classes.form}>
        <TextField
          fieldPath={EXXOGATE_IMPS_29_WITHDRAWAL_FORM_FIELD_PATHS.address}
          label={t(platformui_starzbet_headline_address)}
          placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
        />

        <TextField
          fieldPath={EXXOGATE_IMPS_29_WITHDRAWAL_FORM_FIELD_PATHS.bankAccountNumber}
          label={t(platformui_starzbet_title_accountNumber)}
          placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
        />

        <TextField
          fieldPath={EXXOGATE_IMPS_29_WITHDRAWAL_FORM_FIELD_PATHS.ifsc}
          label={t(platformui_starzbet_title_ifscBeneficiary)}
          placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
        />

        <TextField
          fieldPath={EXXOGATE_IMPS_29_WITHDRAWAL_FORM_FIELD_PATHS.phone}
          label={t(platformui_starzbet_title_mobileNumber)}
          placeholder={t.plain(platformui_starzbet_placeholder_enterMobileNumber)}
        />

        <AmountField />
      </div>
    </>
  );
});
ExxogateImps29WithdrawForm.displayName = "ExxogateImps29WithdrawForm";

export { ExxogateImps29WithdrawForm };
