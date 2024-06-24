import { memo } from "react";
import {
  platformui_starzbet_placeholder_enterText,
  platformui_starzbet_title_accountNumber,
  platformui_starzbet_title_ifscBeneficiary,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "../WithdrawForm.module.css";
import { TextField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { EXXOGATE_IMPS_41_WITHDRAWAL_FORM_FIELD_PATHS } from "../../../../../Store/Banking/Form/Exxogate/ExxogateForm";
import { AmountField } from "../AmountField/AmountField";
import { AccountInfo } from "../AccountInfo/AccountInfo";

const ExxogateImps41WithdrawForm = memo(() => {
  const [t] = useTranslation();

  return (
    <>
      <AccountInfo />

      <div className={classes.form}>
        <TextField
          fieldPath={EXXOGATE_IMPS_41_WITHDRAWAL_FORM_FIELD_PATHS.bankAccountNumber}
          label={t(platformui_starzbet_title_accountNumber)}
          placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
        />

        <TextField
          fieldPath={EXXOGATE_IMPS_41_WITHDRAWAL_FORM_FIELD_PATHS.ifsc}
          label={t(platformui_starzbet_title_ifscBeneficiary)}
          placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
        />

        <AmountField />
      </div>
    </>
  );
});
ExxogateImps41WithdrawForm.displayName = "ExxogateImps41WithdrawForm";

export { ExxogateImps41WithdrawForm };
