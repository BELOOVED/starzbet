import { memo } from "react";
import {
  platformui_starzbet_placeholder_enterEmail,
  platformui_starzbet_title_email,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "../WithdrawForm.module.css";
import { TextField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { EMAIL_FORM_FIELD_PATHS } from "../../../../../Store/Banking/Form/BaseFormModel";
import { PlayerPaymentAccountField } from "../PlayerPaymentAccountField/PlayerPaymentAccountField";
import { AmountField } from "../AmountField/AmountField";
import { AccountInfo } from "../AccountInfo/AccountInfo";

const PaymentClipWithdrawForm = memo(() => {
  const [t] = useTranslation();

  return (
    <>
      <PlayerPaymentAccountField />

      <AccountInfo />

      <div className={classes.form}>
        <TextField
          fieldPath={EMAIL_FORM_FIELD_PATHS.email}
          label={t(platformui_starzbet_title_email)}
          placeholder={t.plain(platformui_starzbet_placeholder_enterEmail)}
        />

        <AmountField />
      </div>
    </>
  );
});
PaymentClipWithdrawForm.displayName = "PaymentClipWithdrawForm";

export { PaymentClipWithdrawForm };
