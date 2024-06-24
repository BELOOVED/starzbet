import { memo } from "react";
import {
  platformui_starzbet_headline_address,
  platformui_starzbet_placeholder_enterMobileNumber,
  platformui_starzbet_placeholder_enterText,
  platformui_starzbet_title_mobileNumber,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { platformui_title_personId } from "@sb/translates/platformui/CommonTKeys";
import classes from "../WithdrawForm.module.css";
import { TextField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { EXXOGATE_TEST_WITHDRAWAL_FORM_FIELD_PATHS } from "../../../../../Store/Banking/Form/Exxogate/ExxogateForm";
import { AmountField } from "../AmountField/AmountField";
import { AccountInfo } from "../AccountInfo/AccountInfo";

const ExxogateTestWithdrawForm = memo(() => {
  const [t] = useTranslation();

  return (
    <>
      <AccountInfo />

      <div className={classes.form}>
        <TextField
          fieldPath={EXXOGATE_TEST_WITHDRAWAL_FORM_FIELD_PATHS.address}
          label={t(platformui_starzbet_headline_address)}
          placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
        />

        <TextField
          fieldPath={EXXOGATE_TEST_WITHDRAWAL_FORM_FIELD_PATHS.personId}
          label={t(platformui_title_personId)}
          placeholder={t.plain(platformui_starzbet_placeholder_enterText)}
        />

        <TextField
          fieldPath={EXXOGATE_TEST_WITHDRAWAL_FORM_FIELD_PATHS.phone}
          label={t(platformui_starzbet_title_mobileNumber)}
          placeholder={t.plain(platformui_starzbet_placeholder_enterMobileNumber)}
        />

        <AmountField />
      </div>
    </>
  );
});
ExxogateTestWithdrawForm.displayName = "ExxogateTestWithdrawForm";

export { ExxogateTestWithdrawForm };
